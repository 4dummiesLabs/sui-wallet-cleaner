module community_voting::voting {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const E_ALREADY_VOTED: u64 = 0;
    const E_NOT_OWNER: u64 = 1;
    const E_REVIEW_NOT_FOUND: u64 = 2;
    const E_CANNOT_VOTE_OWN: u64 = 3;
    const E_ALREADY_SUBMITTED: u64 = 4;

    // Structs
    struct VotingRegistry has key {
        id: UID,
        reviews: Table<ID, ReviewRequest>,
        submitted_objects: Table<String, ID>, // Track object_id -> review_id
        total_reviews: u64,
    }

    struct ReviewRequest has store {
        id: ID,
        object_id: String,        // The NFT or object being reviewed
        object_type: String,      // NFT, COIN, etc.
        object_name: String,
        submitter: address,
        submission_time: u64,
        votes_up: u64,
        votes_down: u64,
        voters: Table<address, bool>, // address -> true (upvote) or false (downvote)
        metadata: String,         // Additional info about the object
        image_url: String,
    }

    struct VoteReceipt has key, store {
        id: UID,
        voter: address,
        review_id: ID,
        is_upvote: bool,
        timestamp: u64,
    }

    // Events
    struct ReviewSubmitted has copy, drop {
        review_id: ID,
        object_id: String,
        submitter: address,
        timestamp: u64,
    }

    struct VoteCast has copy, drop {
        review_id: ID,
        voter: address,
        is_upvote: bool,
        new_up_votes: u64,
        new_down_votes: u64,
    }

    // Initialize the voting registry (should be called once)
    fun init(ctx: &mut TxContext) {
        let registry = VotingRegistry {
            id: object::new(ctx),
            reviews: table::new(ctx),
            submitted_objects: table::new(ctx),
            total_reviews: 0,
        };
        transfer::share_object(registry);
    }

    // Submit an object for community review
    public entry fun submit_for_review(
        registry: &mut VotingRegistry,
        object_id: String,
        object_type: String,
        object_name: String,
        metadata: String,
        image_url: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Check if this object has already been submitted
        assert!(
            !table::contains(&registry.submitted_objects, object_id),
            E_ALREADY_SUBMITTED
        );
        
        let review_id = object::new(ctx);
        let review_id_copy = object::uid_to_inner(&review_id);
        
        let review = ReviewRequest {
            id: review_id_copy,
            object_id,
            object_type,
            object_name,
            submitter: tx_context::sender(ctx),
            submission_time: clock::timestamp_ms(clock),
            votes_up: 0,
            votes_down: 0,
            voters: table::new(ctx),
            metadata,
            image_url,
        };

        // Store the review
        table::add(&mut registry.reviews, review_id_copy, review);
        
        // Track that this object has been submitted
        table::add(&mut registry.submitted_objects, object_id, review_id_copy);
        
        registry.total_reviews = registry.total_reviews + 1;

        event::emit(ReviewSubmitted {
            review_id: review_id_copy,
            object_id,
            submitter: tx_context::sender(ctx),
            timestamp: clock::timestamp_ms(clock),
        });

        object::delete(review_id);
    }

    // Cast a vote on a review
    public entry fun cast_vote(
        registry: &mut VotingRegistry,
        review_id: ID,
        is_upvote: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        assert!(
            table::contains(&registry.reviews, review_id),
            E_REVIEW_NOT_FOUND
        );
        
        let review = table::borrow_mut(&mut registry.reviews, review_id);
        
        // Check if user submitted this review (can't vote on own)
        assert!(
            review.submitter != sender,
            E_CANNOT_VOTE_OWN
        );
        
        // Check if user already voted
        assert!(
            !table::contains(&review.voters, sender),
            E_ALREADY_VOTED
        );
        
        // Record the vote
        table::add(&mut review.voters, sender, is_upvote);
        
        if (is_upvote) {
            review.votes_up = review.votes_up + 1;
        } else {
            review.votes_down = review.votes_down + 1;
        };
        
        // Create a vote receipt for the user
        let receipt = VoteReceipt {
            id: object::new(ctx),
            voter: sender,
            review_id,
            is_upvote,
            timestamp: clock::timestamp_ms(clock),
        };
        
        transfer::transfer(receipt, sender);
        
        event::emit(VoteCast {
            review_id,
            voter: sender,
            is_upvote,
            new_up_votes: review.votes_up,
            new_down_votes: review.votes_down,
        });
    }

    // Change vote (if already voted)
    public entry fun change_vote(
        registry: &mut VotingRegistry,
        review_id: ID,
        new_is_upvote: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        assert!(
            table::contains(&registry.reviews, review_id),
            E_REVIEW_NOT_FOUND
        );
        
        let review = table::borrow_mut(&mut registry.reviews, review_id);
        
        // Must have already voted
        assert!(
            table::contains(&review.voters, sender),
            E_REVIEW_NOT_FOUND // Reusing error code
        );
        
        let previous_vote = *table::borrow(&review.voters, sender);
        
        // Only process if vote is actually changing
        if (previous_vote != new_is_upvote) {
            // Remove old vote count
            if (previous_vote) {
                review.votes_up = review.votes_up - 1;
                review.votes_down = review.votes_down + 1;
            } else {
                review.votes_down = review.votes_down - 1;
                review.votes_up = review.votes_up + 1;
            };
            
            // Update voter record
            table::remove(&mut review.voters, sender);
            table::add(&mut review.voters, sender, new_is_upvote);
            
            event::emit(VoteCast {
                review_id,
                voter: sender,
                is_upvote: new_is_upvote,
                new_up_votes: review.votes_up,
                new_down_votes: review.votes_down,
            });
        }
    }

    // View functions (these would be called off-chain)
    public fun get_review(registry: &VotingRegistry, review_id: ID): &ReviewRequest {
        table::borrow(&registry.reviews, review_id)
    }

    public fun get_total_reviews(registry: &VotingRegistry): u64 {
        registry.total_reviews
    }

    public fun get_vote_counts(review: &ReviewRequest): (u64, u64) {
        (review.votes_up, review.votes_down)
    }

    public fun has_voted(review: &ReviewRequest, voter: address): bool {
        table::contains(&review.voters, voter)
    }

    public fun get_user_vote(review: &ReviewRequest, voter: address): bool {
        if (table::contains(&review.voters, voter)) {
            *table::borrow(&review.voters, voter)
        } else {
            false
        }
    }
}