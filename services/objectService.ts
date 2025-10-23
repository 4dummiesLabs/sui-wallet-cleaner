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

    // First pass: Collect all object IDs quickly
    const allObjectIds: string[] = []
    while (hasNextPage) {
      const response = await this.client.getOwnedObjects({
        owner: address,
        cursor,
        limit: chunkSize,
        options: {
          showType: true,
        },
      })

      allObjectIds.push(...response.data.map(obj => obj.data?.objectId).filter(Boolean) as string[])

      hasNextPage = response.hasNextPage
      cursor = response.nextCursor
    }

    const totalObjects = allObjectIds.length
    console.log(`📦 Found ${totalObjects} objects to fetch`)

    // Second pass: Fetch objects in parallel batches
    const BATCH_SIZE = 50 // Objects per batch
    const CONCURRENT_BATCHES = 10 // Process 10 batches simultaneously

    let processedCount = 0

    for (let i = 0; i < allObjectIds.length; i += BATCH_SIZE * CONCURRENT_BATCHES) {
      // Create batches
      const batches: string[][] = []
      for (let j = 0; j < CONCURRENT_BATCHES; j++) {
        const startIdx = i + (j * BATCH_SIZE)
        if (startIdx >= allObjectIds.length) break

        const batch = allObjectIds.slice(startIdx, startIdx + BATCH_SIZE)
        if (batch.length > 0) {
          batches.push(batch)
        }
      }

      // Process all batches in parallel
      const batchResults = await Promise.allSettled(
        batches.map(batch => this.fetchObjectBatch(batch))
      )

      // Collect results
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          objects.push(...result.value)
          processedCount += result.value.length
        } else {
          console.error('Batch fetch failed:', result.reason)
        }
      }

      // Report progress
      if (onProgress) {
        onProgress(processedCount, totalObjects)
      }

      console.log(`⏳ Progress: ${processedCount}/${totalObjects} objects (${Math.round(processedCount / totalObjects * 100)}%)`)
    }

    console.log(`✅ Fetched ${objects.length} objects`)
    return objects
  }

  private async fetchObjectBatch(objectIds: string[]): Promise<WalletObject[]> {
    try {
      const response = await this.client.multiGetObjects({
        ids: objectIds,
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
    
    return false
  }

  private isPotentialNFT(type: string): boolean {
    // Common NFT-related keywords in type names
    const nftPatterns = [
      'nft', 'collectible', 'artwork', 'token', 'card', 
      'hero', 'avatar', 'badge', 'ticket', 'pass', 'item',
      'character', 'pet', 'warrior', 'creature', 'asset'
    ]
    const lowerType = type.toLowerCase()
    return nftPatterns.some(pattern => lowerType.includes(pattern))
  }
  
  private isKnownNFTType(type: string): boolean {
    // Known Sui NFT collection patterns (similar to SuiVision)
    const knownNFTPatterns = [
      // Popular Sui NFT projects
      '::suifrens::',
      '::capy::',
      '::prime_machin::',
      '::fuddies::',
      '::egg::',
      '::cosmocadia::',
      '::souffl::',
      '::bluemove::',
      '::keepsake::',
      '::clutchy::',
      '::tocen::',
      '::typus_nft::',
      '::aart::',
      '::studio_mirai::',
      '::suilend::',
      
      // Common NFT module names
      '::collection::',
      '::nft::',
      '::mint::',
      '::display::',
      
      // Marketplace/Protocol NFTs
      '::originbyte::',
      '::ob_kiosk::',
      '::tradeport::',
      '::hyperspace::',
      
      // Gaming NFTs
      '::game_nft::',
      '::game_item::',
      '::player_item::',
      
      // Domain names (treated as NFTs in SuiVision)
      '::suins::',
      '::domain::',
      '::name_service::',
    ]
    
    const lowerType = type.toLowerCase()
    return knownNFTPatterns.some(pattern => lowerType.includes(pattern))
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
      
      // Check for verified collections first (similar to SuiVision)
      if (this.isVerifiedNFT(nft.packageId)) {
        classification = ObjectClassification.VERIFIED
        classificationReason = 'Verified NFT collection'
        riskScore = 0
      } 
      // Check if it's from a known NFT marketplace or protocol
      else if (this.isFromTrustedProtocol(nft.packageId, obj.type)) {
        classification = ObjectClassification.SAFE
        classificationReason = 'From trusted NFT protocol'
        riskScore = 10
      }
      // Check for scam indicators
      else if (this.hasScamIndicators(nft)) {
        classification = ObjectClassification.DANGER
        classificationReason = 'Suspicious patterns detected'
        riskScore = 80
      } 
      // Check if metadata is incomplete or suspicious
      else if (this.isDubious(nft)) {
        classification = ObjectClassification.WARNING
        classificationReason = 'Incomplete metadata or unknown origin'
        riskScore = 40
      } 
      // NFTs with proper display metadata are generally safe
      else if (nft.imageUrl && nft.name) {
        classification = ObjectClassification.SAFE
        classificationReason = 'Standard NFT with complete metadata'
        riskScore = 20
      }
      else {
        classification = ObjectClassification.UNCLASSIFIED
        classificationReason = 'NFT requires manual review'
        riskScore = 30
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
    // Check against verified packages list
    const isInVerifiedList = verifiedPackages.some(pkg => 
      pkg.packageId.toLowerCase() === packageId.toLowerCase()
    )
    
    if (isInVerifiedList) return true
    
    // Additional known verified NFT packages (similar to SuiVision)
    const additionalVerifiedNFTs = [
      // Capy
      '0x7f6c7d279d5f15aaf7835e0f34b2a95e5731bc86e2b3c5f1ea85c5a83e7f96f2',
      '0x06b79116e8d9b94ba0a8525e42dcfe776d5e20e1fa769347f0e730bb0e8bac2e',
      
      // SuiNS (Sui Name Service)
      '0x22fa05f21b1ad71442491220bb9338f7b7095fe35000ef88d5400d28523bdd93',
      '0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0',
      
      // Cosmocadia
      '0x8f74a7d632191e29956df3843404f22d27bd84d92cca1b1abde621d033098769',
      
      // Egg
      '0xbeed5831d4c041fc9d3a7c96a1d23f67587c7af616e20334ecfac2ec0dd8f3f7',
      
      // Bluemove
      '0xb24b6789e088b876afabca733bed2299fbc9e2d6369be4d1acfa17d8145454d9',
      
      // Keepsake
      '0x0e01aa52aa26c24c5ac0c603a0f65dc95de93047dd08c566ab9e4ba55797c95e',
      
      // Studio Mirai  
      '0xa66152f384c0b2e99677e4fb2211f9f595c6a879b11c18c6d588dbba52e982f3',
      
      // Typus NFT
      '0x8b299390a981fdc5c79a27c62e9c850d9b7ba9335db88bbf50f782f072e279e1',
      
      // Suilend
      '0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf',
      
      // AART Digital
      '0x329d54be94e1d3667ca6fb89c30f52e986dc5eebf9b9a2e973e3a4e889c59c84',
      
      // Clutchy
      '0x2af3abf59bb6f896c2ef1c9a595233b09a36408db9dd24a7c3f69c972b0f0cf2',
      
      // Tocen
      '0x18f15b93db3bc6a2b6a3720d477740b37f759db50e61c41dc396e2e75b369cc3',
      
      // Souffl3
      '0x80d7de9c4a56194087e0ba0bf59492aa8e6a5ee881606226930827085ddf2332',
      
      // OriginByte Protocol NFTs
      '0xbc3df36be17f27ac98e3c839b2589db8475fa07b20657b08e8891e3aaf5ee5f9',
      '0x95a441d389b07437d00dd07e0b6f05f513d7659b13fd7c5d3923c7d9d847199b',
      
      // DoubleUp
      '0xd4a537f5e6980284de6344e8c9cbb93f892e0c6b0d672b1f5e8c7e088cec5e04',
    ]
    
    return additionalVerifiedNFTs.some(verified => 
      packageId.toLowerCase().startsWith(verified.toLowerCase())
    )
  }

  private isFromTrustedProtocol(packageId: string, type: string): boolean {
    // Known NFT marketplace and protocol packages
    const trustedProtocols = [
      // OriginByte
      '0xbc3df36be17f27ac98e3c839b2589db8475fa07b20657b08e8891e3aaf5ee5f9',
      '0x95a441d389b07437d00dd07e0b6f05f513d7659b13fd7c5d3923c7d9d847199b',
      
      // Bluemove
      '0xb24b6789e088b876afabca733bed2299fbc9e2d6369be4d1acfa17d8145454d9',
      
      // Souffl3
      '0x80d7de9c4a56194087e0ba0bf59492aa8e6a5ee881606226930827085ddf2332',
      
      // Tradeport
      '0xceab84acf6bf70f503c3b0627acaff6b3f84cee0f2d7ed53d00fa6c2a168d14f',
      
      // Hyperspace
      '0x2d6d5720c0328c1fa871262c3dfe893dc31ba122af06ed2179aac46e06e5a511',
      
      // Clutchy
      '0x5b960c3def74e086819086e12e26a5ce5c4224e5e8a1370dc76292e42a2010b5',
      
      // Keepsake
      '0xb42dbb7413b79394e1a0175af6ae22b69ca3e610d87ef09b86e2fd8e4a8cb206',
    ]
    
    const lowerPackage = packageId.toLowerCase()
    const lowerType = type.toLowerCase()
    
    // Check if package matches any trusted protocol
    if (trustedProtocols.some(protocol => lowerPackage.startsWith(protocol.toLowerCase()))) {
      return true
    }
    
    // Check for protocol patterns in type
    if (lowerType.includes('::originbyte::') || 
        lowerType.includes('::ob_kiosk::') ||
        lowerType.includes('::bluemove::') ||
        lowerType.includes('::souffl::') ||
        lowerType.includes('::tradeport::') ||
        lowerType.includes('::hyperspace::')) {
      return true
    }
    
    return false
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