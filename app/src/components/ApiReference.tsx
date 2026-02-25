import { ReactNode } from 'react';

interface ResponseFieldProps {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  children?: ReactNode;
}

export function ResponseField({ name, type, required, description, children }: ResponseFieldProps) {
  return (
    <div className="border-b border-border last:border-0 py-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <code className="text-sm font-semibold text-foreground">{name}</code>
            <span className="text-xs text-muted-foreground">{type}</span>
            {required && (
              <span className="text-xs text-red-500">required</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children && (
        <div className="mt-3 ml-4 pl-4 border-l-2 border-border">
          {children}
        </div>
      )}
    </div>
  );
}

interface ResponseExampleProps {
  language: string;
  code: string;
}

export function ResponseExample({ language, code }: ResponseExampleProps) {
  return (
    <div className="my-4">
      <div className="flex items-center justify-between px-3 py-2 bg-secondary rounded-t-lg border border-border">
        <span className="text-xs text-muted-foreground">Response</span>
        <span className="text-xs text-muted-foreground">{language}</span>
      </div>
      <pre className="p-4 bg-[#0d1117] rounded-b-lg border-x border-b border-border overflow-x-auto">
        <code className="text-sm text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}
