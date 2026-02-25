---
title: Custom Fonts
description: Use custom fonts in your documentation
sidebar_position: 2
---

# Custom Fonts

Use Google Fonts, Adobe Fonts, or custom font files.

## Google Fonts

### Method 1: HTML Link

Edit `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

### Method 2: @import in CSS

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Use the Font

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
}
```

## Fontsource (Recommended)

Self-host fonts with npm:

```bash
npm install @fontsource/inter @fontsource/jetbrains-mono
```

Import in `main.tsx`:

```tsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
```

## Custom Font Files

### 1. Add Font Files

Place in `public/fonts/`:

```
public/
└── fonts/
    ├── CustomFont-Regular.woff2
    └── CustomFont-Bold.woff2
```

### 2. Define @font-face

```css
/* index.css */
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/CustomFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/CustomFont-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 3. Use the Font

```css
:root {
  --font-sans: 'Custom Font', system-ui, sans-serif;
}
```

## Adobe Fonts (Typekit)

### 1. Add Script

Edit `index.html`:

```html
<link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css">
```

### 2. Use in CSS

```css
:root {
  --font-sans: 'adobe-clean', sans-serif;
}
```

## Variable Fonts

### Load Variable Font

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

### Use Variable Font

```css
body {
  font-family: 'Inter Variable', sans-serif;
  font-variation-settings: 'wght' 500;
}
```

## Font Optimization

### Preload Critical Fonts

```html
<link 
  rel="preload" 
  href="/fonts/Inter-Regular.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
>
```

### Font Display

Always use `font-display: swap`:

```css
@font-face {
  font-family: 'My Font';
  src: url(...);
  font-display: swap; /* Show fallback immediately */
}
```

## Theme Fonts

Set fonts in your theme:

```ts
// themes/my-theme.ts
export const myTheme: Theme = {
  // ...
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    display: 'Space Grotesk, sans-serif',
  },
};
```

## Best Practices

1. **Limit font weights** - Each weight is a download
2. **Use font-display: swap** - Prevent invisible text
3. **Preload critical fonts** - Faster first paint
4. **Self-host when possible** - Better privacy, faster
5. **Test fallbacks** - Ensure system fonts work
6. **Consider variable fonts** - One file, many weights
