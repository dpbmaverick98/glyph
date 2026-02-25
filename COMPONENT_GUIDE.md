# Obul Docs Framework - Component Guide

This guide covers all the components and features available in the Obul documentation framework.

## Table of Contents

- [Getting Started](#getting-started)
- [Components](#components)
  - [Callout](#callout)
  - [Accordion](#accordion)
  - [Card](#card)
  - [Tabs](#tabs)
- [Theming](#theming)
- [Writing Content](#writing-content)

---

## Getting Started

### File Structure

```
app/
├── docs/                    # Markdown documentation files
│   ├── docs.json           # Sidebar configuration
│   ├── core/               # Core concept docs
│   ├── getting-started/    # Getting started guides
│   ├── reference/          # API reference
│   └── products/           # Product docs
├── src/
│   ├── components/         # React components
│   │   ├── Callout.tsx
│   │   ├── Accordion.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   ├── Hero.tsx
│   │   ├── Search.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── App.tsx
│   └── index.css
└── public/
    └── images/             # Static images
```

### Adding a New Doc

1. Create a `.md` file in the appropriate folder under `app/docs/`
2. Add frontmatter at the top:

```markdown
---
title: Your Page Title
description: Brief description for SEO and cards
sidebar_position: 1
---

# Your Content Here
```

3. Add to `docs.json`:

```json
{
  "group": "Your Group",
  "items": [
    {
      "label": "Your Page",
      "slug": "folder/your-file",
      "file": "folder/your-file.md"
    }
  ]
}
```

---

## Components

### Callout

Use callouts to highlight important information.

**Variants:** `info` | `warning` | `success` | `error` | `tip`

```jsx
import { Callout } from './components';

// Info callout (default)
<Callout>
  This is some important information.
</Callout>

// With title
<Callout title="Pro Tip" type="tip">
  Use scoped API keys for different agents.
</Callout>

// Warning
<Callout title="Warning" type="warning">
  Keep your API keys secure.
</Callout>

// Success
<Callout title="Success" type="success">
  Your API key has been created.
</Callout>

// Error
<Callout title="Error" type="error">
  Invalid API key provided.
</Callout>
```

---

### Accordion

Use accordions for collapsible content sections.

```jsx
import { Accordion, AccordionGroup } from './components';

// Single accordion
<Accordion title="Click to expand">
  Hidden content goes here.
</Accordion>

// Group of accordions
<AccordionGroup>
  <Accordion title="Getting Started">
    Content for getting started...
  </Accordion>
  
  <Accordion title="Advanced Features">
    Content for advanced features...
  </Accordion>
  
  <Accordion title="Troubleshooting">
    Common issues and solutions...
  </Accordion>
</AccordionGroup>

// Default open
<Accordion title="Expanded by default" defaultOpen={true}>
  This starts expanded.
</Accordion>
```

---

### Card

Use cards for feature grids, links, or content blocks.

```jsx
import { Card, CardGroup } from './components';
import { Zap, Shield, Globe } from 'lucide-react';

// Single card
<Card 
  title="Quickstart"
  description="Get up and running in 5 minutes."
  icon={<Zap className="w-5 h-5 text-primary" />}
>
  Additional content here...
</Card>

// Card with link
<Card 
  title="API Reference"
  description="Complete API documentation."
  href="/reference/api"
  icon={<Shield className="w-5 h-5 text-primary" />}
/>

// Card group (2 columns)
<CardGroup cols={2}>
  <Card title="Feature 1" description="Description 1" />
  <Card title="Feature 2" description="Description 2" />
</CardGroup>

// Card group (3 columns)
<CardGroup cols={3}>
  <Card title="A" description="..." />
  <Card title="B" description="..." />
  <Card title="C" description="..." />
</CardGroup>
```

---

### Tabs

Use tabs for organizing content into sections.

```jsx
import { Tabs, TabGroup, TabPanel } from './components';
import { useState } from 'react';

function Example() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <Tabs>
      <TabGroup 
        labels={['curl', 'Python', 'Node.js']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <TabPanel isActive={activeTab === 0}>
          ```bash
curl -H "X-Obul-Key: xxx" https://api.obul.ai
          ```
        </TabPanel>
        
        <TabPanel isActive={activeTab === 1}>
          ```python
import requests
response = requests.get(url, headers=headers)
          ```
        </TabPanel>
        
        <TabPanel isActive={activeTab === 2}>
          ```javascript
fetch(url, { headers }).then(r => r.json())
          ```
        </TabPanel>
      </TabGroup>
    </Tabs>
  );
}
```

---

## Theming

### Using the Theme Toggle

The theme toggle is automatically included in the header. Users can switch between:

- ☀️ **Light** - Always light mode
- 🌙 **Dark** - Always dark mode  
- 🖥️ **System** - Follows OS preference (default)

### Using Theme in Components

```jsx
import { useTheme } from './components';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (actual applied theme)
  
  return (
    <div>
      Current theme: {resolvedTheme}
      <button onClick={() => setTheme('dark')}>
        Switch to dark
      </button>
    </div>
  );
}
```

### CSS Variables

All colors use CSS variables that change with the theme:

```css
.my-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

Available variables:
- `--background` - Page background
- `--foreground` - Text color
- `--card` - Card backgrounds
- `--primary` - Primary accent (Obul gold)
- `--secondary` - Secondary backgrounds
- `--muted` - Muted backgrounds
- `--border` - Border colors

---

## Writing Content

### Markdown Features

Standard markdown works plus these enhancements:

#### Code Blocks

```markdown
```bash title="Example"
curl -H "X-Obul-Key: xxx" https://api.obul.ai
```
```

Features:
- Syntax highlighting (bash, js, ts, python, go, json, yaml, http)
- Copy button
- Language label
- macOS-style window dots

#### Tables

```markdown
| Feature | Description |
|---------|-------------|
| **Bold** | Use `**text**` |
| *Italic* | Use `*text*` |
| `Code` | Use `` `code` `` |
```

#### Images

```markdown
![Alt text](/images/dashboard-overview.png)
```

Images are automatically styled with:
- Rounded corners
- Border
- Shadow
- Optional caption

#### Links

```markdown
[Internal link](/getting-started/quickstart)
[External link](https://example.com)
```

External links automatically get an external link icon.

---

## Best Practices

### 1. Use Components for Rich Content

Instead of plain markdown:
```markdown
**Note:** This is important.
```

Use a Callout:
```jsx
<Callout title="Important" type="info">
  This is important.
</Callout>
```

### 2. Organize with Accordions

For FAQ-style content:
```jsx
<AccordionGroup>
  <Accordion title="Question 1">Answer 1</Accordion>
  <Accordion title="Question 2">Answer 2</Accordion>
</AccordionGroup>
```

### 3. Show Code Examples with Tabs

For multi-language examples:
```jsx
<Tabs>
  <TabGroup labels={['curl', 'Python', 'Node']} ...>
    {/* Code for each language */}
  </TabGroup>
</Tabs>
```

### 4. Use Cards for Feature Lists

```jsx
<CardGroup cols={3}>
  <Card title="Fast" icon={...} description="..." />
  <Card title="Secure" icon={...} description="..." />
  <Card title="Simple" icon={...} description="..." />
</CardGroup>
```

---

## Customizing

### Changing Colors

Edit `app/src/index.css`:

```css
:root {
  --primary: 45 50% 55%;  /* Change primary color */
  --radius: 0.75rem;       /* Change border radius */
}
```

### Adding New Components

1. Create component in `app/src/components/MyComponent.tsx`
2. Export from `app/src/components/index.ts`
3. Use in your markdown or App.tsx

### Adding Fonts

The framework uses Geist fonts. To add Geist Pixel for special headers:

```bash
npm install geist
```

Then in your component:
```jsx
import { GeistPixelSquare } from 'geist/font/pixel';

<h1 className="font-pixel">Special Header</h1>
```

---

## Need Help?

- Check existing docs in `app/docs/` for examples
- Look at component source in `app/src/components/`
- Review this guide for patterns
