---
title: Blog
description: Example blog structure
sidebar_position: 3
---

# Blog Example

Structure for a technical blog.

## Overview

```markdown
---
title: Blog
description: Latest updates and articles
---

# Blog

Latest news, tutorials, and updates.

## Recent Posts

<CardGroup cols={2}>
  <Card title="Introducing Glyph 2.0" icon="sparkles" href="/blog/glyph-2">
    Major update with new themes
  </Card>
  
  <Card title="Building Great Docs" icon="book" href="/blog/great-docs">
    Best practices guide
  </Card>
  
  <Card title="Custom Themes" icon="palette" href="/blog/custom-themes">
    Create your own theme
  </Card>
  <Card title="Performance Tips" icon="zap" href="/blog/performance">
    Optimize your docs
  </Card>
</CardGroup>
```

## Structure

```
docs/
├── blog/
│   ├── index.md              # Blog home
│   ├── glyph-2-release.md
│   ├── building-great-docs.md
│   ├── custom-themes-guide.md
│   └── performance-tips.md
```

## Blog Post

```markdown
---
title: Introducing Glyph 2.0
description: Major update with 8 themes, MDX support, and more
author: Jane Doe
date: 2024-01-15
tags: [release, themes]
---

# Introducing Glyph 2.0

*Published on January 15, 2024 by Jane Doe*

We're excited to announce Glyph 2.0, a major update with new features and improvements.

## What's New

### 8 Beautiful Themes

Choose from 8 unique themes:

- **Minimal** - Clean and professional
- **Pixel** - Retro gaming aesthetic
- **Glass** - Modern glassmorphism
- **Brutalist** - Bold Swiss design
- **Cyber** - Neon cyberpunk
- **Terminal** - Command-line vibe
- **Halloween** - Spooky fun
- **Synthwave** - Retro future

### MDX Support

Now you can use React components in your Markdown:

```markdown
import { MyComponent } from '@/components';

<MyComponent />
```

### Improved Search

Faster, more accurate search with Pagefind.

## Migration Guide

Upgrading from 1.0? Here's what changed:

### Breaking Changes

- New config format
- Changed component imports

### New Features

- Theme system
- MDX support
- Better performance

## Get Started

```bash
npm create glyph-docs@latest my-blog
```

## Thanks

Thanks to all contributors who made this release possible!

---

*Have questions? [Contact us](/contact)*
```

## Author Component

```tsx
// Author.tsx
interface AuthorProps {
  name: string;
  avatar: string;
  bio: string;
}

export function Author({ name, avatar, bio }: AuthorProps) {
  return (
    <div className="flex items-center gap-4 py-6 border-t border-border">
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full" />
      <div>
        <p className="font-semibold">Written by {name}</p>
        <p className="text-muted-foreground text-sm">{bio}</p>
      </div>
    </div>
  );
}
```

## Tags

```markdown
---
tags: [tutorial, react, beginner]
---

# Tutorial Post

<div className="flex gap-2 mb-4">
  {frontmatter.tags.map(tag => (
    <span key={tag} className="badge">{tag}</span>
  ))}
</div>
```

## RSS Feed

Generate RSS feed in build:

```js
// scripts/rss.js
import { writeFileSync } from 'fs';
import { loadDocs } from './src/hooks/useDocs';

const posts = loadDocs().filter(doc => doc.slug.startsWith('blog/'));

const rss = `...generate XML...`;

writeFileSync('dist/feed.xml', rss);
```

## Newsletter Signup

```markdown
## Subscribe

Get new posts in your inbox:

<form className="flex gap-2">
  <input 
    type="email" 
    placeholder="your@email.com"
    className="flex-1 px-3 py-2 border rounded"
  />
  <button className="px-4 py-2 bg-primary text-white rounded">
    Subscribe
  </button>
</form>
```

## Best Practices

1. **Clear titles** - Descriptive, not clever
2. **Frontmatter** - Author, date, tags
3. **Images** - Featured image, diagrams
4. **Code blocks** - Syntax highlighted
5. **Related posts** - Link to more content
6. **Comments** - Enable discussions
