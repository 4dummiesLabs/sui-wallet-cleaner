'use client'

import { useState } from 'react'
import { ClassifiedObject } from '@/types/objects'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Flame, AlertTriangle, CheckCircle, Skull } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { TransactionService } from '@/services/transactionService'

interface BurnDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
  onBurnComplete: () => void
  transactionService: TransactionService
  senderAddress: string
  onExecuteTransaction: (transaction: unknown) => Promise<unknown>
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
  const handleBurn = async () => {

    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await transactionService.burnObjects(
        {
          objects: selectedObjects.map(item => item.object),
          senderAddress,
        },
        onExecuteTransaction as (tx: unknown) => Promise<unknown>
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
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Skull className="w-5 h-5" />
            Confirm Burn Action
          </DialogTitle>
          <DialogDescription>
            You are about to permanently destroy these objects.
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
          <Alert variant="destructive" role="alert">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Burned objects cannot be recovered. They will be sent to a burn address and permanently lost.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" role="alert">
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
            variant="destructive"
            onClick={handleBurn}
            disabled={isLoading}
            className={confirmationStep >= 1 ? 'bg-red-600 hover:bg-red-700' : ''}
            aria-describedby="burn-warning"
          >
            {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
            {confirmationContent.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}