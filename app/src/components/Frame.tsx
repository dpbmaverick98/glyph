import type { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
  caption?: string;
}

export function Frame({ children, caption }: FrameProps) {
  return (
    <figure className="my-6 rounded-xl overflow-hidden border border-border bg-card">
      <div className="p-1">
        {children}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t border-border bg-secondary/30">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
