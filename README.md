# Sui Wallet Cleaner

A lightweight web application to help Sui wallet users review and manage unwanted NFTs, spam, and suspicious objects in their wallets.

## Features

- **Wallet Connection**: Connect using Sui Wallet, Suiet, or Ethos Wallet via the wallet standard
- **NFT Scanning**: Automatically fetches and displays all NFTs in your wallet
- **Smart Classification**: Categorizes NFTs as Legitimate, Dubious, or Scam based on:
  - Curated approved packages list
  - Pattern recognition for scam indicators
  - Metadata quality analysis
- **Bulk Actions**: Select multiple NFTs to hide, transfer, or burn
- **User-Friendly Interface**: Clean, responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sui wallet (Sui Wallet, Suiet, or Ethos)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sui-wallet-cleaner.git
cd sui-wallet-cleaner
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Connect Your Wallet**: Click the "Connect Wallet" button and select your preferred wallet
2. **Review NFTs**: The app will automatically scan and classify your NFTs
3. **Filter & Select**: Use filters to view specific categories and select NFTs for action
4. **Take Action**: 
   - Hide unwanted NFTs from view
   - Transfer to a burner address
   - Burn NFTs (if supported by the contract)

## Classification Logic

### Legitimate (Green)
- NFTs from verified, approved packages
- Official Sui ecosystem collections (e.g., Suifrens)
- Trusted community projects

### Dubious (Yellow)
- Unknown origin packages
- Missing or incomplete metadata
- No image or broken image links

### Scam (Red)
- Contains scam keywords (airdrop, claim, urgent, etc.)
- Suspicious metadata patterns
- Known scam package addresses

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Styling**: Tailwind CSS
- **Sui Integration**: @mysten/sui SDK, @mysten/dapp-kit
- **State Management**: Zustand
- **Data Fetching**: TanStack Query

## Project Structure

```
sui-wallet-cleaner/
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── WalletButton.tsx
│   ├── NFTCard.tsx
│   └── NFTGrid.tsx
├── services/           # Business logic
│   └── nftService.ts
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── config/             # Configuration files
└── lib/                # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Security Notice

This tool helps identify suspicious NFTs but should not be your only security measure. Always:
- Verify transactions before signing
- Be cautious with unknown NFTs
- Never share your seed phrase
- Keep your wallet software updated

## License

MIT

## Acknowledgments

Built for the Sui ecosystem RFP program