---
title: Deployment
description: Deploy your documentation to production
sidebar_position: 4
---

# Deployment

Deploy your Glyph documentation to various hosting platforms.

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with static files ready for deployment.

## Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option 2: Git Integration

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Set framework preset to "Vite"
4. Deploy

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dpbmaverick98/glyph)

## Netlify

### Option 1: Netlify CLI

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 2: Drag and Drop

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag `dist/` folder to deploy

### Option 3: Git Integration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

## GitHub Pages

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v3
      - uses: actions/upload-pages-artifact@v2
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v2
```

## Cloudflare Pages

### Using Wrangler

```bash
npm i -g wrangler
wrangler pages deploy dist
```

### Git Integration

1. Connect your GitHub repo in Cloudflare dashboard
2. Set build command: `npm run build`
3. Set output directory: `dist`

## AWS S3 + CloudFront

```bash
# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

## Environment Variables

Create `.env` file:

```bash
# Base URL for production
VITE_BASE_URL=https://docs.example.com

# Analytics
VITE_ANALYTICS_ID=your-id
```

## Custom Domains

See [Custom Domains guide](/integrations/custom-domains) for:
- DNS configuration
- SSL certificates
- Subdomain setup

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Search works (run `npm run postbuild`)
- [ ] Images load
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Analytics tracking

## Troubleshooting

### 404 on refresh

Add to `vercel.json` (Vercel):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Or `_redirects` (Netlify):
```
/* /index.html 200
```

### Search not working

Make sure to run:
```bash
npm run postbuild
```

This indexes your content for Pagefind search.

## Next Steps

<CardGroup cols={2}>
  <Card title="Custom Domains" icon="globe" href="/integrations/custom-domains">
    Set up your own domain
  </Card>
  
  <Card title="Analytics" icon="bar-chart" href="/integrations/analytics">
    Track your documentation usage
  </Card>
</CardGroup>
