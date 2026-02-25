---
title: Your First Page
description: Learn to write your first documentation page
sidebar_position: 3
---

# Your First Page

Learn the basics of writing documentation in Glyph.

## Create a Page

1. Create a new file in `docs/`:

```bash
touch docs/getting-started/hello.md
```

2. Add frontmatter at the top:

```markdown
---
title: Hello World
description: My first documentation page
sidebar_position: 1
---
```

3. Write your content:

```markdown
# Hello World

Welcome to my documentation!

## Getting Started

This is a paragraph with **bold** and *italic* text.

### Lists

- First item
- Second item
- Third item

### Code

```javascript
console.log('Hello World');
```
```

## Add to Navigation

Edit `docs/docs.json`:

```json
{
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        {
          "label": "Hello World",
          "slug": "getting-started/hello",
          "file": "getting-started/hello.md"
        }
      ]
    }
  ]
}
```

## View Your Page

Visit: `http://localhost:5173#getting-started/hello`

## Frontmatter Options

| Option | Description | Required |
|--------|-------------|----------|
| `title` | Page title | Yes |
| `description` | Meta description | No |
| `sidebar_position` | Order in sidebar | No |
| `status` | `alpha`, `beta`, `coming-soon` | No |

## Markdown Features

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

### Links

```markdown
[Internal link](/getting-started/quickstart)
[External link](https://example.com)
```

### Images

```markdown
![Alt text](/images/screenshot.png)
```

### Code Blocks

````markdown
```javascript
const greeting = 'Hello';
```
````

With filename:

````markdown
```javascript:config.js
const config = { theme: 'dark' };
```
````

### Tables

```markdown
| Feature | Status |
|---------|--------|
| Auth | ✅ Done |
| API | 🚧 WIP |
```

### Callouts

```markdown
:::tip
This is a helpful tip!
:::

:::warning
Be careful with this.
:::
```

## Components

Use built-in components:

```markdown
<Card title="Feature" icon="zap">
  Description here
</Card>

<CardGroup cols={2}>
  <Card title="Card 1">Content 1</Card>
  <Card title="Card 2">Content 2</Card>
</CardGroup>
```

## Best Practices

1. **Use descriptive titles** - Help users find content
2. **Keep paragraphs short** - Easier to scan
3. **Use code blocks** - Show, don't just tell
4. **Add images** - Visual aids help understanding
5. **Link related content** - Help users navigate

## Next Steps

<CardGroup cols={2}>
  <Card title="Markdown Guide" icon="book" href="/core/markdown-mdx">
    Full Markdown & MDX reference
  </Card>
  
  <Card title="Components" icon="box" href="/components/overview">
    Learn about available components
  </Card>
</CardGroup>
