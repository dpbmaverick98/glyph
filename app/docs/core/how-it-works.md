---
title: How Glyph Works
description: Understanding Glyph's architecture and how it works
sidebar_position: 1
---

# How Glyph Works

Glyph is built on modern web technologies for speed and flexibility.

## Architecture

```
Markdown/MDX → Vite → React → Static HTML
     ↓              ↓        ↓         ↓
  Content      Build    UI       Deploy
```

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **Vite** | Fast builds, hot reload |
| **React** | UI components |
| **Tailwind CSS** | Styling |
| **Marked** | Markdown parsing |
| **Pagefind** | Search indexing |

## Build Process

1. **Load Content** - Markdown files from `docs/`
2. **Parse Frontmatter** - Extract metadata
3. **Render Markdown** - Convert to HTML
4. **Generate Search Index** - Pagefind indexes content
5. **Bundle Assets** - Vite optimizes everything
6. **Output Static Files** - Ready to deploy

## File Structure

```
docs/                     # Content
├── docs.json            # Navigation
├── *.md                 # Pages
└── */*.md               # Organized pages

src/                     # Source
├── components/          # React components
├── themes/              # Theme system
├── hooks/               # Custom hooks
└── lib/                 # Utilities

public/                  # Static assets
└── images/

dist/                    # Build output
```

## Content Flow

1. **User visits page** - React Router handles navigation
2. **Load content** - Markdown fetched and parsed
3. **Apply theme** - CSS variables set by theme
4. **Render** - Content displayed with components

## Search

Pagefind runs at build time:

1. Indexes all HTML content
2. Creates searchable database
3. Loads in browser via WebAssembly
4. Works offline, no server needed

## Themes

Themes are CSS variable sets:

```css
:root {
  --theme-primary: #007AFF;
  --theme-background: #ffffff;
  /* ... */
}
```

Switching themes updates these variables instantly.
