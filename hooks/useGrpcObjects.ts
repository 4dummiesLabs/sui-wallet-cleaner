'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { EnhancedObjectService } from '@/services/enhancedObjectService'
import { useMemo } from 'react'

export function useEnhancedWalletObjects() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  
  // Create enhanced service instance, memoized to avoid recreation
  const enhancedService = useMemo(() => {
    return new EnhancedObjectService(client)
  }, [client])

  return useQuery({
    queryKey: ['enhanced-wallet-objects', account?.address],
    queryFn: async () => {
      if (!account?.address) {
        throw new Error('No wallet connected')
      }

      try {
        console.log('🚀 Using enhanced object fetching for:', account.address)
        const classifiedObjects = await enhancedService.fetchWalletObjects(account.address)
        
        return {
          address: account.address,
          classifiedObjects,
          totalObjects: classifiedObjects.length
        }
      } catch (error) {
        console.error('❌ Enhanced fetch error:', error)
        throw error
      }
    },
    enabled: !!account?.address,
    staleTime: 30000, // 30 seconds
    retry: 3,
  })
}

export function useWalletStats() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  
  const enhancedService = useMemo(() => {
    return new EnhancedObjectService(client)
  }, [client])

  return useQuery({
    queryKey: ['wallet-stats', account?.address],
    queryFn: async () => {
      if (!account?.address) {
        throw new Error('No wallet connected')
      }

      try {
        const stats = await enhancedService.getWalletStats(account.address)
        return stats
      } catch (error) {
        console.error('❌ Stats fetch error:', error)
        throw error
      }
    },
    enabled: !!account?.address,
    staleTime: 60000, // 1 minute for stats
    retry: 2,
  })
}