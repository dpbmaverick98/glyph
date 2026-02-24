---
title: Quickstart
description: Your first payable API call in under 5 minutes
sidebar_position: 1
---

# Quickstart

Get your first payable API call running in under 5 minutes.

## Prerequisites

- A free Obul account
- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Create an Account

Go to [my.obul.ai](https://my.obul.ai) and sign up with email or GitHub.

## Step 2: Add a Payment Method

1. In the dashboard, go to **Billing**
2. Click **Add Payment Method**
3. Connect your payment method

## Step 3: Generate an API Key

1. Navigate to **API Keys**
2. Click **Create New Key**
3. Name it (e.g., "Quickstart")
4. Copy the key — **you won't see it again**

```bash
# Your key looks like this
obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Make Your First Request

### Using curl

```bash
curl -X GET \
  -H "X-Obul-Key: obul_live_xxx" \
  -H "Content-Type: application/json" \
  https://proxy.obul.ai/healthz
```

**Expected response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-02-24T15:45:00Z"
}
```

### Using Python

```python
import requests

url = "https://proxy.obul.ai/healthz"
headers = {
    "X-Obul-Key": "obul_live_xxx",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())
```

### Using Node.js

```javascript
const fetch = require('node-fetch');

const url = 'https://proxy.obul.ai/healthz';
const headers = {
  'X-Obul-Key': 'obul_live_xxx',
  'Content-Type': 'application/json'
};

fetch(url, { headers })
  .then(res => res.json())
  .then(data => console.log(data));
```

## Step 5: Test a Payable Endpoint

Make a real payable request:

```bash
curl -X POST \
  -H "X-Obul-Key: obul_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, world!"}' \
  https://proxy.obul.ai/v1/demo/echo
```

**If you haven't set up payment:**
```json
{
  "error": "Payment required",
  "x402": {
    "version": 1,
    "required_amount": "1000000000000000",
    "token": "0x...",
    "network": "base-sepolia"
  }
}
```

This is expected! The endpoint works — it just needs payment.

## Step 6: Complete Payment

Follow the payment instructions in the 402 response. Once your account has balance, retry the request:

```bash
curl -X POST \
  -H "X-Obul-Key: obul_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, world!"}' \
  https://proxy.obul.ai/v1/demo/echo
```

**Success:**
```json
{
  "result": "Hello, world!",
  "transaction": {
    "hash": "0x...",
    "amount": "0.001 ETH",
    "status": "confirmed"
  }
}
```

## What's Next?

- [Dashboard Guide](./dashboard) — Manage keys and view transactions
- [API Reference](../reference/api) — Full endpoint documentation
- [FAQ](../faq) — Common questions

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" | Wrong/revoked key | Check dashboard, regenerate |
| "Insufficient balance" | Account underfunded | Add funds in billing |
| "Network error" | Wrong endpoint | Verify `https://proxy.obul.ai` |

Need help? [support@obul.ai](mailto:support@obul.ai) or [Discord](https://discord.gg/obul)
