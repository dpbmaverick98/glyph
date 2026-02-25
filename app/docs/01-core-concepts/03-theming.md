---
title: Theming
description: Customize your documentation theme
sidebar_position: 3
---

# Theming

Customize colors, fonts, and animations.

## Built-in Themes

Glyph includes 8 themes:

| Theme | Style | Best For |
|-------|-------|----------|
| Minimal | Clean, professional | APIs, enterprise |
| Pixel | Retro 8-bit | Games, fun projects |
| Glass | Glassmorphism | Premium products |
| Brutalist | Bold, raw | Art, statements |
| Cyber | Neon cyberpunk | Tech, sci-fi |
| Terminal | Command-line | Developer tools |
| Halloween | Spooky | Seasonal, creative |
| Synthwave | Retro future | Portfolios |

## Switching Themes

Click any theme on the landing page to preview. Your choice is saved automatically.

## Customizing Themes

### CSS Variables

Override theme variables in `index.css`:

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

### Creating a Custom Theme

1. Create theme file:

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

2. Register in `registry.ts`:

```ts
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
| `accent` | Success/highlight |

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

## Dark Mode

All themes work in both light and dark modes. The theme system handles switching automatically.

## Best Practices

1. **Test contrast** - Ensure text is readable
2. **Limit colors** - 3-4 colors max
3. **Consistent radius** - Match your brand
4. **Consider accessibility** - WCAG AA compliance

## Next Steps

<CardGroup cols={2}>
  <Card title="Custom CSS" icon="code" href="/customization/custom-css">
    Override styles with CSS
  </Card>
  
  <Card title="Custom Fonts" icon="type" href="/customization/fonts">
    Use custom fonts
  </Card>
</CardGroup>
