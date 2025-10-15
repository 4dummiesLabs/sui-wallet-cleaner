import { SuiClient } from '@mysten/sui/client'
import { cache } from '@/lib/cache'
import { CircuitBreaker } from '@/lib/circuit-breaker'

export interface CoinMetadata {
  coinType: string
  symbol: string
  name: string
  decimals: number
  iconUrl?: string
  description?: string
  website?: string
  coingeckoId?: string
}

export class CoinMetadataService {
  private client: SuiClient
  private metadataCache = new Map<string, CoinMetadata>()
  private priceCircuitBreaker: CircuitBreaker

  constructor(client: SuiClient) {
    this.client = client
    this.priceCircuitBreaker = new CircuitBreaker({
      failureThreshold: 3,
      timeout: 10000, // 10 seconds
      resetTimeout: 60000 // 1 minute
    })
  }

  async getCoinMetadata(coinType: string): Promise<CoinMetadata> {
    // Check cache first
    if (this.metadataCache.has(coinType)) {
      return this.metadataCache.get(coinType)!
    }

    // Check known coins first
    const knownCoin = this.getKnownCoinMetadata(coinType)
    if (knownCoin) {
      this.metadataCache.set(coinType, knownCoin)
      return knownCoin
    }

    // Try to fetch from Sui network
    try {
      const metadata = await this.fetchCoinMetadataFromSui(coinType)
      if (metadata) {
        this.metadataCache.set(coinType, metadata)
        return metadata
      }
    } catch (error) {
      console.warn(`Failed to fetch metadata for ${coinType}:`, error)
    }

    // Fallback to basic metadata
    const fallback = this.getFallbackMetadata(coinType)
    this.metadataCache.set(coinType, fallback)
    return fallback
  }

  private getKnownCoinMetadata(coinType: string): CoinMetadata | null {
    const knownCoins: Record<string, CoinMetadata> = {
      '0x2::sui::SUI': {
        coinType: '0x2::sui::SUI',
        symbol: 'SUI',
        name: 'Sui',
        decimals: 9,
        iconUrl: 'https://raw.githubusercontent.com/MystenLabs/sui/main/apps/wallet/public/sui-icon.svg',
        description: 'The native token of the Sui blockchain',
        website: 'https://sui.io',
        coingeckoId: 'sui'
      },
      '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN': {
        coinType: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        iconUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
        description: 'Fully reserved digital dollar',
        website: 'https://centre.io',
        coingeckoId: 'usd-coin'
      },
      '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN': {
        coinType: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: 6,
        iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
        description: 'Tether USD stablecoin',
        website: 'https://tether.to',
        coingeckoId: 'tether'
      },
      '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN': {
        coinType: '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN',
        symbol: 'WETH',
        name: 'Wrapped Ethereum',
        decimals: 8,
        iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
        description: 'Wrapped Ethereum on Sui',
        coingeckoId: 'weth'
      },
      '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN': {
        coinType: '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
        iconUrl: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg',
        description: 'Wrapped Bitcoin on Sui',
        coingeckoId: 'wrapped-bitcoin'
      },
      '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN': {
        coinType: '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN',
        symbol: 'WSOL',
        name: 'Wrapped Solana',
        decimals: 8,
        iconUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
        description: 'Wrapped Solana on Sui',
        coingeckoId: 'solana'
      },
      '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fudcoin::FUDCOIN': {
        coinType: '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fudcoin::FUDCOIN',
        symbol: 'FUD',
        name: 'FUD Coin',
        decimals: 5,
        iconUrl: 'https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fudcoin::fudcoin.png?size=lg',
        description: 'FUD the Pug meme coin on Sui'
      },
      '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::seasui::SEASUI': {
        coinType: '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::seasui::SEASUI',
        symbol: 'SEASUI',
        name: 'Sea Sui',
        decimals: 6,
        iconUrl: 'https://dd.dexscreener.com/ds-data/tokens/sui/0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::seasui::seasui.png?size=lg',
        description: 'Sea Sui meme coin'
      },
      '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT': {
        coinType: '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT',
        symbol: 'CERT',
        name: 'Certificate Token',
        decimals: 9,
        iconUrl: 'https://dd.dexscreener.com/ds-data/tokens/sui/0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::cert.png?size=lg',
        description: 'Certificate Token on Sui'
      }
    }

    return knownCoins[coinType] || null
  }

