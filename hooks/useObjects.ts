'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { ObjectService } from '@/services/objectService'
import { ClassifiedObject } from '@/types/objects'
import { cacheService } from '@/services/cacheService'
import { useState, useEffect, useCallback, useRef } from 'react'

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

/**
 * Hook for paginated object fetching
 */
export function useWalletObjectsPaginated() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const [objects, setObjects] = useState<ClassifiedObject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const cursorRef = useRef<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const loadedPagesRef = useRef<Set<number>>(new Set())
  const objectsByPageRef = useRef<Map<number, ClassifiedObject[]>>(new Map())
  
  const PAGE_SIZE = 100
  
  // Load a specific page
  const loadPage = useCallback(async (pageNumber: number) => {
    if (!account?.address) return
    
    // Check if page is already loaded
    if (loadedPagesRef.current.has(pageNumber)) {
      console.log(`📦 Page ${pageNumber} already loaded`)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const objectService = new ObjectService(client)
      
      // Calculate how many objects to skip
      const skipCount = pageNumber * PAGE_SIZE
      let tempCursor: string | null = null
      let skipped = 0
      
      // Skip to the right page if needed
      if (pageNumber > 0) {
        // We need to skip objects to get to the right page
        // This is a limitation of the Sui API - we need to iterate through
        // For now, we'll fetch from the beginning each time
        // In a production app, you'd want to cache cursors for each page
        console.log(`⏭️ Skipping to page ${pageNumber} (${skipCount} objects)`)
      }
      
      // Fetch the page
      console.log(`📡 Fetching page ${pageNumber + 1}`)
      const result = await objectService.fetchWalletObjectsPage(
        account.address,
        PAGE_SIZE,
        tempCursor
      )
      
      // Classify the objects
      const classifiedObjects = objectService.classifyObjects(result.objects)
      
      // Store the page
      objectsByPageRef.current.set(pageNumber, classifiedObjects)
      loadedPagesRef.current.add(pageNumber)
      
      // Update cursor for next page
      cursorRef.current = result.nextCursor
      setHasMore(result.hasMore)
      
      // Update the main objects array
      const allObjects: ClassifiedObject[] = []
      for (let i = 0; i <= pageNumber; i++) {
        const pageObjects = objectsByPageRef.current.get(i) || []
        allObjects.push(...pageObjects)
      }
      setObjects(allObjects)
      
      console.log(`✅ Loaded page ${pageNumber + 1} with ${classifiedObjects.length} objects`)
      
      // Preload next page if exists
      if (result.hasMore && pageNumber < currentPage + 1) {
        console.log(`🔮 Preloading page ${pageNumber + 2}`)
        setTimeout(() => loadPage(pageNumber + 1), 100)
      }
    } catch (err) {
      console.error('Error loading page:', err)
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [account?.address, client, currentPage])
  
  // Load initial page on mount
  useEffect(() => {
    if (account?.address) {
      // Reset state on account change
      setObjects([])
      loadedPagesRef.current.clear()
      objectsByPageRef.current.clear()
      cursorRef.current = null
      setCurrentPage(0)
      setHasMore(true)
      
      // Load first page
      loadPage(0)
    }
  }, [account?.address])
  
  // Load next page when current page changes
  useEffect(() => {
    if (account?.address && currentPage > 0) {
      loadPage(currentPage)
    }
  }, [currentPage, account?.address, loadPage])
  
  const refetch = useCallback(() => {
    // Clear everything and reload
    setObjects([])
    loadedPagesRef.current.clear()
    objectsByPageRef.current.clear()
    cursorRef.current = null
    setCurrentPage(0)
    setHasMore(true)
    loadPage(0)
  }, [loadPage])
  
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])
  
  return {
    data: objects,
    isLoading,
    error,
    refetch,
    hasMore,
    currentPage,
    goToPage,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(objects.length / PAGE_SIZE) + (hasMore ? 1 : 0)
  }
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