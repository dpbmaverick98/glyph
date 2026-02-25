---
title: Your First Page
description: Learn how to create your first documentation page
sidebar_position: 4
---

# Your First Page

Creating pages in Glyph is simple: write Markdown, add to navigation, done.

## Create a Markdown File

Create `docs/hello-world.md`:

```markdown
---
title: Hello World
description: My first documentation page
---

# Hello World

This is my first page!

## Features

- **Bold text**
- *Italic text*
- `Code inline`

## Code Block

```javascript
console.log('Hello from Glyph!');
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
          "slug": "hello-world",
          "file": "hello-world.md"
        }
      ]
    }
  ]
}
```

## View Your Page

1. Save the files
2. Your dev server will hot-reload
3. Navigate to `/#hello-world`

## Frontmatter Options

```yaml
---
title: Page Title              # Required
description: Description       # For SEO and cards
sidebar_position: 1            # Order in sidebar
status: beta                   # Badge: alpha, beta, coming-soon
---
```

## Next Steps

- [Markdown Guide](/core/markdown-mdx) - Full Markdown syntax
- [Components](/components/overview) - Built-in components
- [Theming](/core/theming) - Customize appearance
