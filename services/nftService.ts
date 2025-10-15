import { SuiClient, SuiObjectResponse } from '@mysten/sui/client'
import { SuiNFT, NFTClassification, ClassifiedNFT, ApprovedPackage } from '@/types/nft'

export class NFTService {
  private client: SuiClient

  constructor(client: SuiClient) {
    this.client = client
  }

  async fetchUserNFTs(address: string): Promise<SuiNFT[]> {
    const nfts: SuiNFT[] = []
    let cursor: string | null | undefined = null
    let hasNextPage = true

    while (hasNextPage) {
      const response = await this.client.getOwnedObjects({
        owner: address,
        cursor,
        options: {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: true,
          showContent: true,
        },
      })

      for (const obj of response.data) {
        if (this.isNFT(obj)) {
          const nft = this.parseNFTFromObject(obj)
          if (nft) {
            nfts.push(nft)
          }
        }
      }

      hasNextPage = response.hasNextPage
      cursor = response.nextCursor
    }

    return nfts
  }

  private isNFT(obj: SuiObjectResponse): boolean {
    if (!obj.data || obj.error) return false
    
    const type = obj.data.type || ''
    const isCoin = type.startsWith('0x2::coin::Coin')
    const hasDisplay = !!(obj.data.display && obj.data.display.data)
    const isKiosk = type.includes('kiosk')
    const isStakedSui = type.includes('staked_sui')
    
    return !isCoin && !isKiosk && !isStakedSui && (hasDisplay || this.isPotentialNFT(type))
  }

  private isPotentialNFT(type: string): boolean {
    const nftPatterns = [
      'nft', 'NFT', 'collectible', 'artwork', 'token',
      'card', 'hero', 'avatar', 'item', 'badge'
    ]
    return nftPatterns.some(pattern => type.toLowerCase().includes(pattern.toLowerCase()))
  }

  private parseNFTFromObject(obj: SuiObjectResponse): SuiNFT | null {
    if (!obj.data) return null

    const { objectId, type, owner, previousTransaction, storageRebate, digest, content } = obj.data
    const display = obj.data.display?.data

    const packageId = this.extractPackageId(type || '')
    const moduleName = this.extractModuleName(type || '')

    return {
      id: objectId,
      type: type || '',
      name: display?.name || display?.title || 'Unnamed NFT',
      description: display?.description || display?.desc,
      imageUrl: this.processImageUrl(display?.image_url || display?.image || display?.img_url),
      projectUrl: display?.project_url || display?.link,
      creator: display?.creator,
      packageId,
      moduleName,
      digest,
      owner: typeof owner === 'object' && owner && 'AddressOwner' in owner 
        ? owner.AddressOwner 
        : typeof owner === 'string' 
        ? owner 
        : '',
      previousTransaction: previousTransaction || undefined,
      storageRebate: storageRebate || undefined,
      content: content && content.dataType === 'moveObject' && 'type' in content && 'hasPublicTransfer' in content && 'fields' in content
        ? {
            dataType: content.dataType,
            type: content.type as string,
            hasPublicTransfer: content.hasPublicTransfer as boolean,
            fields: content.fields as Record<string, any>
          }
        : undefined,
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

  classifyNFTs(nfts: SuiNFT[], approvedPackages: ApprovedPackage[]): ClassifiedNFT[] {
    return nfts.map(nft => this.classifyNFT(nft, approvedPackages))
  }

  private classifyNFT(nft: SuiNFT, approvedPackages: ApprovedPackage[]): ClassifiedNFT {
    let classification = NFTClassification.UNCLASSIFIED
    let classificationReason = ''

    const isApproved = approvedPackages.some(
      pkg => pkg.packageId.toLowerCase() === nft.packageId.toLowerCase()
    )

    if (isApproved) {
      classification = NFTClassification.LEGIT
      classificationReason = 'From approved package'
    } else if (this.hasScamIndicators(nft)) {
      classification = NFTClassification.SCAM
      classificationReason = 'Suspicious patterns detected'
    } else if (this.isDubious(nft)) {
      classification = NFTClassification.DUBIOUS
      classificationReason = 'Unknown origin or incomplete metadata'
    }

    return {
      ...nft,
      classification,
      classificationReason,
    }
  }

  private hasScamIndicators(nft: SuiNFT): boolean {
    const scamKeywords = [
      'airdrop', 'free', 'claim', 'reward', 'giveaway',
      'winner', 'congratulations', 'urgent', 'limited time'
    ]

    const name = (nft.name || '').toLowerCase()
    const description = (nft.description || '').toLowerCase()

    return scamKeywords.some(keyword => 
      name.includes(keyword) || description.includes(keyword)
    )
  }

  private isDubious(nft: SuiNFT): boolean {
    return !nft.imageUrl || !nft.name || nft.name === 'Unnamed NFT'
  }
}

export const approvedPackagesList: ApprovedPackage[] = [
  {
    packageId: '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
    name: 'Suifrens',
    verified: true,
    category: 'official',
    description: 'Official Sui mascot NFT collection'
  },
  {
    packageId: '0xee496a0cc04d06a345982ba6697c90c619020de9e274408c7819f787ff66e1a1',
    name: 'Suifrens Accessories',
    verified: true,
    category: 'official',
    description: 'Official Suifrens accessories'
  },
  {
    packageId: '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab',
    name: 'Prime Machin',
    verified: true,
    category: 'community',
    description: 'Popular NFT collection on Sui'
  },
  {
    packageId: '0x034170936ab6edc09e7c45e9e060a0e40386e35f062151b77b8103be5e978e64',
    name: 'Fuddies',
    verified: true,
    category: 'community',
    description: 'Community NFT collection'
  },
]