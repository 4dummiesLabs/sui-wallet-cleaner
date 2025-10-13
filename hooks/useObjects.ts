'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { ObjectService } from '@/services/objectService'
import { ClassifiedObject } from '@/types/objects'

export function useWalletObjects() {
  const account = useCurrentAccount()
  const client = useSuiClient()

  return useQuery<ClassifiedObject[], Error>({
    queryKey: ['wallet-objects', account?.address],
    queryFn: async () => {
      if (!account?.address) {
        throw new Error('No wallet connected')
      }

      const objectService = new ObjectService(client)
      const objects = await objectService.fetchWalletObjects(account.address)
      const classifiedObjects = objectService.classifyObjects(objects)
      
      return classifiedObjects
    },
    enabled: !!account?.address,
    staleTime: 30000, // 30 seconds
    retry: 2,
  })
}