import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const basic = `import reqnest from "@suamnkayal/reqnest";

const res = await reqnest.get("https://jsonplaceholder.typicode.com/posts");

console.log(res.data);    // parsed JSON
console.log(res.status);  // 200`;

export default function QuickStart() {
  return (
    <DocsLayout>
      <DocPage
        slug="quick-start"
        title="Quick Start"
        description="Make your first Reqnest request in under a minute."
      >
        <h2>Your first request</h2>
        <p>
          The default export is a ready-to-use client. Call <code>get</code>,{" "}
          <code>post</code>, <code>put</code>, <code>patch</code>, or{" "}
          <code>delete</code> directly.
        </p>
        <CodeBlock language="typescript" code={basic} />

        <h2>What you get back</h2>
        <p>
          Every successful response is normalized into a{" "}
          <code>ReqnestResponse</code> with parsed <code>data</code>, the HTTP{" "}
          <code>status</code>, headers, and the original{" "}
          <code>raw</code> Response object.
        </p>

        <h3>Best practices</h3>
        <ul>
          <li>
            Move past the default client as soon as you need a base URL or
            shared headers — see <a href="/docs/instance">Custom Instance</a>.
          </li>
          <li>
            Wrap calls in <code>try/catch</code> — Reqnest throws on any non-2xx
            response.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
