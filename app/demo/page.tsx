'use client'

import { useState } from 'react'
import { ClassifiedObject, ObjectType, ObjectClassification } from '@/types/objects'
import ObjectGrid from '@/components/ObjectGrid'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

// Mock data for demonstration
const mockObjects: ClassifiedObject[] = [
  {
    object: {
      id: '0x1234567890abcdef1234567890abcdef12345678',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.NFT,
      name: 'Sui Punk #1337',
      description: 'A rare Sui Punk NFT',
      imageUrl: 'https://via.placeholder.com/150/4B5563/C0E6FF?text=NFT',
      metadata: {
        collection: 'Sui Punks',
        rarity: 'Legendary'
      }
    },
    classification: ObjectClassification.VERIFIED,
    riskFactors: []
  },
  {
    object: {
      id: '0xfedcba0987654321fedcba0987654321fedcba09',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.COIN,
      name: 'SUI',
      symbol: 'SUI',
      balance: '1000000000',
      decimals: 9,
      iconUrl: 'https://via.placeholder.com/40/4B5563/C0E6FF?text=SUI'
    },
    classification: ObjectClassification.VERIFIED,
    riskFactors: []
  },
  {
    object: {
      id: '0x9876543210fedcba9876543210fedcba98765432',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.NFT,
      name: 'Unknown NFT #42',
      description: 'Unverified NFT from unknown collection',
      imageUrl: 'https://via.placeholder.com/150/8B5563/FFE6C0?text=?',
    },
    classification: ObjectClassification.WARNING,
    riskFactors: ['Unverified collection', 'No trading history']
  },
  {
    object: {
      id: '0xaaaabbbbccccddddeeeeffffaaaabbbbccccdddd',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.COIN,
      name: 'SCAM Token',
      symbol: 'SCAM',
      balance: '999999999999',
      decimals: 6,
      iconUrl: 'https://via.placeholder.com/40/FF5563/FFFFFF?text=!'
    },
    classification: ObjectClassification.DANGER,
    riskFactors: ['Known scam token', 'Malicious contract']
  },
  {
    object: {
      id: '0x1111222233334444555566667777888899990000',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.STAKED_SUI,
      name: 'Staked SUI',
      description: 'SUI staked with validator',
      balance: '5000000000',
      decimals: 9,
    },
    classification: ObjectClassification.SAFE,
    riskFactors: []
  },
  {
    object: {
      id: '0xbbbbccccddddeeeeffffbbbbccccddddeeeeaaaa',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.NFT,
      name: 'Cool Cat #999',
      description: 'Part of Cool Cats collection',
      imageUrl: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=CAT',
    },
    classification: ObjectClassification.SAFE,
    riskFactors: []
  },
  {
    object: {
      id: '0xccccddddeeeeffffaaaabbbbccccddddeeee1111',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.OBJECT,
      name: 'Game Item: Sword',
      description: 'A powerful sword from Sui Quest',
    },
    classification: ObjectClassification.UNCLASSIFIED,
    riskFactors: []
  },
  {
    object: {
      id: '0xddddeeeeffffaaaabbbbccccddddeeeeffffbbbb',
      owner: '0xabcdef1234567890abcdef1234567890abcdef12',
      objectType: ObjectType.KIOSK,
      name: 'Personal Kiosk',
      description: 'Your personal trading kiosk',
    },
    classification: ObjectClassification.SAFE,
    riskFactors: []
  }
]

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [objects, setObjects] = useState(mockObjects)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate adding a new random object
      const newObject: ClassifiedObject = {
        object: {
          id: `0x${Math.random().toString(16).substr(2, 40)}`,
          owner: '0xabcdef1234567890abcdef1234567890abcdef12',
          objectType: Math.random() > 0.5 ? ObjectType.NFT : ObjectType.COIN,
          name: `New Asset #${Math.floor(Math.random() * 1000)}`,
          description: 'Newly discovered asset',
        },
        classification: [
          ObjectClassification.VERIFIED,
          ObjectClassification.SAFE,
          ObjectClassification.WARNING,
          ObjectClassification.DANGER,
          ObjectClassification.UNCLASSIFIED
        ][Math.floor(Math.random() * 5)],
        riskFactors: []
      }
      setObjects([...objects, newObject])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-deep-ocean text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">Demo Mode</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                Demo Wallet: 0xabcd...ef12
              </Badge>
              <Button onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Objects
              </Button>
            </div>
          </div>
          
          <Card className="bg-ocean/50 border-aqua/30 p-4">
            <p className="text-aqua mb-2">
              🎮 Demo Mode Active - Testing Community Features
            </p>
            <p className="text-sm text-muted-foreground">
              This is a demonstration page showing how the community rating system works. 
              Select some objects and click "Ask Community" to see the voting interface.
            </p>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-ocean/50 border-white/10 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">How to test:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Select one or more objects using the checkboxes</li>
            <li>Click the "Ask Community" button that appears</li>
            <li>Vote with thumbs up/down on each object</li>
            <li>Switch to the "Legitimacy List" tab to see community-voted safe/risky objects</li>
            <li>The "Burn" button is also available for selected dangerous objects</li>
          </ol>
        </Card>

        {/* Object Grid */}
        <ObjectGrid 
          objects={objects} 
          isLoading={isLoading} 
          error={null} 
        />
      </div>
    </div>
  )
}