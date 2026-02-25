import { useEffect, useRef } from 'react';

// Cache mermaid instance
let mermaidPromise: Promise<typeof import('mermaid')> | null = null;

async function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid');
  }
  return mermaidPromise;
}

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const renderChart = async () => {
      if (!ref.current) return;
      
      try {
        const mermaid = await getMermaid();
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
        });
        
        const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
        const { svg } = await mermaid.default.render(id, chart);
        ref.current.innerHTML = svg;
      } catch {
        if (ref.current) {
          ref.current.innerHTML = '<pre class="text-red-500">Failed to render diagram</pre>';
        }
      }
    };
    
    renderChart();
  }, [chart]);
  
  return <div ref={ref} className="my-6 flex justify-center" />;
}
