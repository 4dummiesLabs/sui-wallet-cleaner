'use client'

import { ClassifiedObject } from '@/types/objects'
import ObjectCard from './ObjectCard'
import { useMemo, useState } from 'react'

interface VirtualizedObjectGridProps {
  objects: ClassifiedObject[]
  selectedObjects: Set<string>
  hiddenObjects: Set<string>
  onSelectObject: (objectId: string, selected: boolean) => void
  onToggleHide: (objectId: string) => void
  containerHeight: number
  containerWidth: number
}

export default function VirtualizedObjectGrid({
  objects,
  selectedObjects,
  hiddenObjects,
  onSelectObject,
  onToggleHide,
  containerHeight
}: VirtualizedObjectGridProps) {
  const [scrollTop, setScrollTop] = useState(0)

  const ITEM_HEIGHT = 340 // Card height + gap
  const ITEMS_PER_ROW = 5

  const totalRows = Math.ceil(objects.length / ITEMS_PER_ROW)
  const totalHeight = totalRows * ITEM_HEIGHT

  const startRow = Math.floor(scrollTop / ITEM_HEIGHT)
  const endRow = Math.min(totalRows, startRow + Math.ceil(containerHeight / ITEM_HEIGHT) + 1)

  const visibleObjects = useMemo(() => {
    const startIndex = startRow * ITEMS_PER_ROW
    const endIndex = Math.min(objects.length, endRow * ITEMS_PER_ROW)
    return objects.slice(startIndex, endIndex).map((obj, index) => ({
      ...obj,
      virtualIndex: startIndex + index
    }))
  }, [objects, startRow, endRow])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: startRow * ITEM_HEIGHT,
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            padding: '16px'
          }}
        >
          {visibleObjects.map((item) => (
            <ObjectCard
              key={item.object.id}
              item={{ ...item, isHidden: hiddenObjects.has(item.object.id) }}
              isSelected={selectedObjects.has(item.object.id)}
              onSelect={(selected) => onSelectObject(item.object.id, selected)}
              onToggleHide={onToggleHide}
            />
          ))}
        </div>
      </div>
    </div>
  )
}