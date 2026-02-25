import type { ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return (
    <div className="my-6">
      {children}
    </div>
  );
}

interface TabGroupProps {
  children: ReactNode;
  labels: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabGroup({ children, labels, activeTab, onTabChange }: TabGroupProps) {
  return (
    <div>
      <div className="flex border-b border-border">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === index 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children}
      </div>
    </div>
  );
}

interface TabPanelProps {
  children: ReactNode;
  isActive: boolean;
}

export function TabPanel({ children, isActive }: TabPanelProps) {
  if (!isActive) return null;
  return <div>{children}</div>;
}
