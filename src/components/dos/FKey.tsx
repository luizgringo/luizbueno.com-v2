import * as React from "react";
import { cn } from "@/lib/utils";

interface FKeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  num: number;
  label: string;
}

export function FKey({ num, label, className, ...rest }: FKeyProps) {
  return (
    <button
      type="button"
      className={cn(
        "fkey transition-none hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      <span className="fkey-num">{num}</span>
      <span className="fkey-label">{label}</span>
    </button>
  );
}