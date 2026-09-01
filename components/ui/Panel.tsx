import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  className?: string;
  children: ReactNode;
  /** Adds a neon rim on hover. Use for cards a visitor can act on. */
  interactive?: boolean;
};

export function Panel({ className, children, interactive = false }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-panel border border-line bg-panel/80 p-6 backdrop-blur-sm sm:p-8",
        interactive &&
          "transition-colors duration-200 hover:border-neon-cyan/60 hover:bg-panel-raised/80",
        className,
      )}
    >
      {children}
    </div>
  );
}
