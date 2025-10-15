import * as grpc from '@grpc/grpc-js';
import { LiveDataServiceClient } from './generated/sui/rpc/v2beta2/live_data_service_grpc_pb';
import * as live_pb from './generated/sui/rpc/v2beta2/live_data_service_pb';
import { SuiGrpcConfig, DEFAULT_CONFIG, NETWORKS, NetworkType } from './config';

/**
 * Real wallet information from Sui blockchain.
 */
export interface WalletData {
  readonly address: string;
  readonly balances: Balance[];
  readonly ownedObjects: OwnedObject[];
}

/**
 * Balance information for a specific coin type.
 */
export interface Balance {
  readonly coinType: string;
  readonly totalBalance: string;
  readonly lockedBalance: string;
}

/**
 * Object owned by the wallet.
 */
export interface OwnedObject {
  readonly objectId: string;
  readonly version: string;
  readonly digest: string;
  readonly type?: string;
}

/**
 * Production wallet reader using real Sui gRPC APIs.
 */
export class SuiWalletReader {
  private readonly config: SuiGrpcConfig;
  private readonly credentials: grpc.ChannelCredentials;
  private readonly options: grpc.ChannelOptions;
  private readonly client: LiveDataServiceClient;

  constructor(network: NetworkType = 'mainnet') {
    this.config = this.buildConfig(network);
    this.credentials = this.createCredentials();
    this.options = this.createChannelOptions();
    this.client = new LiveDataServiceClient(
      this.getEndpoint(),
      this.credentials,
      this.options
    );
  }

  /**
   * Reads complete wallet data including balances and owned objects.
   */
  public async readWallet(address: string): Promise<WalletData> {
    this.validateAddress(address);

    const [balances, ownedObjects] = await Promise.all([
      this.getBalances(address),
      this.getOwnedObjects(address)
    ]);

    return {
      address,
      balances,
      ownedObjects
    };
  }

  /**
   * Gets all balances for an address.
   */
  public async getBalances(address: string): Promise<Balance[]> {
    return new Promise((resolve, reject) => {
      const request = new live_pb.ListBalancesRequest();
      request.setOwner(address);

      this.client.listBalances(request, (error, response) => {
        if (error) {
          reject(error);
        } else if (response) {
          const balances = response.getBalancesList().map(balance => ({
            coinType: balance.getCoinType() || '',
            totalBalance: balance.getBalance()?.toString() || '0',
            lockedBalance: '0'
          }));
          resolve(balances);
        } else {
          reject(new Error('No response received'));
        }
      });
    });
  }

  /**
   * Gets balance for a specific coin type.
   */
  public async getBalance(address: string, coinType: string): Promise<Balance> {
    return new Promise((resolve, reject) => {
      const request = new live_pb.GetBalanceRequest();
      request.setOwner(address);
      request.setCoinType(coinType);

      this.client.getBalance(request, (error, response) => {
        if (error) {
          reject(error);
        } else if (response) {
          const balance = response.getBalance();
          resolve({
            coinType: balance?.getCoinType() || coinType,
            totalBalance: balance?.getBalance()?.toString() || '0',
            lockedBalance: '0'
          });
        } else {
          reject(new Error('No response received'));
        }
      });
    });
  }

  /**
   * Gets all objects owned by an address.
   */
  public async getOwnedObjects(address: string): Promise<OwnedObject[]> {
    return new Promise((resolve, reject) => {
      const request = new live_pb.ListOwnedObjectsRequest();
      request.setOwner(address);

      this.client.listOwnedObjects(request, (error, response) => {
        if (error) {
          reject(error);
        } else if (response) {
          const objects = response.getObjectsList().map(obj => ({
            objectId: obj.getObjectId() || '',
            version: obj.getVersion()?.toString() || '0',
            digest: obj.getDigest() || '',
            type: obj.getObjectType()
          }));
          resolve(objects);
        } else {
          reject(new Error('No response received'));
        }
      });
    });
  }

  public close(): void {
    this.client.close();
  }

  private validateAddress(address: string): void {
    if (!address || typeof address !== 'string') {
      throw new Error('Address must be a non-empty string');
    }
    if (!address.startsWith('0x') || address.length !== 66) {
      throw new Error('Invalid Sui address format');
    }
  }

  private buildConfig(network: NetworkType): SuiGrpcConfig {
    const networkConfig = NETWORKS[network];
    if (!networkConfig) {
      throw new Error(`Unknown network: ${network}`);
    }
    return { ...DEFAULT_CONFIG, ...networkConfig };
  }

  private createCredentials(): grpc.ChannelCredentials {
    return this.config.useTls 
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure();
  }

  private createChannelOptions(): grpc.ChannelOptions {
    return {
      'grpc.max_receive_message_length': this.config.maxReceiveMessageLength,
      'grpc.max_send_message_length': this.config.maxSendMessageLength,
      'grpc.keepalive_time_ms': this.config.keepaliveTimeMs,
      'grpc.keepalive_timeout_ms': this.config.keepaliveTimeoutMs,
      'grpc.keepalive_permit_without_calls': 1,
      'grpc.http2.max_pings_without_data': 0,
      'grpc.http2.min_time_between_pings_ms': 10000,
      'grpc.http2.min_ping_interval_without_data_ms': 300000
    };
  }

  private getEndpoint(): string {
    return `${this.config.endpoint}:${this.config.port}`;
  }
}