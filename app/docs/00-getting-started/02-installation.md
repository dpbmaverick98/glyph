---
title: Installation
description: Detailed installation and setup instructions
sidebar_position: 2
---

# Installation

Multiple ways to install Glyph depending on your needs.

## Requirements

- **Node.js**: 18.0.0 or higher
- **Package manager**: npm, yarn, or pnpm

## Method 1: npx (Recommended)

The fastest way to get started:

```bash
npx create glyph-docs@latest my-docs
```

You'll be prompted for:
- Project name
- Template (default or minimal)
- Package manager preference

## Method 2: npm init

```bash
npm create glyph-docs@latest my-docs
cd my-docs
npm install
```

## Method 3: Manual Setup

For more control over the setup:

```bash
# Create directory
mkdir my-docs
cd my-docs

# Initialize project
npm init -y

# Install dependencies
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript

# Install Glyph
npm install glyph-docs
```

Create your project structure:

```
my-docs/
├── docs/
│   ├── docs.json
│   └── ...
├── app/
│   ├── src/
│   └── index.html
├── package.json
└── vite.config.ts
```

## Method 4: Docker

For containerized environments:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

```bash
docker build -t my-docs .
docker run -p 5173:5173 my-docs
```

## Method 5: GitHub Template

1. Visit [github.com/dpbmaverick98/glyph](https://github.com/dpbmaverick98/glyph)
2. Click "Use this template"
3. Create your repository
4. Clone and install:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/app
npm install
```

## Verify Installation

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open the URL and you should see the Glyph landing page.

## Troubleshooting

### Port already in use

```bash
npm run dev -- --port 3000
```

### Node version too old

```bash
# Check version
node --version

# Update with nvm
nvm install 18
nvm use 18
```

### Permission errors

```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

## Next Steps

Now that you have Glyph installed:

<CardGroup cols={2}>
  <Card title="Your First Page" icon="file-text" href="/getting-started/first-page">
    Learn to create documentation
  </Card>
  
  <Card title="Configuration" icon="settings" href="/core/configuration">
    Customize your docs
  </Card>
</CardGroup>
