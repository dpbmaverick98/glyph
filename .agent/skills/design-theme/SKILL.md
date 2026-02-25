---
name: design-theme
description: Guide for customizing the design theme in Obul Docs. Use when users want to change colors, update the color scheme, or modify the visual appearance of their documentation.
---

# Design Theme Customization Guide

## Quick Color Change

Edit `app/src/index.css` and update the primary color:

```css
:root {
  --primary: 210 80% 50%;        /* Change hue (first number) for new color */
  --obul-gold: 210 80% 50%;      /* Match primary */
  --ring: 210 80% 50%;           /* Match primary */
}
```

Common hue values:
- Blue: 210
- Green: 150
- Purple: 280
- Red: 0
- Orange: 25
- Gold (default): 45

## Complete Theme Example

```css
:root {
  --primary: 200 80% 50%;
  --primary-foreground: 0 0% 100%;
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --obul-gold: 200 80% 50%;
  --ring: 200 80% 50%;
}

.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  --primary: 200 80% 60%;
}
```

## Border Radius

Change `--radius` for rounder/sharper corners:
- 0rem = sharp
- 0.5rem = 8px
- 0.75rem = 12px (default)
- 1rem = 16px
