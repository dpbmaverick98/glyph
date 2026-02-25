---
title: Markdown & MDX
description: Writing content with Markdown and MDX in Glyph
sidebar_position: 2
---

# Markdown & MDX

Glyph supports standard Markdown plus MDX for React components.

## Basic Markdown

### Headings

```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

### Lists

```markdown
- Item 1
- Item 2
  - Nested
- Item 3

1. First
2. Second
3. Third
```

### Links & Images

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

### Code Blocks

````markdown
```javascript
const x = 1;
```
````

## Frontmatter

Add metadata at the top:

```markdown
---
title: Page Title
description: SEO description
sidebar_position: 1
---
```

## MDX Components

Use React components in Markdown:

```markdown
import { Callout } from '@/components';

<Callout type="tip">
  This is a tip!
</Callout>
```

### Built-in Components

- `Callout` - Info, warning, tip boxes
- `Card` / `CardGroup` - Feature cards
- `Accordion` - Collapsible content
- `Tabs` - Tabbed content

## Tables

```markdown
| Header | Header |
|--------|--------|
| Cell   | Cell   |
| Cell   | Cell   |
```

## Callouts

Special syntax for callouts:

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
```

## Emoji

Glyph supports emoji:

🚀 🎨 ⚡️ 🔍 📝
