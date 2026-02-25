import { useEffect, useRef } from 'react';

// Cursor glow effect
export function useCursorGlow(enabled: boolean) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, var(--theme-primary) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.15;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '0.15';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cursor.remove();
    };
  }, [enabled]);
}

// Cursor trail effect
export function useCursorTrail(enabled: boolean) {
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const trailCount = 5;
    const trails: HTMLDivElement[] = [];

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${8 - i}px;
        height: ${8 - i}px;
        background: var(--theme-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: ${0.5 - i * 0.1};
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(trail);
      trails.push(trail);
    }

    trailsRef.current = trails;

    let mouseX = 0;
    let mouseY = 0;
    const positions = Array(trailCount).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let animationId: number;

    const animate = () => {
      positions.unshift({ x: mouseX, y: mouseY });
      positions.pop();

      trails.forEach((trail, i) => {
        const pos = positions[i] || positions[positions.length - 1];
        trail.style.left = pos.x + 'px';
        trail.style.top = pos.y + 'px';
      });

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      trails.forEach(trail => trail.remove());
    };
  }, [enabled]);
}

// Blinking cursor effect (terminal style)
export function useBlinkCursor(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      
      .custom-cursor {
        position: fixed;
        width: 12px;
        height: 20px;
        background: var(--theme-primary);
        pointer-events: none;
        z-index: 9999;
        animation: blink 1s step-end infinite;
      }
      
      @keyframes blink {
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursor.remove();
      style.remove();
    };
  }, [enabled]);
}

// Scanline effect (pixel/retro)
export function useScanlines(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    scanlines.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
      pointer-events: none;
      z-index: 9990;
    `;
    document.body.appendChild(scanlines);

    return () => {
      scanlines.remove();
    };
  }, [enabled]);
}

// Grid background effect (cyber/synthwave)
export function useGridBackground(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const grid = document.createElement('div');
    grid.className = 'grid-bg';
    grid.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(var(--theme-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--theme-border) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.1;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(grid);

    return () => {
      grid.remove();
    };
  }, [enabled]);
}

// Fog effect (halloween)
export function useFogEffect(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const fog = document.createElement('div');
    fog.className = 'fog';
    fog.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 300px;
      background: linear-gradient(
        to top,
        var(--theme-primary) 0%,
        transparent 100%
      );
      opacity: 0.1;
      pointer-events: none;
      z-index: -1;
      animation: fogMove 20s ease-in-out infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fogMove {
        0%, 100% { transform: translateX(-10%); }
        50% { transform: translateX(10%); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(fog);

    return () => {
      fog.remove();
      style.remove();
    };
  }, [enabled]);
}
