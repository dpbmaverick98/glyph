---
name: add-components
description: Guide for adding new custom components to Obul Docs. Use when users want to extend the documentation with custom React components, interactive elements, or special visual components.
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
    <div className="rounded-lg border border-border bg-card p-6">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
```

## Using in Markdown

Components can be used in MDX files (if configured) or create shortcodes:

1. **Export from components/index.ts**:
```ts
export { MyComponent } from './MyComponent';
```

2. **Import in your doc** (if using MDX):
```mdx
import { MyComponent } from '@/components';

<MyComponent title="Hello">
  Content here
</MyComponent>
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
    <div className="docs-card">
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="text-title mb-2">{title}</h3>
      <p className="text-body text-muted-foreground">{description}</p>
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
      className={`px-4 py-2 rounded transition-colors ${
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </button>
  );
}
```

## Styling

Use Tailwind classes:
- `bg-card`, `bg-secondary` - Background colors
- `text-foreground`, `text-muted-foreground` - Text colors
- `border-border` - Border color
- `rounded-lg`, `rounded-xl` - Border radius
- `p-4`, `px-6`, `py-2` - Padding

## Adding to Marked Renderer

For automatic transformation of markdown syntax:

```ts
// In lib/marked.ts
const renderer = {
  html(text: string) {
    // Transform :::custom syntax
    if (text.startsWith(':::custom')) {
      return '<div class="custom-component">';
    }
    return false;
  }
};
```
