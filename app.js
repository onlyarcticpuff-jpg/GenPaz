import { HDNodeWallet } from 'https://esm.sh/ethers@6.15.0';
import { Keypair } from 'https://esm.sh/@solana/web3.js@1.98.4';
import { generateMnemonic, mnemonicToSeedSync } from 'https://esm.sh/@scure/bip39@1.5.4';
import { wordlist } from 'https://esm.sh/@scure/bip39@1.5.4/wordlists/english';
import { derivePath } from 'https://esm.sh/ed25519-hd-key@1.3.0';
import { mnemonicToWalletKey } from 'https://esm.sh/@ton/crypto@3.3.0';
import { WalletContractV4 } from 'https://esm.sh/@ton/ton@15.3.1';

const VAULT_KEY = 'genpay.encryptedVault.v1';
const SESSION_KEY = 'genpay.sessionWallet.v1';
const BALANCES_KEY = 'genpay.demoBalances.v1';

const lucideIcons = {
  AlertTriangle: '<svg data-lucide="AlertTriangle" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  ArrowDownLeft: '<svg data-lucide="ArrowDownLeft" viewBox="0 0 24 24"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>',
  ArrowUpRight: '<svg data-lucide="ArrowUpRight" viewBox="0 0 24 24"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
  BadgeCheck: '<svg data-lucide="BadgeCheck" viewBox="0 0 24 24"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.75Z"/><path d="m9 12 2 2 4-4"/></svg>',
  Coins: '<svg data-lucide="Coins" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>',
  Copy: '<svg data-lucide="Copy" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  Eye: '<svg data-lucide="Eye" viewBox="0 0 24 24"><path d="M2.06 12.35a1 1 0 0 1 0-.7A10.75 10.75 0 0 1 12 5a10.75 10.75 0 0 1 9.94 6.65 1 1 0 0 1 0 .7A10.75 10.75 0 0 1 12 19a10.75 10.75 0 0 1-9.94-6.65Z"/><circle cx="12" cy="12" r="3"/></svg>',
  EyeOff: '<svg data-lucide="EyeOff" viewBox="0 0 24 24"><path d="m15 18-.72-3.25"/><path d="M2 8a10.45 10.45 0 0 0 20 0"/><path d="m20 15-1.73-2.05"/><path d="m4 15 1.73-2.05"/><path d="m9 18 .72-3.25"/></svg>',
  Fingerprint: '<svg data-lucide="Fingerprint" viewBox="0 0 24 24"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>',
  KeyRound: '<svg data-lucide="KeyRound" viewBox="0 0 24 24"><path d="M2.59 13.41a2 2 0 0 0 0 2.83l5.17 5.17a2 2 0 0 0 2.83 0l8.82-8.82a6 6 0 1 0-8.49-8.49z"/><path d="M16 7h.01"/></svg>',
  LockKeyhole: '<svg data-lucide="LockKeyhole" viewBox="0 0 24 24"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>',
  Network: '<svg data-lucide="Network" viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
  QrCode: '<svg data-lucide="QrCode" viewBox="0 0 24 24"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>',
  ShieldCheck: '<svg data-lucide="ShieldCheck" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  Sparkles: '<svg data-lucide="Sparkles" viewBox="0 0 24 24"><path d="M9.94 15.5 8.5 21l-1.44-5.5L1.5 14l5.56-1.5L8.5 7l1.44 5.5L15.5 14z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M18 17v2"/><path d="M19 18h-2"/></svg>',
  Wallet: '<svg data-lucide="Wallet" viewBox="0 0 24 24"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"/><path d="M18 12h.01"/></svg>',
  Zap: '<svg data-lucide="Zap" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
};

const chainMeta = {
  Solana: { ticker: 'SOL', accent: '#8b5cf6', unit: 'lamports', network: 'devnet' },
  Ethereum: { ticker: 'ETH', accent: '#3b82f6', unit: 'wei', network: 'sepolia' },
  Ton: { ticker: 'TON', accent: '#06b6d4', unit: 'nanoTON', network: 'testnet' },
};

let decryptedSeedPhrase = null;

const state = {
  wallet: readJson(SESSION_KEY),
  balances: readJson(BALANCES_KEY) ?? { Solana: 0.25, Ethereum: 0.05, Ton: 4.2 },
  activeChain: 'Solana',
  showBalances: true,
  notice: '',
  backupPhrase: '',
  needsBackup: false,
};

function icon(name) {
  return lucideIcons[name];
}

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function bytesToBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

