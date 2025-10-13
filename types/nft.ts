export interface SuiNFT {
  id: string
  type: string
  name?: string
  description?: string
  imageUrl?: string
  projectUrl?: string
  creator?: string
  packageId: string
  moduleName: string
  digest: string
  owner: string
  previousTransaction?: string
  storageRebate?: string
  content?: {
    dataType: string
    type: string
    hasPublicTransfer: boolean
    fields: Record<string, any>
  }
}

export enum NFTClassification {
  LEGIT = 'legit',
  DUBIOUS = 'dubious',
  SCAM = 'scam',
  UNCLASSIFIED = 'unclassified'
}

export interface ClassifiedNFT extends SuiNFT {
  classification: NFTClassification
  classificationReason?: string
  communityScore?: number
  isHidden?: boolean
}

export interface ApprovedPackage {
  packageId: string
  name: string
  verified: boolean
  category: 'official' | 'community' | 'partner'
  description?: string
}

export interface NFTAction {
  type: 'hide' | 'transfer' | 'burn' | 'keep'
  objectIds: string[]
  recipientAddress?: string
}