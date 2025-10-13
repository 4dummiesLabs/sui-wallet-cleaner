'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { NFTService, approvedPackagesList } from '@/services/nftService'
import { ClassifiedNFT } from '@/types/nft'

export function useNFTs() {
  const account = useCurrentAccount()
  const client = useSuiClient()

  return useQuery<ClassifiedNFT[], Error>({
    queryKey: ['nfts', account?.address],
    queryFn: async () => {
      if (!account?.address) {
        throw new Error('No wallet connected')
      }

      const nftService = new NFTService(client)
      const nfts = await nftService.fetchUserNFTs(account.address)
      const classifiedNFTs = nftService.classifyNFTs(nfts, approvedPackagesList)
      
      return classifiedNFTs
    },
    enabled: !!account?.address,
    staleTime: 30000,
    retry: 2,
  })
}