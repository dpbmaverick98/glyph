---
name: landing-page
description: Guide for creating landing pages in Glyph. Use when users want to create a custom homepage or customize their documentation landing experience.
---

# Landing Page Guide

## Overview

Glyph has a **standalone landing page** that is completely separate from the documentation. The landing page:
- Has no sidebar or docs header
- Shows theme switcher with 8 themes
- Has its own navigation
- Links to documentation with "Get Started" button

## How It Works

The landing page is a React component (`LandingLayout.tsx`) that renders when users visit the root URL. Clicking "Documentation" or any doc link switches to the docs layout (with sidebar).

## Landing Page Sections

### Hero Section
- Animated headline
- Theme switcher (8 theme cards)
- "Get Started" and "View on GitHub" buttons

### Quickstart Preview
- Terminal-style code block
- One-click deploy buttons
- Feature checklist

### Features Grid
- 6 feature cards with icons
- Hover animations

### Comparison Table
- Glyph vs Mintlify vs Docusaurus

### CTA Section
- Final call-to-action
- Social proof

### Footer
- Links and copyright

## Customizing the Landing Page

### Edit LandingLayout.tsx

The landing page content is in `app/src/components/LandingLayout.tsx`:

```tsx
// Change headline
<h1>
  Documentation that
  <span style={{ color: 'var(--theme-primary)' }}>looks incredible.</span>
</h1>

// Change features
<FeatureCard
  icon={Palette}
  title="7 Beautiful Themes"
  description="From minimal to cyberpunk"
/>
```

### Change Themes

Edit `app/src/themes/registry.ts` to add/remove themes.

### Change Colors

The landing page uses theme CSS variables:

```css
--theme-primary      /* Primary color */
--theme-background   /* Page background */
--theme-foreground   /* Text color */
--theme-card         /* Card background */
--theme-border       /* Borders */
--theme-muted        /* Secondary text */
--theme-accent       /* Success/highlight */
```

## Theme Switcher

The landing page includes an interactive theme switcher:

```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
  {availableThemes.map((t) => (
    <ThemeCard
      key={t.id}
      theme={t}
      isActive={theme.id === t.id}
      onClick={() => setTheme(t.id)}
    />
  ))}
</div>
```

Users can click any theme to preview it instantly.

## Adding Content

### Feature Cards

```tsx
<FeatureCard
  icon={YourIcon}
  title="Feature Name"
  description="Feature description"
/>
```

### Code Preview

```tsx
<CodePreview />  // Shows npm create command
```

### Comparison Table

Edit the comparison table in LandingLayout.tsx:

```tsx
{[
  ['Feature', true, false, false],
  ['Self-hosted', true, false, true],
  // ...
].map(([feature, glyph, mintlify, docusaurus], i) => (
  // ...
))}
```

## Best Practices

1. **Keep it simple** - Landing page should be scannable
2. **Highlight themes** - Theme switcher is a key differentiator
3. **Clear CTA** - "Get Started" should be prominent
4. **Social proof** - GitHub stars, testimonials
5. **Mobile-friendly** - Test on all devices

## Troubleshooting

### Landing page not showing
- Check that `LandingLayout.tsx` exists
- Verify `App.tsx` imports and uses it
- Check browser console for errors

### Theme switcher not working
- Verify `ThemePresetProvider` wraps the app
- Check that themes are registered in `registry.ts`

### Styles not applying
- Ensure CSS variables are set in `index.css`
- Check that `data-theme` attribute is on root element
