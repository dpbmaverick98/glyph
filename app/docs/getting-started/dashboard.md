---
title: Dashboard Guide
description: Managing your Glyph documentation through the dashboard.
---

# Dashboard Guide

The Glyph Dashboard helps you manage your documentation deployment and settings.

## Overview

While Glyph is primarily a static site generator, the optional Glyph Dashboard provides:

- **Deployment management**
- **Analytics**
- **Team collaboration**
- **Version control**

## Self-Hosted Dashboard

### Installation

```bash
npm install -g @glyph/dashboard
glyph-dashboard init
```

### Configuration

Create `dashboard.config.js`:

```javascript
module.exports = {
  site: {
    name: 'My Documentation',
    url: 'https://docs.example.com'
  },
  analytics: {
    provider: 'plausible',
    domain: 'docs.example.com'
  }
};
```

### Start Dashboard

```bash
glyph-dashboard start
```

## Features

### Deployment

Deploy your docs with one click:

```bash
glyph deploy
```

Or configure CI/CD:

```yaml
# .github/workflows/docs.yml
name: Deploy Docs
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: glyph/deploy-action@v1
        with:
          token: ${{ secrets.GLYPH_TOKEN }}
```

### Analytics

View documentation analytics:

- Page views
- Search queries
- Popular content
- User journeys

### Team Management

Add team members:

```bash
glyph team add user@example.com --role=editor
```

Roles:
- **Admin**: Full access
- **Editor**: Can edit content
- **Viewer**: Read-only access

## Without Dashboard

Glyph works perfectly without the dashboard:

```bash
# Just build and deploy
npm run build
# Upload dist/ to your host
```

## API Keys

Generate API keys for CI/CD:

```bash
glyph keys create --name="GitHub Actions"
```

## Billing

The dashboard is optional. Glyph core is always free.

Dashboard features:
- **Free tier**: 1 site, 3 team members
- **Pro**: $10/month, unlimited sites
- **Enterprise**: Custom pricing
