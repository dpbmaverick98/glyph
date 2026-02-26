---
title: Playground
description: Interactive API playground for testing endpoints
sidebar_position: 8
---

# Playground

The Playground component provides an interactive API testing interface similar to Exa's playground - with form-based configuration, multi-language code generation, and live request execution.

## Features

- **Split-pane layout** - Configuration on left, code and response on right
- **Resizable panels** - Drag to adjust panel sizes
- **Multi-language code generation** - cURL, JavaScript, Python, Go, Rust
- **Live request execution** - Test APIs directly from the docs
- **Theme-aware styling** - Adapts to all 8 Glyph themes
- **Error boundaries** - Won't crash your docs if something breaks

## Basic Usage

```tsx
import { SafePlayground } from '@/components';

<SafePlayground
  config={{
    baseUrl: 'https://api.example.com',
    endpoints: [
      {
        method: 'GET',
        path: '/users/{id}',
        description: 'Get a user by ID',
        params: {
          path: [
            { name: 'id', type: 'string', required: true, description: 'User ID' }
          ],
          query: [
            { name: 'expand', type: 'boolean', default: false, description: 'Include related data' }
          ]
        }
      }
    ]
  }}
/>
```

## Configuration

### PlaygroundConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `baseUrl` | `string` | ✅ | Base URL for all endpoints |
| `endpoints` | `Endpoint[]` | ✅ | Array of endpoint definitions |
| `defaultApiKey` | `string` | - | Default API key for authorization |
| `apiKeyHeader` | `string` | - | Header name for API key (default: `Authorization`) |

### Endpoint

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `method` | `HttpMethod` | ✅ | HTTP method (GET, POST, PUT, PATCH, DELETE) |
| `path` | `string` | ✅ | Endpoint path (can include `{params}`) |
| `description` | `string` | - | Description shown in the UI |
| `params` | `object` | - | Parameter definitions |

### Param

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Parameter name |
| `type` | `'string' \| 'number' \| 'boolean'` | ✅ | Parameter type |
| `required` | `boolean` | - | Whether the parameter is required |
| `default` | `string \| number \| boolean` | - | Default value |
| `description` | `string` | - | Description shown in the UI |

## Complete Example

```tsx
import { SafePlayground } from '@/components';

<SafePlayground
  config={{
    baseUrl: 'https://api.example.com/v1',
    defaultApiKey: 'sk_test_...',
    apiKeyHeader: 'X-API-Key',
    endpoints: [
      {
        method: 'GET',
        path: '/users/{id}',
        description: 'Retrieve a user by their ID',
        params: {
          path: [
            { 
              name: 'id', 
              type: 'string', 
              required: true, 
              description: 'The user ID' 
            }
          ],
          query: [
            { 
              name: 'expand', 
              type: 'boolean', 
              default: false,
              description: 'Include related resources' 
            }
          ]
        }
      },
      {
        method: 'POST',
        path: '/users',
        description: 'Create a new user',
        params: {
          header: [
            { 
              name: 'Content-Type', 
              type: 'string', 
              required: true,
              default: 'application/json'
            }
          ]
        }
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        description: 'Delete a user',
        params: {
          path: [
            { name: 'id', type: 'string', required: true }
          ]
        }
      }
    ]
  }}
/>
```

## Using Direct Playground (Advanced)

If you want to handle errors yourself:

```tsx
import { Playground } from '@/components';

// This will throw if config is invalid
<Playground config={config} />
```

Use `SafePlayground` unless you have specific error handling needs.

## Supported Languages

The Playground generates code for:

| Language | Notes |
|----------|-------|
| **cURL** | Works everywhere |
| **JavaScript** | Uses `fetch()` API |
| **Python** | Uses `requests` library |
| **Go** | Standard library only |
| **Rust** | Uses `reqwest` + `tokio` |

## Security Considerations

- API keys are stored in component state (not persisted)
- All values are escaped in generated code to prevent injection
- Requests respect CORS policies
- 30-second timeout on all requests

## Accessibility

- Keyboard navigation for language tabs (arrow keys)
- Keyboard resize for panels (arrow keys on resizers)
- ARIA labels on all interactive elements
- Focus indicators on all controls
- Screen reader announcements for response status

## Theme Integration

The Playground automatically adapts to your theme:

- **Method badges** - Color-coded by HTTP method
- **Input styling** - Uses theme colors for borders and focus
- **Code panel** - Matches theme's code block styling
- **Response status** - Success/error colors from theme

## Error Handling

The Playground handles various error scenarios:

- **Network errors** - Shows user-friendly message
- **Timeout** - 30-second limit with clear feedback
- **Invalid JSON** - Visual validation on body input
- **CORS errors** - Displays appropriate message
- **Component errors** - Error boundary catches crashes

## Best Practices

1. **Use SafePlayground** - It includes error boundaries
2. **Provide descriptions** - Helps users understand parameters
3. **Set sensible defaults** - Reduces typing for common cases
4. **Mark required params** - Shows asterisk in UI
5. **Test your config** - Invalid configs throw on mount
6. **Consider CORS** - APIs must allow your docs domain
