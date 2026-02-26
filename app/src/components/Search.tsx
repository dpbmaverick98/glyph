import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Loader2, FileText } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}

interface PagefindAPI {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        meta: { title: string };
        excerpt: string;
        url: string;
      }>;
    }>;
  }>;
  init: () => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindAPI;
  }
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load Pagefind
  useEffect(() => {
    if (!isOpen) return;

    const loadPagefind = async () => {
      if (!window.pagefind) {
        try {
          // @ts-expect-error - pagefind is loaded dynamically from build output
          const pagefind = await import('/pagefind/pagefind.js');
          window.pagefind = pagefind;
          await pagefind.init?.();
        } catch {
          setError('Search not available in development. Run npm run build first.');
        }
      }
    };

    loadPagefind();
    inputRef.current?.focus();
  }, [isOpen]);

  // Search handler
  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim() || !window.pagefind) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const search = await window.pagefind.search(searchQuery);
      const searchResults = await Promise.all(
        search.results.slice(0, 8).map(async (result) => {
          const data = await result.data();
          return {
            id: result.id,
            title: data.meta.title,
            excerpt: data.excerpt,
            url: data.url,
          };
        })
      );
      setResults(searchResults);
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle result click
  const handleResultClick = (url: string) => {
    const slug = url.replace(/^\//, '').replace(/\.html$/, '').replace(/^docs\//, '');
    onNavigate(slug);
    onClose();
    setQuery('');
    setResults([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          {isLoading && <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />}
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {error ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p>{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{result.title}</h4>
                      <p 
                        className="text-sm text-muted-foreground mt-1 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p className="text-sm">Start typing to search...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full max-w-md px-4 py-2 bg-secondary rounded-md text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 transition-all"
    >
      <Search className="w-4 h-4" />
      <span className="flex-1 text-left">Search documentation...</span>
      <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs bg-background rounded border border-border">
        ⌘K
      </kbd>
    </button>
  );
}
