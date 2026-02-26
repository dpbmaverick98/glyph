---
name: add-components
description: Guide for adding new custom components to Glyph. Use when users want to extend the documentation with custom React components, interactive elements, or special visual components.
---

# Adding Custom Components

## Component Location

Add new components to `app/src/components/`:

```
app/src/components/
  MyComponent.tsx      # Your new component
  index.ts             # Export from here
```

## Basic Component Template

```tsx
import type { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
  title?: string;
}

export function MyComponent({ children, title }: MyComponentProps) {
  return (
    <div 
      className="rounded-lg border p-6 my-4"
      style={{ 
        background: 'var(--theme-card)',
        borderColor: 'var(--theme-border)'
      }}
    >
      {title && (
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--theme-foreground)' }}
        >
          {title}
        </h3>
      )}
      <div style={{ color: 'var(--theme-muted)' }}>{children}</div>
    </div>
  );
}
```

## Export Component

Add to `app/src/components/index.ts`:

```ts
export { MyComponent } from './MyComponent';
```

## Using in MDX

```mdx
import { MyComponent } from '@/components';

<MyComponent title="Hello">
  Content here
</MyComponent>
```

## Built-in Components Reference

Glyph includes these components you can use or extend:

### Layout
- `Card`, `CardGroup` - Feature cards and grids
- `Accordion`, `AccordionGroup` - Collapsible sections
- `Tabs`, `TabGroup`, `TabPanel` - Tabbed content
- `Steps`, `Step` - Numbered instructions
- `Frame` - Screenshot/code frame
- `Timeline`, `TimelineItem` - Vertical timeline
- `FileTree`, `FileTreeFolder`, `FileTreeFile` - File tree

### Content
- `Callout` - Tip/warning/info boxes
- `Badge` - Status badges
- `Tooltip` - Hover tooltips
- `TerminalWindow`, `TerminalCommand` - Terminal blocks
- `Mermaid` - Diagrams

### Styling with Theme Variables

Use CSS variables for theme-aware styling:

```tsx
<div style={{ 
  background: 'var(--theme-card)',
  color: 'var(--theme-foreground)',
  borderColor: 'var(--theme-border)'
}}>
```

### Using Theme Hook

```tsx
import { useThemePreset } from '@/themes/ThemePresetProvider';

export function ThemeAwareComponent() {
  const { theme } = useThemePreset();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Theme-aware content
    </div>
  );
}
```

## Component Patterns

### Card with Icon
```tsx
import { LucideIcon } from 'lucide-react';

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function IconCard({ icon: Icon, title, description }: IconCardProps) {
  return (
    <div 
      className="rounded-lg border p-6"
      style={{ 
        background: 'var(--theme-card)',
        borderColor: 'var(--theme-border)'
      }}
    >
      <Icon 
        className="w-8 h-8 mb-4" 
        style={{ color: 'var(--theme-primary)' }} 
      />
      <h3 
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--theme-foreground)' }}
      >
        {title}
      </h3>
      <p style={{ color: 'var(--theme-muted)' }}>{description}</p>
    </div>
  );
}
```

### Interactive Component
```tsx
import { useState } from 'react';

export function ToggleExample() {
  const [active, setActive] = useState(false);
  
  return (
    <button 
      onClick={() => setActive(!active)}
      className="px-4 py-2 rounded transition-colors"
      style={{
        background: active ? 'var(--theme-primary)' : 'var(--theme-card)',
        color: active ? 'var(--theme-background)' : 'var(--theme-foreground)'
      }}
    >
      {active ? 'Active' : 'Inactive'}
    </button>
  );
}
```

## Best Practices

1. **TypeScript** - Always use TypeScript for props
2. **Theme-aware** - Use theme variables, not hardcoded colors
3. **Export properly** - Add to components/index.ts
4. **Test** - Test in all themes
5. **Document** - Add JSDoc comments
