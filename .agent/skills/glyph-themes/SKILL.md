---
name: glyph-themes
description: Guide for implementing, customizing, and creating themes in Glyph. Use when users want to add new themes, customize existing ones, or understand how the theme system works.
---

# Glyph Theme System Guide

## Overview

Glyph has a powerful theme system with 8 built-in themes:

| Theme | Style | Best For |
|-------|-------|----------|
| **Minimal** | Clean, Apple-inspired | Professional docs, SaaS |
| **Pixel** | 8-bit retro gaming | Indie games, creative projects |
| **Glass** | Glassmorphism | Modern tech, portfolios |
| **Brutalist** | Bold, raw | Design agencies, art projects |
| **Cyber** | Neon cyberpunk | Dev tools, crypto, sci-fi |
| **Terminal** | CRT terminal | CLI tools, developer docs |
| **Halloween** | Spooky | Seasonal, fun projects |
| **Synthwave** | Retro future | Music, creative coding |

## How Themes Work

### Architecture

```
app/src/themes/
├── registry.ts              # Theme definitions
├── ThemePresetProvider.tsx  # Theme context & state
├── animations.ts            # Cursor/background effects
├── useThemeStyles.ts        # Dynamic CSS loading
├── minimal/                 # (optional) Theme-specific components
├── pixel/
│   └── theme.css           # Theme-specific styles
├── cyber/
│   └── theme.css
└── terminal/
    └── theme.css

public/themes/              # Production CSS files
├── minimal.css
├── pixel.css
├── cyber.css
└── terminal.css
```

### Theme Interface

```typescript
interface Theme {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Short description
  preview: string;               // Preview image path
  colors: {
    primary: string;             // Main brand color
    background: string;          // Page background
    foreground: string;          // Main text
    card: string;                // Card backgrounds
    border: string;              // Borders
    muted: string;               // Secondary text
    accent: string;              // Success/highlight
  };
  fonts: {
    sans: string;                // Body text font
    mono: string;                // Code font
    display?: string;            // Headlines (optional)
  };
  radius: string;                // Border radius (0rem, 0.5rem, 1rem)
  animations: {
    pageLoad: 'fade' | 'slide' | 'scale' | 'none';
    scrollReveal: boolean;       // Animate on scroll
    hoverScale: boolean;         // Scale on hover
    cursorEffect?: 'none' | 'glow' | 'trail' | 'blink';
  };
}
```

## Creating a Custom Theme

### Step 1: Define the Theme

Add to `app/src/themes/registry.ts`:

```typescript
export const themes: Theme[] = [
  // ... existing themes
  
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep sea blues and teals',
    preview: '/themes/ocean-preview.png',
    colors: {
      primary: '#0066cc',
      background: '#001a33',
      foreground: '#e6f2ff',
      card: '#003366',
      border: '#004080',
      muted: '#6699cc',
      accent: '#00cccc',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Playfair Display, serif',  // Optional
    },
    radius: '0.5rem',
    animations: {
      pageLoad: 'fade',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'glow',
    },
  },
];
```

### Step 2: Create Theme CSS (Optional)

For advanced styling, create `app/src/themes/ocean/theme.css`:

```css
/* Ocean Theme - Deep sea aesthetic */

[data-theme="ocean"] {
  --ocean-glow: 0 0 20px rgba(0, 102, 204, 0.5);
}

/* Animated wave background */
[data-theme="ocean"] body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 80%, rgba(0, 204, 204, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(0, 102, 204, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
  animation: oceanPulse 8s ease-in-out infinite;
}

@keyframes oceanPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Glowing headings */
[data-theme="ocean"] h1,
[data-theme="ocean"] h2 {
  text-shadow: var(--ocean-glow);
}

/* Bubbly buttons */
[data-theme="ocean"] button {
  border-radius: 2rem;
  box-shadow: 
    0 4px 15px rgba(0, 102, 204, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Step 3: Copy CSS to Public Folder

```bash
cp app/src/themes/ocean/theme.css app/public/themes/ocean.css
```

### Step 4: Test

```bash
npm run dev
# Switch to your theme on the landing page
```

## Customizing Existing Themes

### Override CSS Variables

Edit `app/src/index.css`:

```css
/* Override Minimal theme primary color */
[data-theme="minimal"] {
  --theme-primary: #ff6b6b !important;
}

