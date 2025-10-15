# Sui gRPC Client

Production-ready TypeScript gRPC client for Sui blockchain wallet and object data.

## Installation

```bash
npm install sui-grpc-client
```

## Usage

### Basic Wallet Reading

```typescript
import { SuiWalletReader } from 'sui-grpc-client';

const reader = new SuiWalletReader('mainnet');

try {
  const walletData = await reader.readWallet('0x...');
  
  console.log('Balances:', walletData.balances);
  console.log('Owned Objects:', walletData.ownedObjects);
} finally {
  reader.close();
}
```

### Get Specific Balance

```typescript
const balance = await reader.getBalance(
  '0x...',
  '0x2::sui::SUI'
);
console.log('SUI Balance:', balance.totalBalance);
```

### Get Owned Objects

```typescript
const objects = await reader.getOwnedObjects('0x...');
console.log('Object count:', objects.length);
```

## API Reference

### SuiWalletReader

#### Constructor
- `new SuiWalletReader(network: 'mainnet' | 'testnet' | 'devnet')`

#### Methods
- `readWallet(address: string): Promise<WalletData>`
- `getBalances(address: string): Promise<Balance[]>`
- `getBalance(address: string, coinType: string): Promise<Balance>`
- `getOwnedObjects(address: string): Promise<OwnedObject[]>`
- `close(): void`

### Types

```typescript
interface WalletData {
  readonly address: string;
  readonly balances: Balance[];
  readonly ownedObjects: OwnedObject[];
}

interface Balance {
  readonly coinType: string;
  readonly totalBalance: string;
  readonly lockedBalance: string;
}

interface OwnedObject {
  readonly objectId: string;
  readonly version: string;
  readonly digest: string;
  readonly type?: string;
}
```

## Networks

- `mainnet` - Sui Mainnet
- `testnet` - Sui Testnet  
- `devnet` - Sui Devnet

## License

MIT License