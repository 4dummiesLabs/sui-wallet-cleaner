'use client'

import { ClassifiedObject, ObjectType, ObjectClassification, CoinObject, NFTObject } from '@/types/objects'
import { cn, truncateAddress } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, XCircle, ExternalLink, Eye, EyeOff, Coins, Image } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ObjectCardProps {
  item: ClassifiedObject
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onToggleHide?: (id: string) => void
  totalOfType?: number
}

export default function ObjectCard({ item, isSelected, onSelect, onToggleHide, totalOfType }: ObjectCardProps) {
  const [imageError, setImageError] = useState(false)
  const [coinImageError, setCoinImageError] = useState(false)
  const [isHidden, setIsHidden] = useState(item.isHidden || false)

  const getClassificationIcon = () => {
    switch (item.classification) {
      case ObjectClassification.VERIFIED:
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case ObjectClassification.SAFE:
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case ObjectClassification.WARNING:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case ObjectClassification.DANGER:
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getClassificationVariant = (): "default" | "secondary" | "outline" | "destructive" => {
    switch (item.classification) {
      case ObjectClassification.VERIFIED:
        return "default"
      case ObjectClassification.SAFE:
        return "secondary"
      case ObjectClassification.WARNING:
        return "outline"
      case ObjectClassification.DANGER:
        return "destructive"
      default:
        return "outline"
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
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-muted">
            {coin.iconUrl && !coinImageError ? (
              <img
                src={coin.iconUrl}
                alt={coin.symbol || 'Coin'}
                className="w-full h-full object-cover"
                onError={() => setCoinImageError(true)}
              />
            ) : (
              <Coins className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="text-center space-y-1 w-full">
            <div className="flex items-center justify-center gap-2">
              <p className="font-semibold text-lg">{coin.symbol || 'Unknown'}</p>
              {totalOfType && totalOfType > 1 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {totalOfType} objects
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold">{formattedBalance}</p>
            <p className="text-xs text-muted-foreground">{coin.name}</p>
            {coin.priceUsd && (
              <p className="text-xs text-muted-foreground">
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
        <div className="space-y-3">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {nft.imageUrl && !imageError ? (
              <img
                src={nft.imageUrl}
                alt={nft.name || 'NFT'}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            {/* Show collection count badge */}
            {totalOfType && totalOfType > 1 && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs px-2 py-1 bg-black/70 backdrop-blur-sm">
                  {totalOfType} NFTs
                </Badge>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="font-semibold truncate">{nft.name || 'Unnamed NFT'}</p>
            {totalOfType && totalOfType > 1 && (
              <p className="text-xs text-muted-foreground">
                {nft.moduleName} Collection
              </p>
            )}
            {nft.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{nft.description}</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-muted-foreground">?</span>
        </div>
        <p className="font-medium">{item.object.name || 'Unknown Object'}</p>
      </div>
    )
  }

  return (
    <Card
      className={cn(
        'relative transition-all cursor-pointer hover:shadow-md',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isHidden && 'opacity-50'
      )}
      onClick={() => onSelect(!isSelected)}
    >
      <CardContent className="p-4">
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onSelect(e.target.checked)
            }}
            className="w-4 h-4 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              handleToggleHide()
            }}
          >
            {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>

        <div className="pt-8">
          {renderObjectContent()}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant={getClassificationVariant()} className="gap-1">
              {getClassificationIcon()}
              {item.classification}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.object.objectType}
            </Badge>
          </div>

          {item.classificationReason && (
            <p className="text-xs text-muted-foreground">{item.classificationReason}</p>
          )}

          {item.object.objectType === ObjectType.NFT && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span title={(item.object as NFTObject).packageId}>
                {truncateAddress((item.object as NFTObject).packageId, 6)}
              </span>
              {(item.object as NFTObject).projectUrl && (
                <a
                  href={(item.object as NFTObject).projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}