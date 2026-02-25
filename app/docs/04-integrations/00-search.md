---
title: Search
description: Built-in search with Pagefind
sidebar_position: 0
---

# Search

Glyph uses Pagefind for fast, offline-capable search.

## How It Works

Pagefind indexes your content at build time:

1. **Build**: `npm run build` generates static files
2. **Index**: `npm run postbuild` creates search index
3. **Search**: Browser loads index, no server needed

## Using Search

### Keyboard Shortcut

Press `Cmd/Ctrl + K` to open search from anywhere.

### Search Modal

Click the search bar in the header or use the keyboard shortcut.

### Search Results

- **Instant results** as you type
- **Highlighted matches** in context
- **Keyboard navigation** with arrow keys
- **Click or press Enter** to navigate

## Configuration

Pagefind works out of the box. No configuration needed.

### Customizing Indexing

Add to your build command in `package.json`:

```json
{
  "scripts": {
    "postbuild": "pagefind --site dist --glob '**/*.html'"
  }
}
```

### Excluding Content

Add `data-pagefind-ignore` to exclude elements:

```html
<div data-pagefind-ignore>
  This won't be indexed
</div>
```

### Weighting Content

Mark important content:

```html
<p data-pagefind-weight="10">
  This text is more important in search results
</p>
```

## Search Index

The index is created in `dist/pagefind/`:

```
dist/
└── pagefind/
    ├── pagefind.js
    ├── pagefind-ui.css
    ├── pagefind-ui.js
    └── index/
        └── ...
```

## Customizing UI

### Search Modal

The search modal is styled with your theme automatically.

### Search Trigger

Customize the search bar in `app/src/components/Search.tsx`.

### No Results

Customize the empty state in the Search component.

## Multilingual Search

Pagefind supports multiple languages:

```bash
pagefind --site dist --languages "en,es,fr"
```

## Troubleshooting

### Search Not Working

1. **Run postbuild**:
   ```bash
   npm run postbuild
   ```

2. **Check index exists**:
   ```bash
   ls dist/pagefind/
   ```

3. **Verify content is indexed**:
   Check that pages have `data-pagefind-body` attribute.

### Slow Search

- Large index? Consider splitting by language
- Too many results? Use `data-pagefind-weight`

### Missing Results

- Check `data-pagefind-ignore` isn't too broad
- Verify content is in `dist/` after build

## Replacing Pagefind

You can use other search solutions:

### Algolia DocSearch

```bash
npm install @docsearch/react
```

Configure in `app/src/components/Search.tsx`.

### Fuse.js

```bash
npm install fuse.js
```

Client-side fuzzy search alternative.

## Best Practices

1. **Run postbuild** - Always index after building
2. **Test search** - Verify important content is findable
3. **Optimize content** - Use clear headings and text
4. **Monitor size** - Large indexes slow down initial load
