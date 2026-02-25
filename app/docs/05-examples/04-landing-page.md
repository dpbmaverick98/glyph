---
title: Landing Page
description: Example landing page structure
sidebar_position: 4
---

# Landing Page Example

Create a stunning landing page for your product.

## Structure

```
docs/
├── landing.md          # Main landing page
├── features/
│   ├── index.md
│   ├── feature-1.md
│   └── feature-2.md
├── pricing.md
└── about.md
```

## Hero Section

```markdown
---
title: Your Product
description: The best solution for X
---

# Build Something Amazing

Your product tagline goes here. Make it compelling.

<CardGroup cols={3}>
  <Card title="Fast" icon="zap">
    Lightning fast performance
  </Card>
  
  <Card title="Secure" icon="shield">
    Enterprise-grade security
  </Card>
  
  <Card title="Simple" icon="smile">
    Easy to use
  </Card>
</CardGroup>

[Get Started](/docs) [View Demo](/demo)
```

## Features Grid

```markdown
## Features

Everything you need to succeed.

<CardGroup cols={2}>
  <Card title="Feature One" icon="star">
    Detailed description of feature one and why it's amazing.
  </Card>
  
  <Card title="Feature Two" icon="heart">
    Detailed description of feature two and its benefits.
  </Card>
  
  <Card title="Feature Three" icon="check">
    Detailed description of feature three and how it helps.
  </Card>
  
  <Card title="Feature Four" icon="award">
    Detailed description of feature four and why users love it.
  </Card>
</CardGroup>
```

## How It Works

```markdown
## How It Works

Get started in three simple steps.

### 1. Sign Up

Create your account in seconds.

### 2. Configure

Set up your preferences.

### 3. Launch

Go live instantly.
```

## Testimonials

```markdown
## Loved by Teams

<CardGroup cols={2}>
  <Card title="Company A">
    "This product changed how we work. Highly recommended!"
    
    — CEO, Company A
  </Card>
  
  <Card title="Company B">
    "The best investment we made this year."
    
    — CTO, Company B
  </Card>
</CardGroup>
```

## Pricing

```markdown
## Simple Pricing

<CardGroup cols={3}>
  <Card title="Free" badge="Popular">
    - Basic features
    - 1 user
    - Community support
    
    **$0/month**
  </Card>
  
  <Card title="Pro">
    - All features
    - 10 users
    - Priority support
    
    **$29/month**
  </Card>
  
  <Card title="Enterprise">
    - Unlimited everything
    - SSO
    - Dedicated support
    
    **Contact us**
  </Card>
</CardGroup>
```

## FAQ

```markdown
## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="Is there a free trial?">
    Yes! Try all features free for 14 days.
  </Accordion>
  
  <Accordion title="Can I cancel anytime?">
    Yes, no contracts or commitments.
  </Accordion>
  
  <Accordion title="Do you offer refunds?">
    Yes, 30-day money-back guarantee.
  </Accordion>
</AccordionGroup>
```

## CTA

```markdown
## Ready to Get Started?

Join thousands of happy customers.

[Start Free Trial](/signup) [Contact Sales](/contact)
```

## Custom Components

Create custom landing page components:

```tsx
// Hero.tsx
export function Hero({ title, subtitle, cta }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
      <div className="flex justify-center gap-4">{cta}</div>
    </div>
  );
}
```

## Best Practices

1. **Clear value prop** - What problem do you solve?
2. **Social proof** - Testimonials, logos, stats
3. **Clear CTA** - What should visitors do?
4. **Mobile-first** - Test on all devices
5. **Fast loading** - Optimize images
6. **SEO optimized** - Meta tags, headings
