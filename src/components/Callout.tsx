import { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "info" | "warning" | "tip";

const styles: Record<Variant, { icon: typeof Info; cls: string; iconCls: string }> = {
  info: {
    icon: Info,
    cls: "border-blue-500/30 bg-blue-500/5",
    iconCls: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    cls: "border-amber-500/30 bg-amber-500/5",
    iconCls: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    cls: "border-emerald-500/30 bg-emerald-500/5",
    iconCls: "text-emerald-500",
  },
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, cls, iconCls } = styles[variant];
  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border p-4 text-sm", cls)}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconCls)} />
      <div className="min-w-0 flex-1 leading-6 text-foreground">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="[&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
