---
title: Obul CLI
description: Terminal tool for power users (Q3 2025)
sidebar_position: 1
status: coming-soon
---

# Obul CLI

:::status Coming Soon — Q3 2025
:::

The Obul CLI is a terminal tool for power users who prefer command-line workflows.

## What is Obul CLI?

A unified command-line interface for managing Obul resources, monitoring transactions, and integrating payments directly from your terminal.

```bash
# Install globally
npm install -g @obul/cli

# Or use with npx
npx @obul/cli <command>
```

## Planned Features

### Resource Management

```bash
# API Keys
obul keys list
obul keys create --name "production" --permissions write
obul keys revoke obul_live_xxx

# Services
obul services list
obul services create --name "my-api" --url "https://api.example.com"
obul services update my-api --timeout 60
```

### Transaction Monitoring

```bash
# Real-time transaction stream
obul transactions tail

# Query transactions
obul transactions list --since "1h" --status success
obul transactions get txn_xxx

# Export data
obul transactions export --format csv --since "7d"
```

### Payment Operations

```bash
# Check balance
obul balance

# Deposit funds
obul deposit --amount 0.5 --token ETH

# View payment history
obul payments list
```

### Configuration

```bash
# Login
obul login

# Switch contexts
obul context use production
obul context use staging

# View config
obul config get
```

## Use Cases

### CI/CD Integration

```yaml
# .github/workflows/deploy.yml
- name: Deploy with Obul
  run: |
    obul login --token ${{ secrets.OBUL_TOKEN }}
    obul services update my-api --version ${{ github.sha }}
```

### Local Development

```bash
# Start local proxy
obul proxy --port 8080 --target http://localhost:3000

# Watch transactions
obul transactions tail --format json | jq '.amount'
```

### Automation Scripts

```bash
#!/bin/bash
# backup-transactions.sh

DATE=$(date +%Y-%m-%d)
obul transactions export \
  --format csv \
  --since "$DATE" \
  --output "transactions-$DATE.csv"
```

## Installation Options

| Platform | Method |
|----------|--------|
| macOS | `brew install obul` |
| Linux | `curl -sSL https://obul.ai/install.sh \| bash` |
| Windows | `winget install Obul.CLI` |
| npm | `npm install -g @obul/cli` |

## Sign Up for Early Access

Be the first to try Obul CLI:

[Join the Waitlist](https://obul.ai/cli-waitlist)

## Feedback

Have feature requests? Let us know:

- Email: cli-feedback@obul.ai
- Discord: #cli-discussion channel
