import * as React from "react";

interface NCPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NCPanel({ className, children, ...rest }: NCPanelProps) {
  const merged = ["nc-panel", className].filter(Boolean).join(" ");
  return (
    <div className={merged} {...rest}>
      {children}
    </div>
  );
}
