---
title: Glyph CLI
description: Command-line interface for Glyph documentation.
status: coming-soon
---

# Glyph CLI

The Glyph CLI provides commands for creating, developing, and deploying your documentation.

## Installation

```bash
npm install -g @glyph/cli
```

## Commands

### `glyph create`

Create a new documentation site:

```bash
glyph create my-docs
cd my-docs
```

Options:
- `--template` - Choose a starter template
- `--typescript` - Use TypeScript

### `glyph dev`

Start the development server:

```bash
glyph dev
```

Options:
- `--port` - Specify port (default: 5173)
- `--host` - Allow external access

### `glyph build`

Build for production:

```bash
glyph build
```

Output goes to `dist/` directory.

### `glyph deploy`

Deploy your documentation:

```bash
glyph deploy
```

Supports:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### `glyph search:build`

Build the search index:

```bash
glyph search:build
```

Run this after building if search isn't working.

## Configuration

Create `glyph.config.js`:

```javascript
module.exports = {
  docsDir: './docs',
  outputDir: './dist',
  theme: {
    primary: '#D2B26B'
  }
};
```

## Coming Soon

The CLI is currently in development. For now, use:

```bash
npm create glyph-docs@latest
```
