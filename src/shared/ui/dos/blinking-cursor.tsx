import { cn } from "@/shared/lib/cn";

/**
 * Props accepted by the blinking cursor primitive.
 */
type BlinkingCursorProps = {
  /** Optional extra class names for positioning and color overrides. */
  className?: string;
};

/**
 * DOS-style blinking block cursor.
 *
 * @param props - Cursor presentation props.
 * @returns Decorative blinking cursor element.
 */
export function BlinkingCursor({ className }: BlinkingCursorProps) {
  return <span aria-hidden className={cn("dos-cursor", className)} />;
}
