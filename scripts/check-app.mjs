import { access, readFile } from 'node:fs/promises';

const requiredFiles = ['index.html', 'styles.css', 'app.js'];
await Promise.all(requiredFiles.map((file) => access(file)));

const html = await readFile('index.html', 'utf8');
const js = await readFile('app.js', 'utf8');

for (const chain of ['Solana', 'Ethereum', 'Ton']) {
  if (!js.includes(chain)) {
    throw new Error(`Missing launch chain: ${chain}`);
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

console.log('Genpay static app check passed.');
