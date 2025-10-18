import { SuiClient } from '@mysten/sui/client'
import { Transaction } from '@mysten/sui/transactions'
import { WalletObject, ObjectType, CoinObject, NFTObject } from '@/types/objects'
import { suiSponsorship, GasStationError } from '@3mate/gas-station-sdk'
import { toHex, fromHex, toBase64 } from '@mysten/sui/utils'

// Gas Station Configuration - Always enabled
const GAS_STATION_API_KEY = process.env.NEXT_PUBLIC_GAS_STATION_API_KEY || ''
const GAS_STATION_NETWORK = (process.env.NEXT_PUBLIC_GAS_STATION_NETWORK || 'mainnet') as 'mainnet' | 'testnet'

if (!GAS_STATION_API_KEY) {
  console.warn('⚠️ Gas Station API key is not configured. Set NEXT_PUBLIC_GAS_STATION_API_KEY in your .env file.')
}

console.log('🚀 Gas Station Configuration:', {
  network: GAS_STATION_NETWORK,
  hasApiKey: !!GAS_STATION_API_KEY,
  apiKeyPrefix: GAS_STATION_API_KEY ? GAS_STATION_API_KEY.substring(0, 20) + '...' : 'not set',
  usingProxy: true
})

export interface TransferOptions {
  objects: WalletObject[]
  recipient: string
  senderAddress: string
}

export interface BurnOptions {
  objects: WalletObject[]
  senderAddress: string
}

export interface TransactionResult {
  success: boolean
  digest?: string
  error?: string
  effects?: any
}

export class TransactionService {
  private client: SuiClient

  constructor(client: SuiClient) {
    this.client = client
  }

  async transferObjects(
    options: TransferOptions,
    signAndExecute: any
  ): Promise<TransactionResult> {
    try {
      const tx = new Transaction()

      // Group objects by type for different transfer methods
      const coins: CoinObject[] = []
      const nfts: NFTObject[] = []
      const others: WalletObject[] = []

      for (const obj of options.objects) {
        if (obj.objectType === ObjectType.COIN) {
          coins.push(obj as CoinObject)
        } else if (obj.objectType === ObjectType.NFT) {
          nfts.push(obj as NFTObject)
        } else {
          others.push(obj)
        }
      }

      // Batch all objects together for efficient transfer
      const allObjectIds = [
        ...coins.filter(coin => Number(coin.balance) > 0).map(coin => coin.id),
        ...nfts.map(nft => nft.id),
        ...others.map(obj => obj.id)
      ]

      if (allObjectIds.length > 0) {
        // Split into batches of 100 for safety
        const BATCH_SIZE = 100

        for (let i = 0; i < allObjectIds.length; i += BATCH_SIZE) {
          const batch = allObjectIds.slice(i, i + BATCH_SIZE)
          tx.transferObjects(batch, options.recipient)
        }
      }

      // Set sender
      tx.setSender(options.senderAddress)

      // Always use sponsored transactions via Gas Station
      return await this.executeSponsoredTransaction(tx, options.senderAddress, signAndExecute)
    } catch (error) {
      console.error('Transfer failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transfer failed',
      }
    }
  }

  async burnObjects(
    options: BurnOptions,
    signAndExecute: any
  ): Promise<TransactionResult> {
    try {
      const tx = new Transaction()

      // For burning, we'll send objects to a burn address
      // Using the well-known burn address: 0x0000000000000000000000000000000000000000000000000000000000000000
      const BURN_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000'

      // Group objects by type
      const transferableObjects: string[] = []
      const coinsToMergeAndBurn: CoinObject[] = []

      for (const obj of options.objects) {
        if (obj.objectType === ObjectType.COIN) {
          const coin = obj as CoinObject
          if (Number(coin.balance) > 0) {
            coinsToMergeAndBurn.push(coin)
          }
        } else {
          // NFTs and other objects can be transferred to burn address
          transferableObjects.push(obj.id)
        }
      }

      // Batch all objects together for efficient burning
      const allObjectIds = [
        ...coinsToMergeAndBurn.map(coin => coin.id),
        ...transferableObjects
      ]

      if (allObjectIds.length > 0) {
        // Sui supports batching up to ~512 objects per transferObjects call
        // Split into batches of 100 for safety
        const BATCH_SIZE = 100

        for (let i = 0; i < allObjectIds.length; i += BATCH_SIZE) {
          const batch = allObjectIds.slice(i, i + BATCH_SIZE)
          tx.transferObjects(batch, BURN_ADDRESS)
        }
      }

      // Set sender
      tx.setSender(options.senderAddress)

      // Always use sponsored transactions via Gas Station
      return await this.executeSponsoredTransaction(tx, options.senderAddress, signAndExecute)
    } catch (error) {
      console.error('Burn failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Burn failed',
      }
    }
  }

