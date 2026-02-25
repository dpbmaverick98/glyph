---
title: Code Blocks
description: Enhanced code blocks with syntax highlighting
sidebar_position: 5
---

# Code Blocks

Beautiful code blocks with syntax highlighting.

## Basic Usage

````markdown
```javascript
function hello() {
  return 'world';
}
```
````

## With Filename

Add a filename after the language:

````markdown
```javascript:hello.js
function hello() {
  return 'world';
}
```
````

## Supported Languages

- `javascript`, `js`
- `typescript`, `ts`
- `jsx`, `tsx`
- `python`, `py`
- `bash`, `sh`, `shell`, `zsh`
- `json`
- `yaml`, `yml`
- `html`
- `css`, `scss`
- `go`
- `rust`
- `java`
- `sql`
- `markdown`, `md`
- `dockerfile`
- `nginx`

## Features

### Syntax Highlighting

Code is highlighted using Prism.js with the current theme's colors.

### Copy Button

Every code block has a copy button in the top right.

### Line Numbers

Long code blocks show line numbers on hover.

### Word Wrap

Code wraps automatically on small screens.

## Examples

### JavaScript

````markdown
```javascript
const config = {
  theme: 'dark',
  plugins: ['search', 'analytics']
};

export default config;
```
````

### TypeScript

````markdown
```typescript:interface.ts
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(r => r.json());
}
```
````

### Bash

````markdown
```bash:install.sh
#!/bin/bash
npm install
cp .env.example .env
npm run dev
```
````

### JSON

````markdown
```json:config.json
{
  "name": "my-docs",
  "version": "1.0.0",
  "scripts": {
    "dev": "glyph dev",
    "build": "glyph build"
  }
}
```
````

### Python

````markdown
```python:app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```
````

## Inline Code

Use backticks for inline code:

```markdown
Use the `npm install` command to install dependencies.
```

Use the `npm install` command to install dependencies.

## Code in Callouts

````markdown
:::tip Installation
```bash
npm install my-package
```
:::
````

:::tip Installation
```bash
npm install my-package
```
:::

## Best Practices

1. **Always specify language** - Enables syntax highlighting
2. **Add filenames** - Helps users understand context
3. **Keep it short** - Break up long code blocks
4. **Use comments** - Explain complex code
5. **Test your code** - Make sure it actually works
