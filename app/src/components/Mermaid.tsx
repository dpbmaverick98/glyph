import { useEffect, useRef } from 'react';

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const renderChart = async () => {
      if (ref.current) {
        const mermaid = await import('mermaid');
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
        });
        
        try {
          const { svg } = await mermaid.default.render('mermaid-' + Date.now(), chart);
          ref.current.innerHTML = svg;
        } catch (error) {
          ref.current.innerHTML = `<pre class="text-red-500">Failed to render diagram</pre>`;
        }
      }
    };
    
    renderChart();
  }, [chart]);
  
  return <div ref={ref} className="my-6 flex justify-center" />;
}
