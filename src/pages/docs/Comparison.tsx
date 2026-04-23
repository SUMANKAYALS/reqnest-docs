import { Check, X } from "lucide-react";
import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";

type Row = [string, boolean | string, boolean | string];

const rows: Row[] = [
  ["Middleware pipeline", true, false],
  ["Plugin system", true, false],
  ["Full lifecycle control", true, false],
  ["Built on Fetch API", true, "XHR"],
  ["Request deduplication", true, false],
  ["Smart caching", true, false],
  ["Rate limiting", true, false],
  ["TypeScript support", true, true],
  ["Extensibility", "🔥 High", "⚠️ Limited"],
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="h-4 w-4 text-emerald-500" aria-label="Yes" />;
  if (value === false)
    return <X className="h-4 w-4 text-muted-foreground/60" aria-label="No" />;
  return <span className="text-sm">{value}</span>;
}

export default function Comparison() {
  return (
    <DocsLayout>
      <DocPage
        slug="comparison"
        title="Reqnest vs Axios"
        description="A quick side-by-side of where Reqnest's middleware-first design pulls ahead."
      >
        <div className="my-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Reqnest</th>
                <th className="px-4 py-3 font-medium">Axios</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, r, a], i) => (
                <tr
                  key={feature}
                  className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {feature}
                  </td>
                  <td className="px-4 py-3">
                    <Cell value={r} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell value={a} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Axios is battle-tested and great — Reqnest just trades a heavier
          interceptor model for a tiny core plus opt-in middleware. If you've
          ever monkey-patched an Axios interceptor to add caching or
          deduplication, Reqnest will feel like a relief.
        </p>
      </DocPage>
    </DocsLayout>
  );
}
