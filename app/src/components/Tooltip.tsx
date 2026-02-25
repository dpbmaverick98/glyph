import { useState, type ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-foreground bg-card border border-border rounded shadow-lg whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-2 h-2 bg-card border border-border ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1 rotate-45 border-t-0 border-l-0' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1 rotate-45 border-b-0 border-r-0' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1 rotate-45 border-l-0 border-b-0' :
            'right-full top-1/2 -translate-y-1/2 -mr-1 rotate-45 border-r-0 border-t-0'
          }`} />
        </div>
      )}
    </div>
  );
}
