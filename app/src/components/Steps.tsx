import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function Step({ number, title, children, isActive, isCompleted }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isCompleted
              ? 'bg-primary text-primary-foreground'
              : isActive
              ? 'bg-primary/20 text-primary border-2 border-primary'
              : 'bg-secondary text-muted-foreground border-2 border-border'
          }`}
        >
          {isCompleted ? <Check className="w-4 h-4" /> : number}
        </div>
        <div className="w-0.5 flex-1 bg-border my-2" />
      </div>
      
      <div className="flex-1 pb-8">
        <h4 className={`font-semibold mb-2 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </h4>
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6">
      {children}
    </div>
  );
}
