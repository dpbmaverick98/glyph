---
title: Quickstart
description: API key setup, first curl request, Python/Node examples
sidebar_position: 1
---


Get your first payable API call running in under 5 minutes.

## Prerequisites

- A free Obul account
- `curl` or your preferred HTTP client
- (Optional) Python 3.8+ or Node.js 16+

## Step 1: Create an Account

1. Go to [my.obul.ai](https://my.obul.ai)
2. Sign up with your email or github

## Step 2: Add payment method

1. In the dashboard, navigate to **Billings**
2. Click **Add Payment Method**
3. Connect you Stripe Link Card.

## Step 3: Generate an API Key

1. In the dashboard, navigate to **API Keys**
2. Click **Create New Key**
3. Give it a name (e.g., "Quickstart")
4. Copy the key — **you won't see it again**

```bash
# Your API key looks like this
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

## Step 4: Test a Payable Endpoint

Now let's make a real payable request. We'll use a test endpoint:

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

This is expected! The endpoint is working — it just needs payment. Let's set that up.

## Step 5: Connect Your Wallet

1. In the dashboard, go to **Billing**
2. Click **Connect Wallet**
3. Choose your wallet (MetaMask, Coinbase Wallet, etc.)
4. Fund your account with test ETH on Base Sepolia

### Get Test ETH

```bash
# Use the Base Sepolia faucet
curl -X POST https://faucet.base.org \
  -d '{"address": "0xYourAddress"}'
```

Or visit [faucet.base.org](https://faucet.base.org)

## Step 6: Retry the Request

With your wallet funded, retry the request:

```bash
curl -X POST \
  -H "X-Obul-Key: obul_live_xxx" \
  -H "Content-Type: application/json" \
  -H "X-Payment-Address: 0xYourAddress" \
  -d '{"prompt": "Hello, world!"}' \
  https://proxy.obul.ai/v1/demo/echo
```

**Success response:**
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

You've made your first payable API call! Now you can:

- [Explore the Dashboard](./dashboard) — View transactions and manage keys
- [Read the API Reference](../reference/api) — Full endpoint documentation
- [Integrate with your API](../reference/api#sdk-examples) — Language-specific guides

## Troubleshooting

### "Invalid API key"

- Verify your key is copied correctly
- Check that you're using `obul_live_` for production or `obul_test_` for testing

### "Insufficient balance"

- Ensure your wallet has test ETH on Base Sepolia
- Check the dashboard for your current balance

### "Network error"

- Verify you're hitting `https://proxy.obul.ai`
- Check our [status page](https://status.obul.ai)

## Need Help?

- [FAQ](../faq) — Common questions
- Email: support@obul.ai
- Discord: [discord.gg/obul](https://discord.gg/obul)
