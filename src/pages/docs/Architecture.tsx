import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const tree = `reqnest/
├── src/
│   ├── core/
│   │   ├── client.ts        # create() factory and instance logic
│   │   ├── compose.ts       # middleware composition engine
│   │   ├── dispatch.ts      # fetch-based terminal middleware
│   │   └── context.ts       # Context type definitions
│   │
│   ├── plugins/
│   │   ├── cache.ts         # in-memory caching
│   │   ├── dedupe.ts        # request deduplication
│   │   ├── rateLimit.ts     # concurrency limiting
│   │   └── retry.ts         # auto-retry logic
│   │
│   ├── types/
│   │   └── index.ts         # shared TypeScript interfaces
│   │
│   └── utils/
│       ├── buildURL.ts      # URL + query param serialization
│       └── parseResponse.ts # response parsing helpers
│
├── tests/
├── package.json
├── tsconfig.json
└── README.md`;

const inspirations = [
  ["Koa.js", "Async middleware composition with next()"],
  ["Fetch API", "Native, modern transport layer"],
  ["Redux middleware", "Predictable, composable pipeline"],
];

export default function Architecture() {
  return (
    <DocsLayout>
      <DocPage
        slug="architecture"
        title="Architecture"
        description="A tiny core. Every advanced feature lives in its own isolated plugin — you only pay for what you register."
      >
        <h2>Inspirations</h2>
        <div className="my-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Inspiration</th>
                <th className="px-4 py-2 font-medium">What it contributes</th>
              </tr>
            </thead>
            <tbody>
              {inspirations.map(([k, v], i) => (
                <tr
                  key={k}
                  className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Project structure</h2>
        <CodeBlock language="text" code={tree} />

        <h3>Design principles</h3>
        <ul>
          <li>The core engine stays tiny — no surprises, no hidden behavior.</li>
          <li>Every feature is a plugin you opt into.</li>
          <li>The middleware pipeline is the only public extension point.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
