import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Props accepted by the DOS panel component.
 */
type NCPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** Panel body content. */
  children: ReactNode;
};

/**
 * Reusable DOS-styled inner panel.
 *
 * @param props - Native div props plus panel children.
 * @returns Panel container element.
 */
export function NCPanel({ className, children, ...rest }: NCPanelProps) {
  return (
    <div className={cn("nc-panel", className)} {...rest}>
      {children}
    </div>
  );
}
