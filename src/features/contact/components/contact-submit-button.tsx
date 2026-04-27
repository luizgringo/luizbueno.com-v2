"use client";

import { useFormStatus } from "react-dom";

/**
 * Submit button bound to the contact form pending state.
 *
 * @returns A DOS-styled submit button with pending feedback.
 */
export function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="contact-form__submit" disabled={pending}>
      {pending ? "[ SENDING... ]" : "[ SEND MESSAGE ]"}
    </button>
  );
}