  private async fetchCoinMetadataFromSui(coinType: string): Promise<CoinMetadata | null> {
    try {
      const metadata = await this.client.getCoinMetadata({ coinType })
      
      if (metadata) {
        return {
          coinType,
          symbol: metadata.symbol || this.extractSymbolFromType(coinType),
          name: metadata.name || 'Unknown Coin',
          decimals: metadata.decimals || 9,
          iconUrl: metadata.iconUrl || this.generateFallbackIcon(metadata.symbol || 'UNKNOWN'),
          description: metadata.description,
        }
      }
    } catch (error) {
      // Metadata might not exist, continue to fallback
    }

    return null
  }

  private getFallbackMetadata(coinType: string): CoinMetadata {
    const symbol = this.extractSymbolFromType(coinType)
    
    return {
      coinType,
      symbol,
      name: this.formatSymbolToName(symbol),
      decimals: 9,
      iconUrl: this.generateFallbackIcon(symbol),
      description: `${symbol} token on Sui network`
    }
  }

  private extractSymbolFromType(coinType: string): string {
    // Extract symbol from coin type
    const parts = coinType.split('::')
    const lastPart = parts[parts.length - 1]
    
    // Handle common patterns
    if (lastPart === 'COIN') {
      // Try to get from second to last part
      return parts[parts.length - 2]?.toUpperCase() || 'UNKNOWN'
    }
    
    return lastPart.toUpperCase()
  }

  private formatSymbolToName(symbol: string): string {
    // Convert SYMBOL to Title Case
    return symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase()
  }

  private generateFallbackIcon(symbol: string): string {
    // Generate a simple colored circle with the symbol
    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6366F1'
    ]
    
    const colorIndex = symbol.charCodeAt(0) % colors.length
    const color = colors[colorIndex]
    
    // Return a simple SVG data URL
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="${color}"/>
        <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
          ${symbol.charAt(0)}
        </text>
      </svg>
    `
    
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  // Method to get coin price from external API with caching and circuit breaker
  async getCoinPrice(coingeckoId: string): Promise<number | null> {
    const cacheKey = `price_${coingeckoId}`
    
    // Check cache first (5 minute TTL)
    const cachedPrice = cache.get<number>(cacheKey)
    if (cachedPrice !== null) {
      return cachedPrice
    }

    try {
      const price = await this.priceCircuitBreaker.call(async () => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        const usdPrice = data[coingeckoId]?.usd
        
        if (typeof usdPrice !== 'number') {
          throw new Error(`Invalid price data for ${coingeckoId}`)
        }
        
        return usdPrice
      })

      // Cache successful result for 5 minutes
      cache.set(cacheKey, price, 300000)
      return price
    } catch (error) {
      console.warn(`Failed to fetch price for ${coingeckoId}:`, error)
      
      // Return cached stale data if available (up to 1 hour old)
      const staleCacheKey = `stale_price_${coingeckoId}`
      const stalePrice = cache.get<number>(staleCacheKey)
      if (stalePrice !== null) {
        return stalePrice
      }
      
      return null
    }
  }

  // Batch fetch multiple coin prices
  async getBatchCoinPrices(coingeckoIds: string[]): Promise<Record<string, number | null>> {
    if (coingeckoIds.length === 0) return {}
    
    const results: Record<string, number | null> = {}
    const uncachedIds: string[] = []
    
    // Check cache for each ID
    for (const id of coingeckoIds) {
      const cacheKey = `price_${id}`
      const cachedPrice = cache.get<number>(cacheKey)
      if (cachedPrice !== null) {
        results[id] = cachedPrice
      } else {
        uncachedIds.push(id)
      }
    }
    
    // Fetch uncached prices in batch
    if (uncachedIds.length > 0) {
      try {
        const batchData = await this.priceCircuitBreaker.call(async () => {
          const idsParam = uncachedIds.join(',')
          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd`
          )
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          return response.json()
        })

        // Cache and store results
        for (const id of uncachedIds) {
          const price = batchData[id]?.usd || null
          results[id] = price
          
          if (price !== null) {
            cache.set(`price_${id}`, price, 300000) // 5 minutes
            cache.set(`stale_price_${id}`, price, 3600000) // 1 hour for stale data
          }
        }
      } catch (error) {
        console.warn('Failed to fetch batch prices:', error)
        // Fill remaining with null
        for (const id of uncachedIds) {
          if (!(id in results)) {
            results[id] = null
          }
        }
      }
    }
    
    return results
  }
}