/* Make all themes have rounder corners */
[data-theme] {
  --theme-radius: 1rem !important;
}
```

### Modify Theme Definition

Edit `app/src/themes/registry.ts`:

```typescript
{
  id: 'minimal',
  name: 'Minimal',
  // Change the primary color
  colors: {
    ...minimalTheme.colors,
    primary: '#your-color-here',
  },
  // ... rest of theme
}
```

## Animation Effects

### Built-in Effects

Enable in your theme's `animations`:

```typescript
animations: {
  cursorEffect: 'glow',    // Soft glow follows cursor
  // OR
  cursorEffect: 'trail',   // Dots trail behind cursor
  // OR
  cursorEffect: 'blink',   // Terminal-style block cursor
  // OR
  cursorEffect: 'none',    // No cursor effect
}
```

### Custom Background Effects

Add to your theme CSS:

```css
/* Floating particles */
[data-theme="my-theme"] body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,...');
  animation: float 20s linear infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}
```

## Best Practices

### 1. Color Contrast

Ensure WCAG AA compliance:

```typescript
// Good - High contrast
colors: {
  background: '#0a0a0a',    // Dark
  foreground: '#ffffff',     // Light text
  primary: '#00f0ff',        // Bright accent
}

// Bad - Low contrast
colors: {
  background: '#333333',
  foreground: '#444444',     // Too similar!
}
```

### 2. Font Loading

Use Google Fonts with `display=swap`:

```typescript
fonts: {
  display: 'Playfair Display:400,700&display=swap',
}
```

Add to `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

### 3. Mobile Performance

Disable heavy effects on mobile:

```css
@media (max-width: 768px) {
  [data-theme="my-theme"] body::before {
    display: none;  /* Disable animated background */
  }
}
```

### 4. Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  [data-theme="my-theme"] * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Theme Showcase Examples

### Terminal Theme Techniques

```css
/* CRT flicker effect */
[data-theme="terminal"] body::after {
  animation: flicker 0.15s infinite;
}

/* Scanlines */
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.3) 2px,
  rgba(0, 0, 0, 0.3) 4px
);

/* Monospace everything */
[data-theme="terminal"] * {
  font-family: 'JetBrains Mono', monospace;
}
```

### Pixel Theme Techniques

```css
/* Pixelated rendering */
[data-theme="pixel"] * {
  image-rendering: pixelated;
}

/* 3D button press */
[data-theme="pixel"] button {
  box-shadow: 4px 4px 0px #000;
  transform: translate(0, 0);
}
[data-theme="pixel"] button:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px #000;
}
```

### Cyber Theme Techniques

```css
/* Neon glow */
[data-theme="cyber"] h1 {
  text-shadow: 
    0 0 5px var(--theme-primary),
    0 0 10px var(--theme-primary),
    0 0 20px var(--theme-primary);
}

/* Animated grid */
background-image: 
  linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px);
background-size: 50px 50px;
animation: gridMove 20s linear infinite;
```

## Troubleshooting

### Theme not showing?

1. Check `registry.ts` - theme added to `themes` array?
2. Check CSS path - file in `public/themes/{id}.css`?
3. Check browser console - any 404 errors?

### CSS not applying?

1. Verify `[data-theme="your-id"]` selector matches theme ID
2. Check CSS specificity - use `!important` if needed
3. Ensure no syntax errors in CSS file

### Fonts not loading?

1. Add Google Fonts link to `index.html`
2. Check font name matches exactly
3. Use `display=swap` for faster loading

## Sharing Your Theme

1. **Export theme definition** - Share the theme object from `registry.ts`
2. **Include CSS file** - Share the `theme.css` if you have one
3. **Add preview image** - Create a 1200x630 PNG preview
4. **Submit PR** - Contribute back to Glyph!

## Next Steps

- Start with an existing theme as base
- Modify colors first, then add custom CSS
- Test on mobile and with reduced motion
- Share your creation!
