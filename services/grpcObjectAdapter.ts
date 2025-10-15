import { OwnedObject } from './grpcObjectService'
import { ClassifiedObject, ObjectType, ObjectClassification, BaseObject, WalletObject } from '@/types/objects'

/**
 * Adapter to convert gRPC objects to the format expected by the UI components
 */
export class GrpcObjectAdapter {
  
  /**
   * Converts gRPC OwnedObject array to ClassifiedObject array
   */
  static convertToClassifiedObjects(grpcObjects: OwnedObject[], walletAddress: string): ClassifiedObject[] {
    return grpcObjects.map(grpcObject => this.convertSingleObject(grpcObject, walletAddress))
  }

  /**
   * Converts a single gRPC object to ClassifiedObject
   */
  private static convertSingleObject(grpcObject: OwnedObject, walletAddress: string): ClassifiedObject {
    const baseObject: BaseObject = {
      id: grpcObject.objectId,
      type: grpcObject.type || 'unknown',
      objectType: this.determineObjectType(grpcObject.type),
      name: this.extractName(grpcObject.type),
      description: this.extractDescription(grpcObject.type),
      owner: walletAddress,
      digest: grpcObject.digest,
    }

    const classification = this.classifyObject(baseObject)

    return {
      object: baseObject as WalletObject,
      classification: classification.classification,
      classificationReason: classification.reason,
      riskScore: classification.riskScore,
      isHidden: false
    }
  }

  /**
   * Determines object type based on the type string from gRPC
   */
  private static determineObjectType(typeString?: string): ObjectType {
    if (!typeString) return ObjectType.OBJECT

    const type = typeString.toLowerCase()

    if (type.includes('coin') || type.includes('::sui::sui')) {
      return ObjectType.COIN
    }
    
    if (type.includes('staking') || type.includes('stake')) {
      return ObjectType.STAKED_SUI
    }
    
    if (type.includes('kiosk')) {
      return ObjectType.KIOSK
    }
    
    if (type.includes('package') || type.includes('0x2::package::')) {
      return ObjectType.PACKAGE
    }
    
    // For other objects that might be NFTs, we'll classify them as NFTs if they have certain patterns
    if (this.isLikelyNFT(typeString)) {
      return ObjectType.NFT
    }

    return ObjectType.OBJECT
  }

  /**
   * Determines if an object is likely an NFT based on its type
   */
  private static isLikelyNFT(typeString: string): boolean {
    const nftIndicators = [
      'nft',
      'collectible',
      'token',
      'art',
      'item',
      'card',
      'avatar',
      'character',
      'game',
      'metaverse'
    ]

    const lowerType = typeString.toLowerCase()
    return nftIndicators.some(indicator => lowerType.includes(indicator))
  }

  /**
   * Extracts a human-readable name from the type string
   */
  private static extractName(typeString?: string): string | undefined {
    if (!typeString) return undefined

    // Extract the last part of the type string as name
    const parts = typeString.split('::')
    if (parts.length > 0) {
      const lastName = parts[parts.length - 1]
      // Convert snake_case or camelCase to readable format
      return lastName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^\s+/, '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }

    return typeString
  }

  /**
   * Extracts description from type string
   */
  private static extractDescription(typeString?: string): string | undefined {
    if (!typeString) return undefined
    
    // Provide basic description based on type
    if (typeString.includes('::sui::SUI')) {
      return 'Native SUI coin'
    }
    
    if (typeString.includes('coin')) {
      return 'Cryptocurrency token'
    }
    
    if (typeString.includes('staking')) {
      return 'Staked SUI object'
    }
    
    if (typeString.includes('kiosk')) {
      return 'Trading kiosk object'
    }

    return `Object of type: ${typeString}`
  }

  /**
   * Classifies an object based on its properties
   */
  private static classifyObject(object: BaseObject): {
    classification: ObjectClassification
    reason?: string
    riskScore?: number
  } {
    // Basic classification logic - can be enhanced based on requirements
    
    // SUI coins are generally safe
    if (object.type.includes('::sui::SUI')) {
      return {
        classification: ObjectClassification.VERIFIED,
        reason: 'Native SUI currency',
        riskScore: 0
      }
    }

    // Known system objects
    if (object.type.startsWith('0x2::') || object.type.startsWith('0x3::')) {
      return {
        classification: ObjectClassification.SAFE,
        reason: 'System or framework object',
        riskScore: 10
      }
    }

    // Objects from unknown packages might need more scrutiny
    if (object.type.startsWith('0x')) {
      const packageId = object.type.split('::')[0]
      if (packageId.length !== 66) { // Invalid package ID format
        return {
          classification: ObjectClassification.WARNING,
          reason: 'Invalid package ID format',
          riskScore: 60
        }
      }
    }

    // Default classification for unknown objects
    return {
      classification: ObjectClassification.UNCLASSIFIED,
      reason: 'Object requires manual review',
      riskScore: 30
    }
  }
}