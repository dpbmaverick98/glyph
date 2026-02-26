---
name: design-theme
description: Guide for customizing themes in Glyph. Use when users want to change colors, update the color scheme, or modify the visual appearance of their documentation.
---

# Design Theme Customization Guide

## Built-in Themes

Glyph comes with 8 built-in themes:

| Theme | Style | Primary Color |
|-------|-------|---------------|
| Minimal | Clean, professional | Blue (#007AFF) |
| Pixel | Retro 8-bit | Green (#00ff00) |
| Glass | Glassmorphism | Purple (#a855f7) |
| Brutalist | Bold, raw | Red (#ff0000) |
| Cyber | Neon cyberpunk | Cyan (#00f0ff) |
| Terminal | Command-line | Green (#00ff41) |
| Halloween | Spooky | Orange (#ff6600) |
| Synthwave | Retro future | Pink (#ff00ff) |

## Switching Themes

Users can switch themes on the landing page. The selection is saved automatically.

## Creating a Custom Theme

### 1. Create Theme File

```ts
// app/src/themes/my-theme.ts
import type { Theme } from './registry';

export const myTheme: Theme = {
  id: 'my-theme',
  name: 'My Theme',
  description: 'Custom theme description',
  preview: '/themes/my-theme-preview.png',
  colors: {
    primary: '#007AFF',
    background: '#ffffff',
    foreground: '#1a1a1a',
    card: '#f5f5f7',
    border: '#e5e5e7',
    muted: '#86868b',
    accent: '#34c759',
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    display: 'Inter, sans-serif',
  },
  radius: '0.75rem',
  animations: {
    pageLoad: 'fade',
    scrollReveal: true,
    hoverScale: true,
    cursorEffect: 'none',
  },
};
```

### 2. Register Theme

```ts
// app/src/themes/registry.ts
import { myTheme } from './my-theme';

export const themes: Theme[] = [
  // ... other themes
  myTheme,
];
```

## Theme Properties

### Colors

| Property | Description |
|----------|-------------|
| `primary` | Main brand color |
| `background` | Page background |
| `foreground` | Main text color |
| `card` | Card backgrounds |
| `border` | Borders and dividers |
| `muted` | Secondary text |
| `accent` | Success/highlight color |

### Fonts

| Property | Description |
|----------|-------------|
| `sans` | Body text font |
| `mono` | Code font |
| `display` | Headlines (optional) |

### Animations

| Property | Options |
|----------|---------|
| `pageLoad` | 'fade', 'slide', 'scale', 'none' |
| `scrollReveal` | true/false |
| `hoverScale` | true/false |
| `cursorEffect` | 'none', 'glow', 'trail', 'blink' |

## Quick Color Change

Edit `app/src/index.css` and update CSS variables:

```css
:root {
  --theme-primary: #007AFF;
  --theme-background: #ffffff;
  --theme-foreground: #1a1a1a;
  --theme-card: #f5f5f7;
  --theme-border: #e5e5e7;
  --theme-muted: #86868b;
  --theme-accent: #34c759;
}
```

## Border Radius

Change `--theme-radius` for rounder/sharper corners:
- 0rem = sharp (Pixel, Brutalist)
- 0.25rem = slight (Terminal)
- 0.5rem = medium (Cyber, Synthwave)
- 0.75rem = default (Minimal, Halloween)
- 1rem = round (Glass)

## Theme Animations

Each theme can have unique animations:

- **Cursor Glow** (Glass): Glowing orb follows cursor
- **Cursor Trail** (Cyber, Synthwave): Trail of dots
- **Blink Cursor** (Terminal): Blinking block cursor
- **Scanlines** (Pixel): Retro CRT effect
- **Grid Background** (Cyber, Synthwave): Animated grid
- **Fog Effect** (Halloween): Animated fog

## Best Practices

1. **Test contrast** - Ensure text is readable
2. **Limit colors** - 3-4 colors max
3. **Consistent radius** - Match your brand
4. **Consider accessibility** - WCAG AA compliance
5. **Test all animations** - Some users prefer reduced motion
