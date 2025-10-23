import * as grpc from '@grpc/grpc-js';
import { LedgerServiceClient } from './generated/sui/rpc/v2beta2/ledger_service_grpc_pb';
import * as ledger_pb from './generated/sui/rpc/v2beta2/ledger_service_pb';

/**
 * Configuration options for the Sui gRPC client.
 */
export interface SuiGrpcConfig {
  /** The hostname or IP address of the Sui node */
  readonly endpoint: string;
  /** The port number for the gRPC service */
  readonly port: number;
  /** Whether to use TLS encryption */
  readonly useTls: boolean;
  /** Maximum size in bytes for received messages */
  readonly maxReceiveMessageLength?: number;
  /** Maximum size in bytes for sent messages */
  readonly maxSendMessageLength?: number;
  /** Keepalive time in milliseconds */
  readonly keepaliveTimeMs?: number;
  /** Keepalive timeout in milliseconds */
  readonly keepaliveTimeoutMs?: number;
  /** Retry policy configuration */
  readonly retryPolicy?: RetryPolicy;
}

/**
 * Configuration for automatic retry behavior.
 */
export interface RetryPolicy {
  /** Maximum number of retry attempts */
  readonly maxRetries: number;
  /** Initial backoff delay in milliseconds */
  readonly initialBackoffMs: number;
  /** Maximum backoff delay in milliseconds */
  readonly maxBackoffMs: number;
  /** Multiplier for exponential backoff */
  readonly backoffMultiplier: number;
}

/**
 * Predefined network configurations.
 */
export type NetworkType = 'mainnet' | 'testnet' | 'devnet' | 'localnet';

/**
 * Default configuration for the Sui gRPC client.
 */
export const DEFAULT_CONFIG: SuiGrpcConfig = {
  endpoint: 'fullnode.mainnet.sui.io',
  port: 443,
  useTls: true,
  maxReceiveMessageLength: 100 * 1024 * 1024, // 100MB
  maxSendMessageLength: 100 * 1024 * 1024, // 100MB
  keepaliveTimeMs: 30000,
  keepaliveTimeoutMs: 5000,
  retryPolicy: {
    maxRetries: 3,
    initialBackoffMs: 1000,
    maxBackoffMs: 10000,
    backoffMultiplier: 2
  }
};

/**
 * Network endpoint configurations.
 */
export const NETWORKS: Record<NetworkType, Partial<SuiGrpcConfig>> = {
  mainnet: {
    endpoint: 'fullnode.mainnet.sui.io',
    port: 443,
    useTls: true
  },
  testnet: {
    endpoint: 'fullnode.testnet.sui.io',
    port: 443,
    useTls: true
  },
  devnet: {
    endpoint: 'fullnode.devnet.sui.io',
    port: 443,
    useTls: true
  },
  localnet: {
    endpoint: 'localhost',
    port: 9184,
    useTls: false
  }
};

/**
 * Production-ready gRPC client for Sui blockchain.
 * 
 * Provides type-safe access to Sui's gRPC services with automatic retry logic,
 * connection management, and error handling.
 * 
 * @example
 * ```typescript
 * const client = new SuiGrpcClient('mainnet');
 * try {
 *   const info = await client.getServiceInfo();
 *   console.log('Connected to:', info.getChain());
 * } finally {
 *   client.close();
 * }
 * ```
 */
export class SuiGrpcClient {
  private readonly config: SuiGrpcConfig;
  private readonly credentials: grpc.ChannelCredentials;
  private readonly options: grpc.ChannelOptions;
  private readonly client: LedgerServiceClient;

  /**
   * Creates a new Sui gRPC client instance.
   * 
   * @param config - Network name or custom configuration object
   * @throws {Error} When the configuration is invalid
   */
  constructor(config?: Partial<SuiGrpcConfig> | NetworkType) {
    this.config = this.buildConfig(config);
    this.credentials = this.createCredentials();
    this.options = this.createChannelOptions();
    this.client = new LedgerServiceClient(
      this.getEndpoint(),
      this.credentials,
      this.options
    );
  }

  /**
   * Retrieves general information about the Sui service.
   * 
   * @returns Promise resolving to service information
   * @throws {grpc.ServiceError} When the request fails
   */
  public async getServiceInfo(): Promise<ledger_pb.GetServiceInfoResponse> {
    return this.withRetry(async () => {
      return new Promise<ledger_pb.GetServiceInfoResponse>((resolve, reject) => {
        const request = new ledger_pb.GetServiceInfoRequest();
        this.client.getServiceInfo(request, (error, response) => {
          if (error) {
            reject(error);
          } else if (response) {
            resolve(response);
          } else {
            reject(new Error('No response received from service'));
          }
        });
      });
    });
  }

