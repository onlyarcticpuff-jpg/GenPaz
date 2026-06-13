# Genpay

Genpay is a non-custodial crypto wallet prototype focused on three launch chains:
Genpay is a basic non-custodial crypto wallet starter focused on three launch chains:

- Solana
- Ethereum
- Ton
The app runs fully in the browser. It creates a local encrypted vault, generates chain accounts, lets users unlock or lock the wallet, copy receive addresses, switch chains, and prepare unsigned demo transactions. Private recovery material is encrypted with Web Crypto AES-GCM and stored on the user's device only.

> Warning: this is a testnet-oriented prototype. Do not deposit mainnet funds until production signing, recovery, audits, and broadcast flows are complete.
The current app is a dependency-free web prototype with Lucide-style inline SVG icons, a wallet balance overview, chain cards, and non-custodial security messaging.

## Getting started

```bash
npm run dev
```

Then open <http://localhost:5173>.

## Available scripts

- `npm run dev` - start a local static web server.
- `npm run build` - validate the static app files, wallet dependencies, launch chains, and required wallet features.

## Implementation notes

- Ethereum account generation uses `ethers` from ESM CDN.
- Solana account generation uses `@solana/web3.js` from ESM CDN.
- Ton account derivation uses `@ton/crypto` and `@ton/ton` from ESM CDN.
- The browser vault uses PBKDF2 + AES-GCM through the Web Crypto API.
- `npm run build` - validate the static app files and required wallet content.
