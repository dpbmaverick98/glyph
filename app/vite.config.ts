import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import fs from 'fs'
import { marked } from 'marked'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const frontmatter = match[1]
  const body = match[2]
  
  const data: Record<string, string> = {}
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
    }
  })
  
  return { data, content: body }
}

function generateHtmlForDoc(title: string, content: string, _slug: string): string {
  const htmlContent = marked(content)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Obul Docs</title>
  <meta name="description" content="${escapeHtml(title)}">
  <link rel="stylesheet" href="/assets/index-Dsf80kRg.css">
</head>
<body data-pagefind-body>
  <div id="root">
    <article class="prose prose-invert max-w-none">
      ${htmlContent}
    </article>
  </div>
</body>
</html>`
}

// Plugin to generate LLM files and static HTML during build
function generateLlmFiles() {
  return {
    name: 'generate-llm-files',
    closeBundle() {
      const docsDir = path.resolve(__dirname, 'docs')
      const distDir = path.resolve(__dirname, 'dist')
      
      // Read docs config
      const configPath = path.join(docsDir, 'docs.json')
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      
      // Generate static HTML files for each doc (for pagefind indexing)
      const htmlDir = path.join(distDir, 'docs')
      if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true })
      }
      
      config.sidebar.forEach((group: any) => {
        group.items.forEach((item: any) => {
          const filePath = path.join(docsDir, item.file)
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const { data, content: body } = parseFrontmatter(content)
            const title = data.title || item.label
            
            // Create subdirectory if needed
            const slugParts = item.slug.split('/')
            const docDir = slugParts.length > 1 
              ? path.join(htmlDir, slugParts.slice(0, -1).join('/'))
              : htmlDir
            if (!fs.existsSync(docDir)) {
              fs.mkdirSync(docDir, { recursive: true })
            }
            
            const html = generateHtmlForDoc(title, body, item.slug)
            fs.writeFileSync(path.join(htmlDir, `${item.slug}.html`), html)
          }
        })
      })
      console.log('Generated static HTML files for search indexing')
      
      // Generate llms.txt
      let llmsTxt = `# ${config.name}\n\n`
      llmsTxt += `> ${config.description}\n\n`
      llmsTxt += `## Documentation\n\n`
      
      config.sidebar.forEach((group: any) => {
        llmsTxt += `### ${group.group}\n\n`
        group.items.forEach((item: any) => {
          const filePath = path.join(docsDir, item.file)
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const { data } = parseFrontmatter(content)
            llmsTxt += `- [${item.label}](${item.slug}): ${data.description || ''}\n`
          }
        })
        llmsTxt += '\n'
      })
      
      llmsTxt += `## LLM-Optimized Documentation\n\n`
      llmsTxt += `- [Full Knowledge Base](/llms-full.txt): Complete concatenated documentation\n`
      
      fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt)
      console.log('Generated llms.txt')
      
      // Generate llms-full.txt
      let llmsFullTxt = `# ${config.name} - Full Knowledge Base\n\n`
      llmsFullTxt += `This document contains the complete Obul documentation for LLM consumption.\n\n`
      llmsFullTxt += `---\n\n`
      
      config.sidebar.forEach((group: any) => {
        llmsFullTxt += `# ${group.group}\n\n`
        
        group.items.forEach((item: any) => {
          const filePath = path.join(docsDir, item.file)
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const { data, content: body } = parseFrontmatter(content)
            
            llmsFullTxt += `## ${data.title || item.label}\n\n`
            llmsFullTxt += `URL: ${item.slug}\n\n`
            llmsFullTxt += `${body}\n\n`
            llmsFullTxt += `---\n\n`
          }
        })
      })
      
      fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt)
      console.log('Generated llms-full.txt')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(), 
    react(),
    generateLlmFiles()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['/pagefind/pagefind.js'],
      output: {
        manualChunks: {
          'marked': ['marked'],
        }
      }
    }
  }
});
