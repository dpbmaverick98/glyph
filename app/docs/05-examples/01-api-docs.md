---
title: API Documentation
description: Example API documentation structure with interactive playground
sidebar_position: 1
---

# API Documentation Example

Complete example of API documentation structure using the Playground component for interactive testing.

## Overview

```markdown
---
title: API Reference
description: Complete API documentation
---

# API Reference

Base URL: `https://api.example.com/v1`

## Authentication

All requests require an API key:

```bash
curl https://api.example.com/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Rate Limits

- 1000 requests/hour for free plans
- 10000 requests/hour for paid plans
```

## Interactive Playground

Use the `Playground` component to let users test your API directly:

```tsx
import { SafePlayground } from '@/components';

<SafePlayground
  config={{
    baseUrl: 'https://api.example.com/v1',
    defaultApiKey: 'sk_demo_...',
    endpoints: [
      {
        method: 'GET',
        path: '/users',
        description: 'List all users',
        params: {
          query: [
            { name: 'limit', type: 'number', default: 10 },
            { name: 'offset', type: 'number', default: 0 }
          ]
        }
      },
      {
        method: 'GET',
        path: '/users/{id}',
        description: 'Get a specific user',
        params: {
          path: [
            { name: 'id', type: 'string', required: true }
          ]
        }
      },
      {
        method: 'POST',
        path: '/users',
        description: 'Create a new user',
        params: {
          header: [
            { name: 'Content-Type', type: 'string', default: 'application/json' }
          ]
        }
      }
    ]
  }}
/>
```

## Endpoints Structure

```
docs/
├── api/
│   ├── index.md           # API overview
│   ├── authentication.md  # Auth guide
│   ├── errors.md          # Error codes
│   └── endpoints/
│       ├── users.md
│       ├── posts.md
│       └── comments.md
```

## Endpoint Documentation

### Users

```markdown
---
title: Users
description: User management endpoints
---

# Users

## List Users

```bash
GET /users
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `limit` | number | Max results (default: 10) |
| `offset` | number | Pagination offset |

### Response

```json
{
  "users": [
    {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 100
}
```

## Get User

```bash
GET /users/:id
```

### Response

```json
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Create User

```bash
POST /users
```

### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```
```

## Code Examples

Use tabs for multiple languages:

```markdown
### List Users

<Tabs defaultValue="curl">
  <TabList>
    <Tab value="curl">cURL</Tab>
    <Tab value="js">JavaScript</Tab>
    <Tab value="python">Python</Tab>
  </TabList>
  
  <TabContent value="curl">
    ```bash
    curl https://api.example.com/v1/users \
      -H "Authorization: Bearer token"
    ```
  </TabContent>
  
  <TabContent value="js">
    ```javascript
    const users = await fetch('/users', {
      headers: { 'Authorization': 'Bearer token' }
    }).then(r => r.json());
    ```
  </TabContent>
  
  <TabContent value="python">
    ```python
    import requests
    
    users = requests.get('/users', headers={
      'Authorization': 'Bearer token'
    }).json()
    ```
  </TabContent>
</Tabs>
```

## Error Handling

```markdown
# Errors

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

## Error Response

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": {
      "field": "email",
      "issue": "is required"
    }
  }
}
```
```

## SDKs

```markdown
# SDKs

Official client libraries:

<CardGroup cols={2}>
  <Card title="JavaScript" icon="js" href="/sdks/js">
    npm install @example/sdk
  </Card>
  
  <Card title="Python" icon="python" href="/sdks/python">
    pip install example-sdk
  </Card>
  
  <Card title="Go" icon="go" href="/sdks/go">
    go get github.com/example/sdk
  </Card>
  
  <Card title="Ruby" icon="ruby" href="/sdks/ruby">
    gem install example-sdk
  </Card>
</CardGroup>
```

## Changelog

```markdown
# Changelog

## v1.2.0

- Added user search
- Improved rate limits

## v1.1.0

- Added webhooks
- New authentication method

## v1.0.0

- Initial release
```

## Best Practices

1. **Interactive playground** - Let users test endpoints live
2. **Consistent structure** - Same format for all endpoints
3. **Code examples** - Multiple languages
4. **Error documentation** - All possible errors
5. **Changelog** - Track API changes
6. **Authentication guide** - Clear auth instructions
