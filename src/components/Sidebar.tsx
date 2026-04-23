import { NavLink, useLocation } from "react-router-dom";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-7 px-4 py-6 md:px-6">
      {docsConfig.map((section) => (
        <div key={section.title} className="flex flex-col gap-1.5">
          <h4 className="px-3 text-[13px] font-semibold tracking-tight text-foreground">
            {section.title}
          </h4>
          <div className="flex flex-col gap-0.5">
            {section.links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onNavigate}
                  className={cn("sidebar-link")}
                  data-active={active}
                >
                  {link.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
