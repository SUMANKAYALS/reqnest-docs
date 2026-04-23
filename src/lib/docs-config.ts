export type DocLink = {
  title: string;
  slug: string;
  path: string;
};

export type DocSection = {
  title: string;
  links: DocLink[];
};

export const docsConfig: DocSection[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", slug: "getting-started", path: "/docs/getting-started" },
      { title: "Installation", slug: "installation", path: "/docs/installation" },
      { title: "Quick Start", slug: "quick-start", path: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { title: "Custom Instance", slug: "instance", path: "/docs/instance" },
      { title: "Middleware", slug: "middleware", path: "/docs/middleware" },
      { title: "Request Methods", slug: "methods", path: "/docs/methods" },
      { title: "Error Handling", slug: "errors", path: "/docs/errors" },
    ],
  },
  {
    title: "Plugins",
    links: [
      { title: "Overview", slug: "plugins", path: "/docs/plugins" },
      { title: "Retry", slug: "retry", path: "/docs/plugins/retry" },
      { title: "Cache", slug: "cache", path: "/docs/plugins/cache" },
      { title: "Deduplication", slug: "dedupe", path: "/docs/plugins/dedupe" },
      { title: "Rate Limiting", slug: "rate-limit", path: "/docs/plugins/rate-limit" },
    ],
  },
  {
    title: "Reference",
    links: [
      { title: "API Reference", slug: "api", path: "/docs/api" },
      { title: "Examples", slug: "examples", path: "/docs/examples" },
      { title: "Architecture", slug: "architecture", path: "/docs/architecture" },
      { title: "vs Axios", slug: "comparison", path: "/docs/comparison" },
      { title: "Roadmap", slug: "roadmap", path: "/docs/roadmap" },
    ],
  },
];

export const flatDocs: DocLink[] = docsConfig.flatMap((s) => s.links);
