import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const example = `try {
  await api.get("/not-found");
} catch (err) {
  console.log(err.message);  // "Not Found"
  console.log(err.status);   // 404
  console.log(err.data);     // server error body (if any)
}`;

export default function Errors() {
  return (
    <DocsLayout>
      <DocPage
        slug="errors"
        title="Error Handling"
        description="Reqnest throws structured errors on every non-2xx response — no more checking response.ok manually."
      >
        <h2>Catching errors</h2>
        <CodeBlock language="typescript" code={example} />

        <h2>What's on the error object</h2>
        <ul>
          <li>
            <code>err.message</code> — HTTP status text (e.g. <em>Not Found</em>).
          </li>
          <li>
            <code>err.status</code> — numeric HTTP status code.
          </li>
          <li>
            <code>err.data</code> — parsed response body, if the server sent one.
          </li>
        </ul>

        <h3>Best practices</h3>
        <ul>
          <li>
            Wrap user-facing flows in <code>try/catch</code> and surface{" "}
            <code>err.message</code> in your UI.
          </li>
          <li>
            Send errors to your monitoring tool from a dedicated{" "}
            <a href="/docs/middleware">error reporting middleware</a>.
          </li>
          <li>
            Combine with the <a href="/docs/plugins/retry">retry plugin</a> for
            transient network failures.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
