'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Users, ThumbsUp, ThumbsDown, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { useCurrentAccount, useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { VotingService, ReviewRequest } from '@/services/votingService'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function CommunityVotesButton() {
  const account = useCurrentAccount()
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  
  const [open, setOpen] = useState(false)
  const [reviews, setReviews] = useState<ReviewRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [votingService, setVotingService] = useState<VotingService | null>(null)
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (client) {
      setVotingService(new VotingService(client))
    }
  }, [client])

  useEffect(() => {
    if (votingService && account) {
      loadReviews()
      // Set up polling to check for new reviews
      const interval = setInterval(() => {
        loadReviews()
      }, 30000) // Refresh every 30 seconds
      
      // Listen for new review submissions
      const handleReviewSubmitted = () => {
        console.log('Review submitted event received, refreshing...')
        setTimeout(() => loadReviews(), 1000) // Small delay for blockchain
      }
      
      window.addEventListener('review-submitted', handleReviewSubmitted)
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('review-submitted', handleReviewSubmitted)
      }
    }
  }, [votingService, account])

  const loadReviews = async () => {
    if (!votingService || !account) return
    
    setLoading(true)
    try {
      console.log('Loading reviews for address:', account.address)
      const allReviews = await votingService.getAllReviews(account.address)
      console.log('Loaded reviews:', allReviews)
      setReviews(allReviews)
      
      // Count reviews user hasn't voted on
      const pending = allReviews.filter(r => !r.hasVoted).length
      setPendingCount(pending)
    } catch (error) {
      console.error('Error loading reviews:', error)
      toast.error('Failed to load community reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (reviewId: string, isUpvote: boolean) => {
    if (!votingService || !account) return
    
    setVotingStates(prev => ({ ...prev, [reviewId]: true }))
    
    try {
      const review = reviews.find(r => r.id === reviewId)
      
      // Create a promise wrapper for signAndExecute
      const executeTransaction = (args: any) => {
        return new Promise((resolve, reject) => {
          signAndExecute(args, {
            onSuccess: (result) => resolve(result),
            onError: (error) => reject(error),
          })
        })
      }
      
      if (review?.hasVoted && review.userVote !== undefined) {
        // User is changing their vote
        await votingService.changeVote(reviewId, isUpvote, executeTransaction)
        toast.success('Vote updated successfully')
      } else {
        // New vote
        await votingService.castVote(reviewId, isUpvote, executeTransaction)
        toast.success('Vote cast successfully')
      }
      
      // Reload reviews to get updated counts
      await loadReviews()
    } catch (error: any) {
      console.error('Error casting vote:', error)
      
      // Check for abort codes from the smart contract
      const errorMessage = error.message || error.toString()
      
      if (errorMessage.includes('abort code: 0') || errorMessage.includes('E_ALREADY_VOTED')) {
        toast.error('You have already voted on this item')
      } else if (errorMessage.includes('abort code: 3') || errorMessage.includes('E_CANNOT_VOTE_OWN')) {
        toast.error('You cannot vote on your own submission')
      } else if (errorMessage.includes('abort code: 2') || errorMessage.includes('E_REVIEW_NOT_FOUND')) {
        toast.error('Review not found')
      } else if (errorMessage.includes('abort code: 4') || errorMessage.includes('E_ALREADY_SUBMITTED')) {
        toast.error('This object has already been submitted')
      } else if (errorMessage.includes('MoveAbort')) {
        // Parse the abort code from MoveAbort error
        const match = errorMessage.match(/}, (\d+)\)/)
        if (match) {
          const abortCode = parseInt(match[1])
          switch (abortCode) {
            case 0:
              toast.error('You have already voted on this item')
              break
            case 3:
              toast.error('You cannot vote on your own submission')
              break
            case 2:
              toast.error('Review not found')
              break
            default:
              toast.error(`Transaction failed with error code: ${abortCode}`)
          }
        } else {
          toast.error('Transaction failed')
        }
      } else {
        toast.error('Failed to cast vote')
      }
    } finally {
      setVotingStates(prev => ({ ...prev, [reviewId]: false }))
    }
  }

  const getClassificationColor = (votesUp: number, votesDown: number) => {
    const total = votesUp + votesDown
    if (total === 0) return 'text-muted-foreground'
    
    const ratio = votesUp / total
    if (ratio > 0.8) return 'text-green-500'
    if (ratio > 0.6) return 'text-blue-500'
    if (ratio > 0.4) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (!account) return null

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(true)
          loadReviews() // Refresh when opening
        }}
        className="gap-2 relative"
      >
        <Users className="w-4 h-4" />
        Community Votes
        {pendingCount > 0 && (
          <Badge 
            variant="destructive" 
            className="ml-1 px-1.5 py-0 h-5 text-xs absolute -top-2 -right-2"
          >
            {pendingCount}
          </Badge>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-hidden bg-ocean text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              Community Review Queue
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingCount} pending
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[60vh] space-y-4 pr-2">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-aqua" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No items pending community review</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Submit objects for review to help the community!
                </p>
              </div>
            ) : (
              reviews.map(review => {
                const total = review.votesUp + review.votesDown
                const percentPositive = total > 0 ? Math.round((review.votesUp / total) * 100) : 0
                const isVoting = votingStates[review.id]
                const isOwnSubmission = account && review.submitter === account.address
                
                return (
                  <Card key={review.id} className="bg-deep-ocean/50 border-white/10 overflow-hidden">
                    <div className="flex">
                      {/* Image Section - Left Side */}
                      <div className="w-48 h-48 flex-shrink-0">
                        {review.imageUrl ? (
                          <img 
                            src={review.imageUrl} 
                            alt={review.objectName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder on error
                              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg width='192' height='192' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='192' height='192' fill='%231F2937'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236B7280' font-size='48'%3E%3F%3C/text%3E%3C/svg%3E`
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-4xl text-white/30">?</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Section - Right Side */}
                      <div className="flex-1 p-4">
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-bold text-lg text-white">
                              {review.objectName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {review.objectType}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {review.objectId.slice(0, 16)}...
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {formatDistanceToNow(new Date(review.submissionTime), { addSuffix: true })}
                            </div>
                            <div>
                              Submitted by: <span className="font-mono text-xs">
                                {review.submitter}
                                {isOwnSubmission && <span className="text-blue-400 ml-2">(You)</span>}
                              </span>
                            </div>
                          </div>

                          {review.metadata && (
                            <p className="text-sm text-muted-foreground">
                              {review.metadata}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-4 space-y-3">
                      {/* Current Votes Display */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">{review.votesUp}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium">{review.votesDown}</span>
                          </div>
                        </div>
                        <span className={cn("text-sm font-medium", getClassificationColor(review.votesUp, review.votesDown))}>
                          {percentPositive}% positive
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all"
                          style={{ width: `${percentPositive}%` }}
                        />
                      </div>

                      {/* Vote Buttons */}
                      {isOwnSubmission ? (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <p className="text-sm text-blue-400 text-center">
                            This is your submission - you cannot vote on it
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-2">
                            <Button
                              variant={review.hasVoted && review.userVote === true ? "default" : "outline"}
                              size="sm"
                              className={cn(
                                "flex-1 gap-2",
                                review.hasVoted && review.userVote === true 
                                  ? "bg-green-500/20 hover:bg-green-500/30 border-green-500" 
                                  : ""
                              )}
                              onClick={() => handleVote(review.id, true)}
                              disabled={isVoting || isOwnSubmission}
                            >
                              {isVoting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <ThumbsUp className="w-4 h-4" />
                              )}
                              Safe
                              {review.hasVoted && review.userVote === true && " (Your Vote)"}
                            </Button>
                            
                            <Button
                              variant={review.hasVoted && review.userVote === false ? "default" : "outline"}
                              size="sm"
                              className={cn(
                                "flex-1 gap-2",
                                review.hasVoted && review.userVote === false 
                                  ? "bg-red-500/20 hover:bg-red-500/30 border-red-500" 
                                  : ""
                              )}
                              onClick={() => handleVote(review.id, false)}
                              disabled={isVoting || isOwnSubmission}
                            >
                              {isVoting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <ThumbsDown className="w-4 h-4" />
                              )}
                              Risky
                              {review.hasVoted && review.userVote === false && " (Your Vote)"}
                            </Button>
                          </div>

                          {review.hasVoted && (
                            <div className="text-xs text-center text-muted-foreground">
                              You have already voted. Click to change your vote.
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}