import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  left: ReactNode;
  rightTop: ReactNode;
  rightBottom: ReactNode;
  defaultLeftWidth?: number;
  defaultRightTopHeight?: number;
}

export function SplitPane({ 
  left, 
  rightTop, 
  rightBottom,
  defaultLeftWidth = 40,
  defaultRightTopHeight = 50
}: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [rightTopHeight, setRightTopHeight] = useState(defaultRightTopHeight);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Horizontal resize (left/right)
  useEffect(() => {
    if (!isDraggingHorizontal) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.max(20, Math.min(60, newWidth)));
    };

    const handleMouseUp = () => {
      setIsDraggingHorizontal(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingHorizontal]);

  // Vertical resize (top/bottom of right panel)
  useEffect(() => {
    if (!isDraggingVertical) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rightPanelLeft = rect.left + (rect.width * leftWidth / 100);
      const relativeX = e.clientX - rightPanelLeft;
      
      if (relativeX > 0) {
        const rightRect = {
          top: rect.top,
          height: rect.height
        };
        const newHeight = ((e.clientY - rightRect.top) / rightRect.height) * 100;
        setRightTopHeight(Math.max(20, Math.min(80, newHeight)));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingVertical(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingVertical, leftWidth]);

  return (
    <div 
      ref={containerRef}
      className="flex h-[600px] rounded-lg overflow-hidden border"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      {/* Left Panel */}
      <div 
        className="flex flex-col overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        {left}
      </div>

      {/* Horizontal Resizer */}
      <div
        className="w-1 cursor-col-resize hover:bg-primary/50 transition-colors"
        style={{ background: 'var(--theme-border)' }}
        onMouseDown={() => setIsDraggingHorizontal(true)}
      />

      {/* Right Panel */}
      <div className="flex flex-col flex-1">
        {/* Right Top */}
        <div 
          className="overflow-auto"
          style={{ height: `${rightTopHeight}%` }}
        >
          {rightTop}
        </div>

        {/* Vertical Resizer */}
        <div
          className="h-1 cursor-row-resize hover:bg-primary/50 transition-colors"
          style={{ background: 'var(--theme-border)' }}
          onMouseDown={() => setIsDraggingVertical(true)}
        />

        {/* Right Bottom */}
        <div 
          className="flex-1 overflow-auto"
          style={{ height: `${100 - rightTopHeight}%` }}
        >
          {rightBottom}
        </div>
      </div>
    </div>
  );
}
