import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'
import { createNetworkConfig } from '@mysten/dapp-kit'
import { createSuiClientWithRateLimitHandling } from '@/lib/ratelimiter'

const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
  mainnet: {
    url: getFullnodeUrl('mainnet'),
    variables: {
      explorerUrl: 'https://suiscan.xyz',
      apiUrl: 'https://api.suiscan.xyz',
    },
  },
  testnet: {
    url: getFullnodeUrl('testnet'),
    variables: {
      explorerUrl: 'https://testnet.suiscan.xyz',
      apiUrl: 'https://api-testnet.suiscan.xyz',
    },
  },
  devnet: {
    url: getFullnodeUrl('devnet'),
    variables: {
      explorerUrl: 'https://devnet.suiscan.xyz',
      apiUrl: 'https://api-devnet.suiscan.xyz',
    },
  },
})

export { networkConfig, useNetworkVariable, useNetworkVariables }

// High-performance client with automatic rate limit handling and endpoint rotation
export const suiClient = createSuiClientWithRateLimitHandling()

export const SUPPORTED_NETWORKS = ['mainnet', 'testnet', 'devnet'] as const
export type Network = typeof SUPPORTED_NETWORKS[number]

export const DEFAULT_NETWORK: Network = 'mainnet'

export const RPC_ENDPOINTS = {
  mainnet: 'https://fullnode.mainnet.sui.io:443',
  testnet: 'https://fullnode.testnet.sui.io:443',
  devnet: 'https://fullnode.devnet.sui.io:443',
} as const