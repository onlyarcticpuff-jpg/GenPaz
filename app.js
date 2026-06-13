const chains = [
  {
    name: 'Solana',
    ticker: 'SOL',
    balance: '18.42',
    fiatValue: '$2,731.10',
    address: '8vQk...T4mP',
    accent: '#8b5cf6',
    description: 'Fast settlement for everyday Genpay transfers.',
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    balance: '3.08',
    fiatValue: '$10,223.44',
    address: '0x7A...91cF',
    accent: '#3b82f6',
    description: 'Self-custody access to DeFi and token payments.',
  },
  {
    name: 'Ton',
    ticker: 'TON',
    balance: '642.90',
    fiatValue: '$4,007.68',
    address: 'UQDa...7nQp',
    accent: '#06b6d4',
    description: 'Messaging-native payments for global transfers.',
  },
];

const lucideIcons = {
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

let showBalances = true;

function icon(name) {
  return lucideIcons[name];
}

function render() {
  const total = showBalances ? '$16,962.22' : '••••••';
  document.querySelector('#app').innerHTML = `
    <main class="app-shell">
      <nav class="topbar" aria-label="Primary navigation">
        <div class="brand-mark">${icon('Wallet')}<span>Genpay</span></div>
        <div class="nav-actions">
          <button class="ghost-button" type="button">${icon('Network')}Mainnet</button>
          <button class="primary-button" type="button">${icon('KeyRound')}Create wallet</button>
        </div>
      </nav>

      <section class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${icon('ShieldCheck')}Non-custodial crypto wallet</p>
          <h1>Your keys. Your chains. Your Genpay.</h1>
          <p class="hero-text">
            A simple starting point for a secure wallet experience across Solana, Ethereum, and Ton.
            Genpay keeps private keys under user control while making send, receive, and network
            switching feel effortless.
          </p>
          <div class="hero-actions">
            <button class="primary-button large" type="button">${icon('Fingerprint')}Start securely</button>
            <button class="ghost-button large" type="button">${icon('QrCode')}Receive funds</button>
          </div>
        </div>

        <aside class="wallet-card" aria-label="Genpay wallet overview">
          <div class="wallet-card-header">
            <div><p>Total balance</p><h2>${total}</h2></div>
            <button class="icon-button" id="toggle-balances" type="button" aria-label="${showBalances ? 'Hide balances' : 'Show balances'}">
              ${icon(showBalances ? 'EyeOff' : 'Eye')}
            </button>
          </div>
          <div class="quick-actions" aria-label="Wallet actions">
            <button type="button">${icon('ArrowUpRight')}Send</button>
            <button type="button">${icon('ArrowDownLeft')}Receive</button>
            <button type="button">${icon('Copy')}Copy</button>
          </div>
        </aside>
      </section>

      <section class="chain-section" aria-labelledby="chain-title">
        <div class="section-heading">
          <p class="eyebrow">${icon('Coins')}Launch chains</p>
          <h2 id="chain-title">Built first for Solana, Ethereum, and Ton</h2>
        </div>
        <div class="chain-grid">
          ${chains.map((chain) => `
            <article class="chain-card" style="--accent: ${chain.accent}">
              <div class="chain-icon" aria-hidden="true">${icon('Sparkles')}</div>
              <div><h3>${chain.name}</h3><p>${chain.description}</p></div>
              <dl>
                <div><dt>Balance</dt><dd>${showBalances ? `${chain.balance} ${chain.ticker}` : '••••••'}</dd></div>
                <div><dt>Value</dt><dd>${showBalances ? chain.fiatValue : '••••••'}</dd></div>
                <div><dt>Address</dt><dd>${chain.address}</dd></div>
              </dl>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="security-strip" aria-label="Security principles">
        <div>${icon('LockKeyhole')}<span>Seed phrase encrypted locally</span></div>
        <div>${icon('BadgeCheck')}<span>User signs every transaction</span></div>
        <div>${icon('Zap')}<span>Chain-ready payment shortcuts</span></div>
      </section>
    </main>
  `;

  document.querySelector('#toggle-balances').addEventListener('click', () => {
    showBalances = !showBalances;
    render();
  });
}

render();
