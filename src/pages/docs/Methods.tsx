import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const methods = `// GET
await api.get("/posts");

// POST
await api.post("/posts", {
  title: "Hello Reqnest",
  body: "Middleware is everything.",
});

// PUT — full replacement
await api.put("/posts/1", { id: 1, title: "New Title", body: "New body" });

// PATCH — partial update
await api.patch("/posts/1", { title: "Just the title" });

// DELETE
await api.delete("/posts/1");`;

export default function Methods() {
  return (
    <DocsLayout>
      <DocPage
        slug="methods"
        title="Request Methods"
        description="Convenience shorthands for every HTTP verb. Each one delegates to the underlying middleware pipeline."
      >
        <h2>All five verbs</h2>
        <CodeBlock language="typescript" code={methods} />

        <h3>When to use which</h3>
        <ul>
          <li>
            <strong>GET</strong> — read data. Cacheable, idempotent.
          </li>
          <li>
            <strong>POST</strong> — create a new resource. Not idempotent.
          </li>
          <li>
            <strong>PUT</strong> — replace a resource entirely.
          </li>
          <li>
            <strong>PATCH</strong> — apply a partial update.
          </li>
          <li>
            <strong>DELETE</strong> — remove a resource.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
