export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
    muted: string;
    accent: string;
    secondary: string;
  };
  fonts: {
    sans: string;
    mono: string;
    display?: string;
  };
  radius: string;
  animations: {
    pageLoad: 'fade' | 'slide' | 'scale' | 'none';
    scrollReveal: boolean;
    hoverScale: boolean;
    cursorEffect?: 'none' | 'glow' | 'trail' | 'blink';
  };
}

export const themes: Theme[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, modern, Apple-inspired',
    preview: '/themes/minimal-preview.png',
    colors: {
      primary: '#007AFF',
      background: '#ffffff',
      foreground: '#1a1a1a',
      card: '#f5f5f7',
      border: '#e5e5e7',
      muted: '#86868b',
      accent: '#34c759',
      secondary: '#f5f5f7',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radius: '0.75rem',
    animations: {
      pageLoad: 'fade',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'none',
    },
  },
  {
    id: 'pixel',
    name: 'Pixel',
    description: 'Retro 8-bit gaming aesthetic',
    preview: '/themes/pixel-preview.png',
    colors: {
      primary: '#00ff00',
      background: '#0d1117',
      foreground: '#e6edf3',
      card: '#161b22',
      border: '#30363d',
      muted: '#8b949e',
      accent: '#ff6b6b',
      secondary: '#21262d',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Press Start 2P, monospace',
    },
    radius: '0px',
    animations: {
      pageLoad: 'none',
      scrollReveal: false,
      hoverScale: false,
      cursorEffect: 'none',
    },
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Glassmorphism with blur',
    preview: '/themes/glass-preview.png',
    colors: {
      primary: '#a855f7',
      background: '#0f0f23',
      foreground: '#fafafa',
      card: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      muted: '#a1a1aa',
      accent: '#22d3ee',
      secondary: '#1a1a2e',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radius: '1rem',
    animations: {
      pageLoad: 'scale',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'glow',
    },
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Bold, raw, Swiss design',
    preview: '/themes/brutalist-preview.png',
    colors: {
      primary: '#ff0000',
      background: '#ffffff',
      foreground: '#000000',
      card: '#f0f0f0',
      border: '#000000',
      muted: '#666666',
      accent: '#ffff00',
      secondary: '#e0e0e0',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Space Grotesk, sans-serif',
    },
    radius: '0px',
    animations: {
      pageLoad: 'slide',
      scrollReveal: false,
      hoverScale: false,
      cursorEffect: 'none',
    },
  },
  {
    id: 'cyber',
    name: 'Cyber',
    description: 'Dark, neon, cyberpunk',
    preview: '/themes/cyber-preview.png',
    colors: {
      primary: '#00f0ff',
      background: '#0a0a0f',
      foreground: '#e0e0e0',
      card: '#12121a',
      border: '#00f0ff33',
      muted: '#6b7280',
      accent: '#ff00ff',
      secondary: '#1a1a2e',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Orbitron, sans-serif',
    },
    radius: '0.5rem',
    animations: {
      pageLoad: 'fade',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'trail',
    },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Command-line hacker vibe',
    preview: '/themes/terminal-preview.png',
    colors: {
      primary: '#00ff41',
      background: '#0c0c0c',
      foreground: '#cccccc',
      card: '#161616',
      border: '#333333',
      muted: '#666666',
      accent: '#ff5f56',
      secondary: '#1a1a1a',
    },
    fonts: {
      sans: 'JetBrains Mono, monospace',
      mono: 'JetBrains Mono, monospace',
      display: 'JetBrains Mono, monospace',
    },
    radius: '0.25rem',
    animations: {
      pageLoad: 'none',
      scrollReveal: false,
      hoverScale: false,
      cursorEffect: 'blink',
    },
  },
  {
    id: 'halloween',
    name: 'Halloween',
    description: 'Spooky orange & purple',
    preview: '/themes/halloween-preview.png',
    colors: {
      primary: '#ff6600',
      background: '#1a0a2e',
      foreground: '#e8d5f2',
      card: '#2d1b4e',
      border: '#ff660033',
      muted: '#8b7aa0',
      accent: '#9d00ff',
      secondary: '#3d2a5e',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Creepster, cursive',
    },
    radius: '0.75rem',
    animations: {
      pageLoad: 'fade',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'glow',
    },
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: 'Sunset gradients, retro future',
    preview: '/themes/synthwave-preview.png',
    colors: {
      primary: '#ff00ff',
      background: '#0a0a1a',
      foreground: '#ffffff',
      card: '#1a1a3e',
      border: '#ff00ff33',
      muted: '#8b8bb0',
      accent: '#00ffff',
      secondary: '#2a2a4e',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
      display: 'Orbitron, sans-serif',
    },
    radius: '0.5rem',
    animations: {
      pageLoad: 'slide',
      scrollReveal: true,
      hoverScale: true,
      cursorEffect: 'trail',
    },
  },
];

export const defaultTheme = themes[0];
