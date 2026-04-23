import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const signature = `// Signature
type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>;

interface Context {
  config: ReqnestConfig;        // outgoing request config (mutate to modify)
  response?: ReqnestResponse;   // set after dispatch runs
}`;

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

const errors = `api.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    myErrorTracker.capture({ url: ctx.config.url, status: err.status });
    throw err; // always re-throw so callers still receive the error
  }
});`;

export default function Middleware() {
  return (
    <DocsLayout>
      <DocPage
        slug="middleware"
        title="Middleware System"
        description="Hook into any part of the request lifecycle with Koa-inspired async middleware."
      >
        <h2>Signature</h2>
        <p>
          A middleware is an <code>async</code> function that receives a{" "}
          <code>ctx</code> object and a <code>next</code> handler. Mutate{" "}
          <code>ctx.config</code> before calling <code>next()</code> to modify
          the outgoing request, and read <code>ctx.response</code> afterwards.
        </p>
        <CodeBlock language="typescript" code={signature} />

        <h2>Auth middleware</h2>
        <CodeBlock language="typescript" code={auth} />

        <h2>Logging middleware</h2>
        <CodeBlock language="typescript" code={logging} />

        <h2>Error reporting middleware</h2>
        <CodeBlock language="typescript" code={errors} />

        <h3>Best practices</h3>
        <ul>
          <li>
            Always <code>await next()</code> exactly once — never call it twice
            or forget it.
          </li>
          <li>Re-throw caught errors unless you intend to swallow them.</li>
          <li>
            Keep middleware focused. One responsibility per middleware → easier
            testing and reuse.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
