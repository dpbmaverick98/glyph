---
title: Dashboard Guide
description: Key management, transaction logs, billing, team access
sidebar_position: 2
---

The Obul Dashboard at [my.obul.ai](https://my.obul.ai) is your control center for managing API keys, monitoring transactions, and configuring billing.

## Overview Page

The Overview page gives you a high-level view of your Obul usage:

![Dashboard Overview](/images/dashboard-overview.png)

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Unpaid Balance** | Current outstanding balance owed |
| **Transactions** | Total API calls in selected period |
| **Usage Trend** | Visual chart of spend over time |
| **Recent Activity** | Latest API calls with status |

## API Keys

Navigate to **API Keys** in the sidebar to manage your keys.

### Creating a Key

1. Click **Create New Key**
2. Enter a descriptive name
3. Select permissions:
   - `read` — Read-only access
   - `write` — Full access
   - `admin` — Full access + key management
4. (Optional) Set IP restrictions
5. Click **Create**

**Important:** Copy your key immediately. For security, we only show it once.

### Key Types

| Prefix | Environment | Use For |
|--------|-------------|---------|
| `obul_live_` | Production | Real payments, production traffic |
| `obul_test_` | Testing | Development, staging, CI/CD |

### Rotating Keys

To rotate a compromised or old key:

1. Create a new key
2. Update your application to use the new key
3. Delete the old key
4. Monitor for any errors

### Revoking Keys

1. Find the key in your list
2. Click the **...** menu
3. Select **Revoke**
4. Confirm the action

**Note:** Revoked keys stop working immediately.

## Transaction Logs

The **Transactions** section shows a detailed log of all API calls.

### Log Entry Format

| Field | Description |
|-------|-------------|
| **Time (UTC)** | When the request was made |
| **Service** | The API endpoint called |
| **Service URL** | Full URL of the request |
| **Status** | `success`, `pending`, or `failed` |
| **Amount** | Payment amount for the call |

### Filtering

Use the filters to find specific transactions:

- **Date range** — Pick a time window
- **Status** — Show only success/failed/pending
- **Service** — Filter by endpoint
- **Amount** — Filter by payment size

### Exporting

Export your transaction data for accounting:

1. Apply desired filters
2. Click **Export**
3. Choose format: CSV or JSON
4. Download the file

## Billing

Navigate to **Billing** to manage payments and view invoices.

### Connecting a Wallet

1. Click **Connect Wallet**
2. Choose your wallet provider
3. Sign the connection message
4. Your wallet is now linked

### Auto-Pay Settings

Configure automatic payments:

```
Auto-Pay Options:
├── Disabled — Manual payments only
├── Threshold — Pay when balance exceeds $X
└── Scheduled — Pay every X days
```

### Viewing Invoices

1. Go to **Billing** → **Invoices**
2. Click on any invoice to view details
3. Download PDF for your records

### Payment Methods

Obul supports:

| Method | Networks |
|--------|----------|
| ETH | Base, Base Sepolia |
| USDC | Base, Base Sepolia |
| Custom ERC-20 | Contact support |

## Team Access

### Adding Team Members

1. Go to **Settings** → **Team**
2. Click **Invite Member**
3. Enter their email
4. Select a role:
   - **Viewer** — View-only access
   - **Developer** — Can create keys, view transactions
   - **Admin** — Full access including billing
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

### Account Settings

- **Profile** — Update name, email, avatar
- **Security** — Change password, enable 2FA
- **Notifications** — Email preferences

### API Settings

- **Default timeout** — Request timeout (default: 30s)
- **Retry policy** — Automatic retries on failure
- **Webhook URL** — Receive event notifications

## Webhooks

Configure webhooks to receive real-time events:

### Supported Events

| Event | Description |
|-------|-------------|
| `payment.success` | Payment processed successfully |
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

- [API Reference](../reference/api) — Full technical documentation
- [FAQ](../faq) — Common questions answered
