/**
 * Detects whether a keyboard event target is a text input context.
 *
 * @param target - Original event target.
 * @returns `true` when keybindings should be ignored.
 */
export function isTypingContext(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;

  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
    return true;
  }

  return target.isContentEditable;
}
