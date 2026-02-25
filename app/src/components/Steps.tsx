import type { ReactNode } from 'react';

interface StepsProps {
  children: ReactNode;
}

interface StepProps {
  title: string;
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="space-y-6 my-6">{children}</div>
  );
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ 
            background: 'var(--theme-primary)', 
            color: 'var(--theme-background)'
          }}
        >
          •
        </div>
        <div 
          className="w-px flex-1 mt-2"
          style={{ background: 'var(--theme-border)' }}
        />
      </div>
      <div className="flex-1 pb-6">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--theme-foreground)' }}>
          {title}
        </h3>
        <div style={{ color: 'var(--theme-muted)' }}>{children}</div>
      </div>
    </div>
  );
}
