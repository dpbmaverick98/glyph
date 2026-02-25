---
title: Custom Components
description: Create your own React components
sidebar_position: 7
---

# Custom Components

Create your own React components for documentation.

## Creating a Component

### 1. Create the File

```bash
touch app/src/components/MyComponent.tsx
```

### 2. Write the Component

```tsx
// app/src/components/MyComponent.tsx
import { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children: ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="border border-border rounded-lg p-4 my-4">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
```

### 3. Export from Index

```tsx
// app/src/components/index.ts
export { MyComponent } from './MyComponent';
// ... other exports
```

### 4. Use in MDX

```markdown
import { MyComponent } from '@/components';

<MyComponent title="My Title">
  This is my custom component!
</MyComponent>
```

## Example Components

### Status Badge

```tsx
// StatusBadge.tsx
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    maintenance: 'bg-yellow-500'
  };

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm`}>
      <span className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
```

### Endpoint Card

```tsx
// EndpointCard.tsx
interface EndpointCardProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
}

export function EndpointCard({ method, path, description }: EndpointCardProps) {
  const methodColors = {
    GET: 'text-green-500',
    POST: 'text-blue-500',
    PUT: 'text-yellow-500',
    DELETE: 'text-red-500'
  };

  return (
    <div className="border border-border rounded-lg p-4 my-4">
      <div className="flex items-center gap-3 mb-2">
        <span className={`font-mono font-bold ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-foreground">{path}</code>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

### YouTube Embed

```tsx
// YouTubeEmbed.tsx
interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video my-4">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

## Styling Components

### Using Tailwind

```tsx
export function StyledComponent() {
  return (
    <div className="
      bg-card 
      border border-border 
      rounded-lg 
      p-4 
      hover:border-primary 
      transition-colors
    ">
      Content
    </div>
  );
}
```

### Using CSS Variables

```tsx
export function ThemedComponent() {
  return (
    <div style={{
      background: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      borderRadius: 'var(--radius)',
      padding: '1rem'
    }}>
      Content
    </div>
  );
}
```

### Theme-Aware Components

```tsx
import { useTheme } from '@/components';

export function ThemeAwareComponent() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div className={resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'}>
      Content adapts to theme
    </div>
  );
}
```

## Best Practices

1. **TypeScript** - Always use TypeScript for props
2. **Export properly** - Export from components/index.ts
3. **Use Tailwind** - Consistent with rest of app
4. **Theme-aware** - Respect dark mode
5. **Keep it simple** - Components should do one thing
6. **Document props** - Add JSDoc comments

## Sharing Components

Publish your components:

1. Create a gist
2. Submit to Glyph examples
3. Share in Discord
