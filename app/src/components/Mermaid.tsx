import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const render = async () => {
      try {
        const mermaid = await import('mermaid');
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'strict',
        });
        
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.default.render(id, chart);
        setSvg(svg);
        setError('');
      } catch (err) {
        setError('Failed to render diagram');
        console.error('Mermaid error:', err);
      }
    };

    render();
  }, [chart]);

  if (error) {
    return (
      <div 
        className="p-4 rounded-lg border my-4"
        style={{ 
          background: 'var(--theme-card)',
          borderColor: 'var(--theme-border)'
        }}
      >
        <p style={{ color: 'var(--theme-muted)' }}>{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className="flex justify-center my-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
