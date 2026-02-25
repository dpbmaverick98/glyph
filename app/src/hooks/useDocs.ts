import type { DocItem, DocsConfig, DocContent } from '../types';
import { parseFrontmatter, parseTipBlocks } from '../lib/markdown';
import { marked } from 'marked';

// Import all markdown files
const docFiles = import.meta.glob('/docs/**/*.md', { query: '?raw', import: 'default', eager: true });

export function loadDocs(_config: DocsConfig): Record<string, DocContent> {
  const docs: Record<string, DocContent> = {};
  
  Object.entries(docFiles).forEach(([path, content]) => {
    const relativePath = path.replace('/docs/', '');
    const { data, content: body } = parseFrontmatter(content as string);
    
    docs[relativePath] = {
      title: data.title || 'Untitled',
      description: data.description || '',
      content: marked.parse(parseTipBlocks(body)) as string,
      sidebar_position: data.sidebar_position ? parseInt(data.sidebar_position) : undefined,
      status: data.status,
    };
  });
  
  return docs;
}

export function findDocFileBySlug(slug: string, config: DocsConfig): string | null {
  for (const group of config.sidebar) {
    for (const item of group.items) {
      if (item.slug === slug) {
        return item.file;
      }
    }
  }
  return null;
}

export function getFirstDocSlug(config: DocsConfig): string {
  return config.sidebar[0]?.items[0]?.slug || '';
}

export function getDocNavigation(currentSlug: string, config: DocsConfig): { prev?: DocItem; next?: DocItem } {
  const allItems: DocItem[] = [];
  config.sidebar.forEach(group => {
    allItems.push(...group.items);
  });
  
  const currentIndex = allItems.findIndex(item => item.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined,
  };
}
