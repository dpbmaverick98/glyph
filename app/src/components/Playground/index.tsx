import type { ReactNode } from 'react';
import React from 'react';
import { Playground } from './Playground';
import type { PlaygroundConfig } from './usePlayground';

interface PlaygroundErrorBoundaryProps {
  children: ReactNode;
}

interface PlaygroundErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error boundary to prevent playground crashes from breaking docs
class PlaygroundErrorBoundary extends React.Component<
  PlaygroundErrorBoundaryProps,
  PlaygroundErrorBoundaryState
> {
  constructor(props: PlaygroundErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): PlaygroundErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Playground error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="p-6 rounded-lg border my-6"
          style={{ 
            background: 'rgba(239, 68, 68, 0.05)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#ef4444' }}>
            Playground Error
          </h3>
          <p style={{ color: 'var(--theme-muted)' }}>
            {this.state.error?.message || 'Something went wrong loading the playground.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 rounded text-sm font-medium"
            style={{ 
              background: 'var(--theme-primary)',
              color: 'var(--theme-background)'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface SafePlaygroundProps {
  config: PlaygroundConfig;
}

export function SafePlayground({ config }: SafePlaygroundProps) {
  return (
    <PlaygroundErrorBoundary>
      <Playground config={config} />
    </PlaygroundErrorBoundary>
  );
}

// Re-export Playground for direct use (with error boundary responsibility on consumer)
export { Playground };
export type { PlaygroundConfig, Endpoint, Param, HttpMethod, Language } from './usePlayground';
