import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Palette, Code, Globe, Github, Check } from 'lucide-react';
import { useThemePreset } from '../themes/ThemePresetProvider';
import type { Theme } from '../themes/registry';

interface LandingPageProps {
  onNavigate: (slug: string) => void;
}

function ThemeCard({ theme, isActive, onClick }: { theme: Theme; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-300 text-left
        ${isActive 
          ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
          : 'border-[var(--theme-border)] hover:border-[var(--theme-primary)]/50'
        }
      `}
    >
      <div 
        className="w-full aspect-video rounded-lg mb-3 border"
        style={{ 
          background: theme.colors.background,
          borderColor: theme.colors.border,
          boxShadow: `0 4px 20px ${theme.colors.primary}20`
        }}
      >
        <div className="p-3 space-y-2">
          <div 
            className="h-2 w-12 rounded"
            style={{ background: theme.colors.primary }}
          />
          <div 
            className="h-1.5 w-20 rounded"
            style={{ background: theme.colors.muted }}
          />
          <div 
            className="h-1.5 w-16 rounded"
            style={{ background: theme.colors.muted }}
          />
          <div 
            className="mt-2 h-6 w-full rounded"
            style={{ background: theme.colors.card }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[var(--theme-foreground)]">{theme.name}</h3>
          <p className="text-xs text-[var(--theme-muted)]">{theme.description}</p>
        </div>
        {isActive && (
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: theme.colors.primary }}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: typeof Zap; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)]/50 hover:bg-[var(--theme-card)] transition-all duration-300 group">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ background: 'var(--theme-primary)', opacity: 0.1 }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
      </div>
      <h3 className="font-semibold text-[var(--theme-foreground)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--theme-muted)]">{description}</p>
    </div>
  );
}

function CodePreview() {
  const [copied, setCopied] = useState(false);
  const code = 'npx create glyph-docs@latest my-docs';

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--theme-border)]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-xs text-[var(--theme-muted)]">terminal</span>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--theme-primary)' }}>$</span>
          <span className="ml-2 text-[var(--theme-foreground)]">{code}</span>
          <button
            onClick={copy}
            className="text-xs px-2 py-1 rounded border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-colors"
            style={{ color: copied ? 'var(--theme-accent)' : 'var(--theme-muted)' }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="mt-4 space-y-1 text-[var(--theme-muted)]">
          <div>✓ Creating project...</div>
          <div>✓ Installing dependencies...</div>
          <div>✓ Ready! Run: cd my-docs && npm run dev</div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { theme, setTheme, availableThemes } = useThemePreset();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => onNavigate('getting-started/quickstart');
  const handleDocs = () => onNavigate('core/what-is-glyph');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[var(--theme-background)]/80 backdrop-blur-xl border-b border-[var(--theme-border)]' : ''}
      `}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: 'var(--theme-primary)' }}
            >
              G
            </div>
            <span className="font-semibold text-[var(--theme-foreground)]">Glyph</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/dpbmaverick98/glyph"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-foreground)] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ 
              background: 'var(--theme-primary)', 
              opacity: 0.1,
              borderColor: 'var(--theme-primary)',
              color: 'var(--theme-primary)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Now with 5 beautiful themes
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--theme-foreground)' }}
          >
            Documentation that
            <br />
            <span style={{ color: 'var(--theme-primary)' }}>looks incredible.</span>
          </h1>
          
          <p className="text-lg sm:text-xl mb-4 max-w-2xl mx-auto" style={{ color: 'var(--theme-muted)' }}>
            The documentation framework with personality. 
            Write Markdown, pick a theme, deploy anywhere.
          </p>
          
          <p className="text-sm mb-10 max-w-xl mx-auto" style={{ color: 'var(--theme-muted)', opacity: 0.7 }}>
            No complex setup. No design skills needed. Just beautiful docs in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all hover:scale-105"
              style={{ background: 'var(--theme-primary)' }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDocs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-colors"
              style={{ 
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-foreground)'
              }}
            >
              View Documentation
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="max-w-3xl mx-auto">
            <p className="text-sm mb-4" style={{ color: 'var(--theme-muted)' }}>
              Try a theme:
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {availableThemes.map((t) => (
                <ThemeCard
                  key={t.id}
                  theme={t}
                  isActive={theme.id === t.id}
                  onClick={() => setTheme(t.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart Preview */}
      <section className="py-20 px-4 border-y" style={{ borderColor: 'var(--theme-border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--theme-foreground)' }}>
                Start in seconds
              </h2>
              <p className="mb-6" style={{ color: 'var(--theme-muted)' }}>
                One command. One minute. Your docs are live.
              </p>
              
              <ul className="space-y-3">
                {[
                  'No configuration needed',
                  'Hot reload in development',
                  'Optimized builds for production',
                  'Deploy anywhere (Vercel, Netlify, etc.)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--theme-accent)' }} />
                    <span style={{ color: 'var(--theme-foreground)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <a 
                  href="https://vercel.com/new/clone?repository-url=https://github.com/dpbmaverick98/glyph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                  style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-foreground)' }}
                >
                  <img src="https://vercel.com/favicon.ico" alt="" className="w-4 h-4" />
                  Deploy to Vercel
                </a>
              </div>
            </div>
            
            <CodePreview />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--theme-foreground)' }}>
              Everything you need
            </h2>
            <p style={{ color: 'var(--theme-muted)' }}>
              Built for developers who care about design
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={Palette}
              title="5 Beautiful Themes"
              description="From minimal to cyberpunk. Switch instantly with one click."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Built with Vite. Instant hot reload. Optimized builds."
            />
            <FeatureCard
              icon={Code}
              title="MDX Support"
              description="Embed React components in your Markdown. Full flexibility."
            />
            
            <FeatureCard
              icon={Globe}
              title="Search Built-in"
              description="Offline-capable search with Pagefind. No external services."
            />
            
            <FeatureCard
              icon={Github}
              title="Open Source"
              description="Free forever. Full source access. MIT license."
            />
            
            <FeatureCard
              icon={Sparkles}
              title="Dark Mode"
              description="Automatic dark mode with system preference detection."
            />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 border-y" style={{ borderColor: 'var(--theme-border)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--theme-foreground)' }}>
            Why developers choose Glyph
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--theme-border)' }}>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: 'var(--theme-muted)' }}>Feature</th>
                  <th className="text-center py-4 px-4 font-medium" style={{ color: 'var(--theme-primary)' }}>Glyph</th>
                  <th className="text-center py-4 px-4 font-medium" style={{ color: 'var(--theme-muted)' }}>Mintlify</th>
                  <th className="text-center py-4 px-4 font-medium" style={{ color: 'var(--theme-muted)' }}>Docusaurus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Multiple Themes', true, false, false],
                  ['Self-hosted', true, false, true],
                  ['Truly Free', true, 'limited', true],
                  ['Bundle Size', '~50KB', 'cloud', '~200KB'],
                  ['Custom Components', true, false, true],
                  ['Built-in Search', true, true, 'plugin'],
                ].map(([feature, glyph, mintlify, docusaurus], i) => (
                  <tr key={i} className="border-b" style={{ borderColor: 'var(--theme-border)' }}>
                    <td className="py-4 px-4" style={{ color: 'var(--theme-foreground)' }}>{feature}</td>
                    <td className="text-center py-4 px-4">
                      {glyph === true ? (
                        <Check className="w-5 h-5 mx-auto" style={{ color: 'var(--theme-accent)' }} />
                      ) : (
                        <span style={{ color: 'var(--theme-foreground)' }}>{glyph}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {mintlify === true ? (
                        <Check className="w-5 h-5 mx-auto" style={{ color: 'var(--theme-muted)' }} />
                      ) : mintlify === false ? (
                        <span className="text-[var(--theme-muted)]">—</span>
                      ) : (
                        <span style={{ color: 'var(--theme-muted)' }}>{mintlify}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {docusaurus === true ? (
                        <Check className="w-5 h-5 mx-auto" style={{ color: 'var(--theme-muted)' }} />
                      ) : docusaurus === false ? (
                        <span className="text-[var(--theme-muted)]">—</span>
                      ) : (
                        <span style={{ color: 'var(--theme-muted)' }}>{docusaurus}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--theme-foreground)' }}>
            Ready to build beautiful docs?
          </h2>
          
          <p className="mb-8" style={{ color: 'var(--theme-muted)' }}>
            Join developers who chose documentation with personality.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-white text-lg transition-all hover:scale-105"
            style={{ background: 'var(--theme-primary)' }}
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="mt-4 text-sm" style={{ color: 'var(--theme-muted)' }}>
            Free forever. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--theme-primary)' }}
            >
              G
            </div>
            <span className="text-sm" style={{ color: 'var(--theme-muted)' }}>© 2025 Glyph</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/dpbmaverick98/glyph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--theme-muted)' }}
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com/glyphai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--theme-muted)' }}
            >
              Twitter
            </a>
            <a 
              href="https://discord.gg/glyph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--theme-muted)' }}
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
