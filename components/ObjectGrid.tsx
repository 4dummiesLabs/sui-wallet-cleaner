'use client'

import { ClassifiedObject, ObjectType, ObjectClassification, CoinObject } from '@/types/objects'
import ObjectCard from './ObjectCard'
import BurnDialog from './BurnDialog'
import CommunityDialog from './CommunityDialog'
import SubmitForReviewDialog from './SubmitForReviewDialog'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Trash2, EyeOff, Coins, Image, Shield, AlertTriangle, Users, Upload } from 'lucide-react'
import { TransactionService } from '@/services/transactionService'
import { useCurrentAccount, useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit'

interface ObjectGridProps {
  objects: ClassifiedObject[]
  isLoading: boolean
  error: Error | null
}

export default function ObjectGrid({ objects, isLoading, error }: ObjectGridProps) {
  const [selectedObjects, setSelectedObjects] = useState<Set<string>>(new Set())
  const [filterType, setFilterType] = useState<ObjectType | 'all'>('all')
  const [filterClassification, setFilterClassification] = useState<ObjectClassification | 'all'>('all')
  const [hiddenObjects, setHiddenObjects] = useState<Set<string>>(new Set())
  const [showBurnDialog, setShowBurnDialog] = useState(false)
  const [showCommunityDialog, setShowCommunityDialog] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  
  // Sui hooks
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  
  // Transaction service
  const transactionService = useMemo(() => new TransactionService(client), [client])

  // Wrapper for signAndExecute to return a Promise
  const executeTransaction = (args: any) => {
    return new Promise((resolve, reject) => {
      signAndExecute(args, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  const filteredObjects = useMemo(() => {
    let filtered = objects

    // Automatically hide coins with 0 balance
    filtered = filtered.filter(item => {
      if (item.object.objectType === ObjectType.COIN) {
        const coin = item.object as CoinObject
        return Number(coin.balance) > 0
      }
      return true
    })

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.object.objectType === filterType)
    }

    if (filterClassification !== 'all') {
      filtered = filtered.filter(item => item.classification === filterClassification)
    }

    return filtered
  }, [objects, filterType, filterClassification])

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
    setSelectedObjects(prev => {
      const newSet = new Set(prev)
      if (selected) {
        newSet.add(objectId)
      } else {
        newSet.delete(objectId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedObjects.size === filteredObjects.length) {
      setSelectedObjects(new Set())
    } else {
      setSelectedObjects(new Set(filteredObjects.map(item => item.object.id)))
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

  const handleBulkHide = () => {
    setHiddenObjects(prev => {
      const newSet = new Set(prev)
      selectedObjects.forEach(id => newSet.add(id))
      return newSet
    })
    setSelectedObjects(new Set())
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
            <Button variant="outline" size="sm" onClick={handleBulkHide}>
              <EyeOff className="w-4 h-4 mr-1" />
              Hide
            </Button>
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
            isSelected={selectedObjects.has(item.object.id)}
            onSelect={(selected) => handleSelectObject(item.object.id, selected)}
            onToggleHide={handleToggleHide}
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