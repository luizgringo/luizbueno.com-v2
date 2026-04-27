"use client";

import { INITIAL_CONTACT_FORM_STATE } from "@/features/contact/actions/contact-form-state";
import { sendContactMessage } from "@/features/contact/actions/send-contact-message";
import { ContactSubmitButton } from "@/features/contact/components/contact-submit-button";
import { useActionState } from "react";

/**
 * Contact form powered by a React 19 Server Action.
 *
 * @returns Form UI with server-side validation feedback.
 */
export function ContactMessageForm() {
  const [state, action] = useActionState(sendContactMessage, INITIAL_CONTACT_FORM_STATE);

  return (
    <form action={action} className="contact-form" noValidate>
      <p className="contact-form__intro">
        Leave a quick message below. The form uses a Server Action for validation and submission.
      </p>

      <label className="contact-form__field" htmlFor="contact-name">
        <span>Name</span>
        <input id="contact-name" name="name" type="text" autoComplete="name" required />
        {state.fieldErrors?.name ? <small>{state.fieldErrors.name}</small> : null}
      </label>

      <label className="contact-form__field" htmlFor="contact-email">
        <span>Email</span>
        <input id="contact-email" name="email" type="email" autoComplete="email" required />
        {state.fieldErrors?.email ? <small>{state.fieldErrors.email}</small> : null}
      </label>

      <label className="contact-form__field" htmlFor="contact-subject">
        <span>Subject</span>
        <input id="contact-subject" name="subject" type="text" required />
        {state.fieldErrors?.subject ? <small>{state.fieldErrors.subject}</small> : null}
      </label>

      <label className="contact-form__field" htmlFor="contact-message">
        <span>Message</span>
        <textarea id="contact-message" name="message" rows={5} required />
        {state.fieldErrors?.message ? <small>{state.fieldErrors.message}</small> : null}
      </label>

      <div className="contact-form__footer">
        <ContactSubmitButton />
        {state.message ? (
          <output
            className={
              state.status === "success"
                ? "contact-form__feedback--success"
                : "contact-form__feedback--error"
            }
            aria-live="polite"
          >
            {state.message}
          </output>
        ) : null}
      </div>
    </form>
  );
}
