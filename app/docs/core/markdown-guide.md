---
title: Markdown Guide
description: How to write content for Glyph using Markdown and MDX
sidebar_position: 2
---

# Markdown Guide

Glyph uses Markdown for content. This guide covers everything you need to know to write great documentation.

## Basic Syntax

### Headings

```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

### Lists

**Unordered:**
```markdown
- First item
- Second item
  - Nested item
- Third item
```

**Ordered:**
```markdown
1. First step
2. Second step
3. Third step
```

**Task lists:**
```markdown
- [x] Completed task
- [ ] Pending task
```

### Links

```markdown
[Internal link](/getting-started/quickstart)
[External link](https://example.com)
```

### Images

```markdown
![Alt text](path/to/image.png)
```

## Code Blocks

### Basic

````markdown
```javascript
const greeting = 'Hello World';
console.log(greeting);
```
````

### With Filename

````markdown
```javascript:config.js
const config = {
  theme: 'dark'
};
```
````

Supported languages:
- `javascript`, `js`, `typescript`, `ts`
- `python`, `py`
- `bash`, `sh`, `shell`
- `json`, `yaml`, `yml`
- `go`, `rust`, `java`
- `html`, `css`, `sql`

## Components

### Callouts

```markdown
:::tip
Helpful information
:::

:::warning
Be careful!
:::

:::danger
Don't do this!
:::

:::info
Good to know
:::
```

### Cards

```markdown
<Card title="Feature" icon="star">
  Description here
</Card>
```

### Card Groups

```markdown
<CardGroup cols={3}>
  <Card title="Fast" icon="zap">
    Lightning fast
  </Card>
  
  <Card title="Secure" icon="shield">
    Built-in security
  </Card>
  
  <Card title="Global" icon="globe">
    Worldwide CDN
  </Card>
</CardGroup>
```

### Steps

```markdown
<Steps>
  <Step title="Install">
    Run `npm install`
  </Step>
  
  <Step title="Configure">
    Edit `config.json`
  </Step>
  
  <Step title="Deploy">
    Run `npm run deploy`
  </Step>
</Steps>
```

### Frames

```markdown
<Frame caption="Screenshot of dashboard">
  ![Dashboard](dashboard.png)
</Frame>
```

## Tables

```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Auth | ✅ | OAuth2 supported |
| API | ✅ | REST + GraphQL |
| Webhooks | 🚧 | Coming soon |
```

## Frontmatter

Every page should have frontmatter at the top:

```markdown
---
title: Page Title
description: Brief description for SEO
sidebar_position: 1
status: beta
---
```

| Property | Description |
|----------|-------------|
| `title` | Page title (required) |
| `description` | Meta description |
| `sidebar_position` | Order in sidebar |
| `status` | `alpha`, `beta`, `coming-soon` |

## MDX

Glyph supports MDX, which lets you use React components in Markdown:

```markdown
import { MyComponent } from '@/components';

# My Page

<MyComponent />

Regular Markdown content here.
```

## Best Practices

1. **Use descriptive titles** - Help users find what they need
2. **Keep paragraphs short** - Easier to scan
3. **Use code blocks** - Show don't just tell
4. **Add images** - Visual aids help understanding
5. **Link related content** - Help users navigate
6. **Use callouts sparingly** - Too many reduce impact

## Emoji Support

Glyph supports emoji:

```markdown
# 🚀 Getting Started

## ✨ Features

## 🎯 Goals
```
