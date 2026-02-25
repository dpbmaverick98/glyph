import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DocNavItem {
  label: string;
  slug: string;
}

interface DocNavigationProps {
  prev?: DocNavItem;
  next?: DocNavItem;
  onNavigate: (slug: string) => void;
}

export function DocNavigation({ prev, next, onNavigate }: DocNavigationProps) {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.slug)}
            className="flex items-center gap-2 text-left group"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground">Previous</p>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {prev.label}
              </p>
            </div>
          </button>
        ) : (
          <div />
        )}
        
        {next ? (
          <button
            onClick={() => onNavigate(next.slug)}
            className="flex items-center gap-2 text-right group ml-auto"
          >
            <div>
              <p className="text-xs text-muted-foreground">Next</p>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {next.label}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
