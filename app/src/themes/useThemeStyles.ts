import { useEffect } from 'react';
import type { Theme } from './registry';

// Dynamically load theme CSS
export function useThemeStyles(theme: Theme) {
  useEffect(() => {
    const themeId = theme.id;
    const linkId = `theme-style-${themeId}`;
    
    // Remove previous theme styles
    document.querySelectorAll('[id^="theme-style-"]').forEach(el => {
      if (el.id !== linkId) {
        el.remove();
      }
    });
    
    // Check if already loaded
    if (document.getElementById(linkId)) {
      return;
    }
    
    // Load theme-specific CSS from public folder
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `/themes/${themeId}.css`;
    document.head.appendChild(link);
    
    return () => {
      // Cleanup handled by next theme load
    };
  }, [theme.id]);
}
