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
        <Badge variant="secondary" className="px-3 py-1.5 gap-2">
          <Wallet className="w-4 h-4" />
          {truncateAddress(account.address)}
        </Badge>
        <Button
          variant="outline"
          size="icon"
          onClick={() => disconnect()}
          className="h-9 w-9"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby="wallet-dialog-description">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div id="wallet-dialog-description" className="sr-only">
          Choose a wallet to connect to your Sui account and access wallet management features
        </div>
        <div className="space-y-4">
          {wallets.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-muted-foreground">No Sui wallets detected</p>
              <p className="text-sm text-muted-foreground">
                Please install a Sui wallet extension:
              </p>
              <div className="space-y-2">
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-sm"
                >
                  Sui Wallet →
                </a>
                <a 
                  href="https://suiet.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-sm"
                >
                  Suiet Wallet →
                </a>
                <a 
                  href="https://ethoswallet.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-sm"
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
                  className="w-full justify-start gap-3 h-12"
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