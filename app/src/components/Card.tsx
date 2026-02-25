import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
}

export function Card({ children, title, description, href, icon }: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </>
  );
  
  if (href) {
    return (
      <a 
        href={href}
        className="docs-card block group cursor-pointer"
      >
        {content}
        <div className="flex items-center gap-1 text-sm text-primary mt-4 group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </div>
      </a>
    );
  }
  
  return (
    <div className="docs-card">
      {content}
    </div>
  );
}

interface CardGroupProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}

export function CardGroup({ children, cols = 2 }: CardGroupProps) {
  const colsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={`grid ${colsClass[cols]} gap-4 my-6`}>
      {children}
    </div>
  );
}
