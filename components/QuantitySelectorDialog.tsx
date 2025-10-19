'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string
  totalCount: number
  onConfirm: (quantity: number) => void
}

export default function QuantitySelectorDialog({
  open,
  onOpenChange,
  itemName,
  totalCount,
  onConfirm,
}: QuantitySelectorDialogProps) {
  const [quantity, setQuantity] = useState(totalCount)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < totalCount) {
      setQuantity(quantity + 1)
    }
  }

  const handleInputChange = (value: string) => {
    const num = parseInt(value)
    if (!isNaN(num) && num >= 1 && num <= totalCount) {
      setQuantity(num)
    }
  }

  const handleConfirm = () => {
    onConfirm(quantity)
    onOpenChange(false)
    // Reset to max for next time
    setQuantity(totalCount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-ocean text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Select Quantity</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            How many {itemName} do you want to select?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-white">
              Quantity (out of {totalCount})
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                id="quantity"
                type="number"
                min={1}
                max={totalCount}
                value={quantity}
                onChange={(e) => handleInputChange(e.target.value)}
                className="text-center text-lg font-semibold bg-white/5 border-white/10 text-white"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                disabled={quantity >= totalCount}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick selection buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(1)}
              className={quantity === 1 ? 'bg-aqua/20' : ''}
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.ceil(totalCount / 2))}
              className={quantity === Math.ceil(totalCount / 2) ? 'bg-aqua/20' : ''}
            >
              Half
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.floor(totalCount * 0.75))}
              className={quantity === Math.floor(totalCount * 0.75) ? 'bg-aqua/20' : ''}
            >
              75%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(totalCount)}
              className={quantity === totalCount ? 'bg-aqua/20' : ''}
            >
              All
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Select {quantity} {itemName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
