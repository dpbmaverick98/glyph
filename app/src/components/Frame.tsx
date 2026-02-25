import type { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
  caption?: string;
}

export function Frame({ children, caption }: FrameProps) {
  return (
    <figure className="my-6">
      <div 
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: 'var(--theme-border)' }}
      >
        <div 
          className="flex items-center gap-2 px-4 py-2 border-b"
          style={{ 
            background: 'var(--theme-card)',
            borderColor: 'var(--theme-border)'
          }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div style={{ background: 'var(--theme-background)' }}>
          {children}
        </div>
      </div>
      
      {caption && (
        <figcaption 
          className="text-center text-sm mt-2"
          style={{ color: 'var(--theme-muted)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
