'use client'

import { ClassifiedNFT, NFTClassification } from '@/types/nft'
import { cn, truncateAddress } from '@/lib/utils'
import { AlertTriangle, CheckCircle, XCircle, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface NFTCardProps {
  nft: ClassifiedNFT
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onToggleHide?: (id: string) => void
}

export default function NFTCard({ nft, isSelected, onSelect, onToggleHide }: NFTCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHidden, setIsHidden] = useState(nft.isHidden || false)

  const getClassificationIcon = () => {
    switch (nft.classification) {
      case NFTClassification.LEGIT:
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case NFTClassification.DUBIOUS:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case NFTClassification.SCAM:
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />
    }
  }

  const getClassificationColor = () => {
    switch (nft.classification) {
      case NFTClassification.LEGIT:
        return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      case NFTClassification.DUBIOUS:
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case NFTClassification.SCAM:
        return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800'
    }
  }

  const handleToggleHide = () => {
    setIsHidden(!isHidden)
    onToggleHide?.(nft.id)
  }

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 p-4 transition-all cursor-pointer',
        getClassificationColor(),
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isHidden && 'opacity-50'
      )}
      onClick={() => onSelect(!isSelected)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation()
          onSelect(e.target.checked)
        }}
        className="absolute top-2 left-2 w-4 h-4 cursor-pointer z-10"
      />

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleToggleHide()
        }}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded z-10"
        aria-label={isHidden ? 'Show NFT' : 'Hide NFT'}
      >
        {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          {nft.imageUrl && !imageError ? (
            <img
              src={nft.imageUrl}
              alt={nft.name || 'NFT'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">🖼️</span>
            </div>
          )}
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm truncate flex-1">
              {nft.name || 'Unnamed NFT'}
            </h3>
            {getClassificationIcon()}
          </div>

          {nft.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {nft.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span title={nft.packageId}>
              Package: {truncateAddress(nft.packageId, 6)}
            </span>
            {nft.projectUrl && (
              <a
                href={nft.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {nft.classificationReason && (
            <div className="text-xs bg-white/50 dark:bg-black/20 rounded px-2 py-1">
              {nft.classificationReason}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}