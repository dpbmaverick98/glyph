import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { Language } from './usePlayground';

interface PlaygroundCodeProps {
  code: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: { value: Language; label: string }[] = [
  { value: 'curl', label: 'cURL' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

export function PlaygroundCode({ 
  code, 
  language, 
  onLanguageChange 
}: PlaygroundCodeProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Language Tabs */}
      <div 
        className="flex items-center border-b"
        style={{ borderColor: 'var(--theme-border)' }}
        role="tablist"
        aria-label="Select programming language"
      >
        {languages.map((lang) => (
          <button
            key={lang.value}
            role="tab"
            aria-selected={language === lang.value}
            aria-controls="code-panel"
            onClick={() => onLanguageChange(lang.value)}
            className="px-4 py-2 text-sm font-medium transition-colors relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/30"
            style={{
              color: language === lang.value 
                ? 'var(--theme-primary)' 
                : 'var(--theme-muted)'
            }}
            onKeyDown={(e) => {
              // Arrow key navigation
              const currentIndex = languages.findIndex(l => l.value === lang.value);
              if (e.key === 'ArrowRight' && currentIndex < languages.length - 1) {
                e.preventDefault();
                onLanguageChange(languages[currentIndex + 1].value);
              } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                onLanguageChange(languages[currentIndex - 1].value);
              }
            }}
          >
            {lang.label}
            
            {language === lang.value && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'var(--theme-primary)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div 
        id="code-panel"
        role="tabpanel"
        className="flex-1 relative"
      >
        <pre 
          className="h-full p-4 overflow-auto font-mono text-sm"
          style={{ 
            background: 'var(--theme-card)',
            color: 'var(--theme-foreground)'
          }}
        >
          <code>{code}</code>
        </pre>

        {/* Copy Button */}
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          style={{ 
            background: 'var(--theme-background)',
            border: '1px solid var(--theme-border)'
          }}
          aria-label={copied ? 'Code copied' : copyError ? 'Failed to copy' : 'Copy code to clipboard'}
          title={copied ? 'Copied!' : copyError ? 'Failed to copy' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
          ) : copyError ? (
            <span className="text-xs" style={{ color: '#ef4444' }}>!</span>
          ) : (
            <Copy className="w-4 h-4" style={{ color: 'var(--theme-muted)' }} />
          )}
        </button>
      </div>
    </div>
  );
}
