import { Github, Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { SearchDialog } from "@/components/SearchDialog";

type NavbarProps = {
  onMenuClick?: () => void;
};

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background">
            <span className="text-[11px] font-bold">R</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Reqnest</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-5 text-sm md:flex">
          <Link
            to="/docs/getting-started"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            to="/docs/api"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            API
          </Link>
          <Link
            to="/docs/examples"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Examples
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <a
            href="https://github.com/SUMANKAYALS/reqnest"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
