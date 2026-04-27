import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Props accepted by the DOS window component.
 */
type NCWindowProps = HTMLAttributes<HTMLElement> & {
  /** Window title rendered in the top bar. */
  title: string;
  /** Optional class override for the body container. */
  bodyClassName?: string;
  /** Window body content. */
  children: ReactNode;
};

/**
 * Reusable DOS/Norton Commander window container.
 *
 * @param props - Native section props plus title and body settings.
 * @returns Window markup with title bar and content area.
 */
export function NCWindow({ title, children, className, bodyClassName, ...rest }: NCWindowProps) {
  return (
    <section className={cn("nc-window", className)} {...rest}>
      <header className="nc-window-title">
        <span aria-hidden>═[ </span>
        <span>{title}</span>
        <span aria-hidden> ]═</span>
      </header>
      <div className={cn("nc-window-body", bodyClassName)}>{children}</div>
    </section>
  );
}
