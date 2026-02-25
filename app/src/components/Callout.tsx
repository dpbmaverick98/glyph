import type { ReactNode } from 'react';
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Lightbulb
} from 'lucide-react';

interface CalloutProps {
  children: ReactNode;
  title?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
  tip: Lightbulb,
};

const styles = {
  info: 'callout-info',
  warning: 'callout-warning',
  success: 'callout-success',
  error: 'callout-error',
  tip: 'callout-info border-purple-500/50 bg-purple-500/10',
};

export function Callout({ children, title, type = 'info' }: CalloutProps) {
  const Icon = icons[type];
  const styleClass = styles[type];
  
  return (
    <div className={`callout ${styleClass}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
        <div className="flex-1">
          {title && (
            <p className="font-semibold mb-1">{title}</p>
          )}
          <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}
