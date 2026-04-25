import * as React from "react";

interface NCWindowProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
  bodyClassName?: string;
}

export function NCWindow({ title, children, className, bodyClassName, ...rest }: NCWindowProps) {
  const rootClass = ["nc-window", className].filter(Boolean).join(" ");
  const bodyClass = ["nc-window-body", bodyClassName].filter(Boolean).join(" ");
  return (
    <section className={rootClass} {...rest}>
      <header className="nc-window-title">
        <span aria-hidden>═[ </span>
        <span>{title}</span>
        <span aria-hidden> ]═</span>
      </header>
      <div className={bodyClass}>{children}</div>
    </section>
  );
}
