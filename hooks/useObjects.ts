'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { ObjectService } from '@/services/objectService'
import { ClassifiedObject } from '@/types/objects'
import { cacheService } from '@/services/cacheService'
import { useState, useEffect } from 'react'

export function useWalletObjects() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const [progress, setProgress] = useState<{ loaded: number; total: number } | null>(null)

  return useQuery<ClassifiedObject[], Error>({
    queryKey: ['wallet-objects', account?.address],
    queryFn: async () => {
      if (!account?.address) {
        throw new Error('No wallet connected')
      }

      // Try to get from cache first
      console.log('🔍 Checking cache for', account.address)
      const cached = await cacheService.getCachedObjects(account.address)

      if (cached) {
        console.log('✅ Loaded', cached.length, 'objects from cache')
        return cached
      }

      console.log('📡 Fetching fresh data from blockchain')
      const objectService = new ObjectService(client)

      // Fetch with progress tracking
      const objects = await objectService.fetchWalletObjects(
        account.address,
        (loaded, total) => {
          setProgress({ loaded, total })
          // Dispatch event for parent components
          window.dispatchEvent(new CustomEvent('fetch-progress', {
            detail: { loaded, total }
          }))
        }
      )

      const classifiedObjects = objectService.classifyObjects(objects)

      // Cache the results
      console.log('💾 Caching', classifiedObjects.length, 'objects')
      await cacheService.setCachedObjects(account.address, classifiedObjects)

      setProgress(null)
      return classifiedObjects
    },
    enabled: !!account?.address,
    staleTime: Infinity, // Cache is managed by IndexedDB, not react-query
    gcTime: Infinity, // Keep in memory forever
    retry: 2,
  })
}

export function useLoadingProgress() {
  const [progress, setProgress] = useState<{ loaded: number; total: number } | null>(null)

  useEffect(() => {
    const handleProgress = (event: CustomEvent) => {
      setProgress(event.detail)
    }

    window.addEventListener('fetch-progress' as any, handleProgress)

    return () => {
      window.removeEventListener('fetch-progress' as any, handleProgress)
    }
  }, [])

  return progress
}