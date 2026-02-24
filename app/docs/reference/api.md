---
title: API Reference
description: URL structure, auth headers, error codes, rate limits, SDK examples
sidebar_position: 1
---

# API Reference

Complete reference for the Obul Proxy API.

## Base URL

```
Production:  https://proxy.obul.ai
Health Check: https://proxy.obul.ai/healthz
```

## Authentication

All requests must include your API key in the `X-Obul-Key` header.

```http
X-Obul-Key: obul_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Key Types

| Prefix | Environment | Rate Limit |
|--------|-------------|------------|
| `obul_live_` | Production | 10,000/min |
| `obul_test_` | Testing | 100/min |

## URL Structure

```
https://proxy.obul.ai/{version}/{service}/{endpoint}
```

| Component | Description | Example |
|-----------|-------------|---------|
| `version` | API version | `v1` |
| `service` | Target service | `demo`, `custom` |
| `endpoint` | Specific endpoint | `echo`, `chat` |

### Example URLs

```
https://proxy.obul.ai/v1/demo/echo
https://proxy.obul.ai/v1/custom/my-api/predict
```

## Headers

### Required Headers

| Header | Value | Description |
|--------|-------|-------------|
| `X-Obul-Key` | `obul_live_xxx` | Your API key |
| `Content-Type` | `application/json` | Request format |

### Optional Headers

| Header | Value | Description |
|--------|-------|-------------|
| `X-Payment-Address` | `0x...` | Wallet for payment |
| `X-Idempotency-Key` | `uuid` | Prevent duplicates |
| `X-Request-ID` | `uuid` | Trace requests |

## Endpoints

### Health Check

```http
GET /healthz
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-02-24T15:45:00Z"
}
```

### Demo Echo

Test endpoint that echoes your input.

```http
POST /v1/demo/echo
```

**Request:**
```json
{
  "prompt": "Hello, Obul!"
}
```

**Response:**
```json
{
  "result": "Hello, Obul!",
  "transaction": {
    "hash": "0x...",
    "amount": "0.001",
    "status": "confirmed"
  }
}
```

### Custom Proxy

Proxy requests to your own API.

```http
POST /v1/custom/{your-endpoint}
```

**Configuration required** in dashboard.

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `400` | Bad Request | Invalid request format |
| `401` | Unauthorized | Invalid or missing API key |
| `402` | Payment Required | Payment needed (x402 response) |
| `403` | Forbidden | Key lacks permission |
| `404` | Not Found | Endpoint doesn't exist |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Server Error | Internal error |
| `502` | Bad Gateway | Target API error |
| `503` | Service Unavailable | Obul temporarily down |

### Error Response Format

```json
{
  "error": {
    "code": "invalid_api_key",
    "message": "The provided API key is invalid",
    "details": {
      "key": "obul_live_xxx",
      "reason": "Key has been revoked"
    }
  }
}
```

### Common Errors

| Error Code | Cause | Solution |
|------------|-------|----------|
| `invalid_api_key` | Wrong or revoked key | Check key in dashboard |
| `insufficient_balance` | Wallet underfunded | Add funds to wallet |
| `rate_limit_exceeded` | Too many requests | Wait or upgrade plan |
| `payment_failed` | Transaction error | Check wallet, retry |
| `endpoint_not_found` | Wrong URL | Verify endpoint path |

## Rate Limits

### Default Limits

| Plan | Requests/min | Burst |
|------|--------------|-------|
| Free | 100 | 10 |
| Pro | 10,000 | 100 |
| Enterprise | Custom | Custom |

### Rate Limit Headers

```http
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9995
X-RateLimit-Reset: 1708790400
```

### Handling 429 Errors

```python
import time
import requests

def make_request_with_retry(url, headers, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)
        
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            time.sleep(retry_after)
            continue
            
        return response
    
    raise Exception("Max retries exceeded")
```

## x402 Payment Flow

When a payment is required, the API returns a 402 response:

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402-version": 1,
  "x402-facilitator": "obul",
  "x402-payment": {
    "scheme": "exact",
    "network": "base-sepolia",
    "required-amount": "1000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "pay-to": "0x..."
  }
}
```

### Completing Payment

1. Parse the 402 response
2. Sign the payment with your wallet
3. Retry with `X-Payment` header:

```http
POST /v1/demo/echo
X-Obul-Key: obul_live_xxx
X-Payment: <signed-payment-payload>

{"prompt": "Hello!"}
```

## SDK Examples

### Python

```python
import requests

class ObulClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://proxy.obul.ai"
    
    def request(self, method, endpoint, **kwargs):
        headers = {
            "X-Obul-Key": self.api_key,
            "Content-Type": "application/json"
        }
        headers.update(kwargs.pop("headers", {}))
        
        url = f"{self.base_url}{endpoint}"
        response = requests.request(method, url, headers=headers, **kwargs)
        
        if response.status_code == 402:
            # Handle payment required
            payment_info = response.json()
            print(f"Payment required: {payment_info}")
            # Sign and retry with payment...
        
        return response

# Usage
client = ObulClient("obul_live_xxx")
response = client.request("POST", "/v1/demo/echo", json={"prompt": "Hello!"})
print(response.json())
```

### Node.js

```javascript
class ObulClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://proxy.obul.ai';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Obul-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 402) {
      const paymentInfo = await response.json();
      console.log('Payment required:', paymentInfo);
      // Handle payment and retry
    }

    return response;
  }
}

// Usage
const client = new ObulClient('obul_live_xxx');
const response = await client.request('/v1/demo/echo', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Hello!' })
});
const data = await response.json();
console.log(data);
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type ObulClient struct {
    APIKey  string
    BaseURL string
}

func NewClient(apiKey string) *ObulClient {
    return &ObulClient{
        APIKey:  apiKey,
        BaseURL: "https://proxy.obul.ai",
    }
}

func (c *ObulClient) Request(method, endpoint string, body interface{}) (*http.Response, error) {
    url := c.BaseURL + endpoint
    
    jsonBody, _ := json.Marshal(body)
    req, _ := http.NewRequest(method, url, bytes.NewBuffer(jsonBody))
    
    req.Header.Set("X-Obul-Key", c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    return client.Do(req)
}

// Usage
func main() {
    client := NewClient("obul_live_xxx")
    resp, _ := client.Request("POST", "/v1/demo/echo", map[string]string{
        "prompt": "Hello!",
    })
    defer resp.Body.Close()
}
```

## Webhooks

Configure webhooks in your dashboard to receive event notifications.

### Event Types

| Event | Description |
|-------|-------------|
| `payment.success` | Payment processed |
| `payment.failed` | Payment failed |
| `api_key.created` | New key created |
| `api_key.revoked` | Key revoked |

### Webhook Verification

Verify webhook signatures to ensure authenticity:

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-02-01 | Initial release |
| 1.1.0 | 2025-02-15 | Added webhook support |

## Support

- Email: support@obul.ai
- Discord: [discord.gg/obul](https://discord.gg/obul)
- Status: [status.obul.ai](https://status.obul.ai)
