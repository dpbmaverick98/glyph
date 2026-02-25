---
title: Quickstart
description: Get started with Glyph in minutes.
---

# Quickstart

Get your Glyph documentation site running in under 5 minutes.

## Installation

### Using npm

```bash
npm create glyph-docs@latest my-docs
cd my-docs
npm install
npm run dev
```

### Using yarn

```bash
yarn create glyph-docs my-docs
cd my-docs
yarn
yarn dev
```

### Using pnpm

```bash
pnpm create glyph-docs my-docs
cd my-docs
pnpm install
pnpm dev
```

## Project Structure

```
my-docs/
├── docs/                 # Your markdown content
│   ├── docs.json        # Navigation configuration
│   ├── index.md         # Homepage content
│   └── ...
├── app/                 # Glyph framework (don't modify)
└── package.json
```

## Adding Content

### Create a Page

```bash
echo "# My First Page\n\nHello from Glyph!" > docs/hello.md
```

### Add to Navigation

Edit `docs/docs.json`:

```json
{
  "sidebar": [
    {
      "group": "Getting Started",
      "items": [
        {
          "label": "Hello World",
          "slug": "hello",
          "file": "hello.md"
        }
      ]
    }
  ]
}
```

### Frontmatter

Add metadata to your pages:

```markdown
---
title: My Page Title
description: A brief description
status: beta
---

# Content starts here
```

## Customization

### Change Colors

Edit `app/src/index.css`:

```css
:root {
  --primary: 210 80% 50%;  /* Your brand color */
}
```

### Update Logo

Replace `app/public/logo.png` with your logo.

### Site Config

Edit `docs/docs.json`:

```json
{
  "name": "Your Project",
  "description": "Your description",
  "logo": "/logo.png",
  "favicon": "/favicon.ico"
}
```

## Deployment

### Build

```bash
npm run build
```

Output goes to `dist/` folder.

### Deploy Anywhere

Glyph generates static files. Deploy to:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- Any static host

## Next Steps

- Learn about [Components](/components)
- Customize your [Theme](/theming)
- Add [Search](/search)
- Configure [Navigation](/navigation)
