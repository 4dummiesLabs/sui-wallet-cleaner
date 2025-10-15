import { SuiClient } from '@mysten/sui/client'
import { Transaction } from '@mysten/sui/transactions'
import { WalletObject, ObjectType, CoinObject, NFTObject } from '@/types/objects'
// Type for transaction execution function

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
    signAndExecute: (transaction: any) => Promise<any>
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

      // Transfer coins
      for (const coin of coins) {
        if (Number(coin.balance) > 0) {
          // For coins, we need to split or transfer the coin object
          tx.transferObjects([coin.id], options.recipient)
        }
      }

      // Transfer NFTs and other objects
      const objectsToTransfer = [...nfts, ...others].map(obj => obj.id)
      if (objectsToTransfer.length > 0) {
        tx.transferObjects(objectsToTransfer, options.recipient)
      }

      // Set sender
      tx.setSender(options.senderAddress)

      // Execute transaction
      const result = await signAndExecute({
        transaction: tx,
        requestType: 'WaitForLocalExecution',
        options: {
          showEffects: true,
          showEvents: true,
        },
      })

      return {
        success: true,
        digest: result.digest,
        effects: result.effects,
      }
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
    signAndExecute: (transaction: any) => Promise<any>
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

      // Handle coin burning by transferring to burn address
      for (const coin of coinsToMergeAndBurn) {
        tx.transferObjects([coin.id], BURN_ADDRESS)
      }

      // Transfer other objects to burn address
      if (transferableObjects.length > 0) {
        tx.transferObjects(transferableObjects, BURN_ADDRESS)
      }

      // Set sender
      tx.setSender(options.senderAddress)

      // Execute transaction
      const result = await signAndExecute({
        transaction: tx,
        requestType: 'WaitForLocalExecution',
        options: {
          showEffects: true,
          showEvents: true,
        },
      })

      return {
        success: true,
        digest: result.digest,
        effects: result.effects,
      }
    } catch (error) {
      console.error('Burn failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Burn failed',
      }
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