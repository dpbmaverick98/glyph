---
title: Themes
description: Using and customizing themes
sidebar_position: 0
---

# Themes

Glyph comes with 8 built-in themes. Switch instantly or create your own.

## Built-in Themes

### Minimal
Clean, Apple-inspired design with blue accents.
- **Colors**: White, blue primary
- **Fonts**: Inter, JetBrains Mono
- **Radius**: 0.75rem
- **Best for**: Professional docs, APIs

### Pixel
Retro 8-bit gaming aesthetic.
- **Colors**: Dark background, green primary
- **Fonts**: Monospace
- **Radius**: 0 (sharp corners)
- **Best for**: Game dev, retro projects

### Glass
Glassmorphism with blur effects.
- **Colors**: Dark, purple primary, transparent cards
- **Fonts**: Inter
- **Radius**: 1rem
- **Best for**: Modern, premium feel

### Brutalist
Bold, raw Swiss design.
- **Colors**: White, black, red primary
- **Fonts**: Space Grotesk
- **Radius**: 0
- **Best for**: Bold statements, art projects

### Cyber
Dark, neon cyberpunk.
- **Colors**: Dark, cyan primary, magenta accent
- **Fonts**: Orbitron display
- **Radius**: 0.5rem
- **Best for**: Tech, sci-fi projects

### Terminal
Command-line hacker vibe.
- **Colors**: Black, green primary
- **Fonts**: JetBrains Mono everywhere
- **Radius**: 0.25rem
- **Best for**: Developer tools, CLI docs

### Halloween
Spooky orange and purple.
- **Colors**: Dark purple, orange primary
- **Fonts**: Creepster display
- **Radius**: 0.75rem
- **Best for**: Seasonal, fun projects

### Synthwave
Sunset gradients, retro future.
- **Colors**: Dark, pink primary, cyan accent
- **Fonts**: Orbitron display
- **Radius**: 0.5rem
- **Best for**: Creative projects, portfolios

## Switching Themes

### On Landing Page

Click any theme card on the landing page to preview instantly.

### In Documentation

Theme selection is saved in localStorage and applies across the site.

## Creating Custom Themes

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
    primary: '#your-color',
    background: '#your-bg',
    foreground: '#your-text',
    card: '#your-card',
    border: '#your-border',
    muted: '#your-muted',
    accent: '#your-accent',
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    display: 'Your Display Font, sans-serif',
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

### 3. Use Your Theme

It will appear in the theme switcher automatically.

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

## CSS Variables

Themes set CSS variables you can use:

```css
.my-component {
  background: var(--theme-background);
  color: var(--theme-foreground);
  border: 1px solid var(--theme-border);
}
```

## Dark Mode

All themes work in both light and dark modes. The theme system handles the switching automatically.

## Best Practices

1. **Test contrast** - Ensure text is readable
2. **Limit colors** - 3-4 colors max
3. **Consistent radius** - Match your brand
4. **Consider accessibility** - WCAG AA compliance
