import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12'
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
      {text && (
        <span className="text-sm text-muted-foreground" role="status" aria-live="polite">
          {text}
        </span>
      )}
    </div>
  )
}

export function LoadingSpinnerCentered({ size = 'lg', text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 space-y-4">
      <LoadingSpinner size={size} text={text} />
    </div>
  )
}

// Skeleton loading components for better perceived performance
export function ObjectCardSkeleton() {
  return (
    <div className="sui-card animate-pulse" role="status" aria-label="Loading object">
      <div className="space-y-4">
        {/* Image placeholder */}
        <div className="aspect-square bg-muted rounded-lg"></div>
        
        {/* Text placeholders */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
        
        {/* Footer placeholders */}
        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-muted rounded w-16"></div>
            <div className="h-3 bg-muted rounded w-12"></div>
          </div>
          <div className="h-3 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}

export function ObjectGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="responsive-grid" role="status" aria-label="Loading objects">
      {Array.from({ length: count }).map((_, i) => (
        <ObjectCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function StatsCardSkeleton() {
  return (
    <div className="sui-card animate-pulse" role="status" aria-label="Loading statistics">
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="h-8 bg-muted rounded w-2/3"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
    </div>
  )
}