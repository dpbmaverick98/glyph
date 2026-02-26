---
title: Components Overview
description: Built-in components for rich documentation
sidebar_position: 0
---

# Components Overview

Glyph provides 20+ built-in components to make your documentation more engaging and interactive.

## Layout Components

| Component | Purpose |
|-----------|---------|
| `Card` | Feature highlights, links |
| `CardGroup` | Grid of cards |
| `Accordion` | Collapsible content |
| `Tabs` | Tabbed content |
| `Steps` | Numbered instructions |
| `Timeline` | Vertical timeline |
| `FileTree` | Directory structure |

## Content Components

| Component | Purpose |
|-----------|---------|
| `Callout` | Tips, warnings, info |
| `Frame` | Image wrapper with caption |
| `Badge` | Status badges |
| `Tooltip` | Hover tooltips |
| `Mermaid` | Diagrams and flowcharts |

## Code Components

| Component | Purpose |
|-----------|---------|
| `CodeBlock` | Enhanced code blocks |
| `TerminalWindow` | Terminal-style output |
| `Playground` | Interactive API playground |

## Using Components

### In Markdown

Most components work via special syntax:

```markdown
:::tip
This creates a tip callout
:::

<Card title="Feature" icon="zap">
  Card content here
</Card>
```

### In MDX

Full React component support:

```markdown
import { Callout, Card, Playground } from '@/components';

<Callout type="warning">
  Be careful!
</Callout>

<Card 
  title="API Reference" 
  icon="code"
  href="/reference/api"
>
  View the API docs
</Card>

<Playground 
  config={{
    baseUrl: 'https://api.example.com',
    endpoints: [...]
  }} 
/>
```

## Component Props

Most components accept:

- `className` - Additional CSS classes
- `style` - Inline styles
- Theme-aware styling automatically applied

## Icons

Components use Lucide icons. Available icons:

- `zap` - Lightning bolt
- `code` - Code brackets
- `book` - Book open
- `info` - Info circle
- `warning` - Alert triangle
- `check` - Checkmark
- `star` - Star
- `heart` - Heart
- And 1000+ more from Lucide

## Next Steps

Explore each component in detail:

<CardGroup cols={2}>
  <Card title="Callout" icon="message-square" href="/components/callout">
    Tips, warnings, and info boxes
  </Card>
  
  <Card title="Card & CardGroup" icon="layout-grid" href="/components/card">
    Feature cards and grids
  </Card>
  
  <Card title="Accordion" icon="chevrons-up-down" href="/components/accordion">
    Collapsible content sections
  </Card>
  
  <Card title="Tabs" icon="folder-tree" href="/components/tabs">
    Tabbed content
  </Card>
  
  <Card title="Steps" icon="list-ordered" href="/components/steps">
    Numbered instructions
  </Card>
  
  <Card title="Playground" icon="play" href="/components/playground">
    Interactive API testing
  </Card>
</CardGroup>