function randomMnemonic() {
  return generateMnemonic(wordlist, 256);
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 210_000 },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptVault(seedPhrase, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const cipherText = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(seedPhrase));
  return { salt: bytesToBase64(salt), iv: bytesToBase64(iv), cipherText: bytesToBase64(cipherText), version: 1 };
}

async function decryptVault(password) {
  const vault = readJson(VAULT_KEY);
  if (!vault) {
    throw new Error('No Genpay vault exists yet. Create a wallet first.');
  }
  const salt = base64ToBytes(vault.salt);
  const iv = base64ToBytes(vault.iv);
  const key = await deriveKey(password, salt);
  const plainText = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, base64ToBytes(vault.cipherText));
  return new TextDecoder().decode(plainText);
}

async function createAccounts(seedPhrase) {
  const seedHex = bytesToHex(mnemonicToSeedSync(seedPhrase));
  const eth = HDNodeWallet.fromPhrase(seedPhrase, undefined, "m/44'/60'/0'/0/0");
  const solanaSeed = derivePath("m/44'/501'/0'/0'", seedHex).key;
  const solana = Keypair.fromSeed(solanaSeed);
  const tonKey = await mnemonicToWalletKey(seedPhrase.split(' '));
  const tonWallet = WalletContractV4.create({ workchain: 0, publicKey: tonKey.publicKey });

  return {
    createdAt: new Date().toISOString(),
    chains: {
      Solana: { address: solana.publicKey.toBase58(), publicKey: solana.publicKey.toBase58() },
      Ethereum: { address: eth.address, publicKey: eth.signingKey.publicKey },
      Ton: { address: tonWallet.address.toString({ testOnly: true }), publicKey: bytesToBase64(tonKey.publicKey) },
    },
    pendingTransactions: [],
  };
}

function publicSession(wallet) {
  return {
    createdAt: wallet.createdAt,
    chains: wallet.chains,
    pendingTransactions: wallet.pendingTransactions ?? [],
  };
}

async function createWallet(event) {
  event.preventDefault();
  const password = new FormData(event.currentTarget).get('password').toString();
  if (password.length < 8) {
    setNotice('Use at least 8 characters for the local vault password.');
    return;
  }
  const seedPhrase = randomMnemonic();
  decryptedSeedPhrase = seedPhrase;
  state.wallet = publicSession(await createAccounts(seedPhrase));
  state.backupPhrase = seedPhrase;
  state.needsBackup = true;
  saveJson(VAULT_KEY, await encryptVault(seedPhrase, password));
  setNotice('Wallet created. Confirm your recovery phrase backup before using the wallet.');
  render();
}

async function unlockWallet(event) {
  event.preventDefault();
  const password = new FormData(event.currentTarget).get('password').toString();
  try {
    const seedPhrase = await decryptVault(password);
    decryptedSeedPhrase = seedPhrase;
    state.wallet = publicSession(await createAccounts(seedPhrase));
    saveJson(SESSION_KEY, state.wallet);
    setNotice('Vault unlocked locally. Private material stayed in this browser.');
    render();
  } catch {
    setNotice('Could not unlock the vault. Check your password and try again.');
  }
}

function setNotice(message) {
  state.notice = message;
}

function lockWallet() {
  decryptedSeedPhrase = null;
  localStorage.removeItem(SESSION_KEY);
  state.wallet = null;
  state.backupPhrase = '';
  state.needsBackup = false;
  setNotice('Wallet locked. Encrypted vault remains on this device.');
  render();
}

function copyAddress() {
  navigator.clipboard.writeText(activeAccount().address);
  setNotice(`${state.activeChain} address copied.`);
  render();
}

function activeAccount() {
  return state.wallet.chains[state.activeChain];
}

function submitTransaction(event) {
  event.preventDefault();
  if (!decryptedSeedPhrase) {
    setNotice('Unlock the vault before preparing transactions.');
    render();
    return;
  }
  const data = new FormData(event.currentTarget);
  const amount = Number(data.get('amount'));
  const to = data.get('recipient').toString().trim();
  if (!to || !Number.isFinite(amount) || amount <= 0) {
    setNotice('Enter a recipient and a positive amount.');
    render();
    return;
  }
  if (amount > state.balances[state.activeChain]) {
    setNotice('Demo balance is too low for this unsigned transaction.');
    render();
    return;
  }
  state.balances[state.activeChain] = Number((state.balances[state.activeChain] - amount).toFixed(6));
  const transaction = {
    id: crypto.randomUUID(),
    chain: state.activeChain,
    to,
    amount,
    ticker: chainMeta[state.activeChain].ticker,
    status: 'Locally prepared',
    createdAt: new Date().toLocaleString(),
  };
  state.wallet.pendingTransactions.unshift(transaction);
  saveJson(BALANCES_KEY, state.balances);
  saveJson(SESSION_KEY, state.wallet);
  setNotice('Transaction prepared locally. Broadcast integration is the next backend step.');
  render();
}


