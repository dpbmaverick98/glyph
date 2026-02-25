---
title: Callout
description: Highlight important information with callouts
sidebar_position: 1
---

# Callout

Highlight important information, tips, warnings, and more.

## Basic Usage

```markdown
:::tip
This is a helpful tip!
:::
```

:::tip
This is a helpful tip!
:::

## Types

### Tip

```markdown
:::tip
Use this for helpful suggestions.
:::
```

:::tip
Use this for helpful suggestions.
:::

### Warning

```markdown
:::warning
Be careful with this step.
:::
```

:::warning
Be careful with this step.
:::

### Danger

```markdown
:::danger
This could break something!
:::
```

:::danger
This could break something!
:::

### Info

```markdown
:::info
Good to know information.
:::
```

:::info
Good to know information.
:::

### Success

```markdown
:::success
Operation completed successfully!
:::
```

:::success
Operation completed successfully!
:::

## With Titles

```markdown
:::tip Pro Tip
You can add custom titles to callouts.
:::
```

:::tip Pro Tip
You can add custom titles to callouts.
:::

## In MDX

```markdown
import { Callout } from '@/components';

<Callout type="warning" title="Important">
  This is a warning with a custom title.
</Callout>
```

## Best Practices

1. **Use sparingly** - Too many callouts reduce impact
2. **Choose appropriate types** - Match severity to content
3. **Keep it brief** - Callouts should be scannable
4. **Use titles** - Help users understand context quickly

## When to Use Each Type

| Type | Use For |
|------|---------|
| `tip` | Helpful suggestions, best practices |
| `warning` | Caution, things to watch out for |
| `danger` | Critical warnings, potential data loss |
| `info` | Additional context, explanations |
| `success` | Confirmation, successful operations |
