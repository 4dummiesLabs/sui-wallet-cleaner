#!/bin/bash

# Deploy Community Voting Contract to Sui
# This script builds and publishes the voting contract to Sui testnet/mainnet

echo "🚀 Deploying Community Voting Contract..."

# Navigate to contract directory
cd contracts/community_voting

# Build the contract
echo "📦 Building contract..."
sui move build

# Test the contract (optional)
echo "🧪 Running tests..."
sui move test

# Publish to network
echo "📤 Publishing to Sui network..."
echo "Please make sure you have:"
echo "1. Sui CLI installed and configured"
echo "2. Active Sui account with gas"
echo "3. Network set to desired network (testnet/mainnet)"
echo ""
echo "Run: sui client publish --gas-budget 100000000"
echo ""
echo "After deployment, update the VOTING_REGISTRY_ID in .env.local"

# The actual publish command (commented out for safety)
# sui client publish --gas-budget 100000000

echo "✅ Deployment script ready. Run the publish command manually for safety."