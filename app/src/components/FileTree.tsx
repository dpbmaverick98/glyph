import type { ReactNode } from 'react';
import { Folder, File, ChevronRight } from 'lucide-react';

interface FileTreeProps {
  children: ReactNode;
}

interface FolderProps {
  name: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

interface FileProps {
  name: string;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div 
      className="rounded-lg border p-4 my-4 font-mono text-sm"
      style={{ 
        background: 'var(--theme-card)',
        borderColor: 'var(--theme-border)'
      }}
    >
      {children}
    </div>
  );
}

export function FileTreeFolder({ name, children, defaultOpen = false }: FolderProps) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center gap-2 py-1 cursor-pointer list-none">
        <ChevronRight 
          className="w-4 h-4 transition-transform group-open:rotate-90" 
          style={{ color: 'var(--theme-muted)' }}
        />
        <Folder className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
        <span style={{ color: 'var(--theme-foreground)' }}>{name}</span>
      </summary>
      
      <div className="pl-6 border-l ml-2 mt-1" style={{ borderColor: 'var(--theme-border)' }}>
        {children}
      </div>
    </details>
  );
}

export function FileTreeFile({ name }: FileProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-4" />
      <File className="w-4 h-4" style={{ color: 'var(--theme-muted)' }} />
      <span style={{ color: 'var(--theme-muted)' }}>{name}</span>
    </div>
  );
}
