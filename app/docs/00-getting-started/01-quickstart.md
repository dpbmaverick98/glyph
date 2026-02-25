---
title: Quickstart
description: Get your documentation site running in 5 minutes
sidebar_position: 1
---

# Quickstart

Get your documentation site running in under 5 minutes.

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## Create Your Site

### Option 1: Using npx (Recommended)

```bash
npx create glyph-docs@latest my-docs
cd my-docs
npm run dev
```

Your site will be available at `http://localhost:5173`

### Option 2: Clone the Template

```bash
git clone https://github.com/dpbmaverick98/glyph.git my-docs
cd my-docs/app
npm install
npm run dev
```

### Option 3: Deploy to Vercel (One Click)

<Frame>
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dpbmaverick98/glyph)
</Frame>

## Project Structure

```
my-docs/
├── docs/                   # Your documentation
│   ├── docs.json          # Navigation config
│   ├── landing.md         # Landing page
│   └── ...                # Your .md files
├── app/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── themes/        # Theme presets
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## Add Your First Page

1. Create a new file: `docs/getting-started/hello.md`

```markdown
---
title: Hello World
description: My first page
---

# Hello World

This is my first documentation page!
```

2. Add to `docs/docs.json`:

```json
{
  "group": "Getting Started",
  "items": [
    {
      "label": "Hello World",
      "slug": "getting-started/hello",
      "file": "getting-started/hello.md"
    }
  ]
}
```

3. Visit `http://localhost:5173#getting-started/hello`

## Try Different Themes

Click the theme switcher on the landing page to see all 8 themes:

- Minimal
- Pixel  
- Glass
- Brutalist
- Cyber
- Terminal
- Halloween
- Synthwave

## Build for Production

```bash
npm run build
```

Static files will be in `dist/` folder.

## Deploy

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

See [Deployment guide](/getting-started/deployment) for detailed instructions.

## Next Steps

<CardGroup cols={2}>
  <Card title="Installation" icon="download" href="/getting-started/installation">
    Detailed installation options
  </Card>
  
  <Card title="Your First Page" icon="file-text" href="/getting-started/first-page">
    Learn to write documentation
  </Card>
</CardGroup>
