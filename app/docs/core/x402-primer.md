---
title: What is x402?
description: The HTTP 402 Payment Required protocol — the missing piece for payable APIs
sidebar_position: 3
---

# What is x402?

x402 is the **HTTP 402 Payment Required** protocol. It's the standard that makes APIs natively payable.

HTTP 402 was reserved in the original HTTP specification but rarely used — until now. x402 defines how to request and receive payments over HTTP, making it possible for machines to pay machines without human intervention.

## The Payment Flow

```
1. Client Request
   │
   ▼
2. Server Responds 402
   │   └── "Payment required: 0.001 ETH"
   ▼
3. Client Signs Payment
   │   └── Wallet creates signed payload
   ▼
4. Client Retries with Payment Header
   │   └── X-Payment: <signed_payload>
   ▼
5. Server Verifies & Responds
   └── "Payment accepted. Here's your data."
```

No redirects. No popups. No OAuth flows. Just HTTP, with payment.

## A Real 402 Response

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402-version": 1,
  "x402-facilitator": "obul",
  "x402-payment": {
    "scheme": "exact",
    "network": "base-sepolia",
    "required-amount": "1000000",
    "token": "0x...",
    "pay-to": "0x..."
  }
}
```

The client parses this, signs the payment with their wallet, and retries with the `X-Payment` header.

## From Coinbase to Ecosystem

x402 was pioneered by [Coinbase Developer Platform](https://www.coinbase.com/developer-platform) as part of their mission to bring millions of developers onchain.

| Date | Milestone |
|------|-----------|
| 2024 Q1 | x402 protocol specification released |
| 2024 Q2 | Coinbase CDP adopts x402 for agent payments |
| 2024 Q3 | 10M+ transactions processed |
| 2024 Q4 | 70M+ transactions milestone |
| 2025 Q1 | Ecosystem expands to multiple facilitators |

**70 million transactions** and growing. The protocol works at scale.

## Key Components

| Component | Description |
|-----------|-------------|
| **Facilitator** | Service that processes payments (Obul, Coinbase, etc.) |
| **Scheme** | Payment model: `exact`, `stream`, `subscription` |
| **Network** | Blockchain for settlement (Base, Ethereum, etc.) |
| **Token** | ERC-20 token or native asset for payment |

## Why x402 Matters

**For API Providers:**
- **Instant monetization** — No billing infrastructure
- **Global reach** — Crypto payments, no borders
- **Microtransactions** — Charge as little as $0.001 per call

**For API Consumers:**
- **Pay-as-you-go** — No subscriptions, no commitments
- **Transparent pricing** — Know exactly what each call costs
- **Agent-friendly** — Machines can pay machines

## The Facilitator Ecosystem

Multiple services implement x402:

| Facilitator | Focus | Best For |
|-------------|-------|----------|
| **Obul** | Developer experience, proxy layer | Quick integration, existing APIs |
| **Coinbase CDP** | Enterprise, full-stack | Large-scale deployments |

All x402 implementations are interoperable. Use one, switch to another, build your own — the protocol is open.

## What's Next

The protocol is evolving:

- **Multi-chain support** — Ethereum, Base, Polygon, and more
- **Streaming payments** — Pay per second of compute
- **Subscription schemes** — Recurring payments for SaaS
- **IETF standardization** — Formal spec in progress

## Learn More

- [Obul vs raw x402](./obul-vs-x402) — When to use Obul vs building yourself
- [Quickstart](../getting-started/quickstart) — Make your first x402 payment
