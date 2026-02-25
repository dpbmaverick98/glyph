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
- Rounded corners (`rounded-lg`)
- Border (`border border-border`)
- Shadow (`shadow-sm`)
- Full width

### Image with Caption

Use HTML for captions:

```html
<figure>
  <img src="diagram.png" alt="System architecture" />
  <figcaption>Figure 1: System architecture diagram</figcaption>
</figure>
```

### Framed Image Component

For a more prominent image display:

```html
<div className="docs-card overflow-hidden p-0">
  <img src="screenshot.png" alt="Dashboard" className="w-full border-0 rounded-none" />
  <div className="p-4 border-t border-border">
    <p className="text-sm text-muted-foreground">The main dashboard interface</p>
  </div>
</div>
```

## Code Blocks

### Basic Code Block

````markdown
```javascript
const greeting = 'Hello World';
console.log(greeting);
```
````

### With Language

````markdown
```bash
npm install glyph
```
````

Supported languages:
- `javascript`, `js`, `typescript`, `ts`
- `python`, `py`
- `bash`, `sh`, `shell`
- `json`, `yaml`, `yml`
- `go`, `rust`, `java`
- `html`, `css`, `sql`

### Inline Code

Use single backticks for inline code:

```markdown
Use the `npm run dev` command to start development.
```

Renders with:
- Monospace font (Geist Mono)
- Subtle background
- Rounded corners
- Border

## Callouts

### Info Callout

```markdown
> **Note**> 
> This is an informational callout.
```

Or use HTML for styled callouts:

```html
<div class="callout callout-info">
  <strong>Tip:</strong> Use this for helpful information.
</div>
```

### Warning Callout

```html
<div class="callout callout-warning">
  <strong>Warning:</strong> Be careful with this step.
</div>
```

### Success Callout

```html
<div class="callout callout-success">
  <strong>Success:</strong> The operation completed successfully.
</div>
```

### Error Callout

```html
<div class="callout callout-error">
  <strong>Error:</strong> Something went wrong.
</div>
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

Renders with:
- Clean borders
- Header background
- Hover effects on rows

### Styled Tables

Wrap in a container for scroll on mobile:

```html
<div class="overflow-x-auto">
  <table class="docs-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>id</code></td>
        <td>string</td>
        <td>Unique identifier</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Links

### External Links

```markdown
[OpenAI](https://openai.com)
```

Automatically opens in new tab with external link icon.

### Internal Links

```markdown
[Installation guide](#installation)
```

For page navigation:
```markdown
[Go to API Reference](/api/overview)
```

## Lists

### Unordered Lists

```markdown
- First item
- Second item
  - Nested item
  - Another nested
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
- [ ] Another pending
```

## Typography

### Headings

```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

Headings automatically:
- Get anchor links for sharing
- Use tight tracking (-0.03em)
- Have hover-reveal anchor icon

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Code text`
```

## Horizontal Rules

```markdown
---
```

Creates a subtle divider between sections.

## Tips for Better Documentation

1. **Use callouts sparingly** - Too many reduce impact
2. **Caption your images** - Context helps understanding
3. **Code blocks need language** - Enables syntax highlighting
4. **Tables for structured data** - Better than lists for comparisons
5. **Internal links** - Help users navigate related content
