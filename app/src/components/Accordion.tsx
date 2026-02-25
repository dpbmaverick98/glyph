import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  children: ReactNode;
  title: string;
  defaultOpen?: boolean;
}

export function Accordion({ children, title, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-border rounded-lg overflow-hidden my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors text-left"
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 py-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionGroupProps {
  children: ReactNode;
}

export function AccordionGroup({ children }: AccordionGroupProps) {
  return (
    <div className="space-y-2 my-4">
      {children}
    </div>
  );
}
