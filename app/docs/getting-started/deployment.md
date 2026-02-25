---
title: Deployment
description: Deploy your Glyph documentation site to production
sidebar_position: 5
---

# Deployment

Glyph builds to static files that can be deployed anywhere.

## Build

```bash
npm run build
```

This creates a `dist/` folder with your static site.

## Deploy to Vercel

### CLI

```bash
npm i -g vercel
vercel
```

### Git Integration

1. Push to GitHub
2. Import in Vercel dashboard
3. Deploy automatically on push

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dpbmaverick98/glyph)

## Deploy to Netlify

### CLI

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Git Integration

Connect your GitHub repo in Netlify dashboard for auto-deploys.

## Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy dist
```

## Deploy to GitHub Pages

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Custom Domain

### Vercel

Add `vercel.json`:

```json
{
  "redirects": [
    { "source": "/", "destination": "https://docs.yoursite.com" }
  ]
}
```

### Netlify

Add `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

Create `.env`:

```
VITE_SITE_URL=https://docs.yoursite.com
```

Access in your app:

```javascript
const siteUrl = import.meta.env.VITE_SITE_URL;
```
