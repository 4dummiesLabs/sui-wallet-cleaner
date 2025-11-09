'use client'

import { ClassifiedObject, ObjectType, ObjectClassification, CoinObject, NFTObject } from '@/types/objects'
import ObjectCard from './ObjectCard'
import BurnDialog from './BurnDialog'
import CommunityDialog from './CommunityDialog'
import SubmitForReviewDialog from './SubmitForReviewDialog'
import QuantitySelectorDialog from './QuantitySelectorDialog'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Trash2, Coins, Image, Shield, AlertTriangle, Users, Upload } from 'lucide-react'
import { TransactionService } from '@/services/transactionService'
import { useCurrentAccount, useSuiClient, useSignTransaction } from '@mysten/dapp-kit'

interface ObjectGridProps {
  objects: ClassifiedObject[]
  isLoading: boolean
  error: Error | null
  onRefresh?: () => void
}

export default function ObjectGrid({ objects, isLoading, error, onRefresh }: ObjectGridProps) {
  const [selectedObjects, setSelectedObjects] = useState<Set<string>>(new Set())
  const [filterType, setFilterType] = useState<ObjectType | 'all'>('all')
  const [filterClassification, setFilterClassification] = useState<ObjectClassification | 'all'>('all')
  const [hiddenObjects, setHiddenObjects] = useState<Set<string>>(new Set())
  const [showBurnDialog, setShowBurnDialog] = useState(false)
  const [showCommunityDialog, setShowCommunityDialog] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [quantityDialog, setQuantityDialog] = useState<{
    open: boolean
    itemName: string
    totalCount: number
    groupedIds: string[]
  } | null>(null)
  
  // Sui hooks
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signTransaction } = useSignTransaction()

  // Transaction service
  const transactionService = useMemo(() => new TransactionService(client), [client])

  // Wrapper for signTransaction to return a Promise (used for sponsored transactions)
  const executeTransaction = (args: any) => {
    return new Promise((resolve, reject) => {
      signTransaction(args, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  // Group coins by type and NFTs by collection
  const groupedObjects = useMemo(() => {
    const coinGroups = new Map<string, ClassifiedObject[]>()
    const nftGroups = new Map<string, ClassifiedObject[]>()
    const others: ClassifiedObject[] = []

    // Separate and group objects
    objects.forEach(item => {
      if (item.object.objectType === ObjectType.COIN) {
        const coin = item.object as CoinObject
        // Skip 0 balance coins
        if (Number(coin.balance) > 0) {
          const key = coin.coinType
          if (!coinGroups.has(key)) {
            coinGroups.set(key, [])
          }
          coinGroups.get(key)!.push(item)
        }
      } else if (item.object.objectType === ObjectType.NFT) {
        const nft = item.object as NFTObject
        const key = nft.packageId // Group by package/collection
        if (!nftGroups.has(key)) {
          nftGroups.set(key, [])
        }
        nftGroups.get(key)!.push(item)
      } else {
        others.push(item)
      }
    })

    // Merge grouped coins into single objects with combined balances
    const mergedCoins: ClassifiedObject[] = []
    coinGroups.forEach((group, coinType) => {
      if (group.length === 0) return

      // Use the first coin as the base
      const baseCoin = group[0].object as CoinObject

      // Sum up all balances
      const totalBalance = group.reduce((sum, item) => {
        return sum + BigInt((item.object as CoinObject).balance)
      }, BigInt(0))

      // Create merged coin object
      const mergedCoin: CoinObject = {
        ...baseCoin,
        balance: totalBalance.toString(),
        id: `merged_coin_${coinType}`, // Special ID for merged coins
      }

      // Create merged classified object
      const mergedItem: ClassifiedObject = {
        ...group[0],
        object: mergedCoin,
        // Store the original object IDs for selection
        groupedObjectIds: group.map(item => item.object.id),
      }

      mergedCoins.push(mergedItem)
    })

    // Merge grouped NFTs - keep first NFT as representative with count
    const mergedNFTs: ClassifiedObject[] = []
    nftGroups.forEach((group, packageId) => {
      if (group.length === 0) return

      // Use the first NFT as the base
      const baseNFT = group[0].object as NFTObject

      // Create merged NFT object (keeping first NFT's data)
      const mergedNFT: NFTObject = {
        ...baseNFT,
        id: `merged_nft_${packageId}`, // Special ID for merged NFTs
        name: baseNFT.name || `${baseNFT.moduleName} Collection`,
      }

      // Create merged classified object
      const mergedItem: ClassifiedObject = {
        ...group[0],
        object: mergedNFT,
        // Store the original object IDs for selection
        groupedObjectIds: group.map(item => item.object.id),
      }

      mergedNFTs.push(mergedItem)
    })

    return [...mergedCoins, ...mergedNFTs, ...others]
  }, [objects])

  const filteredObjects = useMemo(() => {
    let filtered = groupedObjects

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.object.objectType === filterType)
    }

    if (filterClassification !== 'all') {
      filtered = filtered.filter(item => item.classification === filterClassification)
    }

    return filtered
  }, [groupedObjects, filterType, filterClassification])

  const stats = useMemo(() => {
    // Filter out 0 balance coins from stats as well
    const visibleObjects = objects.filter(item => {
      if (item.object.objectType === ObjectType.COIN) {
        const coin = item.object as CoinObject
        return Number(coin.balance) > 0
      }
      return true
    })

    const byType = visibleObjects.reduce((acc, item) => {
      acc[item.object.objectType] = (acc[item.object.objectType] || 0) + 1
      return acc
    }, {} as Record<ObjectType, number>)

    const byClassification = visibleObjects.reduce((acc, item) => {
      acc[item.classification] = (acc[item.classification] || 0) + 1
      return acc
    }, {} as Record<ObjectClassification, number>)

    return {
      total: visibleObjects.length,
      byType,
      byClassification,
    }
  }, [objects])

  const handleSelectObject = (objectId: string, selected: boolean, groupedIds?: string[], itemName?: string) => {
    // If this is a grouped item with more than 1 object, show quantity selector
    if (selected && groupedIds && groupedIds.length > 1) {
      setQuantityDialog({
        open: true,
        itemName: itemName || 'items',
        totalCount: groupedIds.length,
        groupedIds: groupedIds,
      })
      return
    }

    setSelectedObjects(prev => {
      const newSet = new Set(prev)

      // If this is a grouped item, select/deselect all grouped objects
      if (groupedIds && groupedIds.length > 0) {
        if (selected) {
          groupedIds.forEach(id => newSet.add(id))
        } else {
          groupedIds.forEach(id => newSet.delete(id))
        }
      } else {
        // Single object selection
        if (selected) {
          newSet.add(objectId)
        } else {
          newSet.delete(objectId)
        }
      }

      return newSet
    })
  }

  const handleQuantityConfirm = (quantity: number) => {
    if (!quantityDialog) return

    const { groupedIds } = quantityDialog

    setSelectedObjects(prev => {
      const newSet = new Set(prev)
      // Add the first 'quantity' items from the grouped IDs
      groupedIds.slice(0, quantity).forEach(id => newSet.add(id))
      return newSet
    })

    setQuantityDialog(null)
  }

  const handleSelectAll = () => {
    // Collect all actual object IDs (including grouped ones)
    const allObjectIds: string[] = []
    filteredObjects.forEach(item => {
      if (item.groupedObjectIds && item.groupedObjectIds.length > 0) {
        allObjectIds.push(...item.groupedObjectIds)
      } else {
        allObjectIds.push(item.object.id)
      }
    })

    if (selectedObjects.size === allObjectIds.length) {
      setSelectedObjects(new Set())
    } else {
      setSelectedObjects(new Set(allObjectIds))
    }
  }

  const handleToggleHide = (objectId: string) => {
    setHiddenObjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(objectId)) {
        newSet.delete(objectId)
      } else {
        newSet.add(objectId)
      }
      return newSet
    })
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive font-medium">Error loading wallet objects</p>
        <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Scanning your wallet...</span>
        </div>
      </div>
    )
  }

  if (objects.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No objects found in your wallet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Objects</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coins</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{stats.byType[ObjectType.COIN] || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">NFTs</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{stats.byType[ObjectType.NFT] || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Items</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-bold">
                {(stats.byClassification[ObjectClassification.DANGER] || 0) + 
                 (stats.byClassification[ObjectClassification.WARNING] || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classification Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="gap-1">
              <Shield className="w-3 h-3" />
              Verified: {stats.byClassification[ObjectClassification.VERIFIED] || 0}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Safe: {stats.byClassification[ObjectClassification.SAFE] || 0}
            </Badge>
            <Badge variant="outline" className="gap-1">
              Warning: {stats.byClassification[ObjectClassification.WARNING] || 0}
            </Badge>
            <Badge variant="destructive" className="gap-1">
              Danger: {stats.byClassification[ObjectClassification.DANGER] || 0}
            </Badge>
            <Badge variant="outline" className="gap-1">
              Unclassified: {stats.byClassification[ObjectClassification.UNCLASSIFIED] || 0}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <Select value={filterType} onValueChange={(value: ObjectType | 'all') => setFilterType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={ObjectType.COIN}>Coins</SelectItem>
              <SelectItem value={ObjectType.NFT}>NFTs</SelectItem>
              <SelectItem value={ObjectType.STAKED_SUI}>Staked SUI</SelectItem>
              <SelectItem value={ObjectType.KIOSK}>Kiosks</SelectItem>
              <SelectItem value={ObjectType.OBJECT}>Objects</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterClassification} onValueChange={(value: ObjectClassification | 'all') => setFilterClassification(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={ObjectClassification.VERIFIED}>Verified</SelectItem>
              <SelectItem value={ObjectClassification.SAFE}>Safe</SelectItem>
              <SelectItem value={ObjectClassification.WARNING}>Warning</SelectItem>
              <SelectItem value={ObjectClassification.DANGER}>Danger</SelectItem>
              <SelectItem value={ObjectClassification.UNCLASSIFIED}>Unclassified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedObjects.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedObjects.size} selected
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowSubmitDialog(true)}>
              <Upload className="w-4 h-4 mr-1" />
              Submit for Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowCommunityDialog(true)}>
              <Users className="w-4 h-4 mr-1" />
              View Votes
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setShowBurnDialog(true)}>
              <Trash2 className="w-4 h-4 mr-1" />
              Burn
            </Button>
          </div>
        )}
      </div>

      {/* Select All Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedObjects.size === filteredObjects.length && filteredObjects.length > 0}
          onChange={handleSelectAll}
          className="w-4 h-4"
        />
        <label className="text-sm text-muted-foreground">
          Select all ({filteredObjects.length} items)
        </label>
      </div>

      {/* Objects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredObjects.map(item => (
          <ObjectCard
            key={item.object.id}
            item={{ ...item, isHidden: hiddenObjects.has(item.object.id) }}
            isSelected={
              item.groupedObjectIds
                ? item.groupedObjectIds.some(id => selectedObjects.has(id))
                : selectedObjects.has(item.object.id)
            }
            onSelect={(selected) => {
              const itemName = item.object.objectType === ObjectType.COIN
                ? (item.object as CoinObject).symbol || 'coins'
                : item.object.objectType === ObjectType.NFT
                ? 'NFTs'
                : 'items'
              handleSelectObject(item.object.id, selected, item.groupedObjectIds, itemName)
            }}
            onToggleHide={handleToggleHide}
            totalOfType={item.groupedObjectIds?.length}
          />
        ))}
      </div>

      {/* Submit for Review Dialog */}
      {account && (
        <SubmitForReviewDialog
          open={showSubmitDialog}
          onOpenChange={setShowSubmitDialog}
          selectedObjects={objects.filter(obj => selectedObjects.has(obj.object.id))}
          onSubmitComplete={() => {
            setSelectedObjects(new Set())
          }}
        />
      )}

      {/* Quantity Selector Dialog */}
      {quantityDialog && (
        <QuantitySelectorDialog
          open={quantityDialog.open}
          onOpenChange={(open) => {
            if (!open) setQuantityDialog(null)
          }}
          itemName={quantityDialog.itemName}
          totalCount={quantityDialog.totalCount}
          onConfirm={handleQuantityConfirm}
        />
      )}

      {/* Community Dialog */}
      <CommunityDialog
        open={showCommunityDialog}
        onOpenChange={setShowCommunityDialog}
        selectedObjects={objects.filter(obj => selectedObjects.has(obj.object.id))}
      />

      {/* Burn Dialog */}
      {account && (
        <BurnDialog
          open={showBurnDialog}
          onOpenChange={setShowBurnDialog}
          selectedObjects={objects.filter(obj => selectedObjects.has(obj.object.id))}
          onBurnComplete={() => {
            setSelectedObjects(new Set())
            // Refresh the objects list from cache (objects are already removed from cache)
            if (onRefresh) {
              setTimeout(() => onRefresh(), 500)
            }
          }}
          transactionService={transactionService}
          senderAddress={account.address}
          onExecuteTransaction={executeTransaction}
        />
      )}
    </div>
  )
}