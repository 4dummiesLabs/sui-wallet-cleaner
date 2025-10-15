import { SuiClient, SuiObjectResponse } from '@mysten/sui/client'
import { ClassifiedObject, ObjectType, ObjectClassification, BaseObject, WalletObject, CoinObject, NFTObject } from '@/types/objects'

/**
 * Enhanced object service with better classification and structure
 * Uses REST API with improved object classification logic
 */
export class EnhancedObjectService {
  private client: SuiClient

  constructor(client: SuiClient) {
    this.client = client
  }

  /**
   * Fetches ALL objects owned by a wallet address using pagination
   */
  async fetchWalletObjects(address: string): Promise<ClassifiedObject[]> {
    try {
      console.log(`🔄 Fetching ALL objects for wallet: ${address}`)
      
      let allObjects: SuiObjectResponse[] = []
      let hasNextPage = true
      let cursor: string | null = null
      let pageCount = 0
      const pageSize = 50 // Use reasonable page size for better performance

      while (hasNextPage) {
        pageCount++
        console.log(`📄 Fetching page ${pageCount}${cursor ? ` (cursor: ${cursor.slice(0, 10)}...)` : ''}`)
        
        const response = await this.client.getOwnedObjects({
          owner: address,
          cursor: cursor,
          limit: pageSize,
          options: {
            showContent: true,
            showType: true,
            showOwner: true,
            showPreviousTransaction: true,
            showStorageRebate: true,
            showDisplay: true,
          },
        })

        allObjects.push(...response.data)
        
        // Check if there are more pages
        hasNextPage = response.hasNextPage
        cursor = response.nextCursor || null
        
        console.log(`📊 Page ${pageCount}: +${response.data.length} objects (total: ${allObjects.length})`)
        
        // Safety check to prevent infinite loops
        if (pageCount > 1000) {
          console.warn('⚠️ Reached maximum page limit (1000), stopping pagination')
          break
        }
      }

      console.log(`📦 Total fetched: ${allObjects.length} objects across ${pageCount} pages`)
      
      const objects = allObjects
        .filter((obj): obj is SuiObjectResponse => obj.data !== null)
        .map(obj => this.convertToClassifiedObject(obj, address))
        .filter((obj): obj is ClassifiedObject => obj !== null)

      console.log(`✅ Successfully classified ${objects.length} objects`)
      return objects

    } catch (error) {
      console.error('❌ Error fetching wallet objects:', error)
      throw new Error(`Failed to fetch wallet objects: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Converts a Sui object response to a classified object
   */
  private convertToClassifiedObject(obj: SuiObjectResponse, walletAddress: string): ClassifiedObject | null {
    if (!obj.data) return null

    try {
      const baseObject: BaseObject = {
        id: obj.data.objectId,
        type: obj.data.type || 'unknown',
        objectType: this.determineObjectType(obj.data.type || undefined),
        name: this.extractName(obj.data),
        description: this.extractDescription(obj.data),
        owner: walletAddress,
        digest: obj.data.digest,
        previousTransaction: obj.data.previousTransaction,
        storageRebate: obj.data.storageRebate,
      }

      const classification = this.classifyObject(baseObject, obj)

      return {
        object: baseObject as WalletObject,
        classification: classification.classification,
        classificationReason: classification.reason,
        riskScore: classification.riskScore,
        isHidden: false
      }
    } catch (error) {
      console.warn(`Failed to convert object ${obj.data.objectId}:`, error)
      return null
    }
  }

  /**
   * Enhanced object type determination
   */
  private determineObjectType(typeString?: string): ObjectType {
    if (!typeString) return ObjectType.OBJECT

    const type = typeString.toLowerCase()

    // SUI coins
    if (type.includes('::sui::sui') || type === '0x2::coin::coin<0x2::sui::sui>') {
      return ObjectType.COIN
    }
    
    // Other coins
    if (type.includes('::coin::coin') || type.includes('0x2::coin::')) {
      return ObjectType.COIN
    }
    
    // Staking objects
    if (type.includes('staking_pool') || type.includes('stake') || type.includes('0x3::staking_pool::')) {
      return ObjectType.STAKED_SUI
    }
    
    // Kiosk objects
    if (type.includes('kiosk') || type.includes('0x2::kiosk::')) {
      return ObjectType.KIOSK
    }
    
    // Package objects
    if (type.includes('package') || type.includes('0x2::package::')) {
      return ObjectType.PACKAGE
    }
    
    // NFT-like objects (anything that's not system objects and has content)
    if (!type.startsWith('0x2::') && !type.startsWith('0x3::')) {
      return ObjectType.NFT
    }

    return ObjectType.OBJECT
  }

  /**
   * Extract display name from object data
   */
  private extractName(objectData: any): string | undefined {
    // Try display metadata first
    if (objectData.display?.data?.name) {
      return objectData.display.data.name
    }

    // Try content metadata
    if (objectData.content?.fields?.name) {
      return objectData.content.fields.name
    }

    // Extract from type string
    if (objectData.type) {
      const parts = objectData.type.split('::')
      if (parts.length > 0) {
        const lastName = parts[parts.length - 1]
        return lastName
          .replace(/_/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .replace(/^\s+/, '')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      }
    }

    return undefined
  }

  /**
   * Extract description from object data
   */
  private extractDescription(objectData: any): string | undefined {
    // Try display metadata
    if (objectData.display?.data?.description) {
      return objectData.display.data.description
    }

    // Try content metadata
    if (objectData.content?.fields?.description) {
      return objectData.content.fields.description
    }

    // Provide type-based description
    const type = objectData.type
    if (type?.includes('::sui::SUI')) {
      return 'Native SUI cryptocurrency'
    }
    
    if (type?.includes('::coin::')) {
      const coinType = this.extractCoinType(type)
      return `Cryptocurrency token: ${coinType}`
    }
    
    if (type?.includes('staking')) {
      return 'Staked SUI earning rewards'
    }
    
    if (type?.includes('kiosk')) {
      return 'NFT marketplace kiosk'
    }

    return type ? `Object of type: ${type}` : undefined
  }

  /**
   * Extract coin type from type string
   */
  private extractCoinType(typeString: string): string {
    const match = typeString.match(/coin<(.+)>/i)
    if (match) {
      const coinType = match[1]
      const parts = coinType.split('::')
      return parts[parts.length - 1] || coinType
    }
    return 'Unknown'
  }

  /**
   * Enhanced object classification with risk assessment
   */
  private classifyObject(object: BaseObject, suiObject: SuiObjectResponse): {
    classification: ObjectClassification
    reason?: string
    riskScore?: number
  } {
    // SUI coins are always verified
    if (object.type.includes('::sui::SUI')) {
      return {
        classification: ObjectClassification.VERIFIED,
        reason: 'Native SUI currency',
        riskScore: 0
      }
    }

    // System framework objects are generally safe
    if (object.type.startsWith('0x2::') || object.type.startsWith('0x3::')) {
      return {
        classification: ObjectClassification.SAFE,
        reason: 'System framework object',
        riskScore: 5
      }
    }

    // Well-known coin types
    const knownSafeCoins = [
      'usdc', 'usdt', 'eth', 'btc', 'wormhole'
    ]
    
    const coinType = this.extractCoinType(object.type).toLowerCase()
    if (knownSafeCoins.some(safe => coinType.includes(safe))) {
      return {
        classification: ObjectClassification.VERIFIED,
        reason: 'Well-known cryptocurrency',
        riskScore: 10
      }
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      'test', 'fake', 'scam', 'phishing', 'spam'
    ]
    
    const nameToCheck = (object.name || object.description || object.type).toLowerCase()
    if (suspiciousPatterns.some(pattern => nameToCheck.includes(pattern))) {
      return {
        classification: ObjectClassification.DANGER,
        reason: 'Contains suspicious keywords',
        riskScore: 90
      }
    }

    // Objects from unverified packages need review
    if (object.type.startsWith('0x')) {
      const packageId = object.type.split('::')[0]
      
      // Very short or malformed package IDs are suspicious
      if (packageId.length !== 66) {
        return {
          classification: ObjectClassification.WARNING,
          reason: 'Invalid package ID format',
          riskScore: 70
        }
      }

      // Recent objects might need time to be verified
      return {
        classification: ObjectClassification.UNCLASSIFIED,
        reason: 'Third-party object requiring review',
        riskScore: 40
      }
    }

    // Default classification
    return {
      classification: ObjectClassification.UNCLASSIFIED,
      reason: 'Object requires manual verification',
      riskScore: 30
    }
  }

  /**
   * Get wallet statistics
   */
  async getWalletStats(address: string) {
    const objects = await this.fetchWalletObjects(address)
    
    const stats = {
      total: objects.length,
      byType: {} as Record<ObjectType, number>,
      byClassification: {} as Record<ObjectClassification, number>,
    }

    // Initialize counters
    Object.values(ObjectType).forEach(type => {
      stats.byType[type] = 0
    })
    
    Object.values(ObjectClassification).forEach(classification => {
      stats.byClassification[classification] = 0
    })

    // Count objects
    objects.forEach(obj => {
      stats.byType[obj.object.objectType]++
      stats.byClassification[obj.classification]++
    })

    return stats
  }
}