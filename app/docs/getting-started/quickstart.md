---
title: Quickstart
description: Get your Glyph documentation site running in under 5 minutes
sidebar_position: 2
---

# Quickstart

Get your documentation site running in under 5 minutes.

## One-Command Setup

```bash
npx create glyph-docs@latest my-docs
cd my-docs
npm run dev
```

That's it! Your docs are now running at `http://localhost:5173`.

## What just happened?

1. **Created project** - A new Glyph site with example content
2. **Installed dependencies** - React, Vite, Tailwind, and more
3. **Started dev server** - Hot reload enabled for instant updates

## Project Structure

```
my-docs/
├── docs/                  # Your documentation content
│   ├── docs.json         # Navigation configuration
│   ├── getting-started/  # Getting started docs
│   └── ...
├── src/                  # Source code
│   ├── components/       # React components
│   └── ...
└── package.json
```

## Next Steps

### Add Your Content

1. Create `.md` files in the `docs/` folder
2. Add them to `docs.json` navigation
3. See them live instantly

### Try Different Themes

Glyph comes with 7 built-in themes. Open the theme switcher in the header to try them all.

### Deploy

```bash
npm run build
```

Upload the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.)

## One-Click Deploy

<CardGroup cols={3}>
  <Card title="Vercel" icon="globe" href="https://vercel.com/new">
    Deploy to Vercel
  </Card>
  
  <Card title="Netlify" icon="globe" href="https://app.netlify.com/start">
    Deploy to Netlify
  </Card>
  
  <Card title="Cloudflare" icon="globe" href="https://dash.cloudflare.com">
    Deploy to Cloudflare Pages
  </Card>
</CardGroup>

## Need Help?

- [Installation Guide](/getting-started/installation) - Detailed setup options
- [Your First Page](/getting-started/first-page) - Creating content
- [Deployment](/getting-started/deployment) - Going to production
