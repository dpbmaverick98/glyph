---
title: Tabs
description: Organize content with tabs
sidebar_position: 4
---

# Tabs

Organize content into tabbed sections.

## Basic Usage

```markdown
<Tabs defaultValue="js">
  <TabList>
    <Tab value="js">JavaScript</Tab>
    <Tab value="py">Python</Tab>
    <Tab value="go">Go</Tab>
  </TabList>
  
  <TabContent value="js">
    ```javascript
    console.log('Hello');
    ```
  </TabContent>
  
  <TabContent value="py">
    ```python
    print("Hello")
    ```
  </TabContent>
  
  <TabContent value="go">
    ```go
    fmt.Println("Hello")
    ```
  </TabContent>
</Tabs>
```

## Code Examples

Perfect for multi-language code samples:

```markdown
### API Request

<Tabs defaultValue="curl">
  <TabList>
    <Tab value="curl">cURL</Tab>
    <Tab value="js">JavaScript</Tab>
    <Tab value="python">Python</Tab>
  </TabList>
  
  <TabContent value="curl">
    ```bash
    curl https://api.example.com/users \
      -H "Authorization: Bearer token"
    ```
  </TabContent>
  
  <TabContent value="js">
    ```javascript
    const users = await fetch('/users', {
      headers: { 'Authorization': 'Bearer token' }
    });
    ```
  </TabContent>
  
  <TabContent value="python">
    ```python
    import requests
    
    users = requests.get('/users', headers={
      'Authorization': 'Bearer token'
    })
    ```
  </TabContent>
</Tabs>
```

## Installation Methods

```markdown
<Tabs defaultValue="npm">
  <TabList>
    <Tab value="npm">npm</Tab>
    <Tab value="yarn">yarn</Tab>
    <Tab value="pnpm">pnpm</Tab>
  </TabList>
  
  <TabContent value="npm">
    ```bash
    npm install my-package
    ```
  </TabContent>
  
  <TabContent value="yarn">
    ```bash
    yarn add my-package
    ```
  </TabContent>
  
  <TabContent value="pnpm">
    ```bash
    pnpm add my-package
    ```
  </TabContent>
</Tabs>
```

## Props

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | string | - | Initially active tab |
| `value` | string | - | Controlled value |
| `onValueChange` | function | - | Change callback |

### TabList

| Prop | Type | Description |
|------|------|-------------|
| `children` | Tab[] | Tab items |

### Tab

| Prop | Type | Description |
|------|------|-------------|
| `value` | string | Unique identifier |
| `children` | ReactNode | Tab label |

### TabContent

| Prop | Type | Description |
|------|------|-------------|
| `value` | string | Matching tab value |
| `children` | ReactNode | Tab content |

## Best Practices

1. **Default to most common** - Set defaultValue to the most used option
2. **Keep labels short** - 1-2 words max
3. **Consistent ordering** - Same order across pages
4. **3-5 tabs max** - More becomes hard to scan
5. **Clear labels** - Users should know what each tab contains
