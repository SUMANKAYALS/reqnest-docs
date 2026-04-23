import { ReactNode, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function DocsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onMenuClick={() => setOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <div className="h-14 border-b border-border px-6 flex items-center">
              <span className="text-sm font-semibold">Reqnest</span>
            </div>
            <Sidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-3xl px-6 py-10 md:px-10 md:py-14 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
