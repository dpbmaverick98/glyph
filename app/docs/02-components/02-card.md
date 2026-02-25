---
title: Card & CardGroup
description: Display content in card layouts
sidebar_position: 2
---

# Card & CardGroup

Display content in beautiful card layouts.

## Card

### Basic Usage

```markdown
<Card title="Feature Name">
  Description of the feature goes here.
</Card>
```

### With Icon

```markdown
<Card title="Fast Performance" icon="zap">
  Lightning fast build times.
</Card>
```

### As Link

```markdown
<Card 
  title="API Reference" 
  icon="code"
  href="/reference/api"
>
  View the complete API documentation.
</Card>
```

### With Badge

```markdown
<Card 
  title="New Feature"
  icon="sparkles"
  badge="Beta"
>
  Try our latest feature.
</Card>
```

## CardGroup

### Two Columns

```markdown
<CardGroup cols={2}>
  <Card title="Card 1" icon="zap">
    First card content
  </Card>
  
  <Card title="Card 2" icon="star">
    Second card content
  </Card>
</CardGroup>
```

### Three Columns

```markdown
<CardGroup cols={3}>
  <Card title="Fast" icon="zap">Lightning fast</Card>
  <Card title="Secure" icon="shield">Built-in security</Card>
  <Card title="Global" icon="globe">Worldwide CDN</Card>
</CardGroup>
```

## Props

### Card

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Card title |
| `description` | string | Card description |
| `icon` | string | Lucide icon name |
| `href` | string | Link URL (optional) |
| `badge` | string | Badge text (optional) |

### CardGroup

| Prop | Type | Description |
|------|------|-------------|
| `cols` | number | Number of columns (1-4) |

## Examples

### Feature Grid

```markdown
<CardGroup cols={3}>
  <Card title="Authentication" icon="key">
    OAuth2 and API key support
  </Card>
  
  <Card title="Webhooks" icon="webhook"
003e
    Real-time event notifications
  </Card>
  
  <Card title="SDKs" icon="code">
    Client libraries in 5 languages
  </Card>
</CardGroup>
```

### Quick Links

```markdown
<CardGroup cols={2}>
  <Card 
    title="Quickstart" 
    icon="rocket"
    href="/getting-started/quickstart"
  >
    Get up and running in 5 minutes
  </Card>
  
  <Card 
    title="API Reference" 
    icon="book-open"
    href="/reference/api"
  >
    Complete API documentation
  </Card>
</CardGroup>
```

## Best Practices

1. **Use icons** - Make cards visually distinct
2. **Keep text short** - 1-2 sentences max
3. **Consistent columns** - Use same cols in a section
4. **Link when helpful** - Cards can be clickable
