import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const setup = `import { create, dispatch, cachePlugin, dedupe, rateLimit } from "reqnest";

const api = create({ baseURL: "https://api.example.com" });

api.use(dedupe);        // 🔄 collapse identical concurrent requests into one
api.use(cachePlugin);   // 🧠 cache responses, skip repeat network calls
api.use(rateLimit(3));  // 🚦 max 3 concurrent requests at any time
api.use(dispatch);      // 📡 send the request (always last)`;

const flow = `Request  →  dedupe  →  cache  →  rateLimit  →  dispatch  →  🌐
Response ←  dedupe  ←  cache  ←  rateLimit  ←  dispatch  ←  🌐`;

const plugins = [
  { name: "Retry", path: "/docs/plugins/retry", desc: "Auto-retry on network errors and 5xx responses." },
  { name: "Cache", path: "/docs/plugins/cache", desc: "In-memory response caching keyed by URL + params." },
  { name: "Deduplication", path: "/docs/plugins/dedupe", desc: "Collapse simultaneous identical requests." },
  { name: "Rate Limiting", path: "/docs/plugins/rate-limit", desc: "Cap concurrent in-flight requests." },
];

export default function Plugins() {
  return (
    <DocsLayout>
      <DocPage
        slug="plugins"
        title="Plugins"
        description="Plugins are the superpower of Reqnest. Chain them in any order — each one is a focused, reusable middleware."
      >
        <h2>Setup</h2>
        <CodeBlock language="typescript" filename="api.ts" code={setup} />

        <Callout variant="warning" title="dispatch is always last">
          <p>
            Middleware runs top-to-bottom on the way out, and bottom-to-top on
            the way back. Anything after <code>dispatch</code> never runs.
          </p>
        </Callout>

        <h2>Execution order</h2>
        <CodeBlock language="text" code={flow} />

        <h2>Built-in plugins</h2>
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {plugins.map((p) => (
            <a
              key={p.path}
              href={p.path}
              className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold text-foreground group-hover:underline">
                {p.name}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {p.desc}
              </span>
            </a>
          ))}
        </div>

        <h3>Best practices</h3>
        <ul>
          <li>
            Add <code>dedupe</code> early so cache and rate-limit don't track
            duplicate work.
          </li>
          <li>
            Tune <code>rateLimit</code> to your upstream API's documented
            concurrency limits.
          </li>
          <li>Only register the plugins you actually need — pay-for-what-you-use.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
