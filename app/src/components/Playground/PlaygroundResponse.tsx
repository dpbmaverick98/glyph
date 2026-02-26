import { AlertCircle, Clock } from 'lucide-react';

interface PlaygroundResponseProps {
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: unknown;
    time: number;
  } | null;
  error: string | null;
}

export function PlaygroundResponse({ response, error }: PlaygroundResponseProps) {
  if (error) {
    return (
      <div className="h-full p-4">
        <div 
          className="flex items-center gap-2 p-4 rounded-lg"
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#ef4444' }} />
          <span style={{ color: '#ef4444' }}>{error}</span>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div 
        className="h-full flex items-center justify-center"
        style={{ color: 'var(--theme-muted)' }}
      >
        <p>Click "Send Request" to see the response</p>
      </div>
    );
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const hasHeaders = Object.keys(response.headers).length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Status Bar */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: 'var(--theme-border)' }}
      >
        <div className="flex items-center gap-3">
          <span 
            className="px-2 py-1 rounded text-sm font-medium"
            style={{ 
              background: isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isSuccess ? '#22c55e' : '#ef4444'
            }}
            aria-label={`Response status: ${response.status} ${response.statusText}`}
          >
            {response.status} {response.statusText}
          </span>
          
          <div 
            className="flex items-center gap-1 text-sm" 
            style={{ color: 'var(--theme-muted)' }}
            aria-label={`Response time: ${response.time} milliseconds`}
          >
            <Clock className="w-4 h-4" />
            {response.time}ms
          </div>
        </div>
      </div>

      {/* Response Body */}
      <div className="flex-1 overflow-auto">
        <pre 
          className="p-4 font-mono text-sm"
          style={{ color: 'var(--theme-foreground)' }}
        >
          {typeof response.body === 'string' 
            ? response.body 
            : JSON.stringify(response.body, null, 2)}
        </pre>
      </div>

      {/* Response Headers */}
      <div 
        className="border-t max-h-32 overflow-auto"
        style={{ borderColor: 'var(--theme-border)' }}
      >
        {hasHeaders ? (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                <th 
                  className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider"
                  style={{ color: 'var(--theme-muted)' }}
                >
                  Header
                </th>
                <th 
                  className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider"
                  style={{ color: 'var(--theme-muted)' }}
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(response.headers).map(([key, value]) => (
                <tr 
                  key={key} 
                  style={{ borderBottom: '1px solid var(--theme-border)' }}
                  className="hover:bg-opacity-50"
                >
                  <td 
                    className="px-4 py-1 font-medium truncate max-w-[150px]"
                    style={{ color: 'var(--theme-muted)' }}
                    title={key}
                  >
                    {key}
                  </td>
                  <td 
                    className="px-4 py-1 truncate max-w-[300px]"
                    style={{ color: 'var(--theme-foreground)' }}
                    title={value}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div 
            className="px-4 py-2 text-sm italic"
            style={{ color: 'var(--theme-muted)' }}
          >
            No response headers
          </div>
        )}
      </div>
    </div>
  );
}
