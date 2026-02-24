---
title: What is x402?
description: HTTP 402 protocol, Coinbase origins, 70M+ transactions, facilitators
sidebar_position: 3
---

x402 is the **HTTP 402 Payment Required** protocol — a standardized way to request and receive payments over HTTP. It's the missing piece that makes APIs natively payable.

## The HTTP 402 Status Code

HTTP 402 was reserved in the original HTTP specification but rarely used — until now.

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

## Coinbase Origins

x402 was pioneered by [Coinbase Developer Platform (CDP)](https://www.coinbase.com/developer-platform) as part of their mission to bring millions of developers onchain.

### Key Milestones

| Date | Milestone |
|------|-----------|
| 2024 Q1 | x402 protocol specification released |
| 2024 Q2 | Coinbase CDP adopts x402 for agent payments |
| 2024 Q3 | 10M+ transactions processed |
| 2024 Q4 | 70M+ transactions milestone |
| 2025 Q1 | Ecosystem expands to multiple facilitators |

## 70M+ Transactions and Growing

The x402 ecosystem is experiencing explosive growth:

| Date        | Monthly Transaction Volume         |
|-------------|-----------------------------------|
| Jan 2024    | 2M                                |
| Jun 2024    | 15M                               |
| Sep 2024    | 35M                               |
| Dec 2024    | 55M                               |
| Feb 2025    | 70M+ (and counting)               |



## How x402 Works

### The Payment Flow

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

### Key Components

| Component | Description |
|-----------|-------------|
| **Facilitator** | Service that processes payments (Obul, Coinbase, etc.) |
| **Scheme** | Payment model: `exact`, `stream`, `subscription` |
| **Network** | Blockchain for settlement (Base, Ethereum, etc.) |
| **Token** | ERC-20 token or native asset for payment |

## x402 Facilitators

The ecosystem includes multiple facilitators:

### Obul
- **Focus**: Developer experience, proxy layer
- **Best for**: Quick integration, existing APIs
- **Website**: [obul.ai](https://obul.ai)

### Coinbase CDP
- **Focus**: Enterprise, full-stack
- **Best for**: Large-scale deployments
- **Website**: [coinbase.com/developer-platform](https://www.coinbase.com/developer-platform)

## Why x402 Matters

### For API Providers
- **Instant monetization** — No billing infrastructure needed
- **Global reach** — Crypto payments, no borders
- **Microtransactions** — Charge as little as $0.001 per call

### For API Consumers
- **Pay-as-you-go** — No subscriptions, no commitments
- **Transparent pricing** — Know exactly what each call costs
- **Agent-friendly** — Machines can pay machines

## The Future of x402

The protocol is evolving rapidly:

- **Multi-chain support** — Ethereum, Base, Polygon, and more
- **Streaming payments** — Pay per second of compute
- **Subscription schemes** — Recurring payments for SaaS
- **Standardization** — IETF draft in progress


