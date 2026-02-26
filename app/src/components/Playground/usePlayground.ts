import { useState, useCallback, useEffect } from 'react';

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

export function usePlayground(config: PlaygroundConfig) {
  const [state, setState] = useState<PlaygroundState>({
    selectedEndpoint: 0,
    params: {},
    headers: config.defaultApiKey ? { [config.apiKeyHeader || 'Authorization']: `Bearer ${config.defaultApiKey}` } : {},
    body: '',
    selectedLanguage: 'curl',
    isLoading: false,
    response: null,
    error: null,
  });

  const currentEndpoint = config.endpoints[state.selectedEndpoint];

  // Build URL with path and query params
  const buildUrl = useCallback(() => {
    let url = `${config.baseUrl}${currentEndpoint.path}`;
    
    // Replace path params
    currentEndpoint.params?.path?.forEach((param) => {
      const value = state.params[param.name] || param.default || '';
      url = url.replace(`{${param.name}}`, encodeURIComponent(String(value)));
    });

    // Add query params
    const queryParams = new URLSearchParams();
    currentEndpoint.params?.query?.forEach((param) => {
      const value = state.params[param.name];
      if (value !== undefined && value !== '') {
        queryParams.append(param.name, value);
      }
    });
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  }, [config.baseUrl, currentEndpoint, state.params]);

  // Generate code for each language
  const generateCode = useCallback((language: Language): string => {
    const url = buildUrl();
    const headers = { ...state.headers };
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && state.body;

    switch (language) {
      case 'curl':
        let curl = `curl -X ${currentEndpoint.method} \\\n  '${url}'`;
        
        Object.entries(headers).forEach(([key, value]) => {
          curl += ` \\\n  -H '${key}: ${value}'`;
        });
        
        if (hasBody) {
          curl += ` \\\n  -d '${state.body}'`;
        }
        
        return curl;

      case 'javascript':
        let js = `const response = await fetch('${url}', {
  method: '${currentEndpoint.method}',
  headers: ${JSON.stringify(headers, null, 2)}`;
        
        if (hasBody) {
          js += `,
  body: JSON.stringify(${state.body})`;
        }
        
        js += `
});

const data = await response.json();
console.log(data);`;
        
        return js;

      case 'python':
        let py = `import requests

response = requests.${currentEndpoint.method.toLowerCase()}(
    '${url}',
    headers=${JSON.stringify(headers, null, 4).replace(/"/g, "'")}`;
        
        if (hasBody) {
          py += `,
    json=${state.body}`;
        }
        
        py += `
)

data = response.json()
print(data)`;
        
        return py;

      case 'go':
        let go = `package main

import (
    "fmt"
    "net/http"
    "io"
)

func main() {
    req, _ := http.NewRequest("${currentEndpoint.method}", "${url}", nil)
    
${Object.entries(headers).map(([k, v]) => `    req.Header.Add("${k}", "${v}")`).join('\n')}
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
        
        return go;

      case 'rust':
        let rust = `use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let resp = client
        .${currentEndpoint.method.toLowerCase()}("${url}")
${Object.entries(headers).map(([k, v]) => `        .header("${k}", "${v}")`).join('\n')}
        .send()
        .await?;
    
    let body = resp.text().await?;
    println!("{}", body);
    
    Ok(())
}`;
        
        return rust;

      default:
        return '';
    }
  }, [buildUrl, currentEndpoint.method, state.headers, state.body]);

  // Execute request
  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, response: null }));
    
    const startTime = performance.now();
    
    try {
      const url = buildUrl();
      const options: RequestInit = {
        method: currentEndpoint.method,
        headers: state.headers,
      };

      if (['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && state.body) {
        options.body = state.body;
      }

      const response = await fetch(url, options);
      const responseBody = await response.json().catch(() => null);
      
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setState((prev) => ({
        ...prev,
        isLoading: false,
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
          time: Math.round(performance.now() - startTime),
        },
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Request failed',
      }));
    }
  }, [buildUrl, currentEndpoint.method, state.headers, state.body]);

  // Update param value
  const setParam = useCallback((name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      params: { ...prev.params, [name]: value },
    }));
  }, []);

  // Update header value
  const setHeader = useCallback((name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      headers: { ...prev.headers, [name]: value },
    }));
  }, []);

  // Update body
  const setBody = useCallback((body: string) => {
    setState((prev) => ({ ...prev, body }));
  }, []);

  // Select endpoint
  const selectEndpoint = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      selectedEndpoint: index,
      params: {},
      body: '',
      response: null,
      error: null,
    }));
  }, []);

  // Select language
  const selectLanguage = useCallback((language: Language) => {
    setState((prev) => ({ ...prev, selectedLanguage: language }));
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

    setState((prev) => ({ ...prev, params: defaults }));
  }, [currentEndpoint]);

  return {
    state,
    currentEndpoint,
    buildUrl,
    generateCode,
    execute,
    setParam,
    setHeader,
    setBody,
    selectEndpoint,
    selectLanguage,
  };
}
