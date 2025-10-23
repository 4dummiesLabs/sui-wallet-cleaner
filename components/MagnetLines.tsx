'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MagnetLinesProps {
  rows?: number
  columns?: number
  containerSize?: string
  lineColor?: string
  lineWidth?: string
  lineHeight?: string
  baseAngle?: number
  className?: string
  style?: React.CSSProperties
}

export default function MagnetLines({
  rows = 12,
  columns = 12,
  containerSize = '100%',
  lineColor = 'rgba(192, 230, 255, 0.15)',
  lineWidth = '1px',
  lineHeight = '20px',
  baseAngle = -10,
  className = '',
  style = {}
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll('span')

    const onPointerMove = (event: PointerEvent) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2

        const b = event.clientX - centerX
        const a = event.clientY - centerY
        const c = Math.sqrt(a * a + b * b) || 1
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (event.clientY > centerY ? 1 : -1)

        ;(item as HTMLElement).style.setProperty('--rotate', `${r}deg`)
      })
    }

    window.addEventListener('pointermove', onPointerMove)

    // Initialize with center position
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2)
      const rect = items[middleIndex].getBoundingClientRect()
      onPointerMove({ clientX: rect.x, clientY: rect.y } as PointerEvent)
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  const total = rows * columns
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="transition-transform duration-75 ease-out origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transform: `rotate(${baseAngle}deg)`,
        borderRadius: '0.5px'
      } as React.CSSProperties}
    />
  ))

  return (
    <div
      ref={containerRef}
      className={cn('grid place-items-center gap-2', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  )
}