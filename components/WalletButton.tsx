'use client'

import { 
  useCurrentAccount, 
  useDisconnectWallet,
  useWallets,
  useConnectWallet
} from '@mysten/dapp-kit'
import { truncateAddress } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LogOut, Wallet } from 'lucide-react'
import { useState } from 'react'

export default function WalletButton() {
  const account = useCurrentAccount()
  const { mutate: disconnect } = useDisconnectWallet()
  const wallets = useWallets()
  const { mutate: connect } = useConnectWallet()
  const [open, setOpen] = useState(false)

  const handleWalletSelect = (wallet: any) => {
    connect(
      { wallet },
      {
        onSuccess: () => {
          setOpen(false)
        },
        onError: (error) => {
          console.error('Failed to connect wallet:', error)
        }
      }
    )
  }

  if (account) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="px-4 py-2 gap-2 text-base font-['Satoshi'] font-medium">
          <Wallet className="w-5 h-5" />
          {truncateAddress(account.address)}
        </Badge>
        <Button
          variant="outline"
          size="icon"
          onClick={() => disconnect()}
          className="h-11 w-11"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-3 bg-aqua text-deep-ocean hover:bg-aqua/90 font-bold text-lg px-8 py-6">
          <Wallet className="w-6 h-6" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-aqua border-aqua">
        <DialogHeader>
          <DialogTitle className="text-deep-ocean">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {wallets.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-deep-ocean/70">No Sui wallets detected</p>
              <p className="text-sm text-deep-ocean/70">
                Please install a Sui wallet extension:
              </p>
              <div className="space-y-2">
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-deep-ocean hover:text-deep-ocean/80 hover:underline text-sm font-medium"
                >
                  Sui Wallet →
                </a>
                <a 
                  href="https://suiet.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-deep-ocean hover:text-deep-ocean/80 hover:underline text-sm font-medium"
                >
                  Suiet Wallet →
                </a>
                <a 
                  href="https://ethoswallet.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-deep-ocean hover:text-deep-ocean/80 hover:underline text-sm font-medium"
                >
                  Ethos Wallet →
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 bg-deep-ocean/5 border-deep-ocean/20 text-deep-ocean hover:bg-deep-ocean/10"
                  onClick={() => handleWalletSelect(wallet)}
                >
                  {wallet.icon && (
                    <img 
                      src={wallet.icon} 
                      alt={wallet.name}
                      className="w-6 h-6 rounded"
                    />
                  )}
                  <span>{wallet.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}