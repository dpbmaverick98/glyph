---
title: Glyph Deploy
description: Managed deployment for Glyph documentation.
status: coming-soon
---

# Glyph Deploy

Managed hosting and deployment for your Glyph documentation.

## Overview

While Glyph works with any static host, Glyph Deploy provides:

- **One-click deployments**
- **Automatic previews** for pull requests
- **Custom domains** with SSL
- **Analytics** built-in
- **Team collaboration**

## Features

### Automatic Deployments

Connect your Git repository:

```bash
glyph deploy init
```

Every push to `main` automatically deploys.

### Preview Deployments

Every pull request gets a unique preview URL:

```
https://pr-123--your-docs.glyph.dev
```

### Custom Domains

Add your own domain:

```bash
glyph domain add docs.example.com
```

Free SSL certificates included.

### Analytics

View documentation analytics:

- Page views
- Search queries
- Popular content
- Referrer tracking

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 site, glyph.dev domain |
| **Pro** | $10/mo | Unlimited sites, custom domains |
| **Team** | $29/mo | Team features, analytics |
| **Enterprise** | Custom | SLA, support |

## Self-Hosting

Don't need managed hosting? Glyph works anywhere:

```bash
npm run build
# Upload dist/ to Vercel, Netlify, GitHub Pages, etc.
```

## Coming Soon

Glyph Deploy is in private beta. Join the waitlist:

```bash
glyph deploy waitlist
```
