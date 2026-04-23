import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchIndex, SearchEntry } from "@/lib/search-index";

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-foreground/15 px-0.5 text-foreground">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo<SearchEntry[]>(() => {
    const query = q.trim().toLowerCase();
    if (!query) return searchIndex.slice(0, 8);
    return searchIndex
      .filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.heading.toLowerCase().includes(query) ||
          e.content.toLowerCase().includes(query),
      )
      .slice(0, 20);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="hidden h-9 w-56 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent md:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search docs...</span>
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Search documentation</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Reqnest docs..."
            className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for "{q}"
            </p>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                to={r.path + (r.hash ? `#${r.hash}` : "")}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {r.title}
                </span>
                <span className="font-medium text-foreground">
                  {highlight(r.heading, q)}
                </span>
                {q && (
                  <span className="line-clamp-2 text-xs text-muted-foreground">
                    {highlight(r.content, q)}
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
