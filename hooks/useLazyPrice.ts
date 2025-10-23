import { useState, useEffect } from 'react'
import { cache } from '@/lib/cache'

interface UseLazyPriceOptions {
  delay?: number
  enabled?: boolean
}

export function useLazyPrice(
  coingeckoId: string | undefined,
  coinMetadataService: any,
  options: UseLazyPriceOptions = {}
) {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const { delay = 500, enabled = true } = options

  useEffect(() => {
    if (!coingeckoId || !enabled || !coinMetadataService) {
      return
    }

    const cacheKey = `price_${coingeckoId}`
    
    // Check cache first
    const cachedPrice = cache.get<number>(cacheKey)
    if (cachedPrice !== null) {
      setPrice(cachedPrice)
      return
    }

    // Add delay to prevent too many simultaneous requests
    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      setError(null)

      try {
        const fetchedPrice = await coinMetadataService.getCoinPrice(coingeckoId)
        setPrice(fetchedPrice)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch price'))
        setPrice(null)
      } finally {
        setIsLoading(false)
      }
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [coingeckoId, enabled, coinMetadataService, delay])

  return {
    price,
    isLoading,
    error
  }
}