---
name: docs-ordering
description: Guide for organizing and ordering documentation in Glyph Docs. Use when users need help structuring their docs, adding new pages to navigation, or reordering sidebar items.
---

# Documentation Ordering Guide

## Overview

Glyph Docs uses a JSON-based configuration system (`docs/docs.json`) to define the sidebar navigation structure. This guide explains how to properly organize and order your documentation.

## Configuration File Structure

The `docs.json` file contains:

```json
{
  "name": "Your Project Name",
  "description": "Brief description",
  "nav": {
    "links": [...],
    "social": {...}
  },
  "sidebar": [
    {
      "group": "Group Name",
      "items": [
        { "label": "Page Title", "slug": "page-slug", "file": "page.md" }
      ]
    }
  ]
}
```

## How to Add a New Page

1. **Create the markdown file** in `docs/` folder:
   ```bash
   touch docs/my-new-page.md
   ```

2. **Add frontmatter** to the markdown file:
   ```yaml
   ---
   title: My New Page
   description: Brief description of this page
   status: beta  # optional: alpha, beta, coming-soon
   ---
   ```

3. **Add to docs.json** in the appropriate group:
   ```json
   {
     "group": "Getting Started",
     "items": [
       { "label": "My New Page", "slug": "my-new-page", "file": "my-new-page.md" }
     ]
   }
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

## Example Configuration

```json
{
  "sidebar": [
    {
      "group": "Introduction",
      "items": [
        { "label": "Quick Start", "slug": "quickstart", "file": "quickstart.md" },
        { "label": "Installation", "slug": "installation", "file": "installation.md" }
      ]
    },
    {
      "group": "Core Concepts",
      "items": [
        { "label": "Architecture", "slug": "architecture", "file": "architecture.md" },
        { "label": "Configuration", "slug": "configuration", "file": "configuration.md" }
      ]
    },
    {
      "group": "API Reference",
      "items": [
        { "label": "Authentication", "slug": "api/authentication", "file": "api/authentication.md" },
        { "label": "Endpoints", "slug": "api/endpoints", "file": "api/endpoints.md" }
      ]
    }
  ]
}
```

## Common Patterns

### Adding a Badge

```json
{ "label": "Beta Feature", "slug": "beta", "file": "beta.md", "badge": "Beta" }
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
{ "label": "Authentication", "slug": "api/authentication", "file": "api/authentication.md" }
```

## Troubleshooting

- **Page not appearing**: Check that the `file` path matches the actual file location
- **404 errors**: Ensure the `slug` doesn't contain special characters or spaces
- **Order not updating**: Restart the dev server after changing `docs.json`
