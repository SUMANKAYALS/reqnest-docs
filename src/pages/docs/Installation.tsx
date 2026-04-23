import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const install = `npm install @suamnkayal/reqnest
# or
yarn add @suamnkayal/reqnest
# or
pnpm add @suamnkayal/reqnest`;

export default function Installation() {
  return (
    <DocsLayout>
      <DocPage
        slug="installation"
        title="Installation"
        description="Reqnest is published on npm as @suamnkayal/reqnest."
      >
        <h2>Install the package</h2>
        <CodeBlock language="bash" code={install} />

        <Callout variant="info" title="Requirements">
          <p>
            Requires <strong>Node.js 18+</strong> or a modern browser with
            native <code>fetch</code> support. No polyfills needed.
          </p>
        </Callout>

        <h2>TypeScript</h2>
        <p>
          Reqnest ships with first-class TypeScript types — no separate{" "}
          <code>@types</code> package required. All public APIs, the{" "}
          <code>ReqnestConfig</code> interface, and the <code>Context</code>{" "}
          type are fully typed.
        </p>

        <h3>Best practices</h3>
        <ul>
          <li>Pin a major version to avoid surprise breaking changes.</li>
          <li>
            Create one shared <code>create()</code> instance per logical API,
            not per request.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
