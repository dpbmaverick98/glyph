---
title: Tables
description: Create beautiful data tables
sidebar_position: 6
---

# Tables

Display data in clean, responsive tables.

## Basic Usage

```markdown
| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier |
| `name` | string | Display name |
| `email` | string | Email address |
```

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier |
| `name` | string | Display name |
| `email` | string | Email address |

## Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |
| L    | C      | R     |
```

| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |
| L    | C      | R     |

## With Formatting

```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| **Auth** | ✅ | OAuth2 support |
| *API* | ✅ | REST + GraphQL |
| `Webhooks` | 🚧 | Coming soon |
| ~~Legacy~~ | ❌ | Deprecated |
```

| Feature | Status | Notes |
|---------|--------|-------|
| **Auth** | ✅ | OAuth2 support |
| *API* | ✅ | REST + GraphQL |
| `Webhooks` | 🚧 | Coming soon |
| ~~Legacy~~ | ❌ | Deprecated |

## Wide Tables

Wide tables scroll horizontally on small screens:

```markdown
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `name` | string | Yes | - | Component name |
| `type` | 'info' \| 'warning' \| 'danger' | No | 'info' | Callout type |
| `title` | string | No | - | Custom title |
| `icon` | string | No | - | Icon name |
| `href` | string | No | - | Link URL |
| `badge` | string | No | - | Badge text |
```

## Use Cases

### API Parameters

```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Max items (default: 10) |
| `offset` | number | No | Pagination offset |
| `sort` | string | No | Sort field |
```

### Configuration Options

```markdown
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | string | 'minimal' | Color theme |
| `search` | boolean | true | Enable search |
| `darkMode` | boolean | true | Enable dark mode |
```

### Comparison Tables

```markdown
| Feature | Glyph | Mintlify | Docusaurus |
|---------|-------|----------|------------|
| Self-hosted | ✅ | ❌ | ✅ |
| Free | ✅ | Limited | ✅ |
| Themes | 8 | 1 | 2 |
| Bundle Size | ~50KB | Cloud | ~200KB |
```

## Best Practices

1. **Use headers** - Always include header row
2. **Keep it simple** - Don't over-format
3. **Align numbers right** - Easier to compare
4. **Use code for values** - Backticks for property names
5. **Limit columns** - 3-5 columns max for readability