  /**
   * Retrieves an object by its ID.
   * 
   * @param objectId - The object identifier
   * @returns Promise resolving to the object data
   * @throws {grpc.ServiceError} When the request fails
   */
  public async getObject(objectId: string): Promise<ledger_pb.GetObjectResponse> {
    if (!objectId || typeof objectId !== 'string') {
      throw new Error('Object ID must be a non-empty string');
    }

    return this.withRetry(async () => {
      return new Promise<ledger_pb.GetObjectResponse>((resolve, reject) => {
        const request = new ledger_pb.GetObjectRequest();
        request.setObjectId(objectId);
        
        this.client.getObject(request, (error, response) => {
          if (error) {
            reject(error);
          } else if (response) {
            resolve(response);
          } else {
            reject(new Error('No response received from service'));
          }
        });
      });
    });
  }

  /**
   * Retrieves a transaction by its digest.
   * 
   * @param digest - The transaction digest (Base58 encoded)
   * @returns Promise resolving to the transaction data
   * @throws {grpc.ServiceError} When the request fails
   */
  public async getTransaction(digest: string): Promise<ledger_pb.GetTransactionResponse> {
    if (!digest || typeof digest !== 'string') {
      throw new Error('Transaction digest must be a non-empty string');
    }

    return this.withRetry(async () => {
      return new Promise<ledger_pb.GetTransactionResponse>((resolve, reject) => {
        const request = new ledger_pb.GetTransactionRequest();
        request.setDigest(digest);
        
        this.client.getTransaction(request, (error, response) => {
          if (error) {
            reject(error);
          } else if (response) {
            resolve(response);
          } else {
            reject(new Error('No response received from service'));
          }
        });
      });
    });
  }

  /**
   * Retrieves a checkpoint by its sequence number.
   * 
   * @param sequenceNumber - The checkpoint sequence number
   * @returns Promise resolving to the checkpoint data
   * @throws {grpc.ServiceError} When the request fails
   */
  public async getCheckpoint(sequenceNumber: number): Promise<ledger_pb.GetCheckpointResponse> {
    if (!Number.isInteger(sequenceNumber) || sequenceNumber < 0) {
      throw new Error('Sequence number must be a non-negative integer');
    }

    return this.withRetry(async () => {
      return new Promise<ledger_pb.GetCheckpointResponse>((resolve, reject) => {
        const request = new ledger_pb.GetCheckpointRequest();
        request.setSequenceNumber(sequenceNumber);
        
        this.client.getCheckpoint(request, (error, response) => {
          if (error) {
            reject(error);
          } else if (response) {
            resolve(response);
          } else {
            reject(new Error('No response received from service'));
          }
        });
      });
    });
  }

  /**
   * Closes the gRPC connection and releases resources.
   * 
   * This method should always be called when the client is no longer needed
   * to prevent resource leaks.
   */
  public close(): void {
    this.client.close();
  }

  /**
   * Executes an operation with automatic retry logic.
   * 
   * @param operation - The operation to execute
   * @param maxRetries - Maximum number of retry attempts
   * @returns Promise resolving to the operation result
   * @private
   */
  private async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = this.config.retryPolicy?.maxRetries || 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries || !this.isRetryableError(error as grpc.ServiceError)) {
          throw lastError;
        }

        const backoffMs = Math.min(
          (this.config.retryPolicy?.initialBackoffMs || 1000) * 
          Math.pow(this.config.retryPolicy?.backoffMultiplier || 2, attempt),
          this.config.retryPolicy?.maxBackoffMs || 10000
        );

        await this.delay(backoffMs);
      }
    }

    throw lastError!;
  }

  /**
   * Determines if an error is retryable.
   * 
   * @param error - The gRPC error to check
   * @returns True if the error should be retried
   * @private
   */
  private isRetryableError(error: grpc.ServiceError): boolean {
    const retryableCodes = [
      grpc.status.UNAVAILABLE,
      grpc.status.DEADLINE_EXCEEDED,
      grpc.status.RESOURCE_EXHAUSTED,
      grpc.status.ABORTED
    ];
    
    return retryableCodes.includes(error.code);
  }

  /**
   * Creates a delay for the specified duration.
   * 
   * @param ms - Delay duration in milliseconds
   * @returns Promise that resolves after the delay
   * @private
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Builds the final configuration from input parameters.
   * 
   * @param config - Input configuration
   * @returns Complete configuration object
   * @private
   */
  private buildConfig(config?: Partial<SuiGrpcConfig> | NetworkType): SuiGrpcConfig {
    if (typeof config === 'string') {
      const networkConfig = NETWORKS[config];
      if (!networkConfig) {
        throw new Error(`Unknown network: ${config}`);
      }
      return { ...DEFAULT_CONFIG, ...networkConfig };
    }
    
    return { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Creates gRPC channel credentials.
   * 
   * @returns Channel credentials instance
   * @private
   */
  private createCredentials(): grpc.ChannelCredentials {
    return this.config.useTls 
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure();
  }

  /**
   * Creates gRPC channel options.
   * 
   * @returns Channel options object
   * @private
   */
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

  /**
   * Gets the complete endpoint URL.
   * 
   * @returns The endpoint URL
   * @private
   */
  private getEndpoint(): string {
    return `${this.config.endpoint}:${this.config.port}`;
  }
}