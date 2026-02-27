import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme } from './registry';
import { themes, defaultTheme } from './registry';
import { useCursorGlow, useCursorTrail, useBlinkCursor, useScanlines, useGridBackground, useFogEffect } from './animations';
import { useThemeStyles } from './useThemeStyles';

// Convert hex color to HSL format for Tailwind CSS variables
// Tailwind expects HSL format: "h 0% 0%" not hex "#ffffff"
const hexToHsl = (hex: string): string => {
  if (!hex.startsWith('#') || hex.length < 7) return hex;

  try {
    // Parse hex color
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    // Convert to CSS HSL format (degrees, percentage, percentage)
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return hex;
  }
};

// Calculate if a color is dark using YIQ formula
const isDarkColor = (color: string): boolean => {
  if (!color.startsWith('#') || color.length < 7) return false;
  try {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
  } catch {
    return false;
  }
};

// Get contrasting foreground color (black or white)
const getContrastColor = (bgColor: string): string => {
  return isDarkColor(bgColor) ? '#ffffff' : '#000000';
};

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

    // Remove light/dark class when theme preset is active
    // Theme presets are complete color schemes, so the light/dark toggle is redundant
    root.classList.remove('dark', 'light');

    // Theme-specific variables (for landing page components)
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-foreground', theme.colors.foreground);
    root.style.setProperty('--theme-card', theme.colors.card);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-muted', theme.colors.muted);
    root.style.setProperty('--theme-accent', theme.colors.accent);

    // Tailwind CSS variables (for docs components)
    // These sync theme colors with Tailwind's expected variable names
    // IMPORTANT: Convert hex to HSL format as Tailwind uses hsl(var(--name))
    root.style.setProperty('--background', hexToHsl(theme.colors.background));
    root.style.setProperty('--foreground', hexToHsl(theme.colors.foreground));
    root.style.setProperty('--primary', hexToHsl(theme.colors.primary));
    root.style.setProperty('--border', hexToHsl(theme.colors.border));
    root.style.setProperty('--muted', hexToHsl(theme.colors.muted));
    root.style.setProperty('--accent', hexToHsl(theme.colors.accent));
    root.style.setProperty('--card', hexToHsl(theme.colors.card));
    root.style.setProperty('--secondary', hexToHsl(theme.colors.secondary));

    // Also set foreground variants that Tailwind uses (with proper contrast)
    root.style.setProperty('--primary-foreground', getContrastColor(theme.colors.primary));
    root.style.setProperty('--muted-foreground', theme.colors.muted);
    root.style.setProperty('--accent-foreground', getContrastColor(theme.colors.accent));
    root.style.setProperty('--card-foreground', theme.colors.foreground);
    root.style.setProperty('--secondary-foreground', theme.colors.foreground);

    // Fonts
    root.style.setProperty('--theme-font-sans', theme.fonts.sans);
    root.style.setProperty('--theme-font-mono', theme.fonts.mono);
    if (theme.fonts.display) {
      root.style.setProperty('--theme-font-display', theme.fonts.display);
    }

    // Radius
    root.style.setProperty('--radius', theme.radius);

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
