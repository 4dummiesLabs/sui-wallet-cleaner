'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, Users, Shield, AlertTriangle, Loader2, MessageCircle } from 'lucide-react'
import { ClassifiedObject, ObjectClassification } from '@/types/objects'
import { cn } from '@/lib/utils'

interface CommunityRating {
  objectId: string
  thumbsUp: number
  thumbsDown: number
  userVote?: 'up' | 'down' | null
  comments: string[]
}

interface CommunityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedObjects: ClassifiedObject[]
}

// Mock community data - in production this would come from a backend
const mockCommunityData: Record<string, CommunityRating> = {}

export default function CommunityDialog({ open, onOpenChange, selectedObjects }: CommunityDialogProps) {
  const [ratings, setRatings] = useState<Record<string, CommunityRating>>({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'ratings' | 'legitimacy'>('ratings')

  useEffect(() => {
    if (open && selectedObjects.length > 0) {
      loadCommunityRatings()
    }
  }, [open, selectedObjects])

  const loadCommunityRatings = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newRatings: Record<string, CommunityRating> = {}
      selectedObjects.forEach(obj => {
        // Use existing data or create new mock data
        newRatings[obj.object.id] = mockCommunityData[obj.object.id] || {
          objectId: obj.object.id,
          thumbsUp: Math.floor(Math.random() * 100),
          thumbsDown: Math.floor(Math.random() * 20),
          userVote: null,
          comments: [
            "This looks safe to me",
            "I've used this contract before, it's legitimate",
            "Be careful, unusual activity detected"
          ].slice(0, Math.floor(Math.random() * 3) + 1)
        }
      })
      setRatings(newRatings)
      setLoading(false)
    }, 1000)
  }

  const handleVote = (objectId: string, voteType: 'up' | 'down') => {
    setRatings(prev => {
      const current = prev[objectId]
      const wasUp = current.userVote === 'up'
      const wasDown = current.userVote === 'down'
      
      let newThumbsUp = current.thumbsUp
      let newThumbsDown = current.thumbsDown
      let newUserVote: 'up' | 'down' | null = voteType

      // Handle vote changes
      if (voteType === 'up') {
        if (wasUp) {
          newThumbsUp--
          newUserVote = null
        } else {
          newThumbsUp++
          if (wasDown) newThumbsDown--
        }
      } else {
        if (wasDown) {
          newThumbsDown--
          newUserVote = null
        } else {
          newThumbsDown++
          if (wasUp) newThumbsUp--
        }
      }

      // Update mock data
      mockCommunityData[objectId] = {
        ...current,
        thumbsUp: newThumbsUp,
        thumbsDown: newThumbsDown,
        userVote: newUserVote
      }

      return {
        ...prev,
        [objectId]: {
          ...current,
          thumbsUp: newThumbsUp,
          thumbsDown: newThumbsDown,
          userVote: newUserVote
        }
      }
    })
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
    const variants: Record<ObjectClassification, { variant: "default" | "secondary" | "outline" | "destructive", icon: JSX.Element, label: string }> = {
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
                          {getClassificationBadge(communityClass)}
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

                      {/* Comments Preview */}
                      {rating.comments.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageCircle className="w-3 h-3" />
                            Community Comments
                          </div>
                          {rating.comments.slice(0, 2).map((comment, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground bg-white/5 rounded p-2">
                              "{comment}"
                            </div>
                          ))}
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