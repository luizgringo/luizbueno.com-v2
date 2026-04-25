export function BlinkingCursor({ className }: { className?: string }) {
  const merged = ["dos-cursor", className].filter(Boolean).join(" ");
  return <span aria-hidden className={merged} />;
}
