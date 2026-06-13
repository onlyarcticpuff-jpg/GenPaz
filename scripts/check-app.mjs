import { access, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const requiredFiles = ['index.html', 'styles.css', 'app.js'];
await Promise.all(requiredFiles.map((file) => access(file)));

const html = await readFile('index.html', 'utf8');
const js = await readFile('app.js', 'utf8');
await execFileAsync(process.execPath, ['--check', 'app.js']);

for (const chain of ['Solana', 'Ethereum', 'Ton']) {
  if (!js.includes(chain)) {
    throw new Error(`Missing launch chain: ${chain}`);
  }
}

for (const library of ['ethers@6.15.0', '@solana/web3.js@1.98.4', '@ton/crypto@3.3.0', '@ton/ton@15.3.1']) {
  if (!js.includes(library)) {
    throw new Error(`Missing wallet dependency import: ${library}`);
  }
}

for (const feature of ['const lucideIcons', 'encryptVault', 'decryptVault', 'createAccounts', 'submitTransaction', 'VAULT_KEY', 'generateMnemonic', 'HDNodeWallet.fromPhrase', 'derivePath', 'Keypair.fromSeed']) {
  if (!js.includes(feature)) {
    throw new Error(`Missing wallet feature: ${feature}`);
  }
}

for (const icon of ['Wallet', 'ShieldCheck', 'ArrowUpRight', 'ArrowDownLeft', 'QrCode']) {
  if (!js.includes(`data-lucide="${icon}"`)) {
    throw new Error(`Missing Lucide icon usage: ${icon}`);
  }
}

if (!html.includes('Genpay Wallet')) {
  throw new Error('Missing Genpay page title');
}

console.log('Genpay wallet app check passed.');
