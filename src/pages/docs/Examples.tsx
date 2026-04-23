import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const auth = `api.use(async (ctx, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    ctx.config.headers = {
      ...ctx.config.headers,
      Authorization: \`Bearer \${token}\`,
    };
  }
  await next();
});`;

const logging = `api.use(async (ctx, next) => {
  const start = Date.now();
  console.log(\`→ \${ctx.config.method} \${ctx.config.url}\`);
  await next();
  const ms = Date.now() - start;
  console.log(\`← \${ctx.response.status} in \${ms}ms\`);
});`;

const fullStack = `import { create, dispatch, dedupe, cachePlugin, rateLimit } from "@suamnkayal/reqnest";

export const api = create({
  baseURL: "https://api.example.com",
  timeout: 8000,
});

api.use(dedupe);
api.use(cachePlugin);
api.use(rateLimit(4));
api.use(dispatch);

// Cancellation
const ctrl = new AbortController();
const promise = api.get("/slow", { signal: ctrl.signal });
ctrl.abort();`;

export default function Examples() {
  return (
    <DocsLayout>
      <DocPage
        slug="examples"
        title="Examples"
        description="Real-world recipes for using Reqnest in production."
      >
        <h2>Auth header injection</h2>
        <CodeBlock language="typescript" code={auth} />

        <h2>Request timing logs</h2>
        <CodeBlock language="typescript" code={logging} />

        <h2>A production-ready instance</h2>
        <p>Dedupe, cache, rate-limit, and abort — all in 15 lines.</p>
        <CodeBlock language="typescript" filename="lib/api.ts" code={fullStack} />

        <h3>Best practices</h3>
        <ul>
          <li>Define your instance once, in a single module, and import it everywhere.</li>
          <li>Always pass an <code>AbortSignal</code> for user-cancelable flows.</li>
          <li>Test middleware in isolation by calling them with a fake context and next.</li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
