---
title: FAQ
description: Common questions about pricing, security, and troubleshooting
sidebar_position: 1
---

# Frequently Asked Questions

## Pricing

### How much does Obul cost?

**1% of payment volume.** No monthly fees, no setup costs.

| Volume | Monthly Cost |
|--------|--------------|
| $1,000 | $10 |
| $10,000 | $100 |
| $100,000 | $1,000 |

### Any hidden fees?

No. You pay:
- 1% to Obul
- Network gas fees

That's it.

### What networks are supported?

| Network | Status | Gas Cost |
|---------|--------|----------|
| Base | ✅ Live | ~$0.01 |
| Base Sepolia | ✅ Live | Free (testnet) |
| Ethereum | 🚧 Q2 2025 | ~$5-50 |
| Polygon | 🚧 Q2 2025 | ~$0.001 |

### Can I use custom tokens?

Yes. Contact support to add custom ERC-20 tokens.

## Security

### Is Obul secure?

Yes. Measures include:

- **Non-custodial** — We never hold your funds
- **Encrypted keys** — Hashed at rest
- **Rate limiting** — Prevent abuse
- **IP restrictions** — Optional allowlisting
- **Audit logging** — All actions logged

### Has Obul been audited?

Yes. Audited by:
- Trail of Bits (2024)
- OpenZeppelin (2024)

Reports available on request.

### Can I require 2FA?

Yes. Enable in **Settings** → **Security** → **Two-Factor Authentication**.

## Migration

### Can I migrate from another provider?

Yes. We support migration from:

| From | Path |
|------|------|
| Raw x402 | Update endpoint URL |
| Coinbase CDP | Export keys, import to Obul |
| Custom solution | Gradual cutover |

### How do I migrate to Obul?

1. Create Obul account
2. Generate API keys
3. Update application headers
4. Test in staging
5. Gradual production rollout

**Time:** 1-2 days

### Can I export my data?

Yes. Go to **Transactions**, apply filters, click **Export**, choose CSV/JSON.

### Is there vendor lock-in?

No. Obul uses the open x402 standard. Migrate to any x402-compatible service anytime.

## Troubleshooting

### "Invalid API key"

**Causes:**
- Key copied incorrectly
- Key revoked
- Using test key in production (or vice versa)

**Fix:**
1. Verify key in dashboard
2. Generate new key if needed
3. Check prefix (`obul_live_` vs `obul_test_`)

### "Payment required"

**Causes:**
- Account balance low
- Payment method not set up

**Fix:**
1. Check balance in dashboard
2. Add funds in **Billing**

### "Rate limit exceeded"

**Causes:**
- Too many requests
- Burst limit hit

**Fix:**
1. Implement exponential backoff
2. Upgrade to Pro plan
3. Contact support for custom limits

### Transactions stuck "pending"

**Causes:**
- Network congestion
- Low gas price

**Fix:**
1. Wait (most resolve within 10 minutes)
2. Check [BaseScan](https://basescan.org) for status
3. Contact support if stuck > 1 hour

### Webhook not receiving events

**Checklist:**
- [ ] URL accessible from internet
- [ ] SSL certificate valid
- [ ] Endpoint returns 200
- [ ] Firewall allows Obul IPs

**Test:**
```bash
curl -X POST https://your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Getting Help

### Support Channels

| Channel | Response | Best For |
|---------|----------|----------|
| Email | < 24 hours | Complex issues |
| Discord | < 1 hour | Quick questions |
| Status Page | Real-time | Outages |

### Email Support

**[support@obul.ai](mailto:support@obul.ai)**

Include:
- API key (last 4 chars only)
- Error message
- Timestamp
- Request ID (if available)

### Discord

[join discord.gg/obul](https://discord.gg/obul) for community support, announcements, and dev discussions.

## Account Management

### How do I delete my account?

1. Ensure all balances settled
2. Go to **Settings** → **Account**
3. Click **Delete Account**
4. Confirm

**Note:** Irreversible.

### Can I have multiple accounts?

Yes, but each needs a unique email. Consider using team features instead.

### How do I change my email?

1. Go to **Settings** → **Profile**
2. Click **Change Email**
3. Verify new email

## Still Have Questions?

- 📧 [support@obul.ai](mailto:support@obul.ai)
- 💬 [Discord](https://discord.gg/obul)
- 🐦 [@obulai](https://twitter.com/obulai)
