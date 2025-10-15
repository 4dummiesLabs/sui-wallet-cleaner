'use client'

import { ClassifiedObject, ObjectType, ObjectClassification, CoinObject, NFTObject } from '@/types/objects'
import { cn } from '@/lib/utils'
import { ExternalLink, Eye, EyeOff } from 'lucide-react'
import { useState, memo } from 'react'
import LazyImage from './LazyImage'
import { Button } from '@/components/ui/button'
import SpotlightCard from './SpotlightCard'

interface ObjectCardProps {
  item: ClassifiedObject
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onToggleHide?: (id: string) => void
}

function ObjectCard({ item, isSelected, onSelect, onToggleHide }: ObjectCardProps) {
  const [isHidden, setIsHidden] = useState(item.isHidden || false)

  const getClassificationColor = () => {
    switch (item.classification) {
      case ObjectClassification.VERIFIED:
        return "text-green-400"
      case ObjectClassification.SAFE:
        return "text-blue-400"
      case ObjectClassification.WARNING:
        return "text-yellow-400"
      case ObjectClassification.DANGER:
        return "text-red-400"
      default:
        return "text-foreground-muted"
    }
  }

  const handleToggleHide = () => {
    setIsHidden(!isHidden)
    onToggleHide?.(item.object.id)
  }

  const renderObjectContent = () => {
    if (item.object.objectType === ObjectType.COIN) {
      const coin = item.object as CoinObject
      const formattedBalance = (Number(coin.balance) / Math.pow(10, coin.decimals)).toLocaleString()
      
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'var(--background-elevated)' }}>
              <LazyImage
                src={coin.iconUrl}
                alt={coin.symbol || 'Coin'}
                className="w-full h-full object-cover rounded-full"
                fallback={<div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{(coin.symbol || 'T')[0]}</span>
                </div>}
                placeholder={<div className="w-full h-full bg-muted animate-pulse rounded-full" />}
              />
            </div>
            <div className="flex-1">
              <h3 className="heading-small text-foreground">{coin.symbol || 'Unknown Token'}</h3>
              <p className="caption">{coin.name || 'Token'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="heading-medium text-foreground">{formattedBalance}</p>
            {coin.priceUsd && (
              <p className="caption">
                ${(Number(coin.balance) / Math.pow(10, coin.decimals) * coin.priceUsd).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            )}
          </div>
        </div>
      )
    }

    if (item.object.objectType === ObjectType.NFT) {
      const nft = item.object as NFTObject
      
      return (
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <LazyImage
              src={nft.imageUrl}
              alt={nft.name || 'NFT'}
              className="w-full h-full object-cover rounded-lg"
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">NFT</span>
                  </div>
                </div>
              }
              placeholder={<div className="w-full h-full bg-muted animate-pulse rounded-lg" />}
            />
          </div>
          <div className="space-y-2">
            <h3 className="heading-small text-foreground truncate">{nft.name || 'Unnamed NFT'}</h3>
            {nft.description && (
              <p className="caption line-clamp-2">{nft.description}</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
          <span className="text-lg font-medium text-primary">OBJ</span>
        </div>
        <div className="text-center">
          <h3 className="heading-small text-foreground">{item.object.name || 'Unknown Object'}</h3>
        </div>
      </div>
    )
  }

  const getSpotlightColor = () => {
    switch (item.classification) {
      case ObjectClassification.VERIFIED:
        return "rgba(0, 255, 128, 0.9)" // Bright green for verified
      case ObjectClassification.SAFE:
        return "rgba(0, 255, 255, 0.8)" // Bright cyan for safe
      case ObjectClassification.WARNING:
        return "rgba(255, 215, 0, 0.8)" // Bright gold for warning
      case ObjectClassification.DANGER:
        return "rgba(255, 0, 128, 0.8)" // Bright magenta for danger
      default:
        return "rgba(0, 255, 255, 0.7)" // Default bright cyan
    }
  }

  return (
    <SpotlightCard 
      spotlightColor={getSpotlightColor()}
      className={cn(
        'sui-card relative cursor-pointer group transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5',
        isSelected && 'ring-2 ring-primary scale-[1.02]',
        isHidden && 'opacity-50'
      )}
    >
      <div
        onClick={() => onSelect(!isSelected)}
        role="article"
        aria-label={`${item.object.name || 'Object'} - ${item.classification} classification`}
        className="relative"
      >
      {/* Minimal Selection Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className={cn(
          "w-4 h-4 rounded border-2 transition-all",
          isSelected ? "bg-primary border-primary" : "border-border"
        )}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onSelect(e.target.checked)
            }}
            className="sr-only"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select ${item.object.name || 'object'} for bulk actions`}
          />
        </div>
      </div>

      {/* Hide Toggle - Only Show on Hover */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-foreground-muted hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation()
            handleToggleHide()
          }}
          aria-label={isHidden ? `Show ${item.object.name || 'object'}` : `Hide ${item.object.name || 'object'}`}
        >
          {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </Button>
      </div>

      {/* Content */}
      <div className="pt-10 pb-4">
        {renderObjectContent()}
      </div>

      {/* Minimal Classification Footer */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className={cn("caption font-medium", getClassificationColor())}>
            {item.classification}
          </span>
          <span className="caption">{item.object.objectType}</span>
        </div>

        {item.classificationReason && (
          <p className="caption leading-relaxed">{item.classificationReason}</p>
        )}

        {item.object.objectType === ObjectType.NFT && (item.object as NFTObject).projectUrl && (
          <div className="flex justify-end">
            <a
              href={(item.object as NFTObject).projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="caption hover:accent-text transition-colors inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit project website for ${item.object.name || 'NFT'}`}
            >
              View Project <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
      </div>
    </SpotlightCard>
  )
}

export default memo(ObjectCard)