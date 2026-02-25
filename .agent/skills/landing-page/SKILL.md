---
name: landing-page
description: Guide for configuring custom landing pages in Glyph documentation. Use when users want to create a custom homepage, add feature cards, or customize their documentation landing experience.
---

# Landing Page Configuration

## Overview

Glyph supports custom landing pages through a special `landing.md` file. This allows you to create a personalized homepage instead of using the default Hero component.

## How It Works

1. Create `docs/landing.md`
2. Write your content in Markdown
3. Use special components for feature grids
4. If `landing.md` exists, it renders automatically
5. If not, Glyph falls back to the built-in Hero

## Basic Landing Page

Create `docs/landing.md`:

```markdown
---
title: My Project
description: A brief description of my project
---

# Welcome to My Project

This is my custom landing page content.

## Features

- **Fast** - Built for speed
- **Simple** - Easy to use
- **Beautiful** - Great design

## Get Started

[Get Started](#getting-started/quickstart)
```

## Using Card Components

### CardGroup

Display features in a grid:

```markdown
<CardGroup cols={3}>
  <Card title="Feature 1" icon="zap" href="docs/feature-1">
    Description of feature 1
  </Card>
  
  <Card title="Feature 2" icon="shield" href="docs/feature-2">
    Description of feature 2
  </Card>
  
  <Card title="Feature 3" icon="globe" href="docs/feature-3">
    Description of feature 3
  </Card>
</CardGroup>
```

### Available Icons

Use any Lucide icon name:
- `zap` - Lightning bolt
- `shield` - Security
- `globe` - Global/web
- `code` - Code/development
- `book` - Documentation
- `star` - Featured
- `heart` - Favorite
- `check` - Checkmark

### Card Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Card heading |
| `icon` | string | Lucide icon name |
| `href` | string | Link destination |

## Layout Patterns

### Two-Column Feature Grid

```markdown
<CardGroup cols={2}>
  <Card title="Developer Friendly" icon="code">
    Write in Markdown, get a beautiful site
  </Card>
  
  <Card title="Fast Performance" icon="zap">
    Built with Vite for instant loading
  </Card>
</CardGroup>
```

### Three-Column Quick Links

```markdown
## Quick Links

<CardGroup cols={3}>
  <Card title="Documentation" icon="book" href="core/intro">
    Learn how to use Glyph
  </Card>
  
  <Card title="API Reference" icon="code" href="reference/api">
    Complete API documentation
  </Card>
  
  <Card title="Examples" icon="star" href="examples">
    See what others built
  </Card>
</CardGroup>
```

### With Callouts

```markdown
# Welcome

:::tip
New to Glyph? Check out the [Quickstart Guide](#getting-started/quickstart)
:::

## Features

<CardGroup cols={3}>
  ...
</CardGroup>
```

## Full Example

```markdown
---
title: Glyph
description: A lightweight documentation framework
---

# Build Beautiful Documentation

Glyph helps you create stunning documentation sites with minimal effort.

## Why Glyph?

<CardGroup cols={3}>
  <Card title="Fast" icon="zap">
    Instant loading with Vite
  </Card>
  
  <Card title="Beautiful" icon="star">
    Clean design with Geist fonts
  </Card>
  
  <Card title="Simple" icon="heart">
    Just write Markdown
  </Card>
</CardGroup>

## Get Started

Choose your path:

<CardGroup cols={2}>
  <Card title="Quickstart" icon="zap" href="getting-started/quickstart">
    Deploy in 5 minutes
  </Card>
  
  <Card title="Documentation" icon="book" href="core/what-is-glyph">
    Learn the framework
  </Card>
</CardGroup>
```

## Styling Tips

### Center Content

```markdown
<div className="text-center">

# Big Centered Title

Your centered content here

</div>
```

### Add Spacing

```markdown
# Title

<div className="py-8"></div>

## Next Section
```

### Use Emojis

```markdown
# 🚀 Welcome

## ✨ Features

## 🎯 Goals
```

## Best Practices

1. **Keep it concise** - Landing pages should be scannable
2. **Use cards for navigation** - Help users find what they need
3. **Include a CTA** - Always have a clear next step
4. **Match your brand** - Use your colors and tone
5. **Mobile-friendly** - Cards automatically stack on mobile

## Troubleshooting

### Landing page not showing

- Ensure `landing.md` is in the `docs/` folder
- Check that the file has valid frontmatter
- Restart the dev server

### Cards not rendering

- Check CardGroup syntax (must be valid JSX)
- Verify icon names are valid Lucide icons
- Ensure href paths are correct

### Styles not applying

- Use Tailwind classes for custom styling
- Check that classes are valid
- Some Markdown syntax may need HTML wrappers

## Fallback Behavior

If you delete `landing.md`, Glyph automatically shows the built-in Hero component with:
- Project title and description
- Quick links to key pages
- Call-to-action buttons

To restore the default Hero, simply remove or rename `landing.md`.
