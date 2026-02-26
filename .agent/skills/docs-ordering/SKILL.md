---
name: docs-ordering
description: Guide for organizing and ordering documentation in Glyph. Use when users need help structuring their docs, adding new pages to navigation, or reordering sidebar items.
---

# Documentation Ordering Guide

## Overview

Glyph uses a JSON-based configuration system (`docs/docs.json`) to define the sidebar navigation structure.

## Configuration File Structure

The `docs.json` file contains:

```json
{
  "name": "Your Project Name",
  "description": "Brief description",
  "logo": "/logo.svg",
  "favicon": "/favicon.ico",
  "baseUrl": "https://docs.example.com",
  "llmsTxt": "/llms.txt",
  "llmsFullTxt": "/llms-full.txt",
  "nav": {
    "links": [...],
    "social": {...}
  },
  "sidebar": [
    {
      "group": "Group Name",
      "items": [
        { "label": "Page Title", "slug": "page-slug", "file": "path/to/page.md" }
      ]
    }
  ]
}
```

## How to Add a New Page

1. **Create the markdown file** in `docs/` folder:
   ```bash
   touch docs/getting-started/my-new-page.md
   ```

2. **Add frontmatter** to the markdown file:
   ```yaml
   ---
   title: My New Page
   description: Brief description of this page
   sidebar_position: 1
   ---
   ```

3. **Add to docs.json** in the appropriate group:
   ```json
   {
     "group": "Getting Started",
     "items": [
       { 
         "label": "My New Page", 
         "slug": "getting-started/my-new-page", 
         "file": "getting-started/my-new-page.md" 
       }
     ]
   }
   ```

## Folder Structure

Glyph uses numbered folders for organization:

```
docs/
├── 00-getting-started/
│   ├── 00-introduction.md
│   ├── 01-quickstart.md
│   └── 02-installation.md
├── 01-core-concepts/
│   ├── 00-how-it-works.md
│   └── 01-configuration.md
├── 02-components/
│   └── 00-overview.md
└── docs.json
```

## Ordering Rules

- **Groups appear in the order defined** in the `sidebar` array
- **Items within a group** appear in the order defined in the `items` array
- **Nested paths**: Use `/` in slugs for nested navigation (e.g., `api/authentication`)

## Best Practices

1. **Logical Flow**: Order pages from basic to advanced
2. **Group Related Content**: Use groups to organize by topic
3. **Keep It Flat**: Avoid deep nesting (max 2-3 levels)
4. **Use Descriptive Labels**: Clear, concise labels help users navigate
5. **Numbered Folders**: Use `00-`, `01-` prefixes for easy reordering

## Example Configuration

```json
{
  "name": "Glyph",
  "description": "A documentation framework with personality",
  "logo": "/glyph-logo.svg",
  "favicon": "/favicon.ico",
  "baseUrl": "https://glyph-docs.vercel.app",
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        { "label": "Introduction", "slug": "getting-started/introduction", "file": "00-getting-started/00-introduction.md" },
        { "label": "Quickstart", "slug": "getting-started/quickstart", "file": "00-getting-started/01-quickstart.md" }
      ]
    },
    {
      "group": "Core Concepts",
      "items": [
        { "label": "How It Works", "slug": "core/how-it-works", "file": "01-core-concepts/00-how-it-works.md" },
        { "label": "Configuration", "slug": "core/configuration", "file": "01-core-concepts/02-configuration.md" }
      ]
    }
  ],
  "nav": {
    "links": [
      { "label": "GitHub", "href": "https://github.com/dpbmaverick98/glyph" }
    ],
    "social": {
      "discord": "https://discord.gg/glyph",
      "twitter": "https://twitter.com/glyphai",
      "github": "https://github.com/dpbmaverick98/glyph"
    }
  }
}
```

## Common Patterns

### Adding a Badge

```json
{ 
  "label": "CLI", 
  "slug": "products/glyph-cli", 
  "file": "products/glyph-cli.md", 
  "badge": "Coming Soon" 
}
```

### Nested Documentation

Create folder structure:
```
docs/
  api/
    authentication.md
    endpoints.md
```

Reference with nested slugs:
```json
{ 
  "label": "Authentication", 
  "slug": "api/authentication", 
  "file": "api/authentication.md" 
}
```

## Troubleshooting

- **Page not appearing**: Check that the `file` path matches the actual file location
- **404 errors**: Ensure the `slug` doesn't contain special characters or spaces
- **Order not updating**: Restart the dev server after changing `docs.json`
