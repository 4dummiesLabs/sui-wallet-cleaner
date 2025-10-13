'use client'

import WalletButton from '@/components/WalletButton'
import ObjectGrid from '@/components/ObjectGrid'
import { useWalletObjects } from '@/hooks/useObjects'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Shield, Scan, Settings, Info } from 'lucide-react'

export default function Home() {
  const account = useCurrentAccount()
  const { data: objects = [], isLoading, error } = useWalletObjects()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Sui Wallet Cleaner</h1>
                <p className="text-sm text-muted-foreground">Secure wallet management</p>
              </div>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!account ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">
                  Secure Your Sui Wallet
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Scan, analyze, and manage all objects in your wallet including NFTs, coins, and other assets
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Scan className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg">Comprehensive Scanning</CardTitle>
                  <CardDescription>
                    Analyze all objects in your wallet including NFTs, coins, staked assets, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-lg">Smart Classification</CardTitle>
                  <CardDescription>
                    Automatically identify verified, safe, suspicious, and dangerous objects using advanced analysis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">Bulk Actions</CardTitle>
                  <CardDescription>
                    Hide, transfer, or manage multiple objects at once with powerful bulk operations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Security Notice */}
            <Alert className="mb-8">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Notice:</strong> Always verify transactions before signing. This tool provides analysis 
                to help identify potential risks, but you should always exercise caution when interacting with unknown assets.
              </AlertDescription>
            </Alert>

            {/* Connect CTA */}
            <div className="text-center">
              <WalletButton />
              <p className="text-sm text-muted-foreground mt-2">
                Connect your Sui wallet to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Connected Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Wallet Analysis</h2>
                <p className="text-muted-foreground">
                  Review and manage all objects in your wallet
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Protected
                </Badge>
              </div>
            </div>

            {/* Objects Grid */}
            <ObjectGrid objects={objects} isLoading={isLoading} error={error} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Built for the Sui ecosystem</p>
            <div className="flex items-center gap-4">
              <a 
                href="https://sui.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Sui Network
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Open Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}