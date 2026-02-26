import type { Endpoint, Param, HttpMethod } from './usePlayground';

interface ConfigPanelProps {
  endpoint: Endpoint;
  params: Record<string, string>;
  headers: Record<string, string>;
  body: string;
  onParamChange: (name: string, value: string) => void;
  onHeaderChange: (name: string, value: string) => void;
  onBodyChange: (body: string) => void;
  onExecute: () => void;
  isLoading: boolean;
}

// Method colors using CSS variables for theme awareness
const getMethodColor = (method: HttpMethod): string => {
  const colors: Record<HttpMethod, string> = {
    GET: 'var(--theme-accent, #22c55e)',
    POST: 'var(--theme-primary, #3b82f6)',
    PUT: '#f59e0b',
    PATCH: '#a855f7',
    DELETE: '#ef4444',
  };
  return colors[method];
};

function ParamInput({ 
  param, 
  value, 
  onChange 
}: { 
  param: Param; 
  value: string; 
  onChange: (value: string) => void;
}) {
  const inputId = `param-${param.name}`;
  
  if (param.type === 'boolean') {
    return (
      <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer">
        <input
          id={inputId}
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
          className="w-4 h-4 rounded focus:ring-2 focus:ring-primary/50"
          style={{ accentColor: 'var(--theme-primary)' }}
        />
        <span style={{ color: 'var(--theme-muted)' }}>Enable</span>
      </label>
    );
  }

  return (
    <input
      id={inputId}
      type={param.type === 'number' ? 'number' : 'text'}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={param.description || param.name}
      className="w-full px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      style={{ 
        background: 'var(--theme-background)',
        borderColor: 'var(--theme-border)',
        color: 'var(--theme-foreground)'
      }}
    />
  );
}

function ParamSection({ 
  title, 
  params, 
  values, 
  onChange 
}: { 
  title: string; 
  params?: Param[]; 
  values: Record<string, string>; 
  onChange: (name: string, value: string) => void;
}) {
  if (!params || params.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: 'var(--theme-muted)' }}
      >
        {title}
      </h3>
      
      <div className="space-y-3">
        {params.map((param) => (
          <div key={param.name}>
            <label htmlFor={`param-${param.name}`} className="block text-sm mb-1">
              <span style={{ color: 'var(--theme-foreground)' }}>{param.name}</span>
              {param.required && (
                <span className="ml-1" style={{ color: '#ef4444' }}>*</span>
              )}
              <span className="ml-2 text-xs" style={{ color: 'var(--theme-muted)' }}>
                {param.type}
              </span>
            </label>
            
            {param.description && (
              <p className="text-xs mb-1" style={{ color: 'var(--theme-muted)' }}>
                {param.description}
              </p>
            )}
            
            <ParamInput
              param={param}
              value={values[param.name] || ''}
              onChange={(value) => onChange(param.name, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// JSON validation helper
function isValidJSON(str: string): boolean {
  if (!str.trim()) return true;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export function PlaygroundConfigPanel({
  endpoint,
  params,
  headers,
  body,
  onParamChange,
  onHeaderChange,
  onBodyChange,
  onExecute,
  isLoading,
}: ConfigPanelProps) {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(endpoint.method);
  const bodyValid = isValidJSON(body);
  const bodyId = 'request-body-input';

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="px-2 py-1 rounded text-xs font-bold uppercase"
            style={{ 
              background: getMethodColor(endpoint.method),
              color: '#fff'
            }}
          >
            {endpoint.method}
          </span>
          
          <code className="text-sm" style={{ color: 'var(--theme-muted)' }}>
            {endpoint.path}
          </code>
        </div>
        
        {endpoint.description && (
          <p className="text-sm" style={{ color: 'var(--theme-muted)' }}>
            {endpoint.description}
          </p>
        )}
      </div>

      <ParamSection
        title="Path Parameters"
        params={endpoint.params?.path}
        values={params}
        onChange={onParamChange}
      />

      <ParamSection
        title="Query Parameters"
        params={endpoint.params?.query}
        values={params}
        onChange={onParamChange}
      />

      <ParamSection
        title="Headers"
        params={endpoint.params?.header}
        values={headers}
        onChange={onHeaderChange}
      />

      {hasBody && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--theme-muted)' }}
            >
              Request Body
            </h3>
            
            {!bodyValid && (
              <span className="text-xs" style={{ color: '#ef4444' }}>Invalid JSON</span>
            )}
          </div>
          
          <textarea
            id={bodyId}
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            placeholder="{}"
            aria-invalid={!bodyValid}
            aria-describedby={!bodyValid ? 'body-error' : undefined}
            className={`w-full h-32 px-3 py-2 rounded border font-mono text-sm resize-none focus:outline-none focus:ring-2 transition-all ${
              !bodyValid ? 'border-red-500 focus:ring-red-500/30' : 'focus:ring-primary/30'
            }`}
            style={{ 
              background: 'var(--theme-background)',
              borderColor: !bodyValid ? '#ef4444' : 'var(--theme-border)',
              color: 'var(--theme-foreground)'
            }}
          />
          
          {!bodyValid && (
            <p id="body-error" className="text-xs mt-1" style={{ color: '#ef4444' }}>
              Please enter valid JSON
            </p>
          )}
        </div>
      )}

      <button
        onClick={onExecute}
        disabled={isLoading || !bodyValid}
        className="w-full py-2 px-4 rounded font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50"
        style={{ 
          background: 'var(--theme-primary)',
          color: 'var(--theme-background)'
        }}
      >
        {isLoading ? 'Sending...' : '▶ Send Request'}
      </button>
    </div>
  );
}
