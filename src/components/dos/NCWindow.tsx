import * as React from "react";
import { cn } from "@/lib/utils";

interface NCWindowProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
  bodyClassName?: string;
}

export function NCWindow({
  title,
  children,
  className,
  bodyClassName,
  ...rest
}: NCWindowProps) {
  return (
    <section className={cn("nc-window", className)} {...rest}>
      <header className="nc-window-title text-base sm:text-lg">
        <span aria-hidden>═[ </span>
        <span>{title}</span>
        <span aria-hidden> ]═</span>
      </header>
      <div className={cn("nc-window-body", bodyClassName)}>{children}</div>
    </section>
  );
}
