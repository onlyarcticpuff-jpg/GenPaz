# Genpay

Genpay is a non-custodial crypto wallet prototype focused on three launch chains:

- Solana
- Ethereum
- Ton

The app runs fully in the browser. It creates a local encrypted vault, generates a BIP-39 recovery phrase, derives chain accounts for Solana, Ethereum, and Ton, requires the user to confirm the backup phrase, lets users unlock or lock the wallet, copy receive addresses, switch chains, and prepare unsigned demo transactions. Private recovery material is encrypted with Web Crypto AES-GCM and stored on the user's device only; decrypted material is held in memory only while the vault is unlocked.

> Warning: this is a testnet-oriented prototype. Do not deposit mainnet funds until production signing, recovery, audits, and broadcast flows are complete.

## Getting started

```bash
npm run dev
```

Then open <http://localhost:5173>.

## Available scripts

- `npm run dev` - start a local static web server.
- `npm run build` - validate the static app files, wallet dependencies, launch chains, and required wallet features.

## Implementation notes

- Recovery phrase generation uses `@scure/bip39` with the English BIP-39 wordlist from ESM CDN.
- Ethereum account derivation uses `ethers` with the `m/44'/60'/0'/0/0` path.
- Solana account derivation uses `ed25519-hd-key` plus `@solana/web3.js` with the `m/44'/501'/0'/0'` path.
- Ton account derivation uses `@ton/crypto` and `@ton/ton` from ESM CDN.
- The browser vault uses PBKDF2 + AES-GCM through the Web Crypto API.
- `index.html` includes a restrictive Content-Security-Policy meta tag that allows the app and ESM CDN dependencies while blocking object embedding and framing.
