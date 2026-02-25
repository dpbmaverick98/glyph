import type { ReactNode } from 'react';
import { ArrowRight, Zap, Book, Code, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (slug: string) => void;
}

interface HeroCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  slug: string;
  onNavigate: (slug: string) => void;
}

function HeroCard({ icon, title, description, slug, onNavigate }: HeroCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(slug);
  };

  return (
    <a
      href={`#${slug}`}
      onClick={handleClick}
      className="group block p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-200 hover:border-border/80 hover:shadow-lg"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-1 text-sm text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowRight className="w-4 h-4" />
      </div>
    </a>
  );
}

export function Hero({ onNavigate }: HeroProps) {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('getting-started/quickstart');
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 px-4 py-16 lg:py-24 max-w-5xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Beautiful Documentation Made Simple
          </div>
        </div>
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
          Documentation that
          <br />
          <span className="text-primary">just works.</span>
        </h1>
        
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          A lightweight documentation framework inspired by Mintlify.
        </p>
        
        <p className="text-center text-sm text-muted-foreground/70 max-w-xl mx-auto mb-10">
          Write in Markdown. Get a beautiful site. No complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#getting-started/quickstart"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/dpbmaverick98/glyph"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors"
          >
            View on GitHub
          </a>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <HeroCard
            icon={<Zap className="w-5 h-5 text-primary" />}
            title="Quickstart"
            description="Get your documentation site running in under 5 minutes."
            slug="getting-started/quickstart"
            onNavigate={onNavigate}
          />
          
          <HeroCard
            icon={<Book className="w-5 h-5 text-primary" />}
            title="Documentation"
            description="Learn about features, configuration, and best practices."
            slug="core/what-is-glyph"
            onNavigate={onNavigate}
          />
          
          <HeroCard
            icon={<Code className="w-5 h-5 text-primary" />}
            title="API Reference"
            description="Complete configuration and component API documentation."
            slug="reference/api"
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
