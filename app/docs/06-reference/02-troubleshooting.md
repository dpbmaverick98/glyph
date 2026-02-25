---
title: Troubleshooting
description: Common issues and solutions
sidebar_position: 2
---

# Troubleshooting

Common issues and how to fix them.

## Build Issues

### Build fails with "Cannot find module"

**Cause:** Missing dependencies

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

**Cause:** Type mismatches or missing types

**Solution:**

```bash
# Check TypeScript version
npx tsc --version

# Run type check
npx tsc --noEmit
```

### Out of memory

**Cause:** Large documentation or memory leak

**Solution:**

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Development Issues

### Port already in use

**Cause:** Another process using port 5173

**Solution:**

```bash
# Use different port
npm run dev -- --port 3000

# Or kill process
lsof -ti:5173 | xargs kill -9
```

### Hot reload not working

**Cause:** Vite cache or file watcher issues

**Solution:**

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Changes not reflecting

**Cause:** Browser cache or build issue

**Solution:**

1. Hard refresh: `Cmd/Ctrl + Shift + R`
2. Clear browser cache
3. Restart dev server

## Theme Issues

### Theme not switching

**Cause:** localStorage or CSS variable issue

**Solution:**

```javascript
// Clear theme in console
localStorage.removeItem('glyph-theme-preset')
location.reload()
```

### Light theme not working

**Cause:** CSS variable conflict

**Solution:**

Check `index.css` for conflicting variables:

```css
:root {
  /* Ensure these are set */
  --theme-background: #ffffff;
  --theme-foreground: #1a1a1a;
}
```

## Search Issues

### Search not working

**Cause:** Missing search index

**Solution:**

```bash
# Build and index
npm run build
npm run postbuild

# Verify index exists
ls dist/pagefind/
```

### Search results empty

**Cause:** Content not indexed

**Solution:**

1. Check `data-pagefind-body` attribute exists
2. Verify content in `dist/` folder
3. Rebuild index: `npm run postbuild`

## Deployment Issues

### 404 errors on refresh

**Cause:** SPA routing not configured

**Solution:**

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify** (`_redirects`):
```
/* /index.html 200
```

### Assets not loading

**Cause:** Wrong base URL

**Solution:**

Check `vite.config.ts`:

```typescript
export default defineConfig({
  base: './', // or your base path
})
```

### Custom domain not working

**Cause:** DNS or SSL issues

**Solution:**

1. Verify DNS records
2. Wait for propagation (24-48 hours)
3. Check SSL certificate status

## Content Issues

### Markdown not rendering

**Cause:** Syntax error or parsing issue

**Solution:**

1. Check frontmatter format
2. Validate Markdown syntax
3. Check for special characters

### Components not showing

**Cause:** Import or syntax error

**Solution:**

```markdown
<!-- Correct -->
<Card title="Title">Content</Card>

<!-- Wrong -->
<Card title="Title" />  >
```

### Images not displaying

**Cause:** Wrong path or file missing

**Solution:**

1. Check image path (relative to `public/`)
2. Verify file exists in `public/`
3. Check case sensitivity

## Performance Issues

### Slow build times

**Cause:** Large content or inefficient config

**Solution:**

```bash
# Analyze build
npm run build -- --profile

# Check bundle size
npx vite-bundle-visualizer
```

### Large bundle size

**Cause:** Unnecessary dependencies

**Solution:**

1. Audit dependencies: `npm audit`
2. Remove unused packages
3. Use dynamic imports

### Slow page loads

**Cause:** Large images or unoptimized assets

**Solution:**

1. Optimize images
2. Use lazy loading
3. Enable compression

## Getting Help

If you're still stuck:

1. **Check documentation** - You're here!
2. **Search issues** - [GitHub Issues](https://github.com/dpbmaverick98/glyph/issues)
3. **Ask community** - [Discord](https://discord.gg/glyph)
4. **Report bug** - Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment info (OS, Node version)

## Debug Mode

Enable debug logging:

```bash
DEBUG=glyph npm run dev
```

## Common Error Messages

| Error | Solution |
|-------|----------|
| `Cannot find module '@mdx-js/rollup'` | Run `npm install` |
| `Cannot read property of undefined` | Check docs.json syntax |
| `ENOENT: no such file` | Verify file paths in docs.json |
| `EACCES: permission denied` | Check file permissions |
| `ENOMEM` | Increase Node memory limit |
