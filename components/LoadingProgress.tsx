'use client'

import { Progress } from '@/components/ui/progress'
import { Loader2 } from 'lucide-react'

interface LoadingProgressProps {
  loaded: number
  total: number
}

export default function LoadingProgress({ loaded, total }: LoadingProgressProps) {
  const percentage = total > 0 ? Math.round((loaded / total) * 100) : 0

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="inline-flex items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-aqua" />
        <span className="text-lg font-medium text-white">Loading your wallet objects...</span>
      </div>

      <div className="w-full max-w-md space-y-2">
        <Progress value={percentage} className="h-2" />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{loaded.toLocaleString()} / {total.toLocaleString()} objects</span>
          <span>{percentage}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground max-w-md text-center">
        Fetching objects in parallel batches for faster loading...
      </p>
    </div>
  )
}
