---
title: Markdown & MDX
description: Writing content with Markdown and MDX
sidebar_position: 1
---

# Markdown & MDX

Glyph supports both Markdown and MDX for writing content.

## Markdown

Standard Markdown with extensions.

### Basic Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

[Link text](https://example.com)
![Alt text](/image.png)

- Bullet list
- Another item
  - Nested item

1. Numbered list
2. Second item

`inline code`
```

### Code Blocks

````markdown
```javascript
function hello() {
  return 'world';
}
```
````

With filename:

````markdown
```javascript:hello.js
function hello() {
  return 'world';
}
```
````

Supported languages:
- `javascript`, `js`, `typescript`, `ts`
- `python`, `py`
- `bash`, `sh`, `shell`
- `json`, `yaml`, `yml`
- `go`, `rust`, `java`
- `html`, `css`, `sql`

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes

```markdown
> This is a blockquote
> Multiple lines
```

### Horizontal Rule

```markdown
---
```

## MDX

MDX lets you use React components in Markdown.

### Using Components

```markdown
import { Callout } from '@/components';

# My Page

<Callout type="tip">
  This is a tip!
</Callout>
```

### Built-in Components

#### Callout

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

#### Card

```markdown
<Card title="Feature" icon="zap">
  Description here
</Card>
```

#### CardGroup

```markdown
<CardGroup cols={2}>
  <Card title="Card 1">Content 1</Card>
  <Card title="Card 2">Content 2</Card>
</CardGroup>
```

#### Accordion

```markdown
<Accordion title="Click to expand">
  Hidden content
</Accordion>
```

#### Tabs

```markdown
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabList>
  <TabContent value="tab1">Content 1</TabContent>
  <TabContent value="tab2">Content 2</TabContent>
</Tabs>
```

### Custom Components

Create your own components:

```tsx
// app/src/components/MyComponent.tsx
export function MyComponent({ children }) {
  return (
    <div className="my-style">
      {children}
    </div>
  );
}
```

Use in MDX:

```markdown
import { MyComponent } from '@/components';

<MyComponent>
  Custom content
</MyComponent>
```

## Frontmatter

Every page should have frontmatter:

```markdown
---
title: Page Title
description: Brief description
sidebar_position: 1
status: beta
---
```

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Page title (required) |
| `description` | string | Meta description |
| `sidebar_position` | number | Order in sidebar |
| `status` | string | `alpha`, `beta`, `coming-soon` |

## Best Practices

1. **Use descriptive titles** - Help users find content
2. **Keep paragraphs short** - Easier to scan
3. **Use code blocks** - Show, don't just tell
4. **Add images** - Visual aids help
5. **Link related content** - Help users navigate
6. **Use components** - Make content engaging

## Next Steps

<CardGroup cols={2}>
  <Card title="Components" icon="box" href="/components/overview">
    Full component reference
  </Card>
  <Card title="Custom Components" icon="code" href="/components/custom">
    Create your own components
  </Card>
</CardGroup>