function confirmBackup() {
  const checkbox = document.querySelector('#backup-confirmed');
  if (!checkbox?.checked) {
    setNotice('Confirm that you saved the recovery phrase before continuing.');
    render();
    return;
  }
  state.needsBackup = false;
  state.backupPhrase = '';
  saveJson(SESSION_KEY, state.wallet);
  setNotice('Recovery phrase confirmed. Genpay is ready.');
  render();
}

function copyRecoveryPhrase() {
  navigator.clipboard.writeText(state.backupPhrase);
  setNotice('Recovery phrase copied. Store it somewhere offline and private.');
  render();
}

function backupScreen() {
  const words = state.backupPhrase.split(' ');
  return `
    <section class="hero-grid compact">
      <div class="hero-copy">
        <p class="eyebrow">${icon('ShieldCheck')}Recovery required</p>
        <h1>Back up your Genpay recovery phrase.</h1>
        <p class="hero-text">This phrase is the only way to recover Solana, Ethereum, and Ton accounts generated by this vault. Genpay does not custody it and cannot restore it for you.</p>
        <div class="warning-card">${icon('AlertTriangle')}Never share this phrase. Anyone with it can control the wallet.</div>
      </div>
      <aside class="wallet-card backup-card" aria-label="Recovery phrase backup">
        <div class="seed-grid">
          ${words.map((word, index) => `<span><small>${index + 1}</small>${word}</span>`).join('')}
        </div>
        <label class="checkbox-row"><input id="backup-confirmed" type="checkbox" /> I saved this phrase offline.</label>
        <div class="hero-actions">
          <button class="ghost-button large" id="copy-recovery" type="button">${icon('Copy')}Copy phrase</button>
          <button class="primary-button large" id="confirm-backup" type="button">Continue</button>
        </div>
      </aside>
    </section>
  `;
}

function walletScreen() {
  const account = activeAccount();
  const meta = chainMeta[state.activeChain];
  const total = Object.entries(state.balances).map(([chain, balance]) => `${balance} ${chainMeta[chain].ticker}`).join(' · ');
  return `
    <section class="hero-grid compact">
      <div class="hero-copy">
        <p class="eyebrow">${icon('ShieldCheck')}Non-custodial vault unlocked</p>
        <h1>Control ${state.activeChain} from your Genpay vault.</h1>
        <p class="hero-text">Your encrypted recovery phrase is stored locally with AES-GCM and unlocked with your password. Generated account addresses are ready for testnet send and receive flows.</p>
        <div class="hero-actions">
          <button class="primary-button large" id="copy-address" type="button">${icon('Copy')}Copy address</button>
          <button class="ghost-button large" id="lock-wallet" type="button">${icon('LockKeyhole')}Lock wallet</button>
        </div>
      </div>
      <aside class="wallet-card" aria-label="Genpay wallet overview">
        <div class="wallet-card-header">
          <div><p>Total demo balances</p><h2>${state.showBalances ? total : '••••••'}</h2></div>
          <button class="icon-button" id="toggle-balances" type="button" aria-label="${state.showBalances ? 'Hide balances' : 'Show balances'}">${icon(state.showBalances ? 'EyeOff' : 'Eye')}</button>
        </div>
        <p class="address-label">${state.activeChain} ${meta.network}</p>
        <code>${account.address}</code>
      </aside>
    </section>

    <section class="workspace-grid">
      <div class="chain-panel">
        <p class="eyebrow">${icon('Coins')}Chains</p>
        <div class="chain-grid interactive">
          ${Object.keys(chainMeta).map((chain) => `
            <button class="chain-card ${chain === state.activeChain ? 'selected' : ''}" data-chain="${chain}" style="--accent: ${chainMeta[chain].accent}" type="button">
              <div class="chain-icon" aria-hidden="true">${icon('Sparkles')}</div>
              <h3>${chain}</h3>
              <p>${chainMeta[chain].network} · ${chainMeta[chain].unit}</p>
              <strong>${state.showBalances ? `${state.balances[chain]} ${chainMeta[chain].ticker}` : '••••••'}</strong>
            </button>
          `).join('')}
        </div>
      </div>

      <form class="transaction-card" id="send-form">
        <p class="eyebrow">${icon('ArrowUpRight')}Send</p>
        <label>Recipient address<input name="recipient" placeholder="Paste ${state.activeChain} address" autocomplete="off" /></label>
        <label>Amount (${meta.ticker})<input name="amount" type="number" min="0" step="0.000001" placeholder="0.00" /></label>
        <button class="primary-button large" type="submit">Prepare transaction</button>
      </form>

      <div class="transaction-card receive-card">
        <p class="eyebrow">${icon('QrCode')}Receive</p>
        <div class="qr-box">${icon('QrCode')}</div>
        <code>${account.address}</code>
        <p>Use this ${state.activeChain} ${meta.network} address for incoming test funds.</p>
      </div>
    </section>

    <section class="security-strip" aria-label="Security principles">
      <div>${icon('LockKeyhole')}<span>Encrypted local vault</span></div>
      <div>${icon('BadgeCheck')}<span>User signs every transaction</span></div>
      <div>${icon('Zap')}<span>Broadcast adapters next</span></div>
    </section>

    <section class="activity-card">
      <h2>Local activity</h2>
      ${state.wallet.pendingTransactions.length ? state.wallet.pendingTransactions.map((tx) => `
        <article><span>${tx.status}</span><strong>${tx.amount} ${tx.ticker}</strong><p>${tx.chain} → ${tx.to}</p><small>${tx.createdAt}</small></article>
      `).join('') : '<p>No prepared transactions yet.</p>'}
    </section>
  `;
}

