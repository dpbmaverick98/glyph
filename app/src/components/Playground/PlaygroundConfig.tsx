import type { Endpoint, Param, HttpMethod } from './usePlayground';

interface PlaygroundConfigProps {
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

const methodColors: Record<HttpMethod, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  PATCH: '#a855f7',
  DELETE: '#ef4444',
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
  if (param.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
          className="w-4 h-4 rounded"
        />
        <span style={{ color: 'var(--theme-muted)' }}>Enable</span>
      </label>
    );
  }

  return (
    <input
      type={param.type === 'number' ? 'number' : 'text'}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={param.description || param.name}
      className="w-full px-3 py-2 rounded border text-sm"
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
            <label className="block text-sm mb-1">
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

export function PlaygroundConfig({
  endpoint,
  params,
  headers,
  body,
  onParamChange,
  onHeaderChange,
  onBodyChange,
  onExecute,
  isLoading,
}: PlaygroundConfigProps) {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(endpoint.method);

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="px-2 py-1 rounded text-xs font-bold uppercase"
            style={{ 
              background: methodColors[endpoint.method],
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
          <h3 
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: 'var(--theme-muted)' }}
          >
            Request Body
          </h3>
          
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            placeholder="{}"
            className="w-full h-32 px-3 py-2 rounded border font-mono text-sm resize-none"
            style={{ 
              background: 'var(--theme-background)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-foreground)'
            }}
          />
        </div>
      )}

      <button
        onClick={onExecute}
        disabled={isLoading}
        className="w-full py-2 px-4 rounded font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
