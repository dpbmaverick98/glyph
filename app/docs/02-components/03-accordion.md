---
title: Accordion
description: Collapsible content sections
sidebar_position: 3
---

# Accordion

Create collapsible content sections for FAQs and long content.

## Basic Usage

```markdown
<Accordion title="Click to expand">
  This content is hidden until clicked.
</Accordion>
```

## AccordionGroup

Group multiple accordions together:

```markdown
<AccordionGroup>
  <Accordion title="Question 1">
    Answer to question 1
  </Accordion>
  
  <Accordion title="Question 2">
    Answer to question 2
  </Accordion>
  
  <Accordion title="Question 3">
    Answer to question 3
  </Accordion>
</AccordionGroup>
```

## Default Open

Start with accordion expanded:

```markdown
<Accordion title="Expanded by default" defaultOpen={true}>
  This starts open.
</Accordion>
```

## Use Cases

### FAQ Section

```markdown
## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="How do I get started?">
    Run `npx create glyph-docs@latest` and follow the prompts.
  </Accordion>
  
  <Accordion title="Can I customize the theme?">
    Yes! Choose from 8 built-in themes or create your own.
  </Accordion>
  
  <Accordion title="Is it free?">
    Yes, Glyph is open source and free forever.
  </Accordion>
</AccordionGroup>
```

### Advanced Options

```markdown
<AccordionGroup>
  <Accordion title="Configuration Options">
    ### Basic Config
    
    ```json
    {
      "name": "My Docs"
    }
    ```
  </Accordion>
  
  <Accordion title="Environment Variables">
    | Variable | Description |
    |----------|-------------|
    | `API_KEY` | Your API key |
  </Accordion>
</AccordionGroup>
```

## Props

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Accordion title |
| `defaultOpen` | boolean | false | Start expanded |
| `children` | ReactNode | - | Content inside |

### AccordionGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Accordion items |

## Best Practices

1. **Use for FAQs** - Perfect for question/answer content
2. **Long content** - Hide optional/advanced content
3. **Clear titles** - Users should know what's inside
4. **Don't nest** - Accordions inside accordions are confusing
5. **Group related** - Use AccordionGroup for related items
