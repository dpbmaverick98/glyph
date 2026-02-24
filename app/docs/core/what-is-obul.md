---
title: What is Obul?
description: The proxy layer that makes any API payable in seconds — one API key, infinite agents
sidebar_position: 1
---

# What is Obul?

Obul is a **proxy layer** that makes any API payable in seconds.

Think of us as [Chronos](https://en.wikipedia.org/wiki/Chronos) for AI agents — the invisible infrastructure that handles payments so your agents can focus on what they do best. We sit between your API and the world, intercepting requests and handling payments transparently.

## One API Key. Infinite Agents.

```bash
# Your entire integration
curl -H "X-Obul-Key: your_key" https://proxy.obul.ai/...
```

That's it. No complex setup. No infrastructure to manage. Just one header.

## Why We Exist

Building payment infrastructure for APIs typically takes weeks of:
- Payment gateway integration
- Billing system setup
- Invoice management
- Error handling and retries
- Production security hardening

**Most developers abandon payment projects** before reaching production due to this complexity.

We built Obul because we got tired of watching good ideas die in infrastructure hell.

## What You Get

| Feature | What It Means |
|---------|---------------|
| **Instant Setup** | 5 minutes, not weeks |
| **x402 Native** | Built on the HTTP 402 Payment Required standard |
| **Usage-Based** | Pay only for what you use |
| **Production Ready** | Enterprise-grade security from day one |

## How It Works

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

1. Client sends request to Obul proxy
2. Obul checks for valid payment
3. If paid (or free), request passes through to your API
4. If payment required, client gets a 402 response with payment instructions
5. Client pays, retries, and the request goes through

Your API doesn't need to know anything about the payment flow. It just sees requests.

## Built for AI Agents

The future is agents paying agents. An LLM calls an API. A trading bot subscribes to a data feed. A coding agent spins up compute.

These agents need to pay without human intervention. Obul lets them do that.

**Use cases we're seeing:**

- **AI Agent Marketplaces** — Charge per API call from autonomous agents
- **Data APIs** — Monetize your data with per-request pricing
- **Compute Services** — Bill for GPU/CPU usage in real-time
- **SaaS Products** — Usage-based billing without complex invoicing

## The Stack

- **x402 Protocol** — HTTP 402 Payment Required standard
- **Base Network** — Fast, cheap settlement
- **Open Standard** — No vendor lock-in, migrate anytime

## Ready?

- [Learn about x402](./x402-primer) — The protocol powering everything
- [Get started in 5 minutes](../getting-started/quickstart) — Your first payable API call
