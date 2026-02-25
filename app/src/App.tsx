import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Menu, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Twitter, 
  MessageCircle,
  FileText,
  Bot,
} from 'lucide-react';
import { SearchModal, SearchTrigger } from './components/Search';
import { Hero } from './components/Hero';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { DocNavigation } from './components/DocNavigation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { loadDocs, findDocFileBySlug, getDocNavigation } from './hooks/useDocs';
import { configureMarked } from './lib/marked';
import type { DocsConfig, DocContent, DocItem, SidebarGroup } from './types';
import docsConfig from '../docs/docs.json';
import './App.css';

configureMarked();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || '';
  });

  const config = docsConfig as DocsConfig;
  const docs = useMemo(() => loadDocs(config), [config]);
  
  const currentDocFile = currentSlug ? findDocFileBySlug(currentSlug, config) : null;
  const currentDoc = currentDocFile ? docs[currentDocFile] : null;
  
  const { prev, next } = useMemo(() => 
    currentSlug ? getDocNavigation(currentSlug, config) : { prev: undefined, next: undefined },
    [currentSlug, config]
  );

  const handleNavigate = useCallback((slug: string) => {
    setCurrentSlug(slug);
    window.location.hash = slug;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash !== currentSlug) {
        setCurrentSlug(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSlug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleCopyClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.copy-btn') as HTMLButtonElement | null;
      if (!btn) return;
      
      const code = decodeURIComponent(btn.getAttribute('data-code') || '');
      await navigator.clipboard.writeText(code);
      
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, [currentDoc?.content]);

  const breadcrumbItems = useMemo(() => {
    if (!currentSlug) return [];
    const parts = currentSlug.split('/');
    return parts.map((part, index) => ({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: parts.slice(0, index + 1).join('/'),
    }));
  }, [currentSlug]);

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="flex">
        <Sidebar
          config={config}
          currentSlug={currentSlug}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 min-w-0">
          <Header
            onMenuToggle={() => setSidebarOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            config={config}
          />
          <main className="flex">
            <div className="flex-1 min-w-0">
              {!currentSlug ? (
                <Hero onNavigate={handleNavigate} />
              ) : currentDoc ? (
                <article className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
                  <Breadcrumbs items={breadcrumbItems} onNavigate={handleNavigate} />
                  {currentDoc.status && (
                    <div className="mb-4">
                      <span className="badge-coming-soon capitalize">{currentDoc.status}</span>
                    </div>
                  )}
                  <h1 className="text-4xl font-bold text-foreground mb-4">{currentDoc.title}</h1>
                  {currentDoc.description && (
                    <p className="text-lg text-muted-foreground mb-8">{currentDoc.description}</p>
                  )}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentDoc.content }}
                  />
                  <DocNavigation prev={prev} next={next} onNavigate={handleNavigate} />
                </article>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-muted-foreground">Document not found</p>
                </div>
              )}
            </div>
            {currentDoc && <TableOfContents content={currentDoc.content} />}
          </main>
        </div>
      </div>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

function Sidebar({ config, currentSlug, onNavigate, isOpen, onClose }: { 
  config: DocsConfig; currentSlug: string; onNavigate: (slug: string) => void; isOpen: boolean; onClose: () => void;
}) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-background border-r border-border flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-border">
          <a href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground tracking-wider">OBUL</span>
          </a>
          <p className="text-xs text-muted-foreground mt-1">Documentation</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {config.sidebar.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">{group.group}</h3>
              <ul className="space-y-0.5">
                {group.items.map((item, itemIndex) => {
                  const isActive = item.slug === currentSlug;
                  return (
                    <li key={itemIndex}>
                      <button
                        onClick={() => { onNavigate(item.slug); onClose(); }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-secondary'}`}
                      >
                        <span>{item.label}</span>
                        {item.badge && <span className="badge-coming-soon">{item.badge}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <a href={config.nav.social.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <a href={config.nav.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href={config.nav.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-4 h-4" /></a>
          </div>
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Bot className="w-3 h-3" />LLM-Friendly</p>
            <div className="flex flex-col gap-1">
              <a href="/llms.txt" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><FileText className="w-3 h-3" />llms.txt</a>
              <a href="/llms-full.txt" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><FileText className="w-3 h-3" />llms-full.txt</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuToggle, onOpenSearch, config }: { onMenuToggle: () => void; onOpenSearch: () => void; config: DocsConfig }) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground"><Menu className="w-5 h-5" /></button>
          <span className="lg:hidden text-lg font-bold text-foreground tracking-wider">OBUL</span>
        </div>
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <SearchTrigger onClick={onOpenSearch} />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {config.nav.links.map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors">
              {link.label}<ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h2s = doc.querySelectorAll('h2');
    return Array.from(h2s).map(h2 => ({
      id: h2.id,
      text: h2.textContent?.replace('#', '').trim() || '',
    }));
  }, [content]);
  
  if (headings.length === 0) return null;
  
  return (
    <div className="hidden xl:block w-64 pl-8">
      <div className="sticky top-20">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On this page</h4>
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li key={index}>
              <a href={`#${heading.id}`} className="text-sm text-foreground/60 hover:text-primary transition-colors line-clamp-2">{heading.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithTheme;
