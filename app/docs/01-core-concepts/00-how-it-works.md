---
title: How Glyph Works
description: Understanding Glyph's architecture and concepts
sidebar_position: 0
---

# How Glyph Works

Understanding Glyph's architecture helps you customize and extend it.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           Your Content                  │
│  ┌─────────┐  ┌─────────┐  ┌────────┐  │
│  │  .md    │  │  .mdx   │  │docs.json│  │
│  │ files   │  │ files   │  │ config │  │
│  └────┬────┘  └────┬────┘  └────┬───┘  │
│       └─────────────┴─────────────┘     │
│                    │                     │
└────────────────────┼────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Build Process (Vite)            │
│  ┌─────────┐  ┌─────────┐  ┌────────┐  │
│  │ Markdown│  │   MDX   │  │Pagefind│  │
│  │  Parse  │  │ Compile │  │ Search │  │
│  └────┬────┘  └────┬────┘  └────┬───┘  │
│       └─────────────┴─────────────┘     │
│                    │                     │
└────────────────────┼────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Static Output (dist/)           │
│  ┌─────────┐  ┌─────────┐  ┌────────┐  │
│  │  HTML   │  │   JS    │  │ Search │  │
│  │  files  │  │ bundles │  │  index │  │
│  └─────────┘  └─────────┘  └────────┘  │
└─────────────────────────────────────────┘
```

## File Processing

### 1. Content Discovery

Glyph scans the `docs/` folder for:
- `.md` files (Markdown)
- `.mdx` files (MDX with React components)
- `docs.json` (navigation configuration)

### 2. Frontmatter Parsing

Each file starts with YAML frontmatter:

```markdown
---
title: Page Title
description: Page description
sidebar_position: 1
---
```

This metadata drives:
- Page titles
- SEO meta tags
- Sidebar ordering
- Status badges

### 3. Markdown Processing

Markdown is processed by `marked` with custom extensions:

- **Code blocks** → Syntax highlighted with Prism
- **Tables** → Styled responsive tables
- **Links** → Internal/external link handling
- **Images** → Optimized with lazy loading
- **Callouts** → Tip/warning/info boxes

### 4. Component Rendering

Custom components (Card, Accordion, etc.) are:
- Parsed from markdown
- Rendered as React components
- Styled with current theme

### 5. Search Indexing

Pagefind indexes all content at build time:
- Creates static search index
- No server required
- Works offline

## Theme System

### How Themes Work

```
Theme Registry
     │
     ├── Minimal (blue, clean)
     ├── Pixel (green, retro)
     ├── Glass (purple, blur)
     ├── Brutalist (red, bold)
     ├── Cyber (cyan, neon)
     ├── Terminal (green, CLI)
     ├── Halloween (orange, spooky)
     └── Synthwave (pink, sunset)
```

Each theme defines:
- **Colors** - Primary, background, text, accents
- **Fonts** - Sans, mono, display fonts
- **Radius** - Border radius values
- **Animations** - Page load, hover effects

### Theme Application

1. User selects theme → stored in localStorage
2. CSS variables updated on `:root`
3. Components re-render with new values
4. No page reload needed

## Routing

Glyph uses hash-based routing:

```
https://docs.example.com#getting-started/quickstart
                              └───┬───┘ └────┬────┘
                               group      page
```

Benefits:
- Works on static hosts
- No server configuration needed
- Instant navigation

## Search

Pagefind powers search:

1. **Build time**: Indexes all content
2. **Runtime**: Loads index in browser
3. **Search**: Pure client-side, no server

Features:
- Full-text search
- Fuzzy matching
- Highlighted results
- Keyboard shortcuts (Cmd+K)

## Customization Points

### Easy (No Code)

- Switch themes
- Edit `docs.json`
- Write Markdown

### Medium (CSS)

- Edit `index.css`
- Override CSS variables
- Custom fonts

### Advanced (React)

- Create components
- Modify `App.tsx`
- Add new themes

## Build Output

```
dist/
├── index.html              # Main entry
├── assets/
│   ├── index-xxx.js        # Main JS bundle
│   ├── index-xxx.css       # Styles
│   └── ...
├── pagefind/               # Search index
│   ├── pagefind.js
│   └── ...
├── llms.txt               # LLM discovery
├── llms-full.txt          # Full content
└── docs/                  # Static HTML for indexing
    └── ...
```

## Performance

- **Bundle size**: ~50KB (vs 200KB+ for Docusaurus)
- **Build time**: Seconds, not minutes
- **Runtime**: No hydration, instant loads
- **Search**: Offline-capable

## Next Steps

<CardGroup cols={2}>
  <Card title="Configuration" icon="settings" href="/core/configuration">
    Learn about docs.json
  </Card>
  
  <Card title="Theming" icon="palette" href="/core/theming">
    Customize your theme
  </Card>
</CardGroup>
