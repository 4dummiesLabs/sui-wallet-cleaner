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