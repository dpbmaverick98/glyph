---
title: What is Obul?
description: Proxy layer definition, chronos analogy, and architecture overview
sidebar_position: 1
---

Obul is a **proxy layer** that makes any API payable in seconds. Think of us as [Chronos](https://en.wikipedia.org/wiki/Chronos) for AI agents — we handle the invisible infrastructure so your agents can focus on what they do best.

## The Problem We Solve

Building payment infrastructure for AI agents typically takes **3+ weeks** of:
- Wallet setup and key management
- Smart contract integration
- Transaction monitoring
- Error handling and retries
- Production security hardening

**80% of developers abandon crypto payment projects** before reaching production due to this complexity.

## Our Solution

Obul provides **one API key. Infinite agents.**

```bash
# Before Obul: 3 weeks of setup
# After Obul: One header
curl -H "X-Obul-Key: your_key" https://proxy.obul.ai/...
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Instant Setup** | Get started in 5 minutes, not 3 weeks |
| **x402 Native** | Built on the HTTP 402 Payment Required standard |
| **Zero Custody** | We never hold your funds — direct wallet-to-wallet |
| **Production Ready** | Enterprise-grade security and reliability |

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│    Obul     │────▶│   Target    │
│   Request   │     │    Proxy    │     │    API      │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   x402      │
                    │   Payment   │
                    └─────────────┘
```

Obul sits between your client and the target API, intercepting requests and handling the x402 payment flow transparently.

## Use Cases

- **AI Agent Marketplaces** — Charge per API call from agents
- **Data APIs** — Monetize your data with per-request pricing
- **Compute Services** — Bill for GPU/CPU usage in real-time
- **SaaS Products** — Usage-based billing without complex invoicing

## Next Steps

- Learn about [The Wallet Problem](./the-wallet-problem)
- Understand the [x402 Protocol](./x402-primer)
- [Get started in 5 minutes](../getting-started/quickstart)
