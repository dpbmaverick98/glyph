---
title: Dashboard Guide
description: Manage API keys, monitor transactions, and configure billing
sidebar_position: 2
---

# Dashboard Guide

The Obul Dashboard at [my.obul.ai](https://my.obul.ai) is your control center.

## Overview

The Overview page shows:

| Metric | Description |
|--------|-------------|
| **Unpaid Balance** | Current outstanding balance |
| **Transactions** | Total API calls in selected period |
| **Usage Trend** | Visual chart of spend over time |
| **Recent Activity** | Latest API calls with status |

## API Keys

Navigate to **API Keys** to manage access.

### Creating a Key

1. Click **Create New Key**
2. Enter a name
3. Select permissions:
   - `read` — Read-only access
   - `write` — Full access
   - `admin` — Full access + key management
4. (Optional) Set IP restrictions
5. Click **Create**

**Important:** Copy your key immediately. We only show it once.

### Key Types

| Prefix | Environment | Use For |
|--------|-------------|---------|
| `obul_live_` | Production | Real payments |
| `obul_test_` | Testing | Development, staging |

### Rotating Keys

1. Create a new key
2. Update your application
3. Delete the old key
4. Monitor for errors

### Revoking Keys

1. Find the key in your list
2. Click **...** → **Revoke**
3. Confirm

Revoked keys stop working immediately.

## Transaction Logs

The **Transactions** section shows all API calls.

| Field | Description |
|-------|-------------|
| **Time (UTC)** | When the request was made |
| **Service** | API endpoint called |
| **Service URL** | Full request URL |
| **Status** | `success`, `pending`, or `failed` |
| **Amount** | Payment amount |

### Filtering

- **Date range** — Pick a time window
- **Status** — Success/failed/pending
- **Service** — Filter by endpoint
- **Amount** — Filter by payment size

### Exporting

1. Apply filters
2. Click **Export**
3. Choose CSV or JSON
4. Download

## Billing

Navigate to **Billing** for payments and invoices.

### Adding Funds

1. Go to **Billing** → **Add Funds**
2. Select amount
3. Complete payment

### Auto-Pay Settings

```
Auto-Pay Options:
├── Disabled — Manual payments only
├── Threshold — Auto-pay when balance below $X
└── Scheduled — Auto-pay every X days
```

### Payment Methods

| Method | Networks |
|--------|----------|
| ETH | Base, Base Sepolia |
| USDC | Base, Base Sepolia |
| Custom ERC-20 | Contact support |

## Team Access

### Adding Members

1. Go to **Settings** → **Team**
2. Click **Invite Member**
3. Enter email
4. Select role:
   - **Viewer** — View-only
   - **Developer** — Create keys, view transactions
   - **Admin** — Full access
5. Send invitation

### Role Permissions

| Permission | Viewer | Developer | Admin |
|------------|--------|-----------|-------|
| View transactions | ✅ | ✅ | ✅ |
| Create API keys | ❌ | ✅ | ✅ |
| Manage billing | ❌ | ❌ | ✅ |
| Manage team | ❌ | ❌ | ✅ |
| Delete account | ❌ | ❌ | ✅ |

### Activity Audit Log

View all team actions:
- Key created/deleted
- Settings changed
- Team members added/removed
- Billing events

## Settings

### Account

- **Profile** — Name, email, avatar
- **Security** — Password, 2FA
- **Notifications** — Email preferences

### API

- **Default timeout** — Request timeout (default: 30s)
- **Retry policy** — Automatic retries
- **Webhook URL** — Event notifications

## Webhooks

Configure webhooks for real-time events.

### Supported Events

| Event | Description |
|-------|-------------|
| `payment.success` | Payment processed |
| `payment.failed` | Payment failed |
| `key.created` | New API key created |
| `key.revoked` | API key revoked |

### Webhook Payload

```json
{
  "event": "payment.success",
  "timestamp": "2025-02-24T15:45:00Z",
  "data": {
    "transaction_id": "txn_xxx",
    "amount": "0.001",
    "currency": "ETH",
    "api_key": "obul_live_xxx"
  }
}
```

## Next Steps

- [API Reference](../reference/api) — Full technical docs
- [FAQ](../faq) — Common questions
