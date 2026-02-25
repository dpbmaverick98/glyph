import type { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

export function TerminalWindow({ children, title = 'terminal' }: TerminalWindowProps) {
  return (
    <div 
      className="rounded-lg overflow-hidden my-4 font-mono text-sm"
      style={{ background: '#0c0c0c' }}
    >
      <div 
        className="flex items-center gap-2 px-4 py-2"
        style={{ background: '#1a1a1a' }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span 
          className="ml-4 text-xs"
          style={{ color: '#666' }}
        >
          {title}
        </span>
      </div>
      
      <div className="p-4" style={{ color: '#00ff41' }}>
        {children}
      </div>
    </div>
  );
}

export function TerminalPrompt({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span style={{ color: '#00ff41' }}>$</span>
      <span style={{ color: '#cccccc' }}>{children}</span>
    </div>
  );
}

export function TerminalOutput({ children }: { children: ReactNode }) {
  return (
    <div className="text-gray-400">
      {children}
    </div>
  );
}
