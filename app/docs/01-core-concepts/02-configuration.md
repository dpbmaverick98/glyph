---
title: Configuration
description: Configuring your Glyph documentation
sidebar_position: 2
---

# Configuration

Configure your documentation with `docs.json`.

## Basic Configuration

Create `docs/docs.json`:

```json
{
  "name": "My Documentation",
  "description": "A brief description",
  "logo": "/logo.svg",
  "favicon": "/favicon.ico",
  "baseUrl": "https://docs.example.com",
  "sidebar": [...],
  "nav": {...}
}
```

## Sidebar Navigation

Define your documentation structure:

```json
{
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        {
          "label": "Introduction",
          "slug": "getting-started/introduction",
          "file": "getting-started/introduction.md"
        },
        {
          "label": "Quickstart",
          "slug": "getting-started/quickstart",
          "file": "getting-started/quickstart.md"
        }
      ]
    },
    {
      "group": "API Reference",
      "items": [
        {
          "label": "Authentication",
          "slug": "api/authentication",
          "file": "api/authentication.md"
        }
      ]
    }
  ]
}
```

### Sidebar Properties

| Property | Type | Description |
|----------|------|-------------|
| `group` | string | Section name |
| `items` | array | Navigation items |
| `items[].label` | string | Display text |
| `items[].slug` | string | URL path |
| `items[].file` | string | Markdown file path |
| `items[].badge` | string | Optional badge |

## Header Navigation

Add links to header:

```json
{
  "nav": {
    "links": [
      {
        "label": "Dashboard",
        "href": "https://app.example.com"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/example"
      }
    ],
    "social": {
      "discord": "https://discord.gg/example",
      "twitter": "https://twitter.com/example",
      "github": "https://github.com/example"
    }
  }
}
```

## Complete Example

```json
{
  "name": "Glyph Documentation",
  "description": "A documentation framework with personality",
  "logo": "/logo.svg",
  "favicon": "/favicon.ico",
  "baseUrl": "https://glyph-docs.vercel.app",
  "llmsTxt": "/llms.txt",
  "llmsFullTxt": "/llms-full.txt",
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        {
          "label": "Introduction",
          "slug": "getting-started/introduction",
          "file": "00-getting-started/00-introduction.md"
        },
        {
          "label": "Quickstart",
          "slug": "getting-started/quickstart",
          "file": "00-getting-started/01-quickstart.md"
        },
        {
          "label": "Installation",
          "slug": "getting-started/installation",
          "file": "00-getting-started/02-installation.md"
        }
      ]
    },
    {
      "group": "Core Concepts",
      "items": [
        {
          "label": "How It Works",
          "slug": "core/how-it-works",
          "file": "01-core-concepts/00-how-it-works.md"
        },
        {
          "label": "Configuration",
          "slug": "core/configuration",
          "file": "01-core-concepts/02-configuration.md"
        }
      ]
    }
  ],
  "nav": {
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/dpbmaverick98/glyph"
      }
    ],
    "social": {
      "discord": "https://discord.gg/glyph",
      "twitter": "https://twitter.com/glyphai",
      "github": "https://github.com/dpbmaverick98/glyph"
    }
  }
}
```

## Validation

Your `docs.json` must be valid JSON:

1. No trailing commas
2. Proper quotes
3. Valid file paths

## Environment Variables

Use environment variables in your config:

```json
{
  "baseUrl": "${process.env.BASE_URL}"
}
```

## Next Steps

<CardGroup cols={2}>
  <Card title="Theming" icon="palette" href="/core/theming">
    Customize your theme
  </Card>
  
  <Card title="Components" icon="box" href="/components/overview">
    Use built-in components
  </Card>
</CardGroup>
