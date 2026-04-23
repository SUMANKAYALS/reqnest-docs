export type SearchEntry = {
  title: string;
  path: string;
  hash?: string;
  heading: string;
  content: string;
};

export const searchIndex: SearchEntry[] = [
  // Getting Started
  { title: "Introduction", path: "/docs/getting-started", heading: "Why Reqnest?", content: "Most HTTP clients treat the request lifecycle as an implementation detail. Reqnest exposes the full pipeline through a clean middleware system." },
  { title: "Introduction", path: "/docs/getting-started", hash: "features", heading: "Features", content: "Fetch-based, middleware pipeline, auto-retry, smart caching, deduplication, rate limiting, timeout and cancellation, plugin architecture." },
  { title: "Installation", path: "/docs/installation", heading: "Installation", content: "npm install @suamnkayal/reqnest. Requires Node.js 18+ or a modern browser with native fetch." },
  { title: "Quick Start", path: "/docs/quick-start", heading: "Quick Start", content: "Import reqnest and call get, post, put, patch or delete." },

  // Core
  { title: "Custom Instance", path: "/docs/instance", heading: "Custom Instance", content: "Create isolated client instances with their own base URL, headers, and middleware stack. Always register dispatch last." },
  { title: "Middleware", path: "/docs/middleware", heading: "Middleware System", content: "Koa-inspired async (ctx, next) composition. Write your own auth, logging, or error reporting middleware." },
  { title: "Request Methods", path: "/docs/methods", heading: "Request Methods", content: "get, post, put, patch, delete shorthand methods." },
  { title: "Error Handling", path: "/docs/errors", heading: "Error Handling", content: "Reqnest throws structured errors on all non-2xx responses with status, message, and data." },

  // Plugins
  { title: "Plugins", path: "/docs/plugins", heading: "Plugins", content: "Plugins are the superpower of Reqnest. Chain dedupe, cachePlugin, rateLimit and dispatch in any order." },
  { title: "Retry", path: "/docs/plugins/retry", heading: "Retry", content: "Auto-retries on network error or 5xx. Won't retry 4xx client errors." },
  { title: "Cache", path: "/docs/plugins/cache", heading: "Cache", content: "Caches responses in-memory by URL and query params. Second identical request is instant." },
  { title: "Deduplication", path: "/docs/plugins/dedupe", heading: "Deduplication", content: "Collapses simultaneous identical requests into a single network call." },
  { title: "Rate Limiting", path: "/docs/plugins/rate-limit", heading: "Rate Limiting", content: "Queues requests and enforces a concurrency cap to protect your server." },

  // Reference
  { title: "API Reference", path: "/docs/api", heading: "API Reference", content: "ReqnestConfig, ReqnestResponse, params, headers, timeout, retry, cache, signal, transformRequest, transformResponse." },
  { title: "Examples", path: "/docs/examples", heading: "Examples", content: "Auth middleware, logging middleware, error reporting, plugin combinations." },
  { title: "Architecture", path: "/docs/architecture", heading: "Architecture", content: "Inspired by Koa, Fetch API, and Redux middleware. Tiny core, plugin-based features." },
  { title: "vs Axios", path: "/docs/comparison", heading: "Reqnest vs Axios", content: "Middleware pipeline, plugin system, full lifecycle control, fetch-based, deduplication, smart caching, rate limiting." },
  { title: "Roadmap", path: "/docs/roadmap", heading: "Roadmap", content: "Interceptors, GraphQL support, SSR support, devtools, persistent cache." },
];
