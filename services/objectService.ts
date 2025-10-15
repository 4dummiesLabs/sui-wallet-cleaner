import { SuiClient, SuiObjectResponse } from '@mysten/sui/client'
import { 
  WalletObject, 
  ObjectType, 
  ObjectClassification, 
  ClassifiedObject,
  CoinObject,
  NFTObject,
  StakedSuiObject,
  KioskObject,
  BaseObject
} from '@/types/objects'
import { CoinMetadataService } from './coinMetadataService'

interface VerifiedPackage {
  packageId: string
  name: string
  category: 'official' | 'community' | 'partner' | 'defi'
  description?: string
}

export class ObjectService {
  private client: SuiClient
  private coinMetadataService: CoinMetadataService

  constructor(client: SuiClient) {
    this.client = client
    this.coinMetadataService = new CoinMetadataService(client)
  }

  async fetchWalletObjects(
    address: string, 
    options: {
      chunkSize?: number
      maxObjects?: number
      onProgress?: (loaded: number, total?: number) => void
    } = {}
  ): Promise<WalletObject[]> {
    const { chunkSize = 50, maxObjects, onProgress } = options
    const objects: WalletObject[] = []
    let cursor: string | null | undefined = null
    let hasNextPage = true
    let totalLoaded = 0

    // First pass to get total count (optional, for progress tracking)
    let estimatedTotal: number | undefined

    while (hasNextPage) {
      const response = await this.client.getOwnedObjects({
        owner: address,
        cursor,
        limit: chunkSize,
        options: {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: true,
          showContent: true,
        },
      })

      // Process objects in chunks
      const chunkObjects: WalletObject[] = []
      for (const obj of response.data) {
        if (obj.data && !obj.error) {
          const parsedObject = await this.parseObject(obj)
          if (parsedObject) {
            chunkObjects.push(parsedObject)
          }
        }
        
        // Check max objects limit
        if (maxObjects && totalLoaded + chunkObjects.length >= maxObjects) {
          const remaining = maxObjects - totalLoaded
          objects.push(...chunkObjects.slice(0, remaining))
          totalLoaded += remaining
          onProgress?.(totalLoaded, estimatedTotal)
          return objects
        }
      }

      objects.push(...chunkObjects)
      totalLoaded += chunkObjects.length
      
      // Report progress
      onProgress?.(totalLoaded, estimatedTotal)

      // Add small delay between chunks for better UX
      if (response.hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      hasNextPage = response.hasNextPage
      cursor = response.nextCursor
      
      // Safety check to prevent infinite loops
      if (totalLoaded > 10000) {
        console.warn('Stopping object fetch at 10,000 objects to prevent memory issues')
        break
      }
    }

    return objects
  }

  // Alternative streaming method for very large wallets
  async *streamWalletObjects(
    address: string,
    chunkSize: number = 50
  ): AsyncGenerator<WalletObject[], void, unknown> {
    let cursor: string | null | undefined = null
    let hasNextPage = true

    while (hasNextPage) {
      const response = await this.client.getOwnedObjects({
        owner: address,
        cursor,
        limit: chunkSize,
        options: {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: true,
          showContent: true,
        },
      })

      const chunkObjects: WalletObject[] = []
      for (const obj of response.data) {
        if (obj.data && !obj.error) {
          const parsedObject = await this.parseObject(obj)
          if (parsedObject) {
            chunkObjects.push(parsedObject)
          }
        }
      }

      if (chunkObjects.length > 0) {
        yield chunkObjects
      }

      hasNextPage = response.hasNextPage
      cursor = response.nextCursor
      
      // Add small delay between chunks
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  }

  private async parseObject(obj: SuiObjectResponse): Promise<WalletObject | null> {
    if (!obj.data) return null

    const { objectId, type, owner, previousTransaction, storageRebate, digest, content } = obj.data
    const display = obj.data.display?.data

    if (!type) return null

    const baseObject = {
      id: objectId,
      type,
      owner: typeof owner === 'object' && owner !== null && 'AddressOwner' in owner 
        ? owner.AddressOwner 
        : typeof owner === 'string' 
        ? owner 
        : '',
      digest,
      previousTransaction: previousTransaction || undefined,
      storageRebate: storageRebate || undefined,
    }

    if (this.isCoin(type)) {
      return await this.parseCoinObject(baseObject, content, type)
    } else if (this.isStakedSui(type)) {
      return this.parseStakedSuiObject(baseObject, content)
    } else if (this.isKiosk(type)) {
      return this.parseKioskObject(baseObject, content)
    } else if (this.isNFT(obj)) {
      return this.parseNFTObject(baseObject, display, type, content)
    } else {
      return {
        ...baseObject,
        objectType: ObjectType.OBJECT,
        name: display?.name || 'Unknown Object',
        description: display?.description,
      }
    }
  }

  private isCoin(type: string): boolean {
    return type.startsWith('0x2::coin::Coin<')
  }

  private isStakedSui(type: string): boolean {
    return type.includes('staked_sui') || type.includes('StakedSui')
  }

  private isKiosk(type: string): boolean {
    return type.includes('kiosk') || type.includes('Kiosk')
  }

  private isNFT(obj: SuiObjectResponse): boolean {
    if (!obj.data) return false
    
    const type = obj.data.type || ''
    const hasDisplay = !!(obj.data.display && obj.data.display.data)
    
    return !this.isCoin(type) && 
           !this.isKiosk(type) && 
           !this.isStakedSui(type) && 
           (hasDisplay || this.isPotentialNFT(type))
  }

  private isPotentialNFT(type: string): boolean {
    const nftPatterns = ['nft', 'collectible', 'artwork', 'token', 'card', 'hero', 'avatar']
    return nftPatterns.some(pattern => type.toLowerCase().includes(pattern))
  }

  private async parseCoinObject(base: any, content: any, type: string): Promise<CoinObject> {
    const coinType = this.extractCoinType(type)
    const balance = content?.fields?.balance || '0'
    
    const metadata = await this.coinMetadataService.getCoinMetadata(coinType)
    
    return {
      ...base,
      objectType: ObjectType.COIN,
      coinType,
      balance,
      symbol: metadata.symbol,
      decimals: metadata.decimals,
      name: metadata.name,
      iconUrl: metadata.iconUrl,
      priceUsd: metadata.coingeckoId ? await this.coinMetadataService.getCoinPrice(metadata.coingeckoId) || undefined : undefined,
    }
  }

  private extractCoinType(type: string): string {
    const match = type.match(/0x2::coin::Coin<(.+)>/)
    return match ? match[1] : type
  }


  private parseStakedSuiObject(base: any, content: any): StakedSuiObject {
    return {
      ...base,
      objectType: ObjectType.STAKED_SUI,
      principal: content?.fields?.principal || '0',
      stakingPool: content?.fields?.pool_id || '',
      estimatedReward: content?.fields?.estimated_reward,
      name: 'Staked SUI',
    }
  }

  private parseKioskObject(base: any, content: any): KioskObject {
    return {
      ...base,
      objectType: ObjectType.KIOSK,
      itemCount: content?.fields?.item_count || 0,
      profits: content?.fields?.profits,
      name: 'Kiosk',
    }
  }

  private parseNFTObject(base: any, display: any, type: string, content: any): NFTObject {
    const packageId = this.extractPackageId(type)
    const moduleName = this.extractModuleName(type)

    return {
      ...base,
      objectType: ObjectType.NFT,
      name: display?.name || display?.title || 'Unnamed NFT',
      description: display?.description,
      imageUrl: this.processImageUrl(display?.image_url || display?.image),
      projectUrl: display?.project_url || display?.link,
      creator: display?.creator,
      packageId,
      moduleName,
      content,
    }
  }

  private extractPackageId(type: string): string {
    const match = type.match(/^(0x[a-f0-9]+)::/i)
    return match ? match[1] : ''
  }

  private extractModuleName(type: string): string {
    const match = type.match(/::([^:]+)::/i)
    return match ? match[1] : ''
  }

  private processImageUrl(url?: string): string | undefined {
    if (!url) return undefined
    
    if (url.startsWith('ipfs://')) {
      return `https://ipfs.io/ipfs/${url.slice(7)}`
    }
    
    return url
  }

  classifyObjects(objects: WalletObject[]): ClassifiedObject[] {
    return objects.map(obj => this.classifyObject(obj))
  }

  private classifyObject(obj: WalletObject): ClassifiedObject {
    let classification = ObjectClassification.UNCLASSIFIED
    let classificationReason = ''
    let riskScore = 0

    if (obj.objectType === ObjectType.COIN) {
      const coin = obj as CoinObject
      if (this.isVerifiedCoin(coin.coinType)) {
        classification = ObjectClassification.VERIFIED
        classificationReason = 'Verified coin'
      } else if (this.isSuspiciousCoin(coin)) {
        classification = ObjectClassification.WARNING
        classificationReason = 'Unknown or suspicious coin'
        riskScore = 60
      } else {
        classification = ObjectClassification.SAFE
        classificationReason = 'Standard coin'
      }
    } else if (obj.objectType === ObjectType.NFT) {
      const nft = obj as NFTObject
      if (this.isVerifiedNFT(nft.packageId)) {
        classification = ObjectClassification.VERIFIED
        classificationReason = 'From verified collection'
      } else if (this.hasScamIndicators(nft)) {
        classification = ObjectClassification.DANGER
        classificationReason = 'Suspicious patterns detected'
        riskScore = 80
      } else if (this.isDubious(nft)) {
        classification = ObjectClassification.WARNING
        classificationReason = 'Unknown origin or incomplete metadata'
        riskScore = 40
      } else {
        classification = ObjectClassification.SAFE
        classificationReason = 'Standard NFT'
      }
    } else if (obj.objectType === ObjectType.STAKED_SUI) {
      classification = ObjectClassification.VERIFIED
      classificationReason = 'Official staking position'
    } else if (obj.objectType === ObjectType.KIOSK) {
      classification = ObjectClassification.SAFE
      classificationReason = 'Kiosk storage'
    } else {
      classification = ObjectClassification.UNCLASSIFIED
      classificationReason = 'Unknown object type'
    }

    return {
      object: obj,
      classification,
      classificationReason,
      riskScore,
    }
  }

  private isVerifiedCoin(coinType: string): boolean {
    const verifiedCoins = [
      '0x2::sui::SUI',
      '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN', // USDC
      '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN', // USDT
    ]
    return verifiedCoins.includes(coinType)
  }

  private isSuspiciousCoin(coin: CoinObject): boolean {
    return coin.balance === '0' || !coin.symbol || coin.symbol === 'UNKNOWN'
  }

  private isVerifiedNFT(packageId: string): boolean {
    return verifiedPackages.some(pkg => 
      pkg.packageId.toLowerCase() === packageId.toLowerCase()
    )
  }

  private hasScamIndicators(nft: NFTObject): boolean {
    const scamKeywords = ['airdrop', 'free', 'claim', 'reward', 'giveaway', 'winner', 'urgent']
    const name = (nft.name || '').toLowerCase()
    const description = (nft.description || '').toLowerCase()

    return scamKeywords.some(keyword => 
      name.includes(keyword) || description.includes(keyword)
    )
  }

  private isDubious(nft: NFTObject): boolean {
    return !nft.imageUrl || !nft.name || nft.name === 'Unnamed NFT'
  }
}

export const verifiedPackages: VerifiedPackage[] = [
  {
    packageId: '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
    name: 'Suifrens',
    category: 'official',
    description: 'Official Sui mascot NFT collection'
  },
  {
    packageId: '0xee496a0cc04d06a345982ba6697c90c619020de9e274408c7819f787ff66e1a1',
    name: 'Suifrens Accessories',
    category: 'official',
  },
  {
    packageId: '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab',
    name: 'Prime Machin',
    category: 'community',
  },
  {
    packageId: '0x034170936ab6edc09e7c45e9e060a0e40386e35f062151b77b8103be5e978e64',
    name: 'Fuddies',
    category: 'community',
  },
  {
    packageId: '0x2::sui',
    name: 'Sui Framework',
    category: 'official',
    description: 'Core Sui framework'
  },
  {
    packageId: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
    name: 'USDC',
    category: 'defi',
    description: 'Circle USDC on Sui'
  },
]