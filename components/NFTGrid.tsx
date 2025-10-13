'use client'

import { ClassifiedNFT, NFTClassification } from '@/types/nft'
import NFTCard from './NFTCard'
import { useState, useMemo } from 'react'
import { Filter, Trash2, Send, Eye, EyeOff } from 'lucide-react'

interface NFTGridProps {
  nfts: ClassifiedNFT[]
  isLoading: boolean
  error: Error | null
}

export default function NFTGrid({ nfts, isLoading, error }: NFTGridProps) {
  const [selectedNFTs, setSelectedNFTs] = useState<Set<string>>(new Set())
  const [filterClassification, setFilterClassification] = useState<NFTClassification | 'all'>('all')
  const [hiddenNFTs, setHiddenNFTs] = useState<Set<string>>(new Set())

  const filteredNFTs = useMemo(() => {
    if (filterClassification === 'all') return nfts
    return nfts.filter(nft => nft.classification === filterClassification)
  }, [nfts, filterClassification])

  const stats = useMemo(() => {
    return {
      total: nfts.length,
      legit: nfts.filter(n => n.classification === NFTClassification.LEGIT).length,
      dubious: nfts.filter(n => n.classification === NFTClassification.DUBIOUS).length,
      scam: nfts.filter(n => n.classification === NFTClassification.SCAM).length,
      unclassified: nfts.filter(n => n.classification === NFTClassification.UNCLASSIFIED).length,
    }
  }, [nfts])

  const handleSelectNFT = (nftId: string, selected: boolean) => {
    setSelectedNFTs(prev => {
      const newSet = new Set(prev)
      if (selected) {
        newSet.add(nftId)
      } else {
        newSet.delete(nftId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedNFTs.size === filteredNFTs.length) {
      setSelectedNFTs(new Set())
    } else {
      setSelectedNFTs(new Set(filteredNFTs.map(nft => nft.id)))
    }
  }

  const handleToggleHide = (nftId: string) => {
    setHiddenNFTs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nftId)) {
        newSet.delete(nftId)
      } else {
        newSet.add(nftId)
      }
      return newSet
    })
  }

  const handleBulkHide = () => {
    setHiddenNFTs(prev => {
      const newSet = new Set(prev)
      selectedNFTs.forEach(id => newSet.add(id))
      return newSet
    })
    setSelectedNFTs(new Set())
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading NFTs: {error.message}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading your NFTs...</span>
        </div>
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No NFTs found in your wallet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total NFTs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{stats.legit}</p>
            <p className="text-sm text-gray-500">Legitimate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{stats.dubious}</p>
            <p className="text-sm text-gray-500">Dubious</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">{stats.scam}</p>
            <p className="text-sm text-gray-500">Scam</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-500">{stats.unclassified}</p>
            <p className="text-sm text-gray-500">Unclassified</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select
            value={filterClassification}
            onChange={(e) => setFilterClassification(e.target.value as NFTClassification | 'all')}
            className="px-3 py-1 border rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="all">All NFTs ({stats.total})</option>
            <option value={NFTClassification.LEGIT}>Legitimate ({stats.legit})</option>
            <option value={NFTClassification.DUBIOUS}>Dubious ({stats.dubious})</option>
            <option value={NFTClassification.SCAM}>Scam ({stats.scam})</option>
            <option value={NFTClassification.UNCLASSIFIED}>Unclassified ({stats.unclassified})</option>
          </select>
        </div>

        {selectedNFTs.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedNFTs.size} selected
            </span>
            <button
              onClick={handleBulkHide}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-1"
            >
              <EyeOff className="w-4 h-4" />
              Hide Selected
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
              title="Transfer to burner address"
            >
              <Send className="w-4 h-4" />
              Transfer
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
              title="Burn NFTs (if supported)"
            >
              <Trash2 className="w-4 h-4" />
              Burn
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={selectedNFTs.size === filteredNFTs.length && filteredNFTs.length > 0}
          onChange={handleSelectAll}
          className="w-4 h-4"
        />
        <label className="text-sm text-gray-600">Select all</label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredNFTs.map(nft => (
          <NFTCard
            key={nft.id}
            nft={{ ...nft, isHidden: hiddenNFTs.has(nft.id) }}
            isSelected={selectedNFTs.has(nft.id)}
            onSelect={(selected) => handleSelectNFT(nft.id, selected)}
            onToggleHide={handleToggleHide}
          />
        ))}
      </div>
    </div>
  )
}