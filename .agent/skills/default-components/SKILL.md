---
name: default-components
description: Guide for using built-in documentation components like images, callouts, tables, and code blocks. Use when users need help with standard markdown components and their special features.
---

# Default Components Guide

## Images with Borders

Standard markdown images automatically get styling:

```markdown
![Alt text](path/to/image.png)
```

Renders with:
- Rounded corners
- Border
- Shadow
- Full width

### Image with Caption

Use the Frame component:

```markdown
<Frame caption="System architecture diagram">
  ![Architecture](diagram.png)
</Frame>
```

## Code Blocks

### Basic Code Block

````markdown
```javascript
const greeting = 'Hello World';
console.log(greeting);
```
````

### With Filename

````markdown
```javascript:config.js
const config = { theme: 'dark' };
```
````

Supported languages:
- `javascript`, `js`, `typescript`, `ts`
- `python`, `py`
- `bash`, `sh`, `shell`
- `json`, `yaml`, `yml`
- `go`, `rust`, `java`
- `html`, `css`, `sql`

### Terminal Style

```markdown
<TerminalWindow title="bash">
  <TerminalCommand 
    command="npm install glyph" 
    output="+ glyph@1.0.0 installed"
  />
</TerminalWindow>
```

### Inline Code

Use single backticks for inline code:

```markdown
Use the `npm run dev` command to start development.
```

## Callouts

### Tip

```markdown
:::tip
This is a helpful tip!
:::
```

### Warning

```markdown
:::warning
Be careful with this step.
:::
```

### Danger

```markdown
:::danger
This could break something!
:::
```

### Info

```markdown
:::info
Good to know information.
:::
```

### Success

```markdown
:::success
Operation completed successfully!
:::
```

## Tables

### Markdown Tables

```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Auth | ✅ | OAuth2 supported |
| API | ✅ | REST + GraphQL |
| Webhooks | 🚧 | Coming soon |
```

### Wide Tables

Wide tables automatically scroll horizontally on mobile.

## Cards

### Single Card

```markdown
<Card title="Feature" icon="zap">
  Description here
</Card>
```

### Card Group

```markdown
<CardGroup cols={2}>
  <Card title="Card 1">Content 1</Card>
  <Card title="Card 2">Content 2</Card>
</CardGroup>
```

## Accordions

```markdown
<Accordion title="Click to expand">
  Hidden content here
</Accordion>
```

### Grouped Accordions

```markdown
<AccordionGroup>
  <Accordion title="Question 1">Answer 1</Accordion>
  <Accordion title="Question 2">Answer 2</Accordion>
</AccordionGroup>
```

## Tabs

```markdown
<Tabs defaultValue="js">
  <TabList>
    <Tab value="js">JavaScript</Tab>
    <Tab value="py">Python</Tab>
  </TabList>
  
  <TabContent value="js">
    ```javascript
    console.log('Hello');
    ```
  </TabContent>
  
  <TabContent value="py">
    ```python
    print("Hello")
    ```
  </TabContent>
</Tabs>
```

## Steps

```markdown
<Steps>
  <Step title="Install">
    Run `npm install`
  </Step>
  
  <Step title="Configure">
    Edit `config.json`
  </Step>
  
  <Step title="Deploy">
    Run `npm run deploy`
  </Step>
</Steps>
```

## Timeline

```markdown
<Timeline>
  <TimelineItem title="v1.0" date="Jan 2024">
    Initial release
  </TimelineItem>
  
  <TimelineItem title="v1.1" date="Feb 2024">
    New features
  </TimelineItem>
</Timeline>
```

## File Tree

```markdown
<FileTree>
  <FileTreeFolder name="src" defaultOpen>
    <FileTreeFile name="index.ts" />
    <FileTreeFile name="utils.ts" />
  </FileTreeFolder>
  <FileTreeFile name="package.json" />
</FileTree>
```

## Badges

```markdown
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

## Mermaid Diagrams

```markdown
<Mermaid chart={`
  graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
`} />
```

## Links

### External Links

```markdown
[OpenAI](https://openai.com)
```

Automatically opens in new tab with external link icon.

### Internal Links

```markdown
[Installation guide](/getting-started/installation)
```

## Lists

### Unordered Lists

```markdown
- First item
- Second item
  - Nested item
- Third item
```

### Ordered Lists

```markdown
1. First step
2. Second step
3. Third step
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
```

## Typography

### Headings

```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Code text`
```

## Best Practices

1. **Use callouts sparingly** - Too many reduce impact
2. **Caption your images** - Context helps understanding
3. **Code blocks need language** - Enables syntax highlighting
4. **Tables for structured data** - Better than lists for comparisons
5. **Internal links** - Help users navigate related content
