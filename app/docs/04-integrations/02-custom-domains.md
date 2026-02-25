---
title: Custom Domains
description: Use your own domain
sidebar_position: 2
---

# Custom Domains

Use your own domain for your documentation.

## Vercel

### Add Domain

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Settings" → "Domains"
4. Add your domain

### Configure DNS

Add these records at your DNS provider:

**For apex domain (example.com):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |

**For subdomain (docs.example.com):**

| Type | Name | Value |
|------|------|-------|
| CNAME | docs | cname.vercel-dns.com |

### Verify

Click "Verify" in Vercel dashboard. SSL certificate is automatic.

## Netlify

### Add Domain

1. Go to [netlify.com](https://netlify.com)
2. Site settings → Domain management
3. Add custom domain

### Configure DNS

**For apex domain:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 104.248.50.69 |
| A | @ | 206.189.126.249 |

**For subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | docs | your-site.netlify.app |

### Verify

Netlify will verify automatically. SSL via Let's Encrypt.

## Cloudflare Pages

### Add Domain

1. Go to Cloudflare dashboard
2. Pages → Your project
3. Custom domains → Set up

### Configure DNS

Cloudflare handles DNS automatically if using Cloudflare nameservers.

Or add manually:

| Type | Name | Value |
|------|------|-------|
| CNAME | docs | your-site.pages.dev |

## GitHub Pages

### Repository Settings

1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Save

### Configure DNS

**For apex domain:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | docs | username.github.io |

### CNAME File

Create `static/CNAME`:

```
docs.example.com
```

## AWS S3 + CloudFront

### S3 Bucket

1. Create bucket named your domain
2. Enable static website hosting
3. Upload your `dist/` files

### CloudFront

1. Create distribution
2. Origin: your S3 bucket
3. Alternate domain names: your domain
4. SSL certificate: Request from ACM

### Route 53

Create A record pointing to CloudFront:

| Type | Name | Value |
|------|------|-------|
| A | docs | CloudFront domain |

## SSL/HTTPS

All major hosts provide free SSL:

- **Vercel**: Automatic
- **Netlify**: Automatic
- **Cloudflare**: Automatic
- **GitHub Pages**: Automatic (with CNAME)
- **AWS**: Use ACM (free)

## Subdomain vs Apex

### Subdomain (docs.example.com)

- Easier to set up
- More flexible
- Recommended for docs

### Apex (example.com)

- Cleaner URL
- Requires special DNS setup
- Often needs redirect

## Redirects

Redirect www to non-www (or vice versa):

### Vercel

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.example.com" }],
      "destination": "https://example.com/:path*"
    }
  ]
}
```

### Netlify

```
# _redirects
https://www.example.com/* https://example.com/:splat 301!
```

## Troubleshooting

### Domain Not Working

1. **Check DNS propagation**: `dig docs.example.com`
2. **Verify records**: Ensure no typos
3. **Clear cache**: DNS can take 24-48 hours

### SSL Issues

1. **Wait for provisioning**: Can take a few minutes
2. **Check certificate**: Browser dev tools → Security
3. **Force HTTPS**: Enable in hosting settings

### 404 Errors

Ensure your build output is correct:

```bash
npm run build
ls dist/
# Should contain index.html and assets/
```

## Best Practices

1. **Use HTTPS** - Always enable SSL
2. **Subdomain for docs** - Keep main site separate
3. **Test redirects** - Verify www/non-www
4. **Monitor uptime** - Use a service like UptimeRobot
5. **Document setup** - Keep DNS records documented
