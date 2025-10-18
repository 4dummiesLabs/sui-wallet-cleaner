import { ClassifiedObject } from '@/types/objects'

const DB_NAME = 'sui-wallet-cache'
const DB_VERSION = 1
const OBJECTS_STORE = 'wallet-objects'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface CachedData {
  address: string
  objects: ClassifiedObject[]
  timestamp: number
}

export class CacheService {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === 'undefined') return

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(OBJECTS_STORE)) {
          const store = db.createObjectStore(OBJECTS_STORE, { keyPath: 'address' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  async getCachedObjects(address: string): Promise<ClassifiedObject[] | null> {
    if (!this.db) await this.init()
    if (!this.db) return null

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([OBJECTS_STORE], 'readonly')
      const store = transaction.objectStore(OBJECTS_STORE)
      const request = store.get(address)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const data: CachedData | undefined = request.result

        if (!data) {
          resolve(null)
          return
        }

        // Check if cache is still valid
        const age = Date.now() - data.timestamp
        if (age > CACHE_DURATION) {
          // Cache expired, delete it
          this.deleteCachedObjects(address)
          resolve(null)
          return
        }

        resolve(data.objects)
      }
    })
  }

  async setCachedObjects(address: string, objects: ClassifiedObject[]): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([OBJECTS_STORE], 'readwrite')
      const store = transaction.objectStore(OBJECTS_STORE)

      const data: CachedData = {
        address,
        objects,
        timestamp: Date.now(),
      }

      const request = store.put(data)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async deleteCachedObjects(address: string): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([OBJECTS_STORE], 'readwrite')
      const store = transaction.objectStore(OBJECTS_STORE)
      const request = store.delete(address)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async removeObjectsFromCache(address: string, objectIds: string[]): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    const cached = await this.getCachedObjects(address)
    if (!cached) return

    // Filter out the burned/transferred objects
    const updated = cached.filter(obj => !objectIds.includes(obj.object.id))

    // Save back to cache
    await this.setCachedObjects(address, updated)
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([OBJECTS_STORE], 'readwrite')
      const store = transaction.objectStore(OBJECTS_STORE)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}

export const cacheService = new CacheService()
