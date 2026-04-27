/**
 * Shape of values accepted by the contact message workflow.
 */
export type ContactFormFields = {
  /** Sender name. */
  name: string;
  /** Sender email address. */
  email: string;
  /** Message subject line. */
  subject: string;
  /** Message body text. */
  message: string;
};

/**
 * UI state returned by the contact server action.
 */
export type ContactFormState = {
  /** Form lifecycle status. */
  status: "idle" | "success" | "error";
  /** User-facing feedback message. */
  message?: string;
  /** Optional validation errors by field. */
  fieldErrors?: Partial<Record<keyof ContactFormFields, string>>;
  /** Timestamp set when a submission succeeds. */
  submittedAt?: string;
};

/**
 * Initial state used by `useActionState` before the first submit.
 */
export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
  status: "idle",
};
