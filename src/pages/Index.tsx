import { Link } from "react-router-dom";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CodeBlock } from "@/components/CodeBlock";

const heroSnippet = `import { create, dispatch, dedupe, cachePlugin, rateLimit } from "@suamnkayal/reqnest";

const api = create({ baseURL: "https://api.example.com" });

api.use(dedupe);        // collapse duplicate requests
api.use(cachePlugin);   // cache responses
api.use(rateLimit(3));  // cap concurrency
api.use(dispatch);      // send the request (always last)

const { data } = await api.get("/users");`;

const features = [
  {
    title: "Middleware-first",
    body: "Koa-inspired async (ctx, next) composition. Hook into any part of the request lifecycle.",
  },
  {
    title: "Built on Fetch",
    body: "Native fetch under the hood. Works in Node 18+, Deno, Bun, and every modern browser.",
  },
  {
    title: "Plugin architecture",
    body: "Auto-retry, smart cache, deduplication, rate limiting — opt in to only what you need.",
  },
  {
    title: "Fully typed",
    body: "First-class TypeScript with typed config, context, and responses. No @types needed.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(var(--foreground)/0.08),transparent_60%)]"
          />
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              @suamnkayal/reqnest — middleware-driven HTTP
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              The middleware-driven
              <br />
              <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                HTTP client.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              Reqnest is a tiny, fully-typed HTTP client built on Fetch and
              inspired by Koa. Compose caching, retries, deduplication, and
              rate-limiting as plugins — without touching the core.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/docs/getting-started"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/SUMANKAYALS/reqnest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>

            <div className="mx-auto mt-14 max-w-2xl text-left">
              <CodeBlock language="typescript" filename="api.ts" code={heroSnippet} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="bg-background p-6 md:p-8">
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <span className="font-medium text-foreground">Suman Kayal</span>{" "}
              (Sky) — Full-Stack Developer · MERN · Real-time Systems · AI
              Tooling. Made in Kolkata, India 🇮🇳
            </p>
          </div>
        </section>

        <footer className="py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} Reqnest · MIT License</span>
            <div className="flex gap-6">
              <Link to="/docs/getting-started" className="hover:text-foreground">
                Docs
              </Link>
              <Link to="/docs/api" className="hover:text-foreground">
                API
              </Link>
              <Link to="/docs/roadmap" className="hover:text-foreground">
                Roadmap
              </Link>
              <a
                href="https://github.com/SUMANKAYALS/reqnest"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
