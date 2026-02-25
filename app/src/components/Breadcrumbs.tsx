import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  slug?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (slug: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <button
        onClick={() => onNavigate('')}
        className="hover:text-foreground transition-colors"
      >
        Home
      </button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.slug ? (
            <button
              onClick={() => onNavigate(item.slug!)}
              className={`hover:text-foreground transition-colors ${
                index === items.length - 1 ? 'text-foreground font-medium' : ''
              }`}
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? 'text-foreground font-medium' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
