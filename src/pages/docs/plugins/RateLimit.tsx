import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const example = `api.use(rateLimit(2)); // max 2 in-flight at a time

await Promise.all([
  api.get("/item/1"),  // ← starts immediately
  api.get("/item/2"),  // ← starts immediately
  api.get("/item/3"),  // ← queued
  api.get("/item/4"),  // ← queued
]);`;

export default function RateLimit() {
  return (
    <DocsLayout>
      <DocPage
        slug="rate-limit"
        title="Rate Limiting"
        description="Queues requests and enforces a concurrency cap to protect your server or stay within third-party API limits."
      >
        <h2>Usage</h2>
        <CodeBlock language="typescript" code={example} />

        <h2>How it works</h2>
        <ul>
          <li>
            <code>rateLimit(n)</code> allows at most <strong>n</strong>{" "}
            in-flight requests.
          </li>
          <li>Anything beyond the limit is queued FIFO.</li>
          <li>As each request completes, the next queued one starts.</li>
        </ul>

        <h3>Best practices</h3>
        <ul>
          <li>
            Match the limit to your upstream API's documented concurrency cap.
          </li>
          <li>
            Combine with <a href="/docs/plugins/retry">retry</a> for resilience
            against rate-limited 429 responses.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
