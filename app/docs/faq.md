---
title: FAQ
description: Frequently asked questions about Glyph.
---

# FAQ

## General

### What is Glyph?

Glyph is a lightweight documentation framework built with React and Vite. It helps you create beautiful documentation sites from Markdown files.

### Is Glyph free?

Yes! Glyph is open source and free to use. The optional dashboard has a free tier.

### Can I self-host Glyph?

Absolutely. Glyph generates static files that can be hosted anywhere.

## Technical

### What technologies does Glyph use?

- **React** for UI
- **Vite** for building
- **Marked** for Markdown parsing
- **Pagefind** for search
- **Tailwind CSS** for styling
- **Geist** fonts for typography

### Does Glyph support MDX?

Yes! You can embed React components in your Markdown files.

### Can I customize the theme?

Yes. Glyph uses CSS variables for easy theming. Edit `app/src/index.css` to customize colors, fonts, and more.

### How does search work?

Glyph uses [Pagefind](https://pagefind.app), a static search library. It indexes your content at build time and works entirely in the browser—no server needed.

## Usage

### How do I add a new page?

1. Create a `.md` file in `docs/`
2. Add it to `docs/docs.json`
3. Done!

### Can I use custom components?

Yes. Create React components in `app/src/components/` and use them in your MDX files.

### How do I deploy?

```bash
npm run build
```

Then upload the `dist/` folder to any static host.

### Does Glyph support versioning?

Yes. You can version your docs by:
- Using Git branches
- Deploying to versioned paths
- Using the dashboard's versioning feature

## Troubleshooting

### Build fails

Check that:
- All Markdown files have valid frontmatter
- `docs.json` syntax is valid
- Node.js version is 18+

### Search not working

Make sure:
- You've built the site (`npm run build`)
- Pagefind indexed your content
- `data-pagefind-body` attribute is present

### Styles not updating

Try:
```bash
rm -rf node_modules/.vite
cd app && npm run dev
```

## Contributing

### How can I contribute?

- Report bugs on GitHub
- Submit feature requests
- Contribute code
- Improve documentation

### Is there a community?

Join us on [Discord](https://discord.gg/glyph)!
