import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";

const items = [
  ["🔥 Interceptors", "Request/response hooks (cleaner than Axios)."],
  ["🔥 GraphQL support", "First-class gql() helper."],
  ["🔥 SSR support", "Cookie forwarding for server-side rendering."],
  ["🔥 Devtools", "Browser extension for request inspection."],
  ["🔥 Persistent cache", "IndexedDB / localStorage adapter."],
  ["🔥 npm publish", "Official release on the npm registry."],
];

export default function Roadmap() {
  return (
    <DocsLayout>
      <DocPage
        slug="roadmap"
        title="Roadmap"
        description="What's coming next for Reqnest."
      >
        <ul className="!ml-0 !list-none space-y-3">
          {items.map(([title, desc]) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-lg border border-border p-4"
            >
              <input
                type="checkbox"
                disabled
                className="mt-1.5 h-4 w-4 rounded border-border accent-foreground"
              />
              <div>
                <p className="!my-0 font-medium text-foreground">{title}</p>
                <p className="!my-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2>Want to help?</h2>
        <p>
          Open an issue or PR on GitHub — contributions, feature requests, and
          bug reports are all welcome.
        </p>
      </DocPage>
    </DocsLayout>
  );
}
