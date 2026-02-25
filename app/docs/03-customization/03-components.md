---
title: Custom Components
description: Build custom React components
sidebar_position: 3
---

# Custom Components

Build custom React components for your documentation.

## Quick Start

### 1. Create Component

```tsx
// app/src/components/Endpoint.tsx
import { ReactNode } from 'react';

interface EndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  children: ReactNode;
}

export function Endpoint({ method, path, children }: EndpointProps) {
  const colors = {
    GET: 'text-green-500',
    POST: 'text-blue-500',
    PUT: 'text-yellow-500',
    DELETE: 'text-red-500',
  };

  return (
    <div className="border border-border rounded-lg p-4 my-4">
      <div className="flex items-center gap-3 mb-3">
        <span className={`font-mono font-bold ${colors[method]}`}>
          {method}
        </span>
        <code className="text-foreground">{path}</code>
      </div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
```

### 2. Export Component

```tsx
// app/src/components/index.ts
export { Endpoint } from './Endpoint';
// ... other exports
```

### 3. Use in MDX

```markdown
import { Endpoint } from '@/components';

<Endpoint method="GET" path="/api/users">
  Returns a list of all users.
</Endpoint>

<Endpoint method="POST" path="/api/users">
  Creates a new user.
</Endpoint>
```

## Component Examples

### Status Badge

```tsx
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'beta';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    online: 'bg-green-500/10 text-green-500 border-green-500/20',
    offline: 'bg-red-500/10 text-red-500 border-red-500/20',
    maintenance: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    beta: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="uppercase">{status}</span>
    </span>
  );
}
```

### Parameter Table

```tsx
interface Param {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ParamsTableProps {
  params: Param[];
}

export function ParamsTable({ params }: ParamsTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-2">Parameter</th>
          <th className="text-left py-2">Type</th>
          <th className="text-left py-2">Required</th>
          <th className="text-left py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param) => (
          <tr key={param.name} className="border-b border-border/50">
            <td className="py-2 font-mono">{param.name}</td>
            <td className="py-2 text-muted-foreground">{param.type}</td>
            <td className="py-2">
              {param.required ? (
                <span className="text-red-500">Required</span>
              ) : (
                <span className="text-muted-foreground">Optional</span>
              )}
            </td>
            <td className="py-2 text-muted-foreground">{param.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Code Tabs

```tsx
import { useState } from 'react';

interface CodeTabsProps {
  examples: {
    label: string;
    language: string;
    code: string;
  }[];
}

export function CodeTabs({ examples }: CodeTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex border-b border-border">
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === i 
                ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>
      <pre className="p-4 overflow-x-auto">
        <code>{examples[active].code}</code>
      </pre>
    </div>
  );
}
```

## Styling Components

### Using Tailwind

```tsx
export function StyledCard({ children }) {
  return (
    <div className="
      bg-card 
      border border-border 
      rounded-lg 
      p-6 
      shadow-sm
      hover:shadow-md
      transition-shadow
    ">
      {children}
    </div>
  );
}
```

### Theme-Aware

```tsx
import { useTheme } from './ThemeProvider';

export function ThemeCard({ children }) {
  const { resolvedTheme } = useTheme();
  
  return (
    <div className={`
      p-4 rounded-lg
      ${resolvedTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}
    `}>
      {children}
    </div>
  );
}
```

### CSS Modules

```tsx
// MyComponent.tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

```css
/* MyComponent.module.css */
.container {
  background: var(--theme-card);
  border: 1px solid var(--theme-border);
}
```

## Component Props

### TypeScript Interface

```tsx
interface ComponentProps {
  // Required
  title: string;
  
  // Optional
  description?: string;
  
  // With default
  variant?: 'default' | 'primary' | 'danger';
  
  // Children
  children: ReactNode;
  
  // Events
  onClick?: () => void;
  
  // Ref forwarding
  ref?: Ref<HTMLDivElement>;
}
```

## Best Practices

1. **Use TypeScript** - Type all props
2. **Forward refs** - When needed
3. **Support children** - For flexible content
4. **Theme-aware** - Respect dark mode
5. **Accessible** - ARIA labels, keyboard nav
6. **Document props** - JSDoc comments
7. **Test** - Especially edge cases
