import { create } from 'zustand'
import { ClassifiedObject, ObjectType, ObjectClassification } from '@/types/objects'

interface WalletState {
  // Current wallet objects
  objects: ClassifiedObject[]
  isLoading: boolean
  error: Error | null
  
  // UI state
  selectedObjects: Set<string>
  filterType: ObjectType | 'all'
  filterClassification: ObjectClassification | 'all'
  hiddenObjects: Set<string>
  showTransferDialog: boolean
  showBurnDialog: boolean
  
  // User preferences (persisted)
  preferences: {
    defaultFilter: ObjectType | 'all'
    autoHideSmallBalances: boolean
    showPrices: boolean
  }
  
  // Actions
  setObjects: (objects: ClassifiedObject[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  
  // Selection actions
  selectObject: (objectId: string, selected: boolean) => void
  selectAll: (objectIds: string[]) => void
  clearSelection: () => void
  
  // Filter actions
  setFilterType: (filterType: ObjectType | 'all') => void
  setFilterClassification: (filterClassification: ObjectClassification | 'all') => void
  
  // Hide actions
  toggleHide: (objectId: string) => void
  bulkHide: (objectIds: string[]) => void
  
  // Dialog actions
  setShowTransferDialog: (show: boolean) => void
  setShowBurnDialog: (show: boolean) => void
  
  // Preference actions
  updatePreferences: (preferences: Partial<WalletState['preferences']>) => void
  
  // Computed values
  getFilteredObjects: () => ClassifiedObject[]
  getStats: () => {
    total: number
    byType: Record<ObjectType, number>
    byClassification: Record<ObjectClassification, number>
  }
}

export const useWalletStore = create<WalletState>((set, get) => ({
  // Initial state
  objects: [],
  isLoading: false,
  error: null,
  
  selectedObjects: new Set<string>(),
  filterType: 'all',
  filterClassification: 'all',
  hiddenObjects: new Set<string>(),
  showTransferDialog: false,
  showBurnDialog: false,
  
  preferences: {
    defaultFilter: 'all',
    autoHideSmallBalances: false,
    showPrices: true
  },
  
  // Object actions
  setObjects: (objects) => set({ objects }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Selection actions
  selectObject: (objectId, selected) => set((state) => {
    const newSet = new Set(state.selectedObjects)
    if (selected) {
      newSet.add(objectId)
    } else {
      newSet.delete(objectId)
    }
    return { selectedObjects: newSet }
  }),
  
  selectAll: (objectIds) => set((state) => {
    const isAllSelected = state.selectedObjects.size === objectIds.length
    return {
      selectedObjects: isAllSelected ? new Set() : new Set(objectIds)
    }
  }),
  
  clearSelection: () => set({ selectedObjects: new Set() }),
  
  // Filter actions
  setFilterType: (filterType) => set({ filterType }),
  setFilterClassification: (filterClassification) => set({ filterClassification }),
  
  // Hide actions
  toggleHide: (objectId) => set((state) => {
    const newSet = new Set(state.hiddenObjects)
    if (newSet.has(objectId)) {
      newSet.delete(objectId)
    } else {
      newSet.add(objectId)
    }
    return { hiddenObjects: newSet }
  }),
  
  bulkHide: (objectIds) => set((state) => {
    const newSet = new Set(state.hiddenObjects)
    objectIds.forEach(id => newSet.add(id))
    return { 
      hiddenObjects: newSet,
      selectedObjects: new Set()
    }
  }),
  
  // Dialog actions
  setShowTransferDialog: (showTransferDialog) => set({ showTransferDialog }),
  setShowBurnDialog: (showBurnDialog) => set({ showBurnDialog }),
  
  // Preference actions
  updatePreferences: (newPreferences) => set((state) => ({
    preferences: { ...state.preferences, ...newPreferences }
  })),
  
  // Computed values
  getFilteredObjects: () => {
    const { objects, filterType, filterClassification } = get()
    let filtered = objects

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.object.objectType === filterType)
    }

    if (filterClassification !== 'all') {
      filtered = filtered.filter(item => item.classification === filterClassification)
    }

    return filtered
  },
  
  getStats: () => {
    const { objects } = get()
    
    const byType = objects.reduce((acc, item) => {
      acc[item.object.objectType] = (acc[item.object.objectType] || 0) + 1
      return acc
    }, {} as Record<ObjectType, number>)

    const byClassification = objects.reduce((acc, item) => {
      acc[item.classification] = (acc[item.classification] || 0) + 1
      return acc
    }, {} as Record<ObjectClassification, number>)

    return {
      total: objects.length,
      byType,
      byClassification,
    }
  }
}))

// Selectors for better performance
export const useSelectedObjects = () => useWalletStore(state => state.selectedObjects)
export const useFilteredObjects = () => useWalletStore(state => state.getFilteredObjects())
export const useWalletStats = () => useWalletStore(state => state.getStats())