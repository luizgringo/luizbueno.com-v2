import * as React from "react";
import { cn } from "@/lib/utils";

interface NCPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NCPanel({ className, children, ...rest }: NCPanelProps) {
  return (
    <div className={cn("nc-panel", className)} {...rest}>
      {children}
    </div>
  );
}