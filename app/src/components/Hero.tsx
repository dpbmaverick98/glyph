import type { ReactNode } from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

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
  return (
    <button 
      onClick={() => onNavigate(slug)}
      className="group block w-full text-left p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-200 hover:border-border/80 hover:shadow-lg"
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
    </button>
  );
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 px-4 py-16 lg:py-24 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            <Zap className="w-3.5 h-3.5" />
            Now in Public Beta
          </div>
        </div>
        
        {/* Main headline */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
          One API key.
          <br />
          <span className="text-primary">The entire x402 economy.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Access 70M+ agent-to-agent payments with zero wallet management.
        </p>
        
        <p className="text-center text-sm text-muted-foreground/70 max-w-xl mx-auto mb-10">
          No private keys. No gas monitoring. No bridging. Just HTTP requests.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate('getting-started/quickstart')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://my.obul.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
        
        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <HeroCard
            icon={<Zap className="w-5 h-5 text-primary" />}
            title="Quickstart"
            description="Deploy your first payable API call in minutes with our step-by-step guide."
            slug="getting-started/quickstart"
            onNavigate={onNavigate}
          />
          
          <HeroCard
            icon={<Shield className="w-5 h-5 text-primary" />}
            title="API Reference"
            description="Complete reference for the Obul Proxy API and x402 integration."
            slug="reference/api"
            onNavigate={onNavigate}
          />
          
          <HeroCard
            icon={<Globe className="w-5 h-5 text-primary" />}
            title="What is x402?"
            description="Learn about the HTTP 402 protocol powering the agent economy."
            slug="core/x402-primer"
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
