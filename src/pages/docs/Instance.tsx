import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const create = `import { create, dispatch } from "@suamnkayal/reqnest";

const api = create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
  timeout: 8000,
});

// dispatch must always be the LAST middleware — it sends the actual request
api.use(dispatch);

const res = await api.get("/users");`;

export default function Instance() {
  return (
    <DocsLayout>
      <DocPage
        slug="instance"
        title="Custom Instance"
        description="Create isolated client instances with their own base URL, headers, timeout, and middleware stack."
      >
        <h2>Creating an instance</h2>
        <p>
          Use <code>create()</code> to spin up a dedicated client. Each instance
          owns its own middleware pipeline — perfect for separating your public
          API client from an internal admin client.
        </p>
        <CodeBlock language="typescript" filename="api.ts" code={create} />

        <Callout variant="warning" title="Always register dispatch last">
          <p>
            <code>dispatch</code> is the terminal handler that performs the real
            HTTP call. Anything registered after it will never run.
          </p>
        </Callout>

        <h3>Best practices</h3>
        <ul>
          <li>Create one instance per logical API and reuse it everywhere.</li>
          <li>
            Compose plugins in a deliberate order — <code>dedupe</code> →{" "}
            <code>cache</code> → <code>rateLimit</code> → <code>dispatch</code>{" "}
            is a great default.
          </li>
          <li>
            Move shared headers (auth, content-type) into the instance config so
            every call inherits them.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
