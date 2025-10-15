import { SuiWalletReader } from '../src/wallet';

/**
 * Read wallet data using real Sui gRPC APIs.
 */
async function readWallet(): Promise<void> {
  const address = '';
  const reader = new SuiWalletReader('mainnet');

  try {
    console.log(`Reading wallet: ${address}`);
    console.log();

    const walletData = await reader.readWallet(address);

    console.log('BALANCES:');
    if (walletData.balances.length === 0) {
      console.log('  No balances found');
    } else {
      walletData.balances.forEach(balance => {
        const coinName = formatCoinType(balance.coinType);
        const amount = formatBalance(balance.totalBalance, balance.coinType);
        console.log(`  ${coinName}: ${amount}`);
        if (balance.lockedBalance !== '0') {
          const locked = formatBalance(balance.lockedBalance, balance.coinType);
          console.log(`    (Locked: ${locked})`);
        }
      });
    }

    console.log();
    console.log('OWNED OBJECTS:');
    if (walletData.ownedObjects.length === 0) {
      console.log('  No objects found');
    } else {
      console.log(`  Total objects: ${walletData.ownedObjects.length}`);
      walletData.ownedObjects.slice(0, 5).forEach((obj, i) => {
        console.log(`  ${i + 1}. ${obj.objectId}`);
        if (obj.type) {
          console.log(`     Type: ${obj.type}`);
        }
        console.log(`     Version: ${obj.version}`);
      });
      if (walletData.ownedObjects.length > 5) {
        console.log(`  ... and ${walletData.ownedObjects.length - 5} more`);
      }
    }

  } catch (error) {
    console.error('Failed to read wallet:', (error as Error).message);
  } finally {
    reader.close();
  }
}

function formatCoinType(coinType: string): string {
  if (coinType.includes('::sui::SUI')) return 'SUI';
  const parts = coinType.split('::');
  return parts[parts.length - 1] || coinType;
}

function formatBalance(balance: string, coinType: string): string {
  const amount = BigInt(balance);
  if (coinType.includes('::sui::SUI')) {
    return `${(Number(amount) / 1e9).toFixed(4)} SUI`;
  }
  return `${balance} units`;
}

if (require.main === module) {
  readWallet().catch(console.error);
}