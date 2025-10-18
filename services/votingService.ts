import { SuiClient, SuiTransactionBlockResponse } from '@mysten/sui/client'
import { Transaction } from '@mysten/sui/transactions'
import { bcs } from '@mysten/sui/bcs'
import { GasStationError } from '@3mate/gas-station-sdk'
import { toHex, fromHex, toBase64 } from '@mysten/sui/utils'

// Gas Station Configuration - Always enabled
const GAS_STATION_API_KEY = process.env.NEXT_PUBLIC_GAS_STATION_API_KEY || ''
const GAS_STATION_NETWORK = (process.env.NEXT_PUBLIC_GAS_STATION_NETWORK || 'mainnet') as 'mainnet' | 'testnet'

export interface ReviewRequest {
  id: string
  objectId: string
  objectType: string
  objectName: string
  submitter: string
  submissionTime: number
  votesUp: number
  votesDown: number
  metadata: string
  imageUrl: string
  hasVoted?: boolean
  userVote?: boolean
}

export interface VoteStats {
  totalReviews: number
  userVotes: number
  pendingReviews: ReviewRequest[]
}

export class VotingService {
  private client: SuiClient
  private registryId: string
  private packageId: string

  constructor(client: SuiClient) {
    this.client = client
    // These will be set from environment variables after deployment
    this.registryId = process.env.NEXT_PUBLIC_VOTING_REGISTRY_ID || ''
    this.packageId = process.env.NEXT_PUBLIC_VOTING_PACKAGE_ID || ''
  }

  /**
   * Submit an object for community review
   */
  async submitForReview(
    objectId: string,
    objectType: string,
    objectName: string,
    metadata: string,
    imageUrl: string,
    signTransaction: (args: any) => Promise<any>,
    senderAddress: string
  ): Promise<any> {
    const tx = new Transaction()

    console.log('Submitting to blockchain:', {
      objectId,
      objectType,
      objectName,
      metadata,
      imageUrl,
      packageId: this.packageId,
      registryId: this.registryId
    })

    // Set sender
    tx.setSender(senderAddress)

    // Get the current timestamp
    tx.moveCall({
      target: `${this.packageId}::voting::submit_for_review`,
      arguments: [
        tx.object(this.registryId),
        tx.pure.string(objectId),
        tx.pure.string(objectType),
        tx.pure.string(objectName),
        tx.pure.string(metadata),
        tx.pure.string(imageUrl),
        tx.object('0x6'), // Clock object ID
      ],
    })

    try {
      const result = await this.executeSponsoredTransaction(tx, senderAddress, signTransaction)
      console.log('Submission successful:', result)
      return result
    } catch (error: any) {
      console.error('Submission error:', error)

      // Check for duplicate submission error
      if (error.message?.includes('E_ALREADY_SUBMITTED') ||
          error.message?.includes('abort code: 4')) {
        throw new Error('This object has already been submitted for review')
      }

      throw error
    }
  }

  /**
   * Cast a vote on a review
   */
  async castVote(
    reviewId: string,
    isUpvote: boolean,
    signTransaction: (args: any) => Promise<any>,
    senderAddress: string
  ): Promise<any> {
    const tx = new Transaction()

    tx.setSender(senderAddress)

    tx.moveCall({
      target: `${this.packageId}::voting::cast_vote`,
      arguments: [
        tx.object(this.registryId),
        tx.pure.address(reviewId),  // ID is an address type in Move
        tx.pure.bool(isUpvote),
        tx.object('0x6'), // Clock object ID
      ],
    })

    return await this.executeSponsoredTransaction(tx, senderAddress, signTransaction)
  }

  /**
   * Change an existing vote
   */
  async changeVote(
    reviewId: string,
    newIsUpvote: boolean,
    signTransaction: (args: any) => Promise<any>,
    senderAddress: string
  ): Promise<any> {
    const tx = new Transaction()

    tx.setSender(senderAddress)

    tx.moveCall({
      target: `${this.packageId}::voting::change_vote`,
      arguments: [
        tx.object(this.registryId),
        tx.pure.address(reviewId),  // ID is an address type in Move
        tx.pure.bool(newIsUpvote),
        tx.object('0x6'), // Clock object ID
      ],
    })

    return await this.executeSponsoredTransaction(tx, senderAddress, signTransaction)
  }

