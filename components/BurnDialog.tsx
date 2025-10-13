'use client'

import { useState } from 'react'
import { ClassifiedObject } from '@/types/objects'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Flame, AlertTriangle, CheckCircle, Skull } from 'lucide-react'
import { TransactionService } from '@/services/transactionService'

interface BurnDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
  onBurnComplete: () => void
  transactionService: TransactionService
  senderAddress: string
  onExecuteTransaction: (transaction: any) => Promise<any>
}

export default function BurnDialog({
  open,
  onOpenChange,
  selectedObjects,
  onBurnComplete,
  transactionService,
  senderAddress,
  onExecuteTransaction
}: BurnDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [transactionDigest, setTransactionDigest] = useState('')
  const [confirmationStep, setConfirmationStep] = useState(0)

  const handleBurn = async () => {
    if (confirmationStep < 2) {
      setConfirmationStep(confirmationStep + 1)
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await transactionService.burnObjects(
        {
          objects: selectedObjects.map(item => item.object),
          senderAddress,
        },
        onExecuteTransaction
      )

      if (result.success && result.digest) {
        setSuccess(true)
        setTransactionDigest(result.digest)
        setTimeout(() => {
          onBurnComplete()
          handleClose()
        }, 3000)
      } else {
        setError(result.error || 'Burn failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Burn failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setError('')
    setSuccess(false)
    setTransactionDigest('')
    setConfirmationStep(0)
    onOpenChange(false)
  }

  const objectTypeCounts = selectedObjects.reduce((acc, item) => {
    acc[item.object.objectType] = (acc[item.object.objectType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const getTotalValue = () => {
    return selectedObjects.reduce((total, item) => {
      if (item.object.objectType === 'coin') {
        const coin = item.object as any
        const balance = Number(coin.balance) / Math.pow(10, coin.decimals)
        return total + (coin.priceUsd ? balance * coin.priceUsd : 0)
      }
      return total
    }, 0)
  }

  const totalValue = getTotalValue()

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <DialogTitle>Objects Burned Successfully</DialogTitle>
            </div>
            <DialogDescription>
              Your objects have been permanently burned and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p><strong>Transaction ID:</strong></p>
                  <code className="text-xs bg-muted p-1 rounded break-all">
                    {transactionDigest}
                  </code>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="text-center">
              <Flame className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {selectedObjects.length} object{selectedObjects.length !== 1 ? 's' : ''} burned
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const getConfirmationContent = () => {
    switch (confirmationStep) {
      case 0:
        return {
          title: "Confirm Burn Action",
          description: "You are about to permanently destroy these objects.",
          buttonText: "Continue",
          variant: "outline" as const
        }
      case 1:
        return {
          title: "Final Warning",
          description: "This action is IRREVERSIBLE. These objects will be permanently lost.",
          buttonText: "I Understand, Burn Objects",
          variant: "destructive" as const
        }
      case 2:
        return {
          title: "Burning Objects",
          description: "Please confirm the transaction in your wallet.",
          buttonText: "Burning...",
          variant: "destructive" as const
        }
      default:
        return {
          title: "Confirm Burn",
          description: "Ready to burn objects.",
          buttonText: "Burn",
          variant: "destructive" as const
        }
    }
  }

  const confirmationContent = getConfirmationContent()

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Skull className="w-5 h-5" />
            {confirmationContent.title}
          </DialogTitle>
          <DialogDescription>
            {confirmationContent.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Object Summary */}
          <div>
            <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-700 dark:text-red-300">
                  Objects to Burn
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {Object.entries(objectTypeCounts).map(([type, count]) => (
                  <Badge key={type} variant="destructive" className="text-xs">
                    {count} {type}{count !== 1 ? 's' : ''}
                  </Badge>
                ))}
              </div>
              {totalValue > 0 && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Estimated value: ${totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Progressive Warnings */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {confirmationStep === 0 && (
                <>
                  <strong>Warning:</strong> Burned objects cannot be recovered. They will be sent to a burn address and permanently lost.
                </>
              )}
              {confirmationStep === 1 && (
                <>
                  <strong>FINAL WARNING:</strong> You are about to PERMANENTLY DESTROY {selectedObjects.length} objects. 
                  This action is IRREVERSIBLE and cannot be undone.
                </>
              )}
              {confirmationStep >= 2 && (
                <>
                  <strong>Executing burn transaction...</strong> Please confirm in your wallet.
                </>
              )}
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant={confirmationContent.variant}
            onClick={handleBurn}
            disabled={isLoading}
            className={confirmationStep >= 1 ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {confirmationContent.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}