---
title: Analytics
description: Track documentation usage
sidebar_position: 1
---

# Analytics

Track how users interact with your documentation.

## Google Analytics

### Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to your site

### Implementation

Add to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Or use environment variables:

```html
<script>
  gtag('config', '%VITE_GA_ID%');
</script>
```

## Plausible

Privacy-friendly analytics:

```html
<script 
  defer 
  data-domain="yourdomain.com" 
  src="https://plausible.io/js/script.js"
003e</script>
```

## Fathom

Simple, privacy-focused:

```html
<script 
  src="https://cdn.usefathom.com/script.js" 
  data-site="YOUR_SITE_ID" 
  defer
></script>
```

## Vercel Analytics

If deploying to Vercel:

```bash
npm install @vercel/analytics
```

Add to `App.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  );
}
```

## Custom Events

Track specific actions:

```tsx
// Track page views
useEffect(() => {
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
  });
}, [location]);

// Track search
const trackSearch = (query: string) => {
  gtag('event', 'search', {
    search_term: query,
  });
};

// Track external links
const trackExternalLink = (url: string) => {
  gtag('event', 'click', {
    event_category: 'outbound',
    event_label: url,
  });
};
```

## What to Track

### Essential Metrics

- **Page views** - Most popular pages
- **Search queries** - What users look for
- **External clicks** - Outbound link clicks
- **Time on page** - Engagement

### Documentation-Specific

- **Code copy events** - Popular code snippets
- **Theme switches** - User preferences
- **Component interactions** - Accordion opens, tab switches

## Privacy

### GDPR Compliance

1. **Cookie consent** - Ask before tracking
2. **Anonymize IP** - Don't store full IPs
3. **Data retention** - Set limits in GA

### Privacy-Friendly Options

| Tool | Cookies | GDPR |
|------|---------|------|
| Google Analytics | Yes | Complex |
| Plausible | No | Yes |
| Fathom | No | Yes |
| Vercel | No | Yes |

## Dashboard

View your analytics:

- **Google Analytics**: analytics.google.com
- **Plausible**: plausible.io/yourdomain.com
- **Fathom**: app.usefathom.com
- **Vercel**: vercel.com/dashboard

## Best Practices

1. **Use privacy-friendly tools** - When possible
2. **Respect DNT** - Honor Do Not Track
3. **Minimize data** - Only collect what's needed
4. **Document usage** - Privacy policy
5. **Test events** - Verify tracking works