  private async executeSponsoredTransaction(
    tx: Transaction,
    senderAddress: string,
    signTransaction: any
  ): Promise<TransactionResult> {
    try {
      console.log('Sponsoring transaction with Gas Station...')

      // Build transaction WITHOUT gas payment for sponsorship
      const txBytes = await tx.build({
        client: this.client,
        onlyTransactionKind: true, // Critical for sponsorship!
      })

      const rawTxBytesHex = toHex(txBytes)

      // Request sponsorship from Gas Station
      console.log('Requesting sponsorship...', {
        network: GAS_STATION_NETWORK,
        sender: senderAddress,
        apiKeyPresent: !!GAS_STATION_API_KEY,
      })

      let sponsorResponse
      try {
        console.log('Calling Gas Station API via proxy...', {
          network: GAS_STATION_NETWORK,
          txBytesLength: rawTxBytesHex.length,
        })

        // Use our Next.js API proxy to avoid CORS issues
        const response = await fetch('/api/gas-station/sponsor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: GAS_STATION_API_KEY,
            rawTxBytesHex,
            sender: senderAddress,
            network: GAS_STATION_NETWORK,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new GasStationError(
            errorData.error || errorData.message || `Sponsorship failed (${response.status})`,
            response.status,
            errorData
          )
        }

        sponsorResponse = await response.json()
        console.log('✅ Sponsorship successful!')
      } catch (sponsorError: any) {
        console.error('❌ Sponsorship error:', sponsorError)
        console.error('Error details:', {
          message: sponsorError.message,
          statusCode: sponsorError.statusCode,
          details: sponsorError.details,
        })

        let errorMessage = sponsorError.message || 'Sponsorship failed'
        if (sponsorError instanceof GasStationError) {
          errorMessage = `Gas Station Error (${sponsorError.statusCode}): ${sponsorError.message}`
        }

        // Provide helpful error messages
        if (errorMessage.includes('404')) {
          errorMessage = `Gas Station API not found. Please verify:
- API Key is valid for ${GAS_STATION_NETWORK}
- Network setting is correct: ${GAS_STATION_NETWORK}
- Gas Station service is operational

Original error: ${sponsorError.message}`
        } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
          errorMessage = `Authentication failed. Please verify:
- API Key is correct: ${GAS_STATION_API_KEY.substring(0, 20)}...
- API Key has permission for ${GAS_STATION_NETWORK}

Original error: ${sponsorError.message}`
        }

        throw new Error(errorMessage)
      }

      const { txBytesHex, sponsorSignature } = sponsorResponse
      const sponsoredBytes = fromHex(txBytesHex)

      // Sign with wallet
      console.log('Requesting user signature...')
      const userSignature = await signTransaction({ transaction: toBase64(sponsoredBytes) })
      console.log('✅ User signature received:', userSignature)

      console.log('Executing sponsored transaction...')
      console.log('Sponsored bytes length:', sponsoredBytes.length)
      console.log('User signature:', userSignature.signature.substring(0, 20) + '...')
      console.log('Sponsor signature:', sponsorSignature.substring(0, 20) + '...')

      // Execute transaction with both signatures
      const result = await this.client.executeTransactionBlock({
        transactionBlock: sponsoredBytes,
        signature: [userSignature.signature, sponsorSignature],
        options: {
          showEffects: true,
          showEvents: true,
        },
      })

      console.log('✅ Transaction executed successfully!', result.digest)
      console.log('Transaction effects:', result.effects)

      return {
        success: true,
        digest: result.digest,
        effects: result.effects,
      }
    } catch (error) {
      console.error('❌ Sponsored transaction failed:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }
      throw error
    }
  }

  async estimateGas(
    transaction: Transaction,
    senderAddress: string
  ): Promise<{ totalGas: string; error?: string }> {
    try {
      transaction.setSender(senderAddress)
      const dryRun = await this.client.dryRunTransactionBlock({
        transactionBlock: await transaction.build({ client: this.client }),
      })

      const totalGas = dryRun.effects.gasUsed.computationCost
      return { totalGas }
    } catch (error) {
      return {
        totalGas: '0',
        error: error instanceof Error ? error.message : 'Failed to estimate gas',
      }
    }
  }

  // Validate if address is a valid Sui address
  isValidSuiAddress(address: string): boolean {
    try {
      // Sui addresses are 32 bytes, typically represented as 0x followed by 64 hex characters
      const normalizedAddress = address.toLowerCase()
      
      // Check if it starts with 0x and has correct length
      if (!normalizedAddress.startsWith('0x')) {
        return false
      }
      
      const hexPart = normalizedAddress.slice(2)
      
      // Should be exactly 64 hex characters (32 bytes)
      if (hexPart.length !== 64) {
        return false
      }
      
      // Check if all characters are valid hex
      return /^[0-9a-f]{64}$/.test(hexPart)
    } catch {
      return false
    }
  }

  // Generate a random burn address for safer burning
  generateBurnAddress(): string {
    // Generate a deterministic but safe burn address
    // This is safer than using 0x0 as it's clearly identifiable as a burn address
    return '0x000000000000000000000000000000000000000000000000000000000000dead'
  }
}