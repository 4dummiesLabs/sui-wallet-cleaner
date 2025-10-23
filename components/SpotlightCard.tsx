'use client'

import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(0, 255, 255, 0.8)' // Bright cyan color with high opacity
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    
    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    divRef.current.style.setProperty('--mouse-x', `${x}px`)
    divRef.current.style.setProperty('--mouse-y', `${y}px`)
    divRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        'before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300',
        'before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color),transparent_40%)]',
        'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300',
        'after:bg-[radial-gradient(300px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_60%)]',
        'after:backdrop-blur-sm',
        'hover:before:opacity-100 hover:after:opacity-100',
        'focus-within:before:opacity-100 focus-within:after:opacity-100',
        className
      )}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': spotlightColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}