import { memo } from 'react'
import { useLazyImage } from '@/hooks/useLazyImage'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src?: string
  alt: string
  className?: string
  fallback?: React.ReactNode
  placeholder?: React.ReactNode
  onError?: () => void
  onLoad?: () => void
}

function LazyImage({ 
  src, 
  alt, 
  className, 
  fallback, 
  placeholder,
  onError,
  onLoad
}: LazyImageProps) {
  const { ref, isLoaded, error, shouldLoad } = useLazyImage(src, {
    rootMargin: '100px', // Start loading when 100px away
    threshold: 0.1,
    fallbackDelay: Math.random() * 200 // Random delay to stagger requests
  })

  if (error && fallback) {
    onError?.()
    return <>{fallback}</>
  }

  if (!shouldLoad || !src) {
    return <div ref={ref} className={cn('bg-muted animate-pulse', className)} />
  }

  return (
    <div ref={ref} className={className}>
      {!isLoaded && placeholder && placeholder}
      <img
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ display: isLoaded ? 'block' : 'none' }}
        onLoad={() => {
          onLoad?.()
        }}
        onError={() => {
          onError?.()
        }}
        loading="lazy"
      />
    </div>
  )
}

export default memo(LazyImage)