---
title: API Reference
description: Glyph configuration and component API reference.
---

# API Reference

## Configuration

### docs.json

The main configuration file for your Glyph documentation.

```json
{
  "name": "Your Project",
  "description": "Brief description",
  "logo": "/logo.png",
  "favicon": "/favicon.ico",
  "baseUrl": "https://docs.example.com",
  "sidebar": [...],
  "nav": {...}
}
```

#### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Site name |
| `description` | string | Yes | Site description |
| `logo` | string | No | Path to logo image |
| `favicon` | string | No | Path to favicon |
| `baseUrl` | string | No | Production URL |
| `sidebar` | array | Yes | Navigation structure |
| `nav` | object | Yes | Header navigation |

### Sidebar Items

```json
{
  "group": "Getting Started",
  "items": [
    {
      "label": "Quickstart",
      "slug": "getting-started/quickstart",
      "file": "getting-started/quickstart.md",
      "badge": "New"
    }
  ]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `group` | string | Yes | Section name |
| `items` | array | Yes | Page items |
| `items[].label` | string | Yes | Display name |
| `items[].slug` | string | Yes | URL path |
| `items[].file` | string | Yes | File path |
| `items[].badge` | string | No | Badge text |

### Navigation

```json
{
  "nav": {
    "links": [
      { "label": "Dashboard", "href": "https://app.example.com" }
    ],
    "social": {
      "discord": "https://discord.gg/...",
      "twitter": "https://twitter.com/...",
      "github": "https://github.com/..."
    }
  }
}
```

## Frontmatter

Page-level configuration in Markdown files.

```yaml
---
title: Page Title
description: Page description
status: beta
---
```

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Page title |
| `description` | string | Meta description |
| `status` | string | `alpha`, `beta`, `coming-soon` |

## Components

### Built-in Components

Use these in your Markdown/MDX files:

#### Callout

```markdown
:::tip
Helpful information
:::

:::warning
Be careful!
:::
```

#### Card

```markdown
<Card title="Feature" icon="star">
  Description here
</Card>
```

#### Code Block

````markdown
```javascript
const x = 1;
```
````

#### Frame

```markdown
<Frame caption="Screenshot">
  ![Alt text](image.png)
</Frame>
```

### Custom Components

Create your own in `app/src/components/`:

```tsx
// app/src/components/MyComponent.tsx
export function MyComponent({ children }) {
  return <div className="my-style">{children}</div>;
}
```

Use in MDX:
```markdown
import { MyComponent } from '@/components';

<MyComponent>Content</MyComponent>
```

## CLI

### create-glyph-docs

```bash
npx create-glyph-docs@latest [name] [options]
```

Options:
- `--template` - Starter template
- `--typescript` - Use TypeScript

### glyph (CLI)

```bash
glyph [command] [options]
```

Commands:
- `dev` - Start development server
- `build` - Build for production
- `deploy` - Deploy to hosting
- `search:build` - Build search index

## CSS Variables

Customize the theme:

```css
:root {
  --primary: 45 50% 55%;
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --radius: 0.75rem;
}
```

See [Theming](/getting-started/theming) for full reference.
