import type { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
}

interface TimelineItemProps {
  title: string;
  date?: string;
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative my-6">
      <div 
        className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: 'var(--theme-border)' }}
      />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function TimelineItem({ title, date, children }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
        style={{ 
          background: 'var(--theme-primary)',
          border: '2px solid var(--theme-background)'
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold" style={{ color: 'var(--theme-foreground)' }}>
            {title}
          </h3>
          
          {date && (
            <span className="text-sm" style={{ color: 'var(--theme-muted)' }}>
              {date}
            </span>
          )}
        </div>
        <div style={{ color: 'var(--theme-muted)' }}>{children}</div>
      </div>
    </div>
  );
}
