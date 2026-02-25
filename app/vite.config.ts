import mdx from '@mdx-js/rollup'
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from 'fs/promises'
import { marked } from 'marked'
import { parseFrontmatter, escapeHtml } from './src/lib/markdown'

async function generateHtmlForDoc(title: string, content: string): Promise<string> {
  const htmlContent = await marked.parse(content)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Glyph Docs</title>
  <meta name="description" content="${escapeHtml(title)}">
</head>
<body data-pagefind-body>
  <article class="prose max-w-none">
    ${htmlContent}
  </article>
</body>
</html>`
}

// Plugin to generate LLM files and static HTML during build
function generateLlmFiles() {
  return {
    name: 'generate-llm-files',
    async closeBundle() {
      const docsDir = path.resolve(__dirname, 'docs')
      const distDir = path.resolve(__dirname, 'dist')
      
      try {
        // Read docs config
        const configPath = path.join(docsDir, 'docs.json')
        const config = JSON.parse(await fs.readFile(configPath, 'utf-8'))
        
        // Generate static HTML files for each doc (for pagefind indexing)
        const htmlDir = path.join(distDir, 'docs')
        await fs.mkdir(htmlDir, { recursive: true })
        
        // Process all docs in parallel
        const docPromises = config.sidebar.flatMap((group: any) =>
          group.items.map(async (item: any) => {
            const filePath = path.join(docsDir, item.file)
            try {
              const content = await fs.readFile(filePath, 'utf-8')
              const { data, content: body } = parseFrontmatter(content)
              const title = data.title || item.label
              
              // Create subdirectory if needed
              const slugParts = item.slug.split('/')
              const docDir = slugParts.length > 1 
                ? path.join(htmlDir, slugParts.slice(0, -1).join('/'))
                : htmlDir
              await fs.mkdir(docDir, { recursive: true })
              
              const html = await generateHtmlForDoc(title, body)
              await fs.writeFile(path.join(htmlDir, `${item.slug}.html`), html)
            } catch (err) {
              console.warn(`Failed to process ${item.file}:`, err)
            }
          })
        )
        
        await Promise.all(docPromises)
        console.log('Generated static HTML files for search indexing')
        
        // Generate llms.txt
        let llmsTxt = `# ${config.name}\n\n`
        llmsTxt += `> ${config.description}\n\n`
        llmsTxt += `## Documentation\n\n`
        
        for (const group of config.sidebar) {
          llmsTxt += `### ${group.group}\n\n`
          for (const item of group.items) {
            const filePath = path.join(docsDir, item.file)
            try {
              const content = await fs.readFile(filePath, 'utf-8')
              const { data } = parseFrontmatter(content)
              llmsTxt += `- [${item.label}](${item.slug}): ${data.description || ''}\n`
            } catch {
              llmsTxt += `- [${item.label}](${item.slug})\n`
            }
          }
          llmsTxt += '\n'
        }
        
        llmsTxt += `## LLM-Optimized Documentation\n\n`
        llmsTxt += `- [Full Knowledge Base](/llms-full.txt): Complete concatenated documentation\n`
        
        await fs.writeFile(path.join(distDir, 'llms.txt'), llmsTxt)
        console.log('Generated llms.txt')
        
        // Generate llms-full.txt
        let llmsFullTxt = `# ${config.name} - Full Knowledge Base\n\n`
        llmsFullTxt += `This document contains the complete Glyph documentation for LLM consumption.\n\n`
        llmsFullTxt += `---\n\n`
        
        for (const group of config.sidebar) {
          llmsFullTxt += `# ${group.group}\n\n`
          
          for (const item of group.items) {
            const filePath = path.join(docsDir, item.file)
            try {
              const content = await fs.readFile(filePath, 'utf-8')
              const { data, content: body } = parseFrontmatter(content)
              
              llmsFullTxt += `## ${data.title || item.label}\n\n`
              llmsFullTxt += `URL: ${item.slug}\n\n`
              llmsFullTxt += `${body}\n\n`
              llmsFullTxt += `---\n\n`
            } catch {
              // Skip failed files
            }
          }
        }
        
        await fs.writeFile(path.join(distDir, 'llms-full.txt'), llmsFullTxt)
        console.log('Generated llms-full.txt')
      } catch (err) {
        console.error('Failed to generate LLM files:', err)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    { enforce: 'pre', ...mdx() },
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
          'mermaid': ['mermaid'],
        }
      }
    }
  }
})
