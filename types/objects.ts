export enum ObjectType {
  NFT = 'nft',
  COIN = 'coin',
  STAKED_SUI = 'staked_sui',
  KIOSK = 'kiosk',
  OBJECT = 'object',
  PACKAGE = 'package'
}

export enum ObjectClassification {
  VERIFIED = 'verified',
  SAFE = 'safe',
  WARNING = 'warning',
  DANGER = 'danger',
  UNCLASSIFIED = 'unclassified'
}

export interface BaseObject {
  id: string
  type: string
  objectType: ObjectType
  name?: string
  description?: string
  owner: string
  digest: string
  previousTransaction?: string
  storageRebate?: string
}

export interface CoinObject extends BaseObject {
  objectType: ObjectType.COIN
  coinType: string
  balance: string
  symbol?: string
  decimals: number
  iconUrl?: string
  priceUsd?: number
}

export interface NFTObject extends BaseObject {
  objectType: ObjectType.NFT
  imageUrl?: string
  projectUrl?: string
  creator?: string
  packageId: string
  moduleName: string
  content?: any
}

export interface StakedSuiObject extends BaseObject {
  objectType: ObjectType.STAKED_SUI
  principal: string
  stakingPool: string
  estimatedReward?: string
}

export interface KioskObject extends BaseObject {
  objectType: ObjectType.KIOSK
  itemCount: number
  profits?: string
}

export type WalletObject = CoinObject | NFTObject | StakedSuiObject | KioskObject | BaseObject

export interface ClassifiedObject<T extends WalletObject = WalletObject> {
  object: T
  classification: ObjectClassification
  classificationReason?: string
  riskScore?: number
  isHidden?: boolean
}

export interface ObjectStats {
  total: number
  byType: Record<ObjectType, number>
  byClassification: Record<ObjectClassification, number>
  totalValue?: {
    sui: string
    usd?: string
  }
}