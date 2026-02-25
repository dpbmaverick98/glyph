---
name: geist-typography
description: Guide for using Geist fonts (Sans, Mono, Pixel) playfully in Glyph Docs. Use when users want to create visually interesting typography, special headers, or branded text elements.
---

# Geist Typography Playbook

## Available Fonts

Glyph Docs includes three Geist font variants:

| Font | CSS Variable | Usage |
|------|--------------|-------|
| **Geist Sans** | `--font-sans` | Body text, headings, UI |
| **Geist Mono** | `--font-mono` | Code, inline code, monospace |
| **Geist Pixel** | `--font-pixel` | Special display, retro aesthetic |

## CSS Classes

### Basic Usage

```html
<!-- Body text (default) -->
<p>Regular paragraph uses Geist Sans</p>

<!-- Monospace -->
<code class="font-mono">const example = 'code'</code>

<!-- Pixel font -->
<span class="font-pixel">RETRO STYLE</span>
```

### Typography Utilities

```html
<!-- Display text -->
<h1 class="text-display">Large Display</h1>

<!-- Title -->
<h2 class="text-title">Section Title</h2>

<!-- Body -->
<p class="text-body">Body paragraph</p>

<!-- Small text -->
<span class="text-small">Caption or note</span>
```

## Playful Patterns

### 1. Mixed Typography Headers

Create visual hierarchy with font mixing:

```html
<h1>
  <span class="font-sans">Build with</span>
  <span class="font-pixel text-primary">GLYPH</span>
</h1>
```

### 2. Code Blocks with Style

Code blocks automatically use Geist Mono with terminal-style header:

````markdown
```bash
npm install glyph
```
````

Renders with:
- Three-dot window controls (red, yellow, green)
- Language label
- Copy button
- Geist Mono font

### 3. Pixel Art Headers

Use for special callouts or retro-themed sections:

```html
<div class="bg-primary/10 p-6 rounded-lg">
  <h3 class="font-pixel text-primary text-xl mb-2">COMING SOON</h3>
  <p>This feature is in development</p>
</div>
```

### 4. Keyboard Shortcuts

Use Geist Mono for keyboard combinations:

```html
<p>Press <kbd class="font-mono bg-secondary px-2 py-1 rounded">Cmd</kbd> + <kbd class="font-mono bg-secondary px-2 py-1 rounded">K</kbd> to search</p>
```

### 5. Status Badges with Pixel Font

```html
<span class="font-pixel badge-coming-soon">BETA</span>
```

## Font Feature Settings

Geist fonts include OpenType features:

```css
/* Enable stylistic alternates */
.geist-alt {
  font-feature-settings: "ss01" 1, "ss02" 1;
}

/* Enable contextual alternates */
.geist-context {
  font-feature-settings: "calt" 1;
}
```

## Custom Components

### Pixel Button

```html
<button class="font-pixel bg-primary text-primary-foreground px-4 py-2 rounded uppercase tracking-wider">
  Get Started
</button>
```

### Monospace Data Display

```html
<div class="font-mono bg-secondary p-4 rounded-lg">
  <div class="flex justify-between">
    <span class="text-muted-foreground">Version</span>
    <span>v2.1.0</span>
  </div>
  <div class="flex justify-between">
    <span class="text-muted-foreground">Build</span>
    <span>#8842</span>
  </div>
</div>
```

### Gradient Text with Tight Tracking

```html
<h1 class="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
  Beautiful Documentation
</h1>
```

## Markdown Shortcuts

In your docs, these patterns auto-apply fonts:

- `` `inline code` `` → Geist Mono
- ``` code blocks ``` → Geist Mono with syntax highlighting
- Regular text → Geist Sans
- Use HTML for pixel font: `<span class="font-pixel">TEXT</span>`

## Best Practices

1. **Don't overuse Pixel font** - Save it for special moments
2. **Maintain hierarchy** - Use font weight and size, not just font family
3. **Consistent code styling** - Always use Geist Mono for code
4. **Tight tracking on headers** - The -0.03em tracking is part of Geist's character

## Examples in the Wild

### Hero Section

```html
<div class="text-center py-20">
  <h1 class="text-6xl font-bold tracking-tight mb-4">
    <span class="font-pixel text-primary">GLYPH</span>
    <span class="font-sans">Docs</span>
  </h1>
  <p class="text-xl text-muted-foreground">
    Documentation that <span class="font-mono">just works</span>
  </p>
</div>
```

### Feature Card

```html
<div class="docs-card">
  <div class="font-mono text-primary text-sm mb-2">01</div>
  <h3 class="text-title mb-2">Quick Setup</h3>
  <p class="text-body">Get started in minutes with our CLI</p>
  <code class="font-mono text-small bg-secondary px-2 py-1 rounded">npx create-glyph-docs</code>
</div>
```
