import { useState, useCallback, useEffect, useMemo, useRef } from 'react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Param {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  default?: string | number | boolean;
  description?: string;
}

export interface Endpoint {
  method: HttpMethod;
  path: string;
  description?: string;
  params?: {
    path?: Param[];
    query?: Param[];
    header?: Param[];
    body?: Param[];
  };
}

export interface PlaygroundConfig {
  baseUrl: string;
  endpoints: Endpoint[];
  defaultApiKey?: string;
  apiKeyHeader?: string;
}

export type Language = 'curl' | 'javascript' | 'python' | 'go' | 'rust';

export interface PlaygroundState {
  selectedEndpoint: number;
  params: Record<string, string>;
  headers: Record<string, string>;
  body: string;
  selectedLanguage: Language;
  isLoading: boolean;
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: unknown;
    time: number;
  } | null;
  error: string | null;
}

// Escape shell arguments for curl
function escapeShell(str: string): string {
  return str.replace(/'/g, "'\"'\"'");
}

// Escape string for JavaScript template
function escapeJs(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Validate config
function validateConfig(config: PlaygroundConfig): void {
  if (!config.baseUrl) {
    throw new Error('Playground config: baseUrl is required');
  }
  if (!Array.isArray(config.endpoints) || config.endpoints.length === 0) {
    throw new Error('Playground config: endpoints must be a non-empty array');
  }
  config.endpoints.forEach((ep, i) => {
    if (!ep.method || !ep.path) {
      throw new Error(`Playground config: endpoint[${i}] must have method and path`);
    }
  });
}

export function usePlayground(config: PlaygroundConfig) {
  // Validate config on mount
  useEffect(() => {
    validateConfig(config);
  }, [config]);

  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [params, setParams] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>(
    config.defaultApiKey ? { [config.apiKeyHeader || 'Authorization']: `Bearer ${config.defaultApiKey}` } : {}
  );
  const [body, setBody] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('curl');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<PlaygroundState['response']>(null);
  const [error, setError] = useState<string | null>(null);

  const currentEndpoint = config.endpoints[selectedEndpoint];
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Build URL with path and query params
  const buildUrl = useCallback(() => {
    let url = `${config.baseUrl}${currentEndpoint.path}`;
    
    // Replace path params
    currentEndpoint.params?.path?.forEach((param) => {
      const value = params[param.name] || param.default || '';
      url = url.replace(`{${param.name}}`, encodeURIComponent(String(value)));
    });

    // Add query params
    const queryParams = new URLSearchParams();
    currentEndpoint.params?.query?.forEach((param) => {
      const value = params[param.name];
      if (value !== undefined && value !== '') {
        queryParams.append(param.name, value);
      }
    });
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  }, [config.baseUrl, currentEndpoint, params]);

  // Generate code for each language - memoized
  const generatedCode = useMemo(() => {
    const url = buildUrl();
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && body;

    const generators: Record<Language, () => string> = {
      curl: () => {
        let curl = `curl -X ${currentEndpoint.method} \\\n  '${escapeShell(url)}'`;
        
        Object.entries(headers).forEach(([key, value]) => {
          curl += ` \\\n  -H '${escapeShell(key)}: ${escapeShell(value)}'`;
        });
        
        if (hasBody) {
          curl += ` \\\n  -d '${escapeShell(body)}'`;
        }
        
        return curl;
      },

      javascript: () => {
        let js = `const response = await fetch('${escapeJs(url)}', {
  method: '${currentEndpoint.method}',
  headers: ${JSON.stringify(headers, null, 2)}`;
        
        if (hasBody) {
          js += `,
  body: JSON.stringify(${body})`;
        }
        
        js += `
});

const data = await response.json();
return data;`;
        
        return js;
      },

      python: () => {
        let py = `import requests

response = requests.${currentEndpoint.method.toLowerCase()}(
    '${escapeShell(url)}',
    headers=${JSON.stringify(headers, null, 4).replace(/"/g, "'")}`;
        
        if (hasBody) {
          py += `,
    json=${body}`;
        }
        
        py += `
)

data = response.json()
return data`;
        
        return py;
      },

      go: () => {
        const headerLines = Object.entries(headers)
          .map(([k, v]) => `    req.Header.Add("${escapeJs(k)}", "${escapeJs(v)}")`)
          .join('\n');
        
        return `package main

import (
    "fmt"
    "net/http"
    "io"
)

func main() {
    req, _ := http.NewRequest("${currentEndpoint.method}", "${escapeJs(url)}", nil)
    
${headerLines}
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
      },

      rust: () => {
        const headerLines = Object.entries(headers)
          .map(([k, v]) => `        .header("${escapeJs(k)}", "${escapeJs(v)}")`)
          .join('\n');
        
        return `use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let resp = client
        .${currentEndpoint.method.toLowerCase()}("${escapeJs(url)}")
${headerLines}
        .send()
        .await?;
    
    let body = resp.text().await?;
    println!("{}", body);
    
    Ok(())
}`;
      },
    };

    return generators[selectedLanguage]();
  }, [buildUrl, currentEndpoint.method, headers, body, selectedLanguage]);

  // Execute request with timeout
  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 30000); // 30 second timeout
    
    const startTime = performance.now();
    
    try {
      const url = buildUrl();
      const options: RequestInit = {
        method: currentEndpoint.method,
        headers: headers,
        signal: abortController.signal,
      };

      if (['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && body) {
        options.body = body;
        // Auto-add Content-Type if not present
        if (!headers['Content-Type'] && !headers['content-type']) {
          options.headers = { ...headers, 'Content-Type': 'application/json' };
        }
      }

      const res = await fetch(url, options);
      
      let responseBody: unknown;
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        responseBody = await res.json();
      } else {
        responseBody = await res.text();
      }
      
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body: responseBody,
        time: Math.round(performance.now() - startTime),
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out after 30 seconds');
        } else {
          setError(err.message);
        }
      } else {
        setError('Request failed');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [buildUrl, currentEndpoint.method, headers, body]);

  // Update param value
  const setParam = useCallback((name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Update header value
  const setHeader = useCallback((name: string, value: string) => {
    setHeaders((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Update body
  const setBodyValue = useCallback((body: string) => {
    setBody(body);
  }, []);

  // Select endpoint
  const selectEndpoint = useCallback((index: number) => {
    setSelectedEndpoint(index);
    setParams({});
    setBody('');
    setResponse(null);
    setError(null);
  }, []);

  // Select language
  const selectLanguage = useCallback((language: Language) => {
    setSelectedLanguage(language);
  }, []);

  // Initialize default params
  useEffect(() => {
    const defaults: Record<string, string> = {};
    
    currentEndpoint.params?.path?.forEach((param) => {
      if (param.default !== undefined) {
        defaults[param.name] = String(param.default);
      }
    });
    
    currentEndpoint.params?.query?.forEach((param) => {
      if (param.default !== undefined) {
        defaults[param.name] = String(param.default);
      }
    });

    setParams(defaults);
  }, [currentEndpoint]);

  return {
    state: {
      selectedEndpoint,
      params,
      headers,
      body,
      selectedLanguage,
      isLoading,
      response,
      error,
    },
    currentEndpoint,
    buildUrl,
    generatedCode,
    execute,
    setParam,
    setHeader,
    setBody: setBodyValue,
    selectEndpoint,
    selectLanguage,
  };
}
