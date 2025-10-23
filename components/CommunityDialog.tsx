'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, Users, Shield, AlertTriangle, Loader2, MessageCircle, Info } from 'lucide-react'
import { ClassifiedObject, ObjectClassification } from '@/types/objects'
import { cn } from '@/lib/utils'
import { VotingService, ReviewRequest } from '@/services/votingService'
import { useSuiClient, useCurrentAccount } from '@mysten/dapp-kit'

interface CommunityRating {
  objectId: string
  thumbsUp: number
  thumbsDown: number
  userVote?: 'up' | 'down' | null
  submitter?: string
  submissionTime?: number
  metadata?: string
  hasVoted?: boolean
}

interface CommunityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
}

export default function CommunityDialog({ open, onOpenChange, selectedObjects }: CommunityDialogProps) {
  const [ratings, setRatings] = useState<Record<string, CommunityRating>>({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'ratings' | 'legitimacy'>('ratings')
  const client = useSuiClient()
  const account = useCurrentAccount()
  const votingService = new VotingService(client)

  useEffect(() => {
    if (open) {
      loadCommunityRatings()
    }
  }, [open, selectedObjects])

  const loadCommunityRatings = async () => {
    setLoading(true)
    try {
      // Fetch all reviews from the voting service
      const reviews = await votingService.getAllReviews(account?.address)
      
      const newRatings: Record<string, CommunityRating> = {}
      
      // Map selected objects to their voting data
      selectedObjects.forEach(obj => {
        const review = reviews.find(r => r.objectId === obj.object.id)
        
        if (review) {
          newRatings[obj.object.id] = {
            objectId: obj.object.id,
            thumbsUp: review.votesUp,
            thumbsDown: review.votesDown,
            userVote: review.hasVoted && review.userVote !== undefined ? 
              (review.userVote ? 'up' : 'down') : null,
            submitter: review.submitter,
            submissionTime: review.submissionTime,
            metadata: review.metadata,
            hasVoted: review.hasVoted
          }
        } else {
          // Object not submitted for review yet
          newRatings[obj.object.id] = {
            objectId: obj.object.id,
            thumbsUp: 0,
            thumbsDown: 0,
            userVote: null
          }
        }
      })
      
      setRatings(newRatings)
    } catch (error) {
      console.error('Error loading community ratings:', error)
      // Set empty ratings for all objects on error
      const newRatings: Record<string, CommunityRating> = {}
      selectedObjects.forEach(obj => {
        newRatings[obj.object.id] = {
          objectId: obj.object.id,
          thumbsUp: 0,
          thumbsDown: 0,
          userVote: null
        }
      })
      setRatings(newRatings)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (objectId: string, voteType: 'up' | 'down') => {
    // Note: Actual voting would require calling the smart contract
    // For now, just show the current state from blockchain
    console.log('Voting not implemented in UI yet. Object:', objectId, 'Vote:', voteType)
  }

  const getCommunityClassification = (rating: CommunityRating): ObjectClassification => {
    const total = rating.thumbsUp + rating.thumbsDown
    if (total < 10) return ObjectClassification.UNCLASSIFIED
    
    const positiveRatio = rating.thumbsUp / total
    if (positiveRatio > 0.8) return ObjectClassification.VERIFIED
    if (positiveRatio > 0.6) return ObjectClassification.SAFE
    if (positiveRatio > 0.4) return ObjectClassification.WARNING
    return ObjectClassification.DANGER
  }

  const getClassificationBadge = (classification: ObjectClassification) => {
    const variants: Record<ObjectClassification, { variant: "default" | "secondary" | "outline" | "destructive", icon: React.ReactElement | null, label: string }> = {
      [ObjectClassification.VERIFIED]: { variant: "default", icon: <Shield className="w-3 h-3" />, label: "Verified" },
      [ObjectClassification.SAFE]: { variant: "secondary", icon: null, label: "Safe" },
      [ObjectClassification.WARNING]: { variant: "outline", icon: null, label: "Warning" },
      [ObjectClassification.DANGER]: { variant: "destructive", icon: <AlertTriangle className="w-3 h-3" />, label: "Danger" },
      [ObjectClassification.UNCLASSIFIED]: { variant: "outline", icon: null, label: "Unclassified" }
    }
    
    const config = variants[classification]
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-ocean text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5" />
            Community Insights
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className={cn("rounded-b-none", activeTab === 'ratings' && "border-b-2 border-aqua")}
              onClick={() => setActiveTab('ratings')}
            >
              Object Ratings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("rounded-b-none", activeTab === 'legitimacy' && "border-b-2 border-aqua")}
              onClick={() => setActiveTab('legitimacy')}
            >
              Legitimacy List
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-aqua" />
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {activeTab === 'ratings' && selectedObjects.map(item => {
                const rating = ratings[item.object.id]
                if (!rating) return null
                
                const communityClass = getCommunityClassification(rating)
                
                const hasVotes = rating.thumbsUp > 0 || rating.thumbsDown > 0
                const isSubmitted = rating.submitter !== undefined
                
                return (
                  <Card key={item.object.id} className="bg-deep-ocean/50 border-white/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-white">
                            {item.object.name || `${item.object.objectType} Object`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.object.id.slice(0, 16)}...
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getClassificationBadge(item.classification)}
                          {hasVotes && getClassificationBadge(communityClass)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Voting Section */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant={rating.userVote === 'up' ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "gap-2",
                            rating.userVote === 'up' ? "bg-green-500/20 hover:bg-green-500/30 border-green-500" : ""
                          )}
                          onClick={() => handleVote(item.object.id, 'up')}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {rating.thumbsUp}
                        </Button>
                        <Button
                          variant={rating.userVote === 'down' ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "gap-2",
                            rating.userVote === 'down' ? "bg-red-500/20 hover:bg-red-500/30 border-red-500" : ""
                          )}
                          onClick={() => handleVote(item.object.id, 'down')}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          {rating.thumbsDown}
                        </Button>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {rating.thumbsUp + rating.thumbsDown} votes
                        </span>
                      </div>

                      {/* Status Messages */}
                      {!isSubmitted && (
                        <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <Info className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-300">
                            This object has not been submitted for community review yet
                          </span>
                        </div>
                      )}
                      
                      {isSubmitted && !hasVotes && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <Info className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-yellow-300">
                            No votes received yet - be the first to vote!
                          </span>
                        </div>
                      )}
                      
                      {rating.metadata && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageCircle className="w-3 h-3" />
                            Submission Details
                          </div>
                          <div className="text-xs text-muted-foreground bg-white/5 rounded p-2">
                            {rating.metadata}
                          </div>
                          {rating.submissionTime && (
                            <div className="text-xs text-muted-foreground">
                              Submitted: {new Date(rating.submissionTime).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

              {activeTab === 'legitimacy' && (
                <div className="space-y-4">
                  <Card className="bg-deep-ocean/50 border-white/10">
                    <CardHeader>
                      <h3 className="text-sm font-medium text-white">Community-Verified Safe Objects</h3>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(ratings)
                        .filter(([_, r]) => getCommunityClassification(r) === ObjectClassification.VERIFIED || getCommunityClassification(r) === ObjectClassification.SAFE)
                        .map(([id, rating]) => (
                          <div key={id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="text-sm text-muted-foreground">{id.slice(0, 20)}...</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-400">
                                {Math.round((rating.thumbsUp / (rating.thumbsUp + rating.thumbsDown)) * 100)}% positive
                              </span>
                              {getClassificationBadge(getCommunityClassification(rating))}
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-deep-ocean/50 border-white/10">
                    <CardHeader>
                      <h3 className="text-sm font-medium text-white">Community-Flagged Risky Objects</h3>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(ratings)
                        .filter(([_, r]) => getCommunityClassification(r) === ObjectClassification.DANGER || getCommunityClassification(r) === ObjectClassification.WARNING)
                        .map(([id, rating]) => (
                          <div key={id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="text-sm text-muted-foreground">{id.slice(0, 20)}...</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-red-400">
                                {Math.round((rating.thumbsDown / (rating.thumbsUp + rating.thumbsDown)) * 100)}% negative
                              </span>
                              {getClassificationBadge(getCommunityClassification(rating))}
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}