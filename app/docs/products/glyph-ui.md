---
title: Glyph UI
description: React component library for Glyph documentation.
status: coming-soon
---

# Glyph UI

A React component library designed specifically for documentation sites.

## Overview

Glyph UI provides pre-built components that match the Glyph aesthetic:

- **Cards** - Feature cards, info cards
- **Callouts** - Tip, warning, danger, info boxes
- **Code Blocks** - Syntax highlighted with copy button
- **Tables** - Styled data tables
- **Navigation** - Breadcrumbs, pagination

## Installation

```bash
npm install @glyph/ui
```

## Usage

```tsx
import { Card, Callout, CodeBlock } from '@glyph/ui';

function MyPage() {
  return (
    <>
      <Card title="Feature" icon={Star}>
        Description here
      </Card>
      
      <Callout type="tip">
        Helpful information
      </Callout>
      
      <CodeBlock language="javascript">
        const x = 1;
      </CodeBlock>
    </>
  );
}
```

## Components

### Card

```tsx
<Card
  title="Title"
  icon={IconComponent}
  href="/link">
  Content
</Card>
```

### Callout

```tsx
<Callout type="tip|warning|danger|info">
  Content
</Callout>
```

### CodeBlock

```tsx
<CodeBlock
  language="javascript"
  filename="example.js"
  showLineNumbers>
  {codeString}
</CodeBlock>
```

### Steps

```tsx
<Steps>
  <Step title="Step 1">Content</Step>
  <Step title="Step 2">Content</Step>
</Steps>
```

## Theming

Components inherit styles from your Glyph theme automatically.

## Coming Soon

Glyph UI is currently bundled with the main framework. Standalone package coming soon.
