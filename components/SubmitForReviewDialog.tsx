'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Loader2, AlertCircle, CheckCircle, Ban } from 'lucide-react'
import { ClassifiedObject } from '@/types/objects'
import { useCurrentAccount, useSuiClient, useSignTransaction } from '@mysten/dapp-kit'
import { VotingService } from '@/services/votingService'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface SubmitForReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
  onSubmitComplete?: () => void
}

export default function SubmitForReviewDialog({
  open,
  onOpenChange,
  selectedObjects,
  onSubmitComplete,
}: SubmitForReviewDialogProps) {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signTransaction } = useSignTransaction()
  
  const [submitting, setSubmitting] = useState(false)
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set())
  const [alreadySubmittedIds, setAlreadySubmittedIds] = useState<Set<string>>(new Set())
  const [checkingSubmitted, setCheckingSubmitted] = useState(false)

  // Check if objects are already submitted when dialog opens
  useEffect(() => {
    if (open && selectedObjects.length > 0 && client) {
      checkAlreadySubmitted()
    }
  }, [open, selectedObjects, client])

  const checkAlreadySubmitted = async () => {
    setCheckingSubmitted(true)
    const votingService = new VotingService(client)
    const alreadySubmitted = new Set<string>()
    
    for (const object of selectedObjects) {
      try {
        const isSubmitted = await votingService.isObjectSubmitted(object.object.id)
        if (isSubmitted) {
          alreadySubmitted.add(object.object.id)
        }
      } catch (error) {
        console.error('Error checking submission status:', error)
      }
    }
    
    setAlreadySubmittedIds(alreadySubmitted)
    setCheckingSubmitted(false)
  }

  const handleSubmit = async (objectId: string) => {
    if (!account) return
    
    setSubmitting(true)
    const votingService = new VotingService(client)
    const object = selectedObjects.find(o => o.object.id === objectId)
    
    if (!object) return
    
    try {
      const metadata = descriptions[objectId] || ''
      
      // Fetch the actual object data from the blockchain to get display info
      let objectName = object.object.name || ''
      let imageUrl = ''
      
      try {
        console.log('Fetching object details for:', objectId)
        const objectData = await client.getObject({
          id: objectId,
          options: {
            showContent: true,
            showDisplay: true,
            showType: true,
          }
        })
        
        console.log('Fetched object data:', JSON.stringify(objectData, null, 2))
        
        // Get the display data from the fetched object
        if (objectData.data?.display?.data) {
          const display = objectData.data.display.data
          objectName = display.name || display.title || objectName
          imageUrl = display.image_url || display.image || display.url || ''
          console.log('Found display data:', { name: objectName, image: imageUrl })
        }
        
        // Also check content for additional fields
        if (!imageUrl && objectData.data?.content && objectData.data.content.dataType === 'moveObject') {
          const fields = (objectData.data.content as any).fields
          if (fields) {
            objectName = fields.name || fields.title || objectName
            imageUrl = fields.image_url || fields.image || fields.url || fields.imageUrl || imageUrl
            
            // Some NFTs store display data in nested fields
            if (fields.display) {
              const displayFields = fields.display.fields || fields.display
              objectName = displayFields.name || displayFields.title || objectName
              imageUrl = displayFields.image_url || displayFields.image || displayFields.url || imageUrl
            }
          }
        }
      } catch (fetchError) {
        console.error('Error fetching object details:', fetchError)
        // Continue with existing data if fetch fails
      }
      
      // If still no name, use the type-based fallback
      if (!objectName) {
        objectName = `${object.object.objectType} #${objectId.slice(-4)}`
      }
      
      // Process image URL
      if (imageUrl) {
        // If it's a URL but missing protocol, add https://
        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('ipfs://')) {
          imageUrl = `https://${imageUrl}`
        }
        
        // Convert IPFS URLs to gateway URLs
        if (imageUrl.startsWith('ipfs://')) {
          const ipfsHash = imageUrl.replace('ipfs://', '')
          imageUrl = `https://ipfs.io/ipfs/${ipfsHash}`
        }
      }
      
      console.log('Submitting review with:', { objectName, imageUrl })
      
      // Create a promise wrapper for signTransaction (for sponsored transactions)
      const executeTransaction = (args: any) => {
        return new Promise((resolve, reject) => {
          signTransaction(args, {
            onSuccess: (result) => resolve(result),
            onError: (error) => reject(error),
          })
        })
      }
      
      await votingService.submitForReview(
        object.object.id,
        object.object.objectType,
        objectName,
        metadata,
        imageUrl,
        executeTransaction,
        account.address
      )
      
      setSubmittedIds(prev => new Set([...prev, objectId]))
      toast.success(`${object.object.name || 'Object'} submitted for community review`)
      
      // Trigger a global event to refresh community votes
      window.dispatchEvent(new CustomEvent('review-submitted'))
      
      // Clear description after successful submission
      setDescriptions(prev => {
        const newDescs = { ...prev }
        delete newDescs[objectId]
        return newDescs
      })
      
      // Give the blockchain a moment to process
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('review-submitted'))
      }, 2000)
    } catch (error: any) {
      console.error('Error submitting for review:', error)
      
      if (error.message?.includes('already been submitted')) {
        toast.error('This object has already been submitted for community review')
      } else {
        toast.error('Failed to submit for review')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitAll = async () => {
    for (const object of selectedObjects) {
      if (!submittedIds.has(object.object.id)) {
        await handleSubmit(object.object.id)
      }
    }
    
    if (onSubmitComplete) {
      onSubmitComplete()
    }
    
    // Close dialog after all submissions
    setTimeout(() => {
      onOpenChange(false)
      setSubmittedIds(new Set())
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-ocean text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Upload className="w-5 h-5" />
            Submit for Community Review
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Submit objects to the community for voting. Each wallet can vote once per object.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {checkingSubmitted ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-muted-foreground">Checking submission status...</span>
            </div>
          ) : (
            selectedObjects.map((item) => {
              const isSubmitted = submittedIds.has(item.object.id)
              const isAlreadySubmitted = alreadySubmittedIds.has(item.object.id)
              
              return (
                <Card key={item.object.id} className="bg-deep-ocean/50 border-white/10 p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {item.object.name || `${item.object.objectType} Object`}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.object.objectType}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.object.id.slice(0, 16)}...
                          </span>
                        </div>
                      </div>
                      {isSubmitted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {isAlreadySubmitted && (
                        <Ban className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>

                    {isAlreadySubmitted ? (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <p className="text-sm text-yellow-400 flex items-center gap-2">
                          <Ban className="w-4 h-4" />
                          Already submitted for community review
                        </p>
                      </div>
                    ) : !isSubmitted ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor={`desc-${item.object.id}`}>
                          Why should the community review this?
                        </Label>
                        <Textarea
                          id={`desc-${item.object.id}`}
                          placeholder="Describe any concerns or reasons for review..."
                          value={descriptions[item.object.id] || ''}
                          onChange={(e) => setDescriptions(prev => ({
                            ...prev,
                            [item.object.id]: e.target.value
                          }))}
                          className="bg-white/5 border-white/10 text-white"
                          rows={3}
                        />
                      </div>

                      <Button
                        onClick={() => handleSubmit(item.object.id)}
                        disabled={submitting}
                        className="w-full"
                        variant="outline"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Submit for Review
                          </>
                        )}
                      </Button>
                    </>
                  ) : isSubmitted ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Submitted for community review
                      </p>
                    </div>
                  ) : null}
                </div>
              </Card>
              )
            })
          )}
        </div>

        <DialogFooter>
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                Submissions require gas fees
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            {selectedObjects.some(o => !submittedIds.has(o.object.id) && !alreadySubmittedIds.has(o.object.id)) && (
              <Button
                onClick={handleSubmitAll}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit All
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}