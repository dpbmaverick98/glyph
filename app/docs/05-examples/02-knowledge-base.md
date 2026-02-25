---
title: Knowledge Base
description: Example knowledge base structure
sidebar_position: 2
---

# Knowledge Base Example

Structure for a help center or knowledge base.

## Overview

```markdown
---
title: Help Center
description: Find answers and get help
---

# Help Center

Welcome! How can we help you?

<CardGroup cols={2}>
  <Card title="Getting Started" icon="rocket" href="/getting-started">
    New user guide
  </Card>
  
  <Card title="FAQs" icon="help-circle" href="/faqs">
    Common questions
  </Card>
  
  <Card title="Troubleshooting" icon="wrench" href="/troubleshooting">
    Fix common issues
  </Card>
  
  <Card title="Contact" icon="message-circle" href="/contact">
    Get in touch
  </Card>
</CardGroup>
```

## Structure

```
docs/
├── index.md              # Help center home
├── getting-started/
│   ├── index.md
│   ├── quickstart.md
│   └── account-setup.md
├── faqs/
│   ├── index.md
│   ├── billing.md
│   ├── security.md
│   └── features.md
├── troubleshooting/
│   ├── index.md
│   ├── login-issues.md
│   └── performance.md
└── contact.md
```

## Getting Started

```markdown
---
title: Getting Started
description: New user guide
---

# Getting Started

Welcome! Let's get you set up.

## Quick Setup

1. Create an account
2. Verify your email
3. Complete your profile

## First Steps

### Create Your First Project

```
Click "New Project" → Enter name → Done!
```

### Invite Your Team

```
Settings → Team → Invite by email
```

## Video Tutorials

<CardGroup cols={2}>
  <Card title="Platform Overview" icon="play">
    5-minute intro video
  </Card>
  
  <Card title="Advanced Features" icon="play">
    Deep dive tutorial
  </Card>
</CardGroup>

## Need Help?

Contact support: support@example.com
```

## FAQs

```markdown
---
title: Frequently Asked Questions
description: Common questions answered
---

# FAQs

## Billing

<AccordionGroup>
  <Accordion title="How do I upgrade my plan?">
    Go to Settings → Billing → Select plan
  </Accordion>
  
  <Accordion title="Can I get a refund?">
    Yes, within 30 days of purchase
  </Accordion>
  
  <Accordion title="What payment methods?">
    We accept credit cards and PayPal
  </Accordion>
</AccordionGroup>

## Security

<AccordionGroup>
  <Accordion title="Is my data secure?">
    Yes, we use industry-standard encryption
  </Accordion>
  
  <Accordion title="Do you support 2FA?">
    Yes, enable in Settings → Security
  </Accordion>
</AccordionGroup>
```

## Troubleshooting

```markdown
---
title: Troubleshooting
description: Fix common issues
---

# Troubleshooting

## Login Issues

### Forgot Password

1. Click "Forgot password" on login
2. Enter your email
3. Check inbox for reset link

### Account Locked

:::warning
After 5 failed attempts, your account locks for 1 hour.
:::

Contact support to unlock immediately.

## Performance

### Slow Loading

Try these steps:

1. Clear browser cache
2. Disable browser extensions
3. Check internet connection
4. Try incognito mode

Still slow? [Contact support](/contact)

## Error Messages

| Error | Solution |
|-------|----------|
| "Session expired" | Log in again |
| "Permission denied" | Check your role |
| "Not found" | Verify the URL |
```

## Search-Optimized

```markdown
---
title: How to Reset Password
description: Step-by-step password reset guide
---

# How to Reset Your Password

Forgot your password? Here's how to reset it.

## Step 1: Click Forgot Password

On the login page, click "Forgot password".

## Step 2: Enter Email

Enter the email associated with your account.

## Step 3: Check Email

Look for an email from noreply@example.com.

:::tip
Check your spam folder if you don't see it!
:::

## Step 4: Click Reset Link

Click the link in the email. It expires in 1 hour.

## Step 5: Set New Password

Enter and confirm your new password.

## Still Need Help?

Contact support@example.com
```

## Best Practices

1. **Search-friendly titles** - "How to X" not "X Guide"
2. **Step-by-step** - Numbered instructions
3. **Screenshots** - Visual aids
4. **Related articles** - Link to more help
5. **Contact option** - Always provide support contact
