# Community Voting System Deployment Guide

## Overview
The community voting system allows users to submit NFTs and objects for community review, where each wallet can vote once per object. This creates a decentralized reputation system for Sui blockchain assets.

## Prerequisites
- Sui CLI installed
- Active Sui wallet with gas for deployment
- Node.js and npm installed

## Deployment Steps

### 1. Deploy the Smart Contract

```bash
# Navigate to the contract directory
cd contracts/community_voting

# Build the contract
sui move build

# Run tests (optional but recommended)
sui move test

# Deploy to Sui network
sui client publish --gas-budget 100000000
```

After deployment, you'll receive:
- **Package ID**: The deployed package address
- **VotingRegistry ID**: The shared object ID (found in the created objects)

### 2. Configure Environment Variables

Copy the example env file:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your deployment values:
```
NEXT_PUBLIC_VOTING_PACKAGE_ID=0x... # Your package ID
NEXT_PUBLIC_VOTING_REGISTRY_ID=0x... # Your registry object ID
NEXT_PUBLIC_SUI_NETWORK=mainnet # or testnet
```

### 3. Run the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production
npm run build
npm run start
```

## Features

### For Users
1. **community review Button**: Appears in header when wallet is connected
   - Shows pending review count
   - Access voting queue
   - Cast votes on submitted objects

2. **Submit for Review**: When selecting objects in your wallet
   - Click "Submit for Review" button
   - Add description for why it needs review
   - Pay gas fee for submission

3. **View Votes**: See community consensus on objects
   - Real-time vote counts
   - Percentage-based safety ratings
   - Vote history tracking

### Smart Contract Functions

#### `submit_for_review`
- Submits an object for community voting
- Parameters: object_id, type, name, metadata, image_url
- Emits `ReviewSubmitted` event

#### `cast_vote`
- Cast a vote (thumbs up/down)
- One vote per wallet per object
- Creates `VoteReceipt` for tracking
- Emits `VoteCast` event

#### `change_vote`
- Change an existing vote
- Updates vote counts
- Maintains vote history

## Security Features
- **One vote per wallet**: Enforced at contract level
- **No self-voting**: Cannot vote on objects you submitted
- **Immutable voting history**: All votes recorded on-chain
- **Gas fee requirement**: Prevents spam submissions

## Testing on Testnet

1. Get testnet SUI from faucet:
```bash
sui client faucet
```

2. Deploy to testnet:
```bash
sui client publish --gas-budget 100000000 --network testnet
```

3. Update `.env.local` with testnet values

## Monitoring

View contract events:
```bash
sui client events --package <PACKAGE_ID>
```

Query voting registry:
```bash
sui client object <REGISTRY_ID>
```

## Troubleshooting

### Contract Deployment Failed
- Ensure sufficient gas in wallet
- Check Sui CLI is latest version
- Verify network connectivity

### Votes Not Appearing
- Check environment variables are set
- Ensure wallet is connected
- Verify contract deployment succeeded

### Transaction Failures
- Check gas balance
- Verify correct network (mainnet/testnet)
- Check wallet permissions

## Support
For issues or questions:
- Check contract logs: `sui client events`
- Review browser console for errors
- Verify all environment variables are set correctly