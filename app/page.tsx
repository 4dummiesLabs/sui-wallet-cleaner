'use client'

import WalletButton from '@/components/WalletButton'
import CommunityVotesButton from '@/components/CommunityVotesButton'
import ObjectGrid from '@/components/ObjectGrid'
import MagnetLines from '@/components/MagnetLines'
import SpotlightCard from '@/components/SpotlightCard'
import { useEnhancedWalletObjects } from '@/hooks/useGrpcObjects'
import { useCurrentAccount } from '@mysten/dapp-kit'

export default function Home() {
  const account = useCurrentAccount()
  const { data: walletData, isLoading, error, refetch } = useEnhancedWalletObjects()
  
  // Extract classified objects from wallet data for ObjectGrid
  const objects = walletData?.classifiedObjects || []

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--background-gradient)' }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MagnetLines 
          rows={20} 
          columns={20} 
          containerSize="120%" 
          lineColor="rgba(192, 230, 255, 0.08)"
          className="absolute -top-10 -left-10"
        />
      </div>
      
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      {/* Clean Sui Header */}
      <header className="relative sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto container-responsive py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Sui Droplet Logo */}
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-full h-full text-primary fill-current">
                  <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"/>
                  <path d="M16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z"/>
                </svg>
              </div>
              <div>
                <h1 className="heading-small text-foreground">Sui Wallet Manager</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="relative container mx-auto container-responsive section-spacing">
        {!account ? (
          <div className="max-w-4xl mx-auto">
            {/* Clean Hero Section */}
            <div className="text-center space-y-8 sm:space-y-12 py-12 sm:py-20">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="heading-display text-foreground">
                  Manage your Sui wallet
                </h2>
                <p className="body-large text-foreground-secondary max-w-2xl mx-auto px-4">
                  Comprehensive analysis and management tools for your Sui digital assets
                </p>
              </div>
            </div>

            {/* Enhanced Feature Grid */}
            <div className="responsive-grid mb-12 sm:mb-20" role="region" aria-label="Application features">
              <SpotlightCard className="sui-card-minimal text-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:scale-105" spotlightColor="rgba(0, 255, 255, 0.7)">
                <div tabIndex={0} role="article" aria-labelledby="feature-1" className="p-2">
                  <h3 id="feature-1" className="heading-small text-foreground mb-4">Asset Analysis</h3>
                  <p className="body-regular text-foreground-secondary">
                    Complete overview of all tokens, NFTs, and DeFi positions in your wallet
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard className="sui-card-minimal text-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:scale-105" spotlightColor="rgba(0, 255, 128, 0.7)">
                <div tabIndex={0} role="article" aria-labelledby="feature-2" className="p-2">
                  <h3 id="feature-2" className="heading-small text-foreground mb-4">Security Assessment</h3>
                  <p className="body-regular text-foreground-secondary">
                    Risk evaluation and security scoring for all wallet interactions
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard className="sui-card-minimal text-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:scale-105" spotlightColor="rgba(128, 0, 255, 0.7)">
                <div tabIndex={0} role="article" aria-labelledby="feature-3" className="p-2">
                  <h3 id="feature-3" className="heading-small text-foreground mb-4">Bulk Operations</h3>
                  <p className="body-regular text-foreground-secondary">
                    Efficient management tools for organizing and transferring assets
                  </p>
                </div>
              </SpotlightCard>
            </div>

            {/* Connect Section */}
            <div className="text-center space-y-8">
              <WalletButton />
              <p className="caption">
                Connect your Sui wallet to begin
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Clean Connected Header */}
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="heading-large text-foreground">Wallet Overview</h2>
              <p className="body-regular text-foreground-secondary">
                Review and manage all assets in your connected wallet
              </p>
            </div>

            {/* Objects Grid */}
            <ObjectGrid objects={objects} isLoading={isLoading} error={error} onRetry={() => refetch()} />
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="relative border-t border-white/10 mt-12 sm:mt-24">
        <div className="container mx-auto container-responsive py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <p className="caption">Built for the Sui ecosystem</p>
            <div className="flex items-center gap-6 sm:gap-8">
              <a 
                href="https://sui.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="caption hover:accent-text transition-colors touch-target"
                aria-label="Visit Sui Network official website"
              >
                Sui Network
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="caption hover:accent-text transition-colors touch-target"
                aria-label="Visit project repository on GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}