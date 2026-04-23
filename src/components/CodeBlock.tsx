import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useTheme } from "@/lib/theme";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
};

export function CodeBlock({ code, language = "javascript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const trimmed = code.replace(/\n$/, "");

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
    } catch {
      /* noop */
    }
  };

  const prismTheme = theme === "dark" ? themes.vsDark : themes.github;

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-[hsl(var(--code-border))] bg-[hsl(var(--code-bg))]">
      {filename && (
        <div className="flex items-center justify-between border-b border-[hsl(var(--code-border))] px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="font-mono">{filename}</span>
          <span className="uppercase tracking-wider">{language}</span>
        </div>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition hover:text-foreground group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <Highlight code={trimmed} language={language} theme={prismTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-[13.5px] leading-6 font-mono`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
