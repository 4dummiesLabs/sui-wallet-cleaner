'use client'

import { ClassifiedObject, ObjectType, ObjectClassification, CoinObject } from '@/types/objects'
import ObjectCard from './ObjectCard'
import VirtualizedObjectGrid from './VirtualizedObjectGrid'
import TransferDialog from './TransferDialog'
import BurnDialog from './BurnDialog'
import { useState, useMemo, useRef, useEffect, useReducer } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Trash2, Send, EyeOff, Coins, Image, Shield, AlertTriangle } from 'lucide-react'
import { LoadingSpinnerCentered } from '@/components/ui/loading-spinner'
import { ErrorState } from '@/components/ui/error-state'
import { StatsCard, StatsGrid } from '@/components/StatsCard'
import { TransactionService } from '@/services/transactionService'
import { useCurrentAccount, useSuiClient, useSignTransaction } from '@mysten/dapp-kit'

interface ObjectGridProps {
  objects: ClassifiedObject[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
}

interface GridState {
  selectedObjects: Set<string>
  filterType: ObjectType | 'all'
  filterClassification: ObjectClassification | 'all'
  hiddenObjects: Set<string>
  showTransferDialog: boolean
  showBurnDialog: boolean
}

type GridAction =
  | { type: 'SELECT_OBJECT'; objectId: string; selected: boolean }
  | { type: 'SELECT_ALL'; objectIds: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_FILTER_TYPE'; filterType: ObjectType | 'all' }
  | { type: 'SET_FILTER_CLASSIFICATION'; filterClassification: ObjectClassification | 'all' }
  | { type: 'TOGGLE_HIDE'; objectId: string }
  | { type: 'BULK_HIDE'; objectIds: string[] }
  | { type: 'SET_SHOW_TRANSFER_DIALOG'; show: boolean }
  | { type: 'SET_SHOW_BURN_DIALOG'; show: boolean }

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case 'SELECT_OBJECT': {
      const newSet = new Set(state.selectedObjects)
      if (action.selected) {
        newSet.add(action.objectId)
      } else {
        newSet.delete(action.objectId)
      }
      return { ...state, selectedObjects: newSet }
    }
    case 'SELECT_ALL': {
      const isAllSelected = state.selectedObjects.size === action.objectIds.length
      return {
        ...state,
        selectedObjects: isAllSelected ? new Set() : new Set(action.objectIds)
      }
    }
    case 'CLEAR_SELECTION':
      return { ...state, selectedObjects: new Set() }
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.filterType }
    case 'SET_FILTER_CLASSIFICATION':
      return { ...state, filterClassification: action.filterClassification }
    case 'TOGGLE_HIDE': {
      const newSet = new Set(state.hiddenObjects)
      if (newSet.has(action.objectId)) {
        newSet.delete(action.objectId)
      } else {
        newSet.add(action.objectId)
      }
      return { ...state, hiddenObjects: newSet }
    }
    case 'BULK_HIDE': {
      const newSet = new Set(state.hiddenObjects)
      action.objectIds.forEach(id => newSet.add(id))
      return { ...state, hiddenObjects: newSet, selectedObjects: new Set() }
    }
    case 'SET_SHOW_TRANSFER_DIALOG':
      return { ...state, showTransferDialog: action.show }
    case 'SET_SHOW_BURN_DIALOG':
      return { ...state, showBurnDialog: action.show }
    default:
      return state
  }
}

