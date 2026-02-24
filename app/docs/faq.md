---
title: FAQ
description: Custody, pricing, security, migration, troubleshooting
sidebar_position: 1
---

# Frequently Asked Questions

## Custody & Wallets

### Do you hold my funds?

**No.** Obul is non-custodial. Payments go directly from your wallet to the service provider. We never hold your private keys or funds.

### What wallets are supported?

| Wallet | Status |
|--------|--------|
| MetaMask | ✅ Supported |
| Coinbase Wallet | ✅ Supported |
| Rainbow | ✅ Supported |
| WalletConnect | ✅ Supported |
| Ledger | ✅ Supported |
| Trezor | ✅ Supported |

### Can I use a smart contract wallet?

Yes! We support:
- Safe (formerly Gnosis Safe)
- Argent
- Other ERC-4337 compatible wallets

Contact support for setup assistance.

## Pricing

### How much does Obul cost?

Obul charges **1% of payment volume** — no monthly fees, no setup costs.

| Volume | Monthly Cost |
|--------|--------------|
| $1,000 | $10 |
| $10,000 | $100 |
| $100,000 | $1,000 |

### Are there any hidden fees?

No. You pay:
- 1% to Obul
- Network gas fees (paid by the sender)

That's it.

### What networks are supported?

| Network | Status | Gas Cost |
|---------|--------|----------|
| Base | ✅ Live | ~$0.01 |
| Base Sepolia | ✅ Live | Free (testnet) |
| Ethereum | 🚧 Q2 2025 | ~$5-50 |
| Polygon | 🚧 Q2 2025 | ~$0.001 |

### Can I use custom tokens?

Yes, contact support to add custom ERC-20 tokens for your account.

## Security

### Is Obul secure?

Yes. Security measures include:

- **Non-custodial design** — We never hold funds
- **Encrypted API keys** — Keys are hashed at rest
- **Rate limiting** — Prevent abuse
- **IP restrictions** — Optional allowlisting
- **Audit logging** — All actions logged

### Has Obul been audited?

Our smart contracts have been audited by:
- Trail of Bits (2024)
- OpenZeppelin (2024)

Audit reports available on request.

### What happens if Obul is compromised?

Since we're non-custodial, a compromise of Obul's infrastructure **cannot** result in loss of user funds. Payments are wallet-to-wallet.

### Can I require 2FA?

Yes, enable 2FA in your dashboard settings:
1. Go to **Settings** → **Security**
2. Enable **Two-Factor Authentication**
3. Scan QR code with authenticator app

## Migration

### Can I migrate from another provider?

Yes! We support migration from:

| From | Migration Path |
|------|----------------|
| Raw x402 | Update endpoint URL |
| Coinbase CDP | Export keys, import to Obul |
| Custom solution | Gradual cutover |

### How do I migrate to Obul?

1. Create Obul account
2. Generate API keys
3. Update your application headers
4. Test in staging
5. Gradual production rollout

**Estimated time:** 1-2 days

### Can I export my data?

Yes, export your transaction history:
1. Go to **Transactions**
2. Apply filters
3. Click **Export**
4. Choose format (CSV/JSON)

### Is there vendor lock-in?

No. Obul uses the open x402 standard. You can migrate to any x402-compatible service at any time.

## Troubleshooting

### "Invalid API key" error

**Causes:**
- Key copied incorrectly
- Key has been revoked
- Using test key in production (or vice versa)

**Solutions:**
1. Verify key in dashboard
2. Generate new key if needed
3. Check key prefix (`obul_live_` vs `obul_test_`)

### "Payment required" error

**Causes:**
- Wallet not connected
- Insufficient balance
- Wrong network

**Solutions:**
1. Connect wallet in dashboard
2. Add funds to wallet
3. Ensure wallet is on correct network

### "Rate limit exceeded" error

**Causes:**
- Too many requests
- Burst limit hit

**Solutions:**
1. Implement exponential backoff
2. Upgrade to Pro plan for higher limits
3. Contact support for custom limits

### Transactions stuck as "pending"

**Causes:**
- Network congestion
- Low gas price

**Solutions:**
1. Wait (most resolve within 10 minutes)
2. Check [BaseScan](https://basescan.org) for network status
3. Contact support if stuck > 1 hour

### Webhook not receiving events

**Checklist:**
- [ ] URL is accessible from internet
- [ ] SSL certificate is valid
- [ ] Endpoint returns 200 status
- [ ] Firewall allows Obul IPs

**Test your webhook:**
```bash
curl -X POST https://your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Getting Help

### Support Channels

| Channel | Response Time | Best For |
|---------|---------------|----------|
| Email | < 24 hours | Complex issues |
| Discord | < 1 hour | Quick questions |
| Status Page | Real-time | Outage info |

### Email Support

**support@obul.ai**

Include:
- API key (last 4 chars only)
- Error message
- Timestamp
- Request ID (if available)

### Discord Community

Join [discord.gg/obul](https://discord.gg/obul) for:
- Community support
- Feature announcements
- Developer discussions

### Status Page

Check [status.obul.ai](https://status.obul.ai) for:
- Service status
- Incident history
- Maintenance schedules

## Account Management

### How do I delete my account?

1. Ensure all balances are settled
2. Go to **Settings** → **Account**
3. Click **Delete Account**
4. Confirm deletion

**Note:** This action is irreversible.

### Can I have multiple accounts?

Yes, but each account needs a unique email. Consider using team features instead.

### How do I change my email?

1. Go to **Settings** → **Profile**
2. Click **Change Email**
3. Verify new email

## Still Have Questions?

Contact us:
- 📧 support@obul.ai
- 💬 [Discord](https://discord.gg/obul)
- 🐦 [@obulai](https://twitter.com/obulai)
