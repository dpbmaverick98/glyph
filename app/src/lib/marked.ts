import { marked } from 'marked';
import type { Renderer, Tokens } from 'marked';

// Dynamic Prism loader
let Prism: typeof import('prismjs') | null = null;
const loadedLanguages = new Set<string>();

async function loadPrism() {
  if (!Prism) {
    Prism = await import('prismjs');
  }
  return Prism;
}

async function loadLanguage(lang: string) {
  if (!Prism || loadedLanguages.has(lang)) return;
  
  const languageMap: Record<string, string> = {
    'bash': 'bash',
    'sh': 'bash',
    'shell': 'bash',
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'python': 'python',
    'py': 'python',
    'go': 'go',
    'json': 'json',
    'yaml': 'yaml',
    'yml': 'yaml',
    'http': 'http',
  };
  
  const prismLang = languageMap[lang];
  if (!prismLang) return;
  
  try {
    await import(`prismjs/components/prism-${prismLang}`);
    loadedLanguages.add(lang);
  } catch {
    // Language not available
  }
}

// Token renderer helper
function renderTokens(tokens: Tokens.Generic[]): string {
  if (!tokens || !Array.isArray(tokens)) return '';
  return tokens.map((t: Tokens.Generic) => {
    if (t.type === 'text') {
      if ('tokens' in t && t.tokens && t.tokens.length > 0) {
        return renderTokens(t.tokens as Tokens.Generic[]);
      }
      return 'text' in t ? t.text : '';
    }
    if (t.type === 'strong') return `<strong>${renderTokens((t as Tokens.Strong).tokens)}</strong>`;
    if (t.type === 'em') return `<em>${renderTokens((t as Tokens.Em).tokens)}</em>`;
    if (t.type === 'codespan') return `<code class="bg-secondary px-1 py-0.5 rounded text-sm">${(t as Tokens.Codespan).text}</code>`;
    if (t.type === 'link') {
      const link = t as Tokens.Link;
      return `<a href="${link.href}" class="docs-link">${renderTokens(link.tokens)}</a>`;
    }
    if (t.type === 'newline') return '<br />';
    return 'text' in t ? t.text : '';
  }).join('');
}

// Create custom renderer
export function createRenderer(): Renderer {
  const renderer: Partial<Renderer> = {
    code({ text, lang }: Tokens.Code): string {
      const language = lang || 'text';
      const escapedCode = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      return `
        <div class="code-block my-4">
          <div class="code-block-header">
            <div class="code-block-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="code-block-lang">${language}</span>
            <button class="copy-btn" data-code="${encodeURIComponent(text)}">
              Copy
            </button>
          </div>
          <pre class="code-block-pre"><code class="language-${language}">${escapedCode}</code></pre>
        </div>
      `;
    },

    heading({ tokens, depth }: Tokens.Heading): string {
      const text = renderTokens(tokens);
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      const sizes: Record<number, string> = {
        1: 'text-3xl font-bold mt-8 mb-4',
        2: 'text-2xl font-semibold mt-8 mb-3',
        3: 'text-xl font-semibold mt-6 mb-2',
        4: 'text-lg font-medium mt-4 mb-2',
      };
      return `
        <h${depth} id="${slug}" class="group ${sizes[depth] || ''} text-foreground">
          ${text}
          <a href="#${slug}" class="heading-anchor">#</a>
        </h${depth}>
      `;
    },

    link({ href, tokens }: Tokens.Link): string {
      const text = renderTokens(tokens);
      const isExternal = href.startsWith('http');
      const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}" ${target} class="docs-link">${text}</a>`;
    },

    table({ header, rows }: Tokens.Table): string {
      const headerHtml = `<tr>${header.map((h: Tokens.TableCell) => 
        `<th class="px-4 py-3 text-left text-sm font-semibold text-foreground/80 bg-secondary border-b border-border">${renderTokens(h.tokens)}</th>`
      ).join('')}</tr>`;
      
      const bodyHtml = rows.map((row: Tokens.TableCell[]) => 
        `<tr>${row.map((cell: Tokens.TableCell) => 
          `<td class="px-4 py-3 text-sm text-foreground/70 border-b border-border">${renderTokens(cell.tokens)}</td>`
        ).join('')}</tr>`
      ).join('');
      
      return `
        <div class="overflow-x-auto my-6">
          <table class="docs-table">
            <thead>${headerHtml}</thead>
            <tbody>${bodyHtml}</tbody>
          </table>
        </div>
      `;
    },

    list({ items, ordered }: Tokens.List): string {
      const tag = ordered ? 'ol' : 'ul';
      const className = ordered ? 'list-decimal' : 'list-disc';
      const itemsHtml = items.map((item: Tokens.ListItem) => 
        `<li class="text-foreground/80">${renderTokens(item.tokens)}</li>`
      ).join('');
      return `<${tag} class="${className} pl-6 my-4 space-y-1">${itemsHtml}</${tag}>`;
    },

    blockquote({ tokens }: Tokens.Blockquote): string {
      return `<blockquote class="border-l-4 border-primary/50 pl-4 my-4 italic text-foreground/70">${renderTokens(tokens)}</blockquote>`;
    },

    paragraph({ tokens }: Tokens.Paragraph): string {
      return `<p class="my-4 text-foreground/80 leading-7">${renderTokens(tokens)}</p>`;
    },

    image({ href, title, text }: Tokens.Image): string {
      const titleAttr = title ? ` title="${title}"` : '';
      return `
        <figure class="my-6">
          <img src="${href}" alt="${text}"${titleAttr} class="rounded-lg border border-border w-full" loading="lazy" />
          ${text ? `<figcaption class="text-center text-sm text-muted-foreground mt-2">${text}</figcaption>` : ''}
        </figure>
      `;
    },
  };

  return renderer as Renderer;
}

// Configure marked
export function configureMarked() {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  marked.use({ renderer: createRenderer() });
}