export default function ObjectGrid({ objects, isLoading, error, onRetry }: ObjectGridProps) {
  const [gridState, dispatch] = useReducer(gridReducer, {
    selectedObjects: new Set<string>(),
    filterType: 'all' as ObjectType | 'all',
    filterClassification: 'all' as ObjectClassification | 'all',
    hiddenObjects: new Set<string>(),
    showTransferDialog: false,
    showBurnDialog: false
  })
  
  const [containerSize, setContainerSize] = useState({ width: 0, height: 600 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Sui hooks
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signTransaction } = useSignTransaction()

  // Transaction service
  const transactionService = useMemo(() => new TransactionService(client), [client])

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({
          width: rect.width,
          height: Math.min(800, Math.max(400, window.innerHeight * 0.6))
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Wrapper for signAndExecute to return a Promise
  const executeTransaction = (args: any) => {
    return new Promise((resolve, reject) => {
      signAndExecute(args as any, {
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

    if (gridState.filterType !== 'all') {
      filtered = filtered.filter(item => item.object.objectType === gridState.filterType)
    }

    if (gridState.filterClassification !== 'all') {
      filtered = filtered.filter(item => item.classification === gridState.filterClassification)
    }

    return filtered
  }, [objects, gridState.filterType, gridState.filterClassification])

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

  const handleSelectObject = (objectId: string, selected: boolean) => {
    dispatch({ type: 'SELECT_OBJECT', objectId, selected })
  }

  const handleSelectAll = () => {
    dispatch({ 
      type: 'SELECT_ALL', 
      objectIds: filteredObjects.map(item => item.object.id)
    })
  }

  const handleToggleHide = (objectId: string) => {
    dispatch({ type: 'TOGGLE_HIDE', objectId })
  }

  const handleBulkHide = () => {
    dispatch({ 
      type: 'BULK_HIDE', 
      objectIds: Array.from(gridState.selectedObjects)
    })
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load wallet objects"
        error={error}
        onRetry={onRetry}
        showRetry={!!onRetry}
      />
    )
  }

  if (isLoading) {
    return <LoadingSpinnerCentered text="Scanning your wallet..." />
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
      <StatsGrid>
        <StatsCard 
          title="Total Objects" 
          value={stats.total} 
        />
        <StatsCard 
          title="Coins" 
          value={stats.byType[ObjectType.COIN] || 0}
          icon={Coins}
          iconClassName="text-primary"
        />
        <StatsCard 
          title="NFTs" 
          value={stats.byType[ObjectType.NFT] || 0}
          icon={Image}
          iconClassName="text-primary"
        />
        <StatsCard 
          title="Risk Items" 
          value={(stats.byClassification[ObjectClassification.DANGER] || 0) + 
                 (stats.byClassification[ObjectClassification.WARNING] || 0)}
          icon={AlertTriangle}
          iconClassName="text-destructive"
        />
      </StatsGrid>

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
          <Select value={gridState.filterType} onValueChange={(value: ObjectType | 'all') => dispatch({ type: 'SET_FILTER_TYPE', filterType: value })}>
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

          <Select value={gridState.filterClassification} onValueChange={(value: ObjectClassification | 'all') => dispatch({ type: 'SET_FILTER_CLASSIFICATION', filterClassification: value })}>
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

        {gridState.selectedObjects.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {gridState.selectedObjects.size} selected
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowSubmitDialog(true)}>
              <Upload className="w-4 h-4 mr-1" />
              Submit for Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'SET_SHOW_TRANSFER_DIALOG', show: true })}>
              <Send className="w-4 h-4 mr-1" />
              Transfer
            </Button>
            <Button variant="destructive" size="sm" onClick={() => dispatch({ type: 'SET_SHOW_BURN_DIALOG', show: true })}>
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
          checked={gridState.selectedObjects.size === filteredObjects.length && filteredObjects.length > 0}
          onChange={handleSelectAll}
          className="w-4 h-4"
        />
        <label className="text-sm text-muted-foreground">
          Select all ({filteredObjects.length} items)
        </label>
      </div>

      {/* Objects Grid */}
      <div ref={containerRef} className="w-full">
        {filteredObjects.length > 100 ? (
          <VirtualizedObjectGrid
            objects={filteredObjects}
            selectedObjects={gridState.selectedObjects}
            hiddenObjects={gridState.hiddenObjects}
            onSelectObject={handleSelectObject}
            onToggleHide={handleToggleHide}
            containerHeight={containerSize.height}
            containerWidth={containerSize.width}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredObjects.map(item => (
              <ObjectCard
                key={item.object.id}
                item={{ ...item, isHidden: gridState.hiddenObjects.has(item.object.id) }}
                isSelected={gridState.selectedObjects.has(item.object.id)}
                onSelect={(selected) => handleSelectObject(item.object.id, selected)}
                onToggleHide={handleToggleHide}
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit for Review Dialog */}
      {account && (
        <TransferDialog
          open={gridState.showTransferDialog}
          onOpenChange={(show) => dispatch({ type: 'SET_SHOW_TRANSFER_DIALOG', show })}
          selectedObjects={objects.filter(obj => gridState.selectedObjects.has(obj.object.id))}
          onTransferComplete={() => {
            dispatch({ type: 'CLEAR_SELECTION' })
            // Optionally refresh the objects list here
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
          open={gridState.showBurnDialog}
          onOpenChange={(show) => dispatch({ type: 'SET_SHOW_BURN_DIALOG', show })}
          selectedObjects={objects.filter(obj => gridState.selectedObjects.has(obj.object.id))}
          onBurnComplete={() => {
            dispatch({ type: 'CLEAR_SELECTION' })
            // Optionally refresh the objects list here
          }}
          transactionService={transactionService}
          senderAddress={account.address}
          onExecuteTransaction={executeTransaction}
        />
      )}
    </div>
  )
}