---
title: What is Glyph?
description: Glyph is a lightweight, beautiful documentation framework inspired by Mintlify.
---

# What is Glyph?

Glyph is a **lightweight documentation framework** that helps you create beautiful, fast, and modern documentation sites. Inspired by [Mintlify](https://mintlify.com), Glyph gives you the same polished look and feel without the complexity.

## Why Glyph?

### 🚀 Fast by Default
Built with Vite and React, Glyph sites load instantly. No heavy JavaScript bundles slowing down your users.

### 🎨 Beautiful Design
Clean typography powered by [Geist](https://vercel.com/font) fonts, dark mode support, and a polished UI out of the box.

### 📝 Markdown Native
Write your docs in Markdown. Glyph handles the rest—syntax highlighting, tables, callouts, and more.

### 🔍 Search Built-in
Powered by [Pagefind](https://pagefind.app), search works offline and indexes your content automatically.

### 🤖 LLM-Friendly
Automatically generates `llms.txt` and `llms-full.txt` so AI assistants can understand your documentation.

## How It Works

```bash
# Create a new docs site
npx create-glyph-docs my-docs

# Add your content
echo "# Hello World" > docs/index.md

# Build and deploy
npm run build
```

## Features

| Feature | Description |
|---------|-------------|
| **Dark Mode** | Automatic dark mode with system preference detection |
| **MDX Support** | Embed React components in your Markdown |
| **API References** | Auto-generated from OpenAPI specs |
| **Search** | Fast, offline-capable full-text search |
| **Custom Themes** | Easy CSS variable-based theming |
| **Components** | Cards, callouts, code blocks, and more |

## Comparison

| | Glyph | Mintlify | Docusaurus |
|--|-------|----------|------------|
| Self-hosted | ✅ | ❌ | ✅ |
| Free | ✅ | Limited | ✅ |
| React-based | ✅ | ❌ | ✅ |
| Search | ✅ | ✅ | Plugin |
| Light/Dark | ✅ | ✅ | ✅ |

## Get Started

Ready to build your docs? Head to the [Quickstart Guide](/getting-started/quickstart).
