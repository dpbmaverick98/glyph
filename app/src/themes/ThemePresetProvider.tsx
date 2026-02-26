import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme } from './registry';
import { themes, defaultTheme } from './registry';
import { useCursorGlow, useCursorTrail, useBlinkCursor, useScanlines, useGridBackground, useFogEffect } from './animations';
import { useThemeStyles } from './useThemeStyles';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeEffects({ theme }: { theme: Theme }) {
  // Load theme-specific CSS
  useThemeStyles(theme);
  
  // Cursor effects
  useCursorGlow(theme.animations.cursorEffect === 'glow');
  useCursorTrail(theme.animations.cursorEffect === 'trail');
  useBlinkCursor(theme.animations.cursorEffect === 'blink');
  
  // Background effects
  useScanlines(theme.id === 'pixel');
  useGridBackground(theme.id === 'cyber' || theme.id === 'synthwave');
  useFogEffect(theme.id === 'halloween');
  
  return null;
}

export function ThemePresetProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('glyph-theme-preset');
    if (saved) {
      const found = themes.find(t => t.id === saved);
      if (found) setThemeState(found);
    }
    setMounted(true);
  }, []);

  const setTheme = (themeId: string) => {
    const found = themes.find(t => t.id === themeId);
    if (found) {
      setThemeState(found);
      localStorage.setItem('glyph-theme-preset', themeId);
    }
  };

  // Apply theme CSS variables
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-foreground', theme.colors.foreground);
    root.style.setProperty('--theme-card', theme.colors.card);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-muted', theme.colors.muted);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    
    // Fonts
    root.style.setProperty('--theme-font-sans', theme.fonts.sans);
    root.style.setProperty('--theme-font-mono', theme.fonts.mono);
    if (theme.fonts.display) {
      root.style.setProperty('--theme-font-display', theme.fonts.display);
    }
    
    // Radius
    root.style.setProperty('--theme-radius', theme.radius);
    
    // Theme ID for conditional styles
    root.setAttribute('data-theme', theme.id);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: defaultTheme, setTheme, availableThemes: themes }}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: themes }}>
      <ThemeEffects theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePreset() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemePreset must be used within ThemePresetProvider');
  }
  return context;
}
