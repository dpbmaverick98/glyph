---
title: Installation
description: Detailed installation options for Glyph
sidebar_position: 3
---

# Installation

## Requirements

- Node.js 18+ 
- npm, yarn, or pnpm

## Create New Project

### Using npx (Recommended)

```bash
npx create glyph-docs@latest my-docs
```

### Using npm init

```bash
npm init glyph-docs@latest my-docs
```

### Using yarn

```bash
yarn create glyph-docs@latest my-docs
```

## Project Options

The setup wizard will ask:

1. **Project name** - Your documentation site name
2. **Theme** - Choose your default theme (can change later)
3. **TypeScript** - Use TypeScript? (recommended)

## Manual Installation

If you prefer to set up manually:

```bash
mkdir my-docs
cd my-docs
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript
npm install -D tailwindcss postcss autoprefixer
npm install marked pagefind lucide-react
```

Then copy the Glyph starter files from the repository.

## Development

```bash
cd my-docs
npm run dev
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Troubleshooting

### Port already in use

```bash
npm run dev -- --port 3000
```

### Node version issues

Make sure you're using Node 18+:

```bash
node --version
```

### Clear cache

```bash
rm -rf node_modules/.vite
```
