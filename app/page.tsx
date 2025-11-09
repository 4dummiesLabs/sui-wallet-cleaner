'use client'

import WalletButton from '@/components/WalletButton'
import CommunityVotesButton from '@/components/CommunityVotesButton'
import ObjectGrid from '@/components/ObjectGrid'
import LoadingProgress from '@/components/LoadingProgress'
import { useWalletObjects } from '@/hooks/useObjects'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scan, Shield, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const account = useCurrentAccount()
  const { data: objects = [], isLoading, error, refetch } = useWalletObjects()
  const [progress, setProgress] = useState<{ loaded: number; total: number } | null>(null)

  // Listen for progress updates
  useEffect(() => {
    const handleProgress = (event: CustomEvent) => {
      setProgress(event.detail)
    }

    window.addEventListener('fetch-progress' as any, handleProgress)

    return () => {
      window.removeEventListener('fetch-progress' as any, handleProgress)
    }
  }, [])

  return (
    <div className="min-h-screen bg-deep-ocean">
      {/* Header */}
      <header className="bg-ocean/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-cloud">Sui Wallet Cleaner</h1>
            </div>
            <div className="flex items-center gap-3">
              {account && <CommunityVotesButton />}
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {!account ? (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-8 py-20">
              <div className="space-y-4">
                <h2 className="text-7xl font-bold tracking-tight text-cloud">
                  Secure Your Sui Wallet
                </h2>
                <p className="text-3xl font-normal text-cloud/70 max-w-3xl mx-auto font-['Satoshi']">
                  Scan, analyze, and manage all objects in your wallet including NFTs, coins, and other assets
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
              <Card className="bg-ocean border-ocean/50 p-8">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-aqua/20 rounded-xl flex items-center justify-center mb-3">
                    <Scan className="w-8 h-8 text-aqua" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-cloud">Comprehensive Scanning</CardTitle>
                  <CardDescription className="text-lg text-cloud/70 leading-relaxed font-['Satoshi']">
                    Analyze all objects in your wallet including NFTs, coins, staked assets, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-ocean border-ocean/50 p-8">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-aqua/20 rounded-xl flex items-center justify-center mb-3">
                    <Shield className="w-8 h-8 text-aqua" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-cloud">Smart Classification</CardTitle>
                  <CardDescription className="text-lg text-cloud/70 leading-relaxed font-['Satoshi']">
                    Automatically identify verified, safe, suspicious, and dangerous objects using advanced analysis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-ocean border-ocean/50 p-8">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-aqua/20 rounded-xl flex items-center justify-center mb-3">
                    <Settings className="w-8 h-8 text-aqua" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-cloud">Bulk Actions</CardTitle>
                  <CardDescription className="text-lg text-cloud/70 leading-relaxed font-['Satoshi']">
                    Hide, transfer, or manage multiple objects at once with powerful bulk operations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>


          </div>
        ) : (
          <div className="space-y-6">
            {/* Connected Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-bold text-cloud">Wallet Analysis</h2>
                <p className="text-xl font-normal text-cloud/70 font-['Satoshi']">
                  Review and manage all objects in your wallet
                </p>
              </div>
            </div>

            {/* Objects Grid */}
            {isLoading && progress ? (
              <LoadingProgress loaded={progress.loaded} total={progress.total} />
            ) : (
              <ObjectGrid objects={objects} isLoading={isLoading} error={error} onRefresh={() => refetch()} />
            )}
          </div>
        )}
      </main>

    </div>
  )
}