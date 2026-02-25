import type { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <span className="group relative inline-block">
      {children}
      <span 
        className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ 
          background: 'var(--theme-foreground)',
          color: 'var(--theme-background)'
        }}
      >
        {content}
        <span 
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
          style={{ borderTopColor: 'var(--theme-foreground)' }}
        />
      </span>
    </span>
  );
}
