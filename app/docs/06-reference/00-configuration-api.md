---
title: Configuration API
description: Complete configuration reference
sidebar_position: 0
---

# Configuration API

Complete reference for `docs.json` configuration.

## Overview

`docs.json` is the main configuration file for your Glyph documentation.

```json
{
  "name": "My Documentation",
  "description": "Brief description",
  "logo": "/logo.svg",
  "favicon": "/favicon.ico",
  "baseUrl": "https://docs.example.com",
  "sidebar": [...],
  "nav": {...}
}
```

## Properties

### name

**Type:** `string`  
**Required:** Yes

Site name displayed in header and SEO.

```json
{
  "name": "Glyph Documentation"
}
```

### description

**Type:** `string`  
**Required:** Yes

Site description for SEO and meta tags.

```json
{
  "description": "A documentation framework with personality"
}
```

### logo

**Type:** `string`  
**Required:** No

Path to logo image (SVG recommended).

```json
{
  "logo": "/logo.svg"
}
```

### favicon

**Type:** `string`  
**Required:** No

Path to favicon.

```json
{
  "favicon": "/favicon.ico"
}
```

### baseUrl

**Type:** `string`  
**Required:** No

Production URL for SEO and sitemap.

```json
{
  "baseUrl": "https://docs.example.com"
}
```

### llmsTxt

**Type:** `string`  
**Required:** No

Path to llms.txt file.

```json
{
  "llmsTxt": "/llms.txt"
}
```

### llmsFullTxt

**Type:** `string`  
**Required:** No

Path to llms-full.txt file.

```json
{
  "llmsFullTxt": "/llms-full.txt"
}
```

## Sidebar

**Type:** `SidebarGroup[]`  
**Required:** Yes

Navigation structure.

```json
{
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        {
          "label": "Quickstart",
          "slug": "getting-started/quickstart",
          "file": "getting-started/quickstart.md"
        }
      ]
    }
  ]
}
```

### SidebarGroup

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `group` | string | Yes | Group name |
| `items` | SidebarItem[] | Yes | Navigation items |

### SidebarItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display text |
| `slug` | string | Yes | URL path |
| `file` | string | Yes | File path |
| `badge` | string | No | Badge text |

## Navigation

**Type:** `NavConfig`  
**Required:** No

Header navigation and social links.

```json
{
  "nav": {
    "links": [
      {
        "label": "Dashboard",
        "href": "https://app.example.com"
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

### NavLink

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Link text |
| `href` | string | Yes | URL |

### SocialLinks

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `discord` | string | No | Discord invite |
| `twitter` | string | No | Twitter/X URL |
| `github` | string | No | GitHub URL |

## Complete Example

```json
{
  "name": "Glyph",
  "description": "A documentation framework with personality",
  "logo": "/glyph-logo.svg",
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

Use JSON Schema for validation:

```json
{
  "$schema": "./node_modules/glyph-docs/schemas/docs.json"
}
```
