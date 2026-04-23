import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const example = `api.use(dedupe);

// 3 requests fire at the same time
const [a, b, c] = await Promise.all([
  api.get("/posts"),
  api.get("/posts"),
  api.get("/posts"),
]);
// ☝️ Only ONE network request was made`;

export default function Dedupe() {
  return (
    <DocsLayout>
      <DocPage
        slug="dedupe"
        title="Deduplication"
        description="Collapses simultaneous identical requests into a single network call. All callers resolve with the same data."
      >
        <h2>Usage</h2>
        <CodeBlock language="typescript" code={example} />

        <h2>How it works</h2>
        <ul>
          <li>
            Requests with the same method + URL + params share a single
            in-flight promise.
          </li>
          <li>Once the promise resolves, every caller receives the same response.</li>
          <li>The next request after settle is a fresh network call.</li>
        </ul>

        <h3>Best practices</h3>
        <ul>
          <li>
            Register <code>dedupe</code> first in the pipeline so it short-circuits
            before cache and rate-limit even see the duplicates.
          </li>
          <li>
            Especially valuable in React apps where multiple components mount
            simultaneously and request the same data.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