  /**
   * Get all review requests from the registry
   */
  async getAllReviews(userAddress?: string): Promise<ReviewRequest[]> {
    if (!this.registryId || !this.packageId) {
      console.warn('Voting registry not deployed yet. Using mock data.')
      return this.getMockReviews()
    }

    try {
      const reviews: ReviewRequest[] = []
      
      // Query ReviewSubmitted events to get all submitted reviews
      console.log('Querying events for package:', this.packageId)
      const submitEvents = await this.client.queryEvents({
        query: {
          MoveEventType: `${this.packageId}::voting::ReviewSubmitted`,
        },
        order: 'descending',
      })

      console.log('Found', submitEvents.data.length, 'review submissions')

      // Get vote events to update counts
      const voteEvents = await this.client.queryEvents({
        query: {
          MoveEventType: `${this.packageId}::voting::VoteCast`,
        },
      })

      // Build vote count map from events
      const voteCounts: Record<string, { up: number; down: number; voters: Set<string> }> = {}
      
      for (const event of voteEvents.data) {
        const voteData = event.parsedJson as any
        if (!voteCounts[voteData.review_id]) {
          voteCounts[voteData.review_id] = { up: 0, down: 0, voters: new Set() }
        }
        // Use the latest vote counts from the event
        voteCounts[voteData.review_id].up = parseInt(voteData.new_up_votes)
        voteCounts[voteData.review_id].down = parseInt(voteData.new_down_votes)
        voteCounts[voteData.review_id].voters.add(voteData.voter)
      }

      // Process each submitted review
      for (const event of submitEvents.data) {
        const eventData = event.parsedJson as any
        console.log('Processing event:', eventData)
        
        // Default values - will be overridden if we can parse the transaction
        let objectName = ''
        let objectType = 'NFT'
        let metadata = ''
        let imageUrl = ''
        
        try {
          // Query the review data using dynamic field
          const dynamicFieldId = {
            parentId: this.registryId,
            name: {
              type: '0x2::object::ID',
              value: eventData.review_id,
            },
          }
          
          const reviewField = await this.client.getDynamicFieldObject(dynamicFieldId)
          
          if (reviewField.data?.content && reviewField.data.content.dataType === 'moveObject') {
            const fields = reviewField.data.content.fields as any
            objectName = fields.object_name || objectName
            objectType = fields.object_type || objectType
            metadata = fields.metadata || metadata
            imageUrl = fields.image_url || imageUrl
            console.log('Found review details:', { objectName, objectType, metadata, imageUrl })
          }
        } catch (err) {
          // If dynamic field query fails, try to parse from the transaction that created the review
          console.log('Dynamic field query failed, using event data:', err)
          
          // The event contains the basic info, but we need to get the full data from the transaction
          try {
            // Get the transaction that emitted this event
            const tx = await this.client.getTransactionBlock({
              digest: event.id.txDigest,
              options: {
                showInput: true,
                showEvents: true,
              },
            })
            
            // Parse the input data to get the submitted values
            if (tx.transaction?.data?.transaction?.kind === 'ProgrammableTransaction') {
              const progTx = tx.transaction.data.transaction as any
              const inputs = progTx.inputs || []
              
              console.log('Transaction inputs:', inputs)
              
              // The inputs should contain the strings we passed
              // Input order: registry (object), objectId (string), objectType (string), 
              // objectName (string), metadata (string), imageUrl (string), clock (object)
              if (inputs.length >= 7) {
                // Skip first input (registry object), parse string inputs
                const parsedId = this.decodeStringInput(inputs[1])
                const parsedType = this.decodeStringInput(inputs[2])
                const parsedName = this.decodeStringInput(inputs[3])
                const parsedMeta = this.decodeStringInput(inputs[4])
                const parsedImage = this.decodeStringInput(inputs[5])
                
                if (parsedType) objectType = parsedType
                if (parsedName) objectName = parsedName
                if (parsedMeta) metadata = parsedMeta
                if (parsedImage) imageUrl = parsedImage
                
                console.log('Parsed from transaction:', { 
                  objectId: parsedId,
                  objectType,
                  objectName,
                  metadata,
                  imageUrl
                })
              }
            }
          } catch (txErr) {
            console.log('Could not parse transaction:', txErr)
          }
        }
        
        // If we still don't have a name, fetch the object data directly
        if (!objectName || !imageUrl) {
          try {
            console.log('Fetching object details for review:', eventData.object_id)
            const objectData = await this.client.getObject({
              id: eventData.object_id,
              options: {
                showContent: true,
                showDisplay: true,
                showType: true,
              }
            })
            
            // Get the display data from the fetched object
            if (objectData.data?.display?.data) {
              const display = objectData.data.display.data
              objectName = objectName || display.name || display.title || ''
              imageUrl = imageUrl || display.image_url || display.image || display.url || ''
              console.log('Found display data from object fetch:', { name: objectName, image: imageUrl })
            }
            
            // Also check content for additional fields
            if ((!imageUrl || !objectName) && objectData.data?.content && objectData.data.content.dataType === 'moveObject') {
              const fields = (objectData.data.content as any).fields
              if (fields) {
                objectName = objectName || fields.name || fields.title || ''
                imageUrl = imageUrl || fields.image_url || fields.image || fields.url || fields.imageUrl || ''
                
                // Some NFTs store display data in nested fields
                if (fields.display) {
                  const displayFields = fields.display.fields || fields.display
                  objectName = objectName || displayFields.name || displayFields.title || ''
                  imageUrl = imageUrl || displayFields.image_url || displayFields.image || displayFields.url || ''
                }
              }
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
          } catch (objFetchErr) {
            console.log('Could not fetch object details:', objFetchErr)
          }
        }
        
        // Final fallback if still no name
        if (!objectName) {
          objectName = `${objectType} #${eventData.object_id.slice(-4)}`
        }
        
        const review: ReviewRequest = {
          id: eventData.review_id,
          objectId: eventData.object_id,
          objectType,
          objectName,
          submitter: eventData.submitter,
          submissionTime: parseInt(eventData.timestamp),
          votesUp: voteCounts[eventData.review_id]?.up || 0,
          votesDown: voteCounts[eventData.review_id]?.down || 0,
          metadata,
          imageUrl,
          hasVoted: userAddress ? voteCounts[eventData.review_id]?.voters.has(userAddress) || false : false,
        }

        reviews.push(review)
      }

      // Get user's vote details if address provided
      if (userAddress) {
        for (const review of reviews) {
          if (review.hasVoted) {
            review.userVote = await this.getUserVote(review.id, userAddress)
          }
        }
      }

      console.log('Returning', reviews.length, 'reviews')
      return reviews
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // Return empty array instead of mock data to see real state
      return []
    }
  }

  /**
   * Check if a user has voted on a review
   */
  async hasUserVoted(reviewId: string, userAddress: string): Promise<boolean> {
    try {
      // Query vote receipts owned by the user
      const objects = await this.client.getOwnedObjects({
        owner: userAddress,
        filter: {
          StructType: `${this.packageId}::voting::VoteReceipt`,
        },
      })

      return objects.data.some(obj => {
        // Check if this receipt is for the given review
        return obj.data?.content && 
               (obj.data.content as any).fields?.review_id === reviewId
      })
    } catch {
      return false
    }
  }

  /**
   * Get user's vote on a specific review
   */
  async getUserVote(reviewId: string, userAddress: string): Promise<boolean | undefined> {
    try {
      const objects = await this.client.getOwnedObjects({
        owner: userAddress,
        filter: {
          StructType: `${this.packageId}::voting::VoteReceipt`,
        },
      })

      for (const obj of objects.data) {
        const receipt = await this.client.getObject({
          id: obj.data?.objectId || '',
          options: { showContent: true },
        })

        if (receipt.data?.content && receipt.data.content.dataType === 'moveObject') {
          const fields = receipt.data.content.fields as any
          if (fields.review_id === reviewId) {
            return fields.is_upvote
          }
        }
      }
    } catch {
      return undefined
    }
  }

  /**
   * Check if an object has already been submitted for review
   */
  async isObjectSubmitted(objectId: string): Promise<boolean> {
    if (!this.registryId || !this.packageId) {
      return false
    }

    try {
      const allReviews = await this.getAllReviews()
      return allReviews.some(review => review.objectId === objectId)
    } catch (error) {
      console.error('Error checking if object submitted:', error)
      return false
    }
  }

  /**
   * Get statistics for the voting system
   */
  async getVotingStats(userAddress?: string): Promise<VoteStats> {
    const allReviews = await this.getAllReviews(userAddress)
    
    const userVotes = userAddress 
      ? allReviews.filter(r => r.hasVoted).length 
      : 0

    const pendingReviews = allReviews.filter(r => !r.hasVoted)

    return {
      totalReviews: allReviews.length,
      userVotes,
      pendingReviews: pendingReviews.slice(0, 10), // Show latest 10 pending
    }
  }

  /**
   * Helper to decode string inputs from transaction
   */
  private decodeStringInput(input: any): string | null {
    try {
      if (input?.Pure?.bytes) {
        // Decode the bytes to string
        const bytes = new Uint8Array(Buffer.from(input.Pure.bytes, 'base64'))
        const decoder = new TextDecoder()
        
        // BCS strings are length-prefixed with ULEB128
        let offset = 0
        let length = 0
        let shift = 0
        
        // Decode ULEB128 length
        while (offset < bytes.length) {
          const byte = bytes[offset++]
          length |= (byte & 0x7f) << shift
          if ((byte & 0x80) === 0) break
          shift += 7
        }
        
        // Extract the string
        if (length > 0 && offset + length <= bytes.length) {
          const stringBytes = bytes.slice(offset, offset + length)
          return decoder.decode(stringBytes)
        }
        
        // Fallback: try to decode the whole thing
        const decoded = decoder.decode(bytes)
        return decoded.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
      }
    } catch (err) {
      console.log('Error decoding string input:', err)
    }
    return null
  }

  /**
   * Mock data for development/testing
   */
  private getMockReviews(): ReviewRequest[] {
    return [
      {
        id: '0xmock1',
        objectId: '0x1234567890abcdef',
        objectType: 'NFT',
        objectName: 'Sui Punk #1337',
        submitter: '0xsubmitter1',
        submissionTime: Date.now() - 86400000,
        votesUp: 42,
        votesDown: 3,
        metadata: 'Rare NFT from Sui Punks collection',
        imageUrl: 'https://via.placeholder.com/150/4B5563/C0E6FF?text=NFT',
        hasVoted: false,
      },
      {
        id: '0xmock2',
        objectId: '0xabcdef1234567890',
        objectType: 'COIN',
        objectName: 'SCAM Token',
        submitter: '0xsubmitter2',
        submissionTime: Date.now() - 3600000,
        votesUp: 2,
        votesDown: 58,
        metadata: 'Suspicious token with no liquidity',
        imageUrl: 'https://via.placeholder.com/150/FF5563/FFFFFF?text=SCAM',
        hasVoted: false,
      },
      {
        id: '0xmock3',
        objectId: '0xfedcba0987654321',
        objectType: 'NFT',
        objectName: 'Cool Cat #999',
        submitter: '0xsubmitter3',
        submissionTime: Date.now() - 7200000,
        votesUp: 28,
        votesDown: 5,
        metadata: 'Verified Cool Cats NFT',
        imageUrl: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=CAT',
        hasVoted: true,
        userVote: true,
      },
    ]
  }

  /**
   * Listen to voting events in real-time
   */
  async subscribeToVotingEvents(callback: (event: any) => void) {
    if (!this.packageId) return

    // Subscribe to ReviewSubmitted events
    await this.client.subscribeEvent({
      filter: {
        MoveEventType: `${this.packageId}::voting::ReviewSubmitted`,
      },
      onMessage: callback,
    })

    // Subscribe to VoteCast events
    await this.client.subscribeEvent({
      filter: {
        MoveEventType: `${this.packageId}::voting::VoteCast`,
      },
      onMessage: callback,
    })
  }

  /**
   * Execute a sponsored transaction via Gas Station
   */
  private async executeSponsoredTransaction(
    tx: Transaction,
    senderAddress: string,
    signTransaction: any
  ): Promise<any> {
    try {
      console.log('Sponsoring voting transaction with Gas Station...')

      // Build transaction WITHOUT gas payment for sponsorship
      const txBytes = await tx.build({
        client: this.client,
        onlyTransactionKind: true,
      })

      const rawTxBytesHex = toHex(txBytes)

      // Request sponsorship from Gas Station via proxy
      const response = await fetch('/api/gas-station/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: GAS_STATION_API_KEY,
          rawTxBytesHex,
          sender: senderAddress,
          network: GAS_STATION_NETWORK,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new GasStationError(
          errorData.error || errorData.message || `Sponsorship failed (${response.status})`,
          response.status,
          errorData
        )
      }

      const sponsorResponse = await response.json()
      console.log('✅ Voting transaction sponsored!')

      const { txBytesHex, sponsorSignature } = sponsorResponse
      const sponsoredBytes = fromHex(txBytesHex)

      // Sign with wallet
      console.log('Requesting user signature for voting transaction...')
      const userSignature = await new Promise<any>((resolve, reject) => {
        signTransaction(
          { transaction: toBase64(sponsoredBytes) },
          {
            onSuccess: (signature) => {
              console.log('✅ User signature received for voting')
              resolve(signature)
            },
            onError: (error) => {
              console.error('❌ User signature failed for voting:', error)
              reject(error)
            },
          }
        )
      })

      console.log('Executing sponsored voting transaction...')

      // Execute transaction with both signatures
      const result = await this.client.executeTransactionBlock({
        transactionBlock: sponsoredBytes,
        signature: [userSignature.signature, sponsorSignature],
        options: {
          showEffects: true,
          showEvents: true,
        },
      })

      console.log('✅ Voting transaction executed successfully!', result.digest)

      return result
    } catch (error) {
      console.error('❌ Sponsored voting transaction failed:', error)
      throw error
    }
  }
}