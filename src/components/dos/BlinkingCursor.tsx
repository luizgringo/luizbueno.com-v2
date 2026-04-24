import { cn } from "@/lib/utils";

export function BlinkingCursor({ className }: { className?: string }) {
  return <span aria-hidden className={cn("dos-cursor", className)} />;
}