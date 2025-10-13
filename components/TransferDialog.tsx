'use client'

import { useState } from 'react'
import { ClassifiedObject } from '@/types/objects'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Send, AlertTriangle, CheckCircle } from 'lucide-react'
import { TransactionService } from '@/services/transactionService'
import { truncateAddress } from '@/lib/utils'

interface TransferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
  onTransferComplete: () => void
  transactionService: TransactionService
  senderAddress: string
  onExecuteTransaction: (transaction: any) => Promise<any>
}

export default function TransferDialog({
  open,
  onOpenChange,
  selectedObjects,
  onTransferComplete,
  transactionService,
  senderAddress,
  onExecuteTransaction
}: TransferDialogProps) {
  const [recipientAddress, setRecipientAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [transactionDigest, setTransactionDigest] = useState('')

  const isValidAddress = recipientAddress ? transactionService.isValidSuiAddress(recipientAddress) : false

  const handleTransfer = async () => {
    if (!recipientAddress || !isValidAddress) {
      setError('Please enter a valid Sui address')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await transactionService.transferObjects(
        {
          objects: selectedObjects.map(item => item.object),
          recipient: recipientAddress,
          senderAddress,
        },
        onExecuteTransaction
      )

      if (result.success && result.digest) {
        setSuccess(true)
        setTransactionDigest(result.digest)
        setTimeout(() => {
          onTransferComplete()
          handleClose()
        }, 2000)
      } else {
        setError(result.error || 'Transfer failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setRecipientAddress('')
    setError('')
    setSuccess(false)
    setTransactionDigest('')
    onOpenChange(false)
  }

  const objectTypeCounts = selectedObjects.reduce((acc, item) => {
    acc[item.object.objectType] = (acc[item.object.objectType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <DialogTitle>Transfer Successful</DialogTitle>
            </div>
            <DialogDescription>
              Your objects have been successfully transferred to the recipient.
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
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Transferred to:</p>
              <code className="text-xs bg-muted p-2 rounded block">
                {truncateAddress(recipientAddress, 8)}
              </code>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Transfer Objects
          </DialogTitle>
          <DialogDescription>
            Transfer {selectedObjects.length} selected object{selectedObjects.length !== 1 ? 's' : ''} to another address.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Object Summary */}
          <div>
            <Label className="text-sm font-medium">Objects to Transfer</Label>
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(objectTypeCounts).map(([type, count]) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {count} {type}{count !== 1 ? 's' : ''}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value.trim())}
              className={recipientAddress && !isValidAddress ? 'border-red-500' : ''}
            />
            {recipientAddress && !isValidAddress && (
              <p className="text-sm text-red-500">Invalid Sui address format</p>
            )}
            {recipientAddress && isValidAddress && (
              <p className="text-sm text-green-600">✓ Valid address format</p>
            )}
          </div>

          {/* Warning */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> This action cannot be undone. Make sure the recipient address is correct.
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
            onClick={handleTransfer} 
            disabled={!recipientAddress || !isValidAddress || isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Transfer Objects
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}