function onboardingScreen() {
  const hasVault = Boolean(localStorage.getItem(VAULT_KEY));
  return `
    <section class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${icon('ShieldCheck')}Non-custodial crypto wallet</p>
        <h1>Your keys. Your chains. Your Genpay.</h1>
        <p class="hero-text">Create an encrypted browser vault, generate accounts for Solana, Ethereum, and Ton, and prepare wallet transactions without handing custody to Genpay.</p>
        <div class="warning-card">${icon('AlertTriangle')}This is a client prototype for testnet development. Do not deposit mainnet funds yet.</div>
      </div>
      <aside class="wallet-card form-card" aria-label="Create or unlock Genpay wallet">
        <form id="create-form">
          <p class="eyebrow">${icon('Fingerprint')}Create vault</p>
          <label>New password<input name="password" type="password" minlength="8" autocomplete="new-password" placeholder="At least 8 characters" /></label>
          <button class="primary-button large" type="submit">Create wallet</button>
        </form>
        <form id="unlock-form" class="unlock-form">
          <p class="eyebrow">${icon('KeyRound')}Unlock existing</p>
          <label>Vault password<input name="password" type="password" autocomplete="current-password" placeholder="Password" ${hasVault ? '' : 'disabled'} /></label>
          <button class="ghost-button large" type="submit" ${hasVault ? '' : 'disabled'}>Unlock wallet</button>
        </form>
      </aside>
    </section>
  `;
}

function render() {
  document.querySelector('#app').innerHTML = `
    <main class="app-shell">
      <nav class="topbar" aria-label="Primary navigation">
        <div class="brand-mark">${icon('Wallet')}<span>Genpay</span></div>
        <div class="nav-actions"><span>${icon('Network')}Solana · Ethereum · Ton</span></div>
      </nav>
      ${state.notice ? `<div class="notice">${state.notice}</div>` : ''}
      ${state.needsBackup ? backupScreen() : state.wallet ? walletScreen() : onboardingScreen()}
    </main>
  `;

  document.querySelector('#create-form')?.addEventListener('submit', createWallet);
  document.querySelector('#unlock-form')?.addEventListener('submit', unlockWallet);
  document.querySelector('#confirm-backup')?.addEventListener('click', confirmBackup);
  document.querySelector('#copy-recovery')?.addEventListener('click', copyRecoveryPhrase);
  document.querySelector('#lock-wallet')?.addEventListener('click', lockWallet);
  document.querySelector('#copy-address')?.addEventListener('click', copyAddress);
  document.querySelector('#send-form')?.addEventListener('submit', submitTransaction);
  document.querySelector('#toggle-balances')?.addEventListener('click', () => {
    state.showBalances = !state.showBalances;
    render();
  });
  document.querySelectorAll('[data-chain]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeChain = button.dataset.chain;
      render();
    });
  });
}

render();
