"use server";

import type { ContactFormState } from "@/features/contact/actions/contact-form-state";
import { z } from "zod";

/**
 * Runtime schema used to validate contact form input on the server.
 */
const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must have at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must have at least 3 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must have at least 10 characters")
    .max(1500, "Message is too long"),
});

/**
 * Server Action responsible for validating and processing contact submissions.
 *
 * @remarks
 * This implementation currently simulates asynchronous delivery. It can be
 * replaced by an email provider or queue integration without changing the
 * client component contract.
 *
 * @param _previousState - Previous reducer state from `useActionState`.
 * @param formData - Browser form payload sent by the action.
 * @returns Next state consumed by the contact form UI.
 */
/**
 * Validates and processes a contact message submission.
 */
export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Please review the form fields highlighted below.",
      fieldErrors: {
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        subject: flattened.subject?.[0],
        message: flattened.message?.[0],
      },
    };
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 450);
  });

  return {
    status: "success",
    message: "Message queued successfully. I will get back to you soon.",
    submittedAt: new Date().toISOString(),
  };
}
