// Markdown parsing utilities
import { marked } from 'marked';

export interface FrontmatterData {
  title?: string;
  description?: string;
  sidebar_position?: string;
  status?: string;
}

export function parseFrontmatter(content: string): { data: FrontmatterData; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const body = match[2];
  
  const data: FrontmatterData = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      (data as Record<string, string>)[key.trim()] = value;
    }
  });
  
  return { data, content: body };
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Parse :::tip blocks to HTML
export function parseTipBlocks(markdown: string): string {
  const tipBlockRegex = /:::(\w+)\s*([\s\S]*?):::/g;
  return markdown.replace(tipBlockRegex, (_match, type, content) => {
    const tipTypes: Record<string, { icon: string; class: string }> = {
      tip: { icon: '💡', class: 'bg-green-500/10 border-green-500/30' },
      warning: { icon: '⚠️', class: 'bg-yellow-500/10 border-yellow-500/30' },
      danger: { icon: '🚨', class: 'bg-red-500/10 border-red-500/30' },
      info: { icon: 'ℹ️', class: 'bg-blue-500/10 border-blue-500/30' },
    };
    const { icon, class: bgClass } = tipTypes[type] || tipTypes.tip;
    
    const innerContent = marked.parseInline(content.trim());
    
    return `<div class="callout ${bgClass} rounded-lg p-4 my-4 border-l-4">
      <div class="flex items-center gap-2 font-semibold text-foreground mb-2">
        <span>${icon}</span>
        <span class="capitalize">${type}</span>
      </div>
      <div class="text-foreground/80">${innerContent}</div>
    </div>`;
  });
}
