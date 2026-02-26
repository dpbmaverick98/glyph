---
name: geist-typography
description: Guide for using fonts in Glyph. Use when users want to create visually interesting typography, special headers, or branded text elements.
---

# Typography Guide

## Available Fonts

Glyph uses Inter and JetBrains Mono by default, with theme-specific display fonts:

| Font | CSS Variable | Usage |
|------|--------------|-------|
| **Inter** | `--font-sans` | Body text, headings, UI |
| **JetBrains Mono** | `--font-mono` | Code, inline code, monospace |
| **Theme Display** | `--font-display` | Special display (theme-specific) |

## CSS Classes

### Basic Usage

```html
<!-- Body text (default) -->
<p>Regular paragraph uses Inter</p>

<!-- Monospace -->
<code class="font-mono">const example = 'code'</code>

<!-- Display font (theme-specific) -->
<span class="font-display">SPECIAL HEADER</span>
```

### Theme-Specific Display Fonts

Each theme has its own display font:

| Theme | Display Font |
|-------|--------------|
| Minimal | Inter (same as body) |
| Pixel | Press Start 2P |
| Glass | Inter |
| Brutalist | Space Grotesk |
| Cyber | Orbitron |
| Terminal | JetBrains Mono |
| Halloween | Creepster |
| Synthwave | Orbitron |

## Playful Patterns

### 1. Mixed Typography Headers

Create visual hierarchy with font mixing:

```html
<h1>
  <span class="font-sans">Build with</span>
  <span class="font-display text-primary">GLYPH</span>
</h1>
```

### 2. Code Blocks with Style

Code blocks automatically use JetBrains Mono with terminal-style header:

````markdown
```bash
npm install glyph
```
````

Renders with:
- Three-dot window controls (red, yellow, green)
- Language label
- Copy button
- JetBrains Mono font

### 3. Theme-Aware Display Text

Use display font for special callouts:

```html
<div class="bg-primary/10 p-6 rounded-lg">
  <h3 class="font-display text-primary text-xl mb-2">COMING SOON</h3>
  <p>This feature is in development</p>
</div>
```

### 4. Keyboard Shortcuts

Use JetBrains Mono for keyboard combinations:

```html
<p>Press <kbd class="font-mono bg-secondary px-2 py-1 rounded">Cmd</kbd> + <kbd class="font-mono bg-secondary px-2 py-1 rounded">K</kbd> to search</p>
```

### 5. Status Badges

```html
<span class="font-mono badge-coming-soon">BETA</span>
```

## Custom Fonts

### Adding Google Fonts

Edit `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Using Fontsource

```bash
npm install @fontsource/your-font
```

Import in `main.tsx`:

```tsx
import '@fontsource/your-font/400.css';
```

### Custom Theme Font

Create a custom theme with your font:

```ts
export const myTheme: Theme = {
  // ...
  fonts: {
    sans: 'Your Font, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    display: 'Your Display Font, sans-serif',
  },
};
```

## Markdown Shortcuts

In your docs, these patterns auto-apply fonts:

- `` `inline code` `` → JetBrains Mono
- ``` code blocks ``` → JetBrains Mono with syntax highlighting
- Regular text → Inter
- Use HTML for display font: `<span class="font-display">TEXT</span>`

## Best Practices

1. **Don't overuse display font** - Save it for special moments
2. **Maintain hierarchy** - Use font weight and size, not just font family
3. **Consistent code styling** - Always use JetBrains Mono for code
4. **Test all themes** - Display fonts vary by theme
