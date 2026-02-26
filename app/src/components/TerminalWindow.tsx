import type { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  showPrompt?: boolean;
}

export function TerminalWindow({ 
  children, 
  title = 'terminal', 
  showPrompt = false 
}: TerminalWindowProps) {
  return (
    <div 
      className="rounded-lg overflow-hidden my-4 font-mono text-sm"
      style={{ 
        background: '#0c0c0c',
        border: '1px solid #333'
      }}
    >
      <div 
        className="flex items-center gap-2 px-4 py-2"
        style={{ 
          background: '#1a1a1a',
          borderBottom: '1px solid #333'
        }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500">{title}</span>
      </div>
      
      <div className="p-4" style={{ color: '#00ff41' }}>
        {showPrompt && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">user@host</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function TerminalCommand({ 
  command, 
  output 
}: { 
  command: string; 
  output?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">user@host</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
        <span className="ml-2" style={{ color: '#00ff41' }}>{command}</span>
      </div>
      {output && (
        <div className="mt-1 text-gray-300 whitespace-pre-wrap">{output}</div>
      )}
    </div>
  );
}
