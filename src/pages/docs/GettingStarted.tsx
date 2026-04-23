import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const pipelineDiagram = `Your App  →  [dedupe]  →  [cache]  →  [rateLimit]  →  [dispatch]  →  Network
         ←  [dedupe]  ←  [cache]  ←  [rateLimit]  ←  [dispatch]  ←`;

const features = [
  ["🌐 Fetch-based", "Works natively in Node.js 18+ and all modern browsers"],
  ["🔗 Middleware pipeline", "Koa-inspired async (ctx, next) composition"],
  ["🔁 Auto-retry", "Retry failed requests N times automatically"],
  ["🧠 Smart caching", "In-memory cache — skip redundant network calls"],
  ["🔄 Deduplication", "Identical concurrent requests collapsed into one"],
  ["🚦 Rate limiting", "Cap concurrent requests to protect your API"],
  ["⏱ Timeout & cancellation", "Auto-abort slow requests, or cancel manually via AbortSignal"],
  ["🔌 Plugin architecture", "Register composable plugins per instance"],
];

export default function GettingStarted() {
  return (
    <DocsLayout>
      <DocPage
        slug="getting-started"
        title="Introduction"
        description="Reqnest is a tiny, middleware-driven HTTP client for JavaScript and TypeScript — built on the Fetch API, inspired by Koa."
      >
        <h2>Why Reqnest?</h2>
        <p>
          Most HTTP clients treat the request lifecycle as an implementation
          detail. You get a black box that usually works — until you need
          something custom, and then you're monkey-patching interceptors and
          praying nothing breaks.
        </p>
        <p>
          Reqnest is different. It exposes the full pipeline through a clean
          middleware system, so you can add caching, retries, deduplication, and
          rate limiting as composable layers — without touching the core.
        </p>
        <CodeBlock language="text" code={pipelineDiagram} />

        <h2 id="features">✨ Features</h2>
        <div className="my-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {features.map(([name, desc], i) => (
                <tr
                  key={name}
                  className={i % 2 === 0 ? "bg-muted/30" : "bg-background"}
                >
                  <td className="w-1/3 px-4 py-3 align-top font-medium text-foreground">
                    {name}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Where to next?</h2>
        <ul>
          <li>
            <a href="/docs/installation">Install Reqnest</a> in your project.
          </li>
          <li>
            Follow the <a href="/docs/quick-start">Quick Start</a> to make your
            first request.
          </li>
          <li>
            Learn how the <a href="/docs/middleware">middleware system</a>{" "}
            powers everything.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
