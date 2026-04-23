import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const example = `// Retry up to 3 times before throwing
await api.get("/flaky-endpoint", { retry: 3 });`;

export default function Retry() {
  return (
    <DocsLayout>
      <DocPage
        slug="retry"
        title="Retry"
        description="Auto-retries on network errors or 5xx responses. Won't retry 4xx client errors."
      >
        <h2>Usage</h2>
        <p>
          Pass a <code>retry</code> count per request, or register the retry
          plugin globally on the instance.
        </p>
        <CodeBlock language="typescript" code={example} />

        <h2>Behavior</h2>
        <ul>
          <li>Retries on network errors (DNS, connection reset, timeouts).</li>
          <li>Retries on 5xx server errors.</li>
          <li>
            <strong>Does not retry</strong> on 4xx client errors — those are
            usually permanent.
          </li>
        </ul>

        <h3>Best practices</h3>
        <ul>
          <li>
            Only retry idempotent methods (<code>GET</code>, <code>PUT</code>,{" "}
            <code>DELETE</code>). Retrying <code>POST</code> can cause duplicate
            writes.
          </li>
          <li>Keep retry counts small (2–3) to avoid amplifying outages.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
