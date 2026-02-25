---
title: CLI Reference
description: Command-line interface reference
sidebar_position: 1
---

# CLI Reference

Command-line interface for Glyph.

:::info
The CLI is planned for a future release. For now, use npm scripts directly.
:::

## Planned Commands

### `glyph create`

Create a new documentation site.

```bash
glyph create [name] [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--template` | Starter template |
| `--typescript` | Use TypeScript |

**Examples:**

```bash
# Create with defaults
glyph create my-docs

# With TypeScript
glyph create my-docs --typescript

# Use template
glyph create my-docs --template blog
```

### `glyph dev`

Start development server.

```bash
glyph dev [options]
```

**Options:**

| Option | Default | Description |
|--------|---------|-------------|
| `--port` | 5173 | Port number |
| `--host` | localhost | Host to bind |
| `--open` | false | Open browser |

**Examples:**

```bash
# Default
glyph dev

# Custom port
glyph dev --port 3000

# Allow external access
glyph dev --host 0.0.0.0
```

### `glyph build`

Build for production.

```bash
glyph build [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--outDir` | Output directory |
| `--base` | Base URL |

**Examples:**

```bash
# Default build
glyph build

# Custom output
glyph build --outDir dist

# With base URL
glyph build --base /docs/
```

### `glyph deploy`

Deploy to hosting platform.

```bash
glyph deploy [platform]
```

**Platforms:**

| Platform | Description |
|----------|-------------|
| `vercel` | Deploy to Vercel |
| `netlify` | Deploy to Netlify |
| `gh-pages` | Deploy to GitHub Pages |

**Examples:**

```bash
# Deploy to Vercel
glyph deploy vercel

# Deploy to Netlify
glyph deploy netlify
```

### `glyph theme`

Manage themes.

```bash
glyph theme [command]
```

**Commands:**

| Command | Description |
|---------|-------------|
| `list` | List available themes |
| `switch` | Switch active theme |
| `create` | Create custom theme |

**Examples:**

```bash
# List themes
glyph theme list

# Switch theme
glyph theme switch minimal

# Create theme
glyph theme create my-theme
```

### `glyph add`

Add components or features.

```bash
glyph add [component]
```

**Components:**

| Component | Description |
|-----------|-------------|
| `analytics` | Add analytics integration |
| `search` | Configure search |
| `component` | Add custom component |

**Examples:**

```bash
# Add analytics
glyph add analytics

# Add component
glyph add component StatusBadge
```

### `glyph search:build`

Build search index.

```bash
glyph search:build
```

Run this after building if search isn't working.

## Current Workflow (npm scripts)

Until the CLI is ready, use npm scripts:

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Build Search Index

```bash
npm run postbuild
```

### Preview Production

```bash
npm run preview
```

## Global Options

All commands support:

| Option | Description |
|--------|-------------|
| `--help` | Show help |
| `--version` | Show version |
| `--verbose` | Verbose output |

## Configuration File

Create `glyph.config.js`:

```javascript
module.exports = {
  docsDir: './docs',
  outputDir: './dist',
  theme: {
    default: 'minimal',
  },
  build: {
    baseUrl: '/',
  },
  deploy: {
    platform: 'vercel',
  },
};
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GLYPH_ENV` | Environment (dev/prod) |
| `GLYPH_DEBUG` | Enable debug logging |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Build failed |
| 4 | Deploy failed |
