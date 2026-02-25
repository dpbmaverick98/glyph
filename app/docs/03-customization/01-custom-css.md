---
title: Custom CSS
description: Customize styles with CSS
sidebar_position: 1
---

# Custom CSS

Override styles and add custom CSS to your documentation.

## Global Styles

Edit `app/src/index.css`:

```css
/* Add your custom styles */
.my-custom-class {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
}
```

## CSS Variables

Override theme variables:

```css
:root {
  --primary: 250 80% 60%;        /* Your primary color */
  --radius: 1rem;                 /* Your border radius */
}
```

## Component Overrides

### Custom Card Style

```css
.prose .card {
  border: 2px solid var(--theme-primary);
  box-shadow: 4px 4px 0 var(--theme-primary);
}
```

### Custom Code Blocks

```css
.prose pre {
  border-radius: 0;
  border: 1px solid var(--theme-border);
}

.prose code {
  font-family: 'Fira Code', monospace;
}
```

### Custom Callouts

```css
.callout-tip {
  border-left: 4px solid var(--theme-primary);
}

.callout-warning {
  border-left: 4px solid #f59e0b;
}
```

## Scoped Styles

Use in MDX with custom components:

```tsx
// MyStyledComponent.tsx
export function MyStyledComponent() {
  return (
    <div className="my-component">
      Styled content
    </div>
  );
}
```

```css
/* index.css */
.my-component {
  /* Your styles */
}
```

## Tailwind Customization

### Extend Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
};
```

### Use in Components

```tsx
<div className="bg-brand-500 text-white font-display">
  Custom styled content
</div>
```

## Animation Customization

### Custom Keyframes

```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out;
}
```

### Hover Effects

```css
.hover-lift {
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
```

## Print Styles

```css
@media print {
  .no-print {
    display: none;
  }
  
  body {
    background: white;
    color: black;
  }
}
```

## Responsive Styles

```css
/* Mobile first */
.my-component {
  padding: 1rem;
}

@media (min-width: 768px) {
  .my-component {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .my-component {
    padding: 3rem;
  }
}
```

## Best Practices

1. **Use CSS variables** - Easy theming
2. **Avoid !important** - Hard to override
3. **Mobile first** - Responsive design
4. **Test themes** - Works in all themes
5. **Keep it minimal** - Don't over-style
