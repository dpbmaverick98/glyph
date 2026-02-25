interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: {
      background: 'var(--theme-card)',
      color: 'var(--theme-foreground)',
      border: 'var(--theme-border)'
    },
    primary: {
      background: 'var(--theme-primary)',
      color: 'var(--theme-background)',
      border: 'var(--theme-primary)'
    },
    success: {
      background: 'var(--theme-accent)',
      color: 'var(--theme-background)',
      border: 'var(--theme-accent)'
    },
    warning: {
      background: '#f59e0b',
      color: '#000',
      border: '#f59e0b'
    },
    danger: {
      background: '#ef4444',
      color: '#fff',
      border: '#ef4444'
    }
  };

  const style = variants[variant];

  return (
    <span 
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
      style={{
        background: style.background,
        color: style.color,
        borderColor: style.border
      }}
    >
      {children}
    </span>
  );
}
