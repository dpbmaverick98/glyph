import type { ReactNode } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

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
  const horizontalDragRef = useRef({ startX: 0, startWidth: 0 });
  const verticalDragRef = useRef({ startY: 0, startHeight: 0 });

  // Handle horizontal resize with RAF for performance
  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    horizontalDragRef.current = { startX: e.clientX, startWidth: leftWidth };
    setIsDraggingHorizontal(true);
  }, [leftWidth]);

  // Handle vertical resize
  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    verticalDragRef.current = { startY: e.clientY, startHeight: rightTopHeight };
    setIsDraggingVertical(true);
  }, [rightTopHeight]);

  // Unified mouse move handler
  useEffect(() => {
    if (!isDraggingHorizontal && !isDraggingVertical) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Throttle to animation frame
      
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        
        if (isDraggingHorizontal && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const deltaX = e.clientX - horizontalDragRef.current.startX;
          const deltaPercent = (deltaX / rect.width) * 100;
          const newWidth = Math.max(20, Math.min(60, horizontalDragRef.current.startWidth + deltaPercent));
          setLeftWidth(newWidth);
        }
        
        if (isDraggingVertical && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const rightPanelWidth = rect.width * (1 - leftWidth / 100);
          const rightPanelLeft = rect.left + (rect.width * leftWidth / 100);
          const relativeX = e.clientX - rightPanelLeft;
          
          // Only drag if mouse is in right panel
          if (relativeX > 0 && relativeX < rightPanelWidth) {
            const deltaY = e.clientY - verticalDragRef.current.startY;
            const deltaPercent = (deltaY / rect.height) * 100;
            const newHeight = Math.max(20, Math.min(80, verticalDragRef.current.startHeight + deltaPercent));
            setRightTopHeight(newHeight);
          }
        }
      });
    };

    const handleMouseUp = () => {
      setIsDraggingHorizontal(false);
      setIsDraggingVertical(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDraggingHorizontal, isDraggingVertical, leftWidth]);

  // Handle keyboard resize
  const handleHorizontalKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setLeftWidth((w) => Math.max(20, w - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setLeftWidth((w) => Math.min(60, w + 5));
    }
  }, []);

  const handleVerticalKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setRightTopHeight((h) => Math.max(20, h - 5));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setRightTopHeight((h) => Math.min(80, h + 5));
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex min-h-[400px] max-h-[800px] rounded-lg overflow-hidden border"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      {/* Left Panel */}
      <div 
        className="flex flex-col overflow-auto min-w-[200px]"
        style={{ width: `${leftWidth}%` }}
      >
        {left}
      </div>

      {/* Horizontal Resizer */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panels horizontally"
        tabIndex={0}
        className="w-2 cursor-col-resize hover:bg-primary/50 focus:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
        style={{ background: isDraggingHorizontal ? 'var(--theme-primary)' : 'var(--theme-border)' }}
        onMouseDown={handleHorizontalMouseDown}
        onKeyDown={handleHorizontalKeyDown}
      />

      {/* Right Panel */}
      <div className="flex flex-col flex-1 min-w-[300px]">
        {/* Right Top */}
        <div 
          className="overflow-auto min-h-[100px]"
          style={{ height: `${rightTopHeight}%` }}
        >
          {rightTop}
        </div>

        {/* Vertical Resizer */}
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize panels vertically"
          tabIndex={0}
          className="h-2 cursor-row-resize hover:bg-primary/50 focus:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
          style={{ background: isDraggingVertical ? 'var(--theme-primary)' : 'var(--theme-border)' }}
          onMouseDown={handleVerticalMouseDown}
          onKeyDown={handleVerticalKeyDown}
        />

        {/* Right Bottom */}
        <div 
          className="flex-1 overflow-auto min-h-[100px]"
        >
          {rightBottom}
        </div>
      </div>
    </div>
  );
}
