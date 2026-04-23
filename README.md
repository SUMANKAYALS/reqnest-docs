# Reqnest

![npm version](https://img.shields.io/npm/v/@suamnkayal/reqnest)
![downloads](https://img.shields.io/npm/dm/@suamnkayal/reqnest)
![license](https://img.shields.io/npm/l/@suamnkayal/reqnest)
![TypeScript](https://img.shields.io/badge/TypeScript-supported-3178c6)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-green)

> A modern, middleware-driven HTTP client for JavaScript — Node.js and Browser.

Reqnest is a lightweight yet powerful HTTP client inspired by middleware architectures like Koa and Axios. It provides a flexible pipeline system to control request/response flow using composable plugins: retry, caching, deduplication, rate limiting, and more.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Custom Instance](#custom-instance)
- [Middleware System](#middleware-system)
- [API Reference](#api-reference)
  - [Methods](#methods)
  - [Config Options](#config-options)
  - [Response Structure](#response-structure)
- [Built-in Plugins](#built-in-plugins)
- [Error Handling](#error-handling)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- **Middleware-based architecture** — compose request/response logic in a clean, ordered pipeline
- **Automatic retry** — configurable retry logic for failed or timed-out requests
- **Built-in caching** — in-memory cache for repeated requests, no re-fetching
- **Request deduplication** — identical in-flight requests share a single underlying fetch
- **Rate limiting** — cap concurrent outgoing requests
- **Universal** — works in Node.js (via `undici`) and the browser
- **Fully extensible** — write custom plugins in minutes
- **TypeScript-first** — fully typed config, responses, and plugin APIs
- **Lightweight** — minimal dependencies, focused API

---

## Installation

```bash
npm install @suamnkayal/reqnest
```

---

## Quick Start

```js
import reqnest from "@suamnkayal/reqnest";

const res = await reqnest.get("https://jsonplaceholder.typicode.com/posts");

console.log(res.data);
```

---

## Custom Instance

```js
import {
  create,
  retry,
  cachePlugin,
  dedupe,
  rateLimit,
  dispatch,
} from "@suamnkayal/reqnest";

const api = create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Stack plugins — order matters
api.use(dedupe);       // deduplicate parallel requests
api.use(cachePlugin);  // cache successful responses
api.use(retry(2));     // retry failed calls up to 2×
api.use(rateLimit(3)); // max 3 concurrent requests
api.use(dispatch);     // always last — executes the fetch

const res = await api.get("/posts");
console.log(res.data);
```

---

## Middleware System

Reqnest uses a linear async middleware pipeline. Each layer receives a context object and a `next` function. Call `next()` to pass control downstream; everything after it runs on the way back up.

```js
api.use(async (ctx, next) => {
  // Before fetch — modify request, log, inject headers
  ctx.config.headers["X-Request-ID"] = generateId();
  console.log(`→ ${ctx.config.method} ${ctx.config.url}`);

  await next(); // hand off to the next middleware

  // After fetch — inspect response, transform data, log timing
  console.log(`← ${ctx.response?.status}`);
});
```

Pipeline execution order:

```
Request → [dedupe] → [cache] → [retry] → [rateLimit] → [dispatch] → Response
```

---

## API Reference

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `get` | `get(url, config?)` | Perform a GET request |
| `post` | `post(url, data, config?)` | POST with a request body |
| `put` | `put(url, data, config?)` | PUT — replace a resource |
| `delete` | `delete(url, config?)` | Delete a resource |
| `use` | `use(middleware)` | Register a middleware layer |

### Config Options

```ts
interface RequestConfig {
  baseURL?:           string;
  url?:               string;
  method?:            "GET" | "POST" | "PUT" | "DELETE";
  headers?:           Record<string, string>;
  params?:            Record<string, any>;
  data?:              any;
  timeout?:           number;                     // milliseconds
  responseType?:      "json" | "text" | "blob";
  signal?:            AbortSignal;
  transformRequest?:  (data: any) => any;
  transformResponse?: (data: any) => any;
}
```

### Response Structure

```ts
interface ReqnestResponse<T = any> {
  data:       T;
  status:     number;
  statusText: string;
  headers:    Headers;
  raw:        Response;
}
```

---

## Built-in Plugins

### `retry(n)`

Retries failed requests automatically up to `n` times before throwing.

```js
api.use(retry(3));
```

---

### `cachePlugin`

Caches successful GET responses in memory. Repeated identical requests return instantly without a network round-trip.

```js
api.use(cachePlugin);
```

---

### `dedupe`

Deduplicates identical in-flight requests. Multiple callers waiting on the same URL share one underlying fetch — the response is broadcast to all.

```js
api.use(dedupe);
```

---

### `rateLimit(n)`

Caps concurrent outgoing requests to `n`. Excess requests are queued and dispatched as slots open.

```js
api.use(rateLimit(2));
```

---

### `dispatch`

The terminal middleware that executes the actual HTTP fetch. **Always register this last.**

```js
api.use(dispatch);
```

---

## Error Handling

### Timeout

```js
// Automatically cancels via AbortSignal after 3 seconds
const res = await api.get("/slow-endpoint", { timeout: 3000 });
```

### Try / Catch

```js
try {
  const res = await api.get("/might-fail");
  console.log(res.data);
} catch (err) {
  // err.message → "Request timed out" | "Not Found" | network error, etc.
  console.error(err.message);
}
```

---

## Architecture

Reqnest is built on a **middleware pipeline pattern** — the same model used by Koa and Express. Every request flows through a stack of composable async functions before hitting the network.

```
Request
  └─► Middleware 1 (before)
        └─► Middleware 2 (before)
              └─► dispatch (fetch)
        └─► Middleware 2 (after)
  └─► Middleware 1 (after)
Response
```

This design makes the library:

- **Highly customizable** — inject any logic at any point in the pipeline
- **Easy to extend** — a plugin is just an async function
- **Predictable** — execution order is always explicit
- **Suitable for large-scale applications** — plugins compose cleanly without coupling

---

## Project Structure

```
src/
├── core/         # Client factory, context, pipeline runner
├── plugins/      # retry, cache, dedupe, rateLimit, dispatch
├── utils/        # URL builder, timeout helpers
├── types/        # TypeScript interfaces and types
└── index.ts      # Public API surface
```

---

## Roadmap

- [ ] Axios-compatible interceptors (request & response)
- [ ] Request cancellation helpers and AbortController wrappers
- [ ] Devtools integration and structured debug logging
- [ ] Improved browser bundle optimization (tree-shaking)
- [ ] Official plugin ecosystem and registry

---

## Contributing

Contributions are welcome! Please open an issue first to discuss significant changes.

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request

Report bugs at: [github.com/SUMANKAYALS/reqnest/issues](https://github.com/SUMANKAYALS/reqnest/tree/main/ISSUE_TEMPLATE)

---

## License

MIT License © [Suman Kayal](https://github.com/SUMANKAYALS)

---

## Author

**Suman Kayal**

- GitHub: [@SUMANKAYALS](https://github.com/SUMANKAYALS)
- npm: [@suamnkayal/reqnest](https://www.npmjs.com/package/@suamnkayal/reqnest)

---

> Built with care for developers who want real control over HTTP requests.
