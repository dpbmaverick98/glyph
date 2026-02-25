---
title: Glyph vs Other Tools
description: How Glyph compares to other documentation solutions.
---

# Glyph vs Other Tools

Choosing the right documentation tool depends on your needs. Here's how Glyph compares.

## Glyph vs Mintlify

| Feature | Glyph | Mintlify |
|---------|-------|----------|
| **Hosting** | Self-hosted or any static host | Mintlify platform only |
| **Price** | Free | Free tier limited |
| **Customization** | Full source access | Limited to config options |
| **Components** | React-based, extensible | Pre-built only |
| **Search** | Pagefind (offline) | Algolia (cloud) |

**Choose Glyph if:** You want full control, need to self-host, or want to customize beyond config options.

**Choose Mintlify if:** You want a managed solution and don't need deep customization.

## Glyph vs Docusaurus

| Feature | Glyph | Docusaurus |
|---------|-------|------------|
| **Bundle Size** | ~50KB | ~200KB+ |
| **Build Tool** | Vite | Webpack |
| **Learning Curve** | Low | Medium |
| **Plugin Ecosystem** | Growing | Large |
| **MDX** | Native | Native |

**Choose Glyph if:** You want a lightweight, fast solution with modern tooling.

**Choose Docusaurus if:** You need extensive plugin ecosystem or Facebook community support.

## Glyph vs GitBook

| Feature | Glyph | GitBook |
|---------|-------|---------|
| **Editor** | Markdown files | WYSIWYG or Markdown |
| **Git-based** | Yes | Optional |
| **Custom Domain** | Free | Paid |
| **Analytics** | Bring your own | Built-in |

**Choose Glyph if:** You prefer Git workflows and want full ownership.

**Choose GitBook if:** You want a visual editor and managed hosting.

## When to Use Glyph

Glyph is perfect for:

- **Open source projects** that need self-hosted docs
- **Startups** wanting branded documentation
- **Developers** who prefer Markdown and Git workflows
- **Teams** needing custom components
- **Performance-conscious** projects

## Migration

### From Mintlify

1. Copy your Markdown files to `docs/`
2. Convert `mint.json` to `docs.json`
3. Update component syntax
4. Build and deploy

### From Docusaurus

1. Move `docs/` folder contents
2. Update frontmatter
3. Convert custom components
4. Update `sidebars.js` to `docs.json`

### From GitBook

1. Export your content
2. Convert to Markdown
3. Organize into `docs/` folder
4. Configure navigation

## The Bottom Line

Glyph gives you the polish of Mintlify with the flexibility of Docusaurus—without the bloat.
