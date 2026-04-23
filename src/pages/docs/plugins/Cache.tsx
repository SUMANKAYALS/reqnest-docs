import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const example = `api.use(cachePlugin);

const a = await api.get("/posts");  // → network call
const b = await api.get("/posts");  // → cache hit ⚡ (no network)`;

export default function Cache() {
  return (
    <DocsLayout>
      <DocPage
        slug="cache"
        title="Cache"
        description="Caches responses in-memory by URL + query params. Identical follow-up requests resolve instantly."
      >
        <h2>Usage</h2>
        <CodeBlock language="typescript" code={example} />

        <h2>How it works</h2>
        <ul>
          <li>Cache key is derived from method, URL, and query params.</li>
          <li>Lives in-memory for the lifetime of the instance.</li>
          <li>
            Skipped automatically when <code>cache: false</code> is passed per
            request.
          </li>
        </ul>

        <h3>Best practices</h3>
        <ul>
          <li>Cache GET requests — never mutating verbs.</li>
          <li>
            Combine with <a href="/docs/plugins/dedupe">dedupe</a> to avoid
            duplicate in-flight requests filling the cache.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
