import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flatDocs } from "@/lib/docs-config";

type DocPageProps = {
  title: string;
  description?: string;
  slug: string;
  children: ReactNode;
};

export function DocPage({ title, description, slug, children }: DocPageProps) {
  const idx = flatDocs.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? flatDocs[idx - 1] : null;
  const next = idx >= 0 && idx < flatDocs.length - 1 ? flatDocs[idx + 1] : null;

  return (
    <article className="doc-prose">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Documentation
      </p>
      <h1>{title}</h1>
      {description && (
        <p className="!mt-3 text-lg !text-muted-foreground">{description}</p>
      )}

      {children}

      <div className="mt-16 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            to={prev.path}
            className="group flex flex-col items-start rounded-lg border border-border p-4 transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 font-medium text-foreground">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            to={next.path}
            className="group flex flex-col items-end rounded-lg border border-border p-4 text-right transition-colors hover:bg-accent sm:col-start-2"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 font-medium text-foreground">{next.title}</span>
          </Link>
        )}
      </div>
    </article>
  );
}
