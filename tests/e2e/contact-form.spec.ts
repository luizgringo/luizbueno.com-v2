import { expect, test } from "@playwright/test";

/**
 * Covers the contact message form workflow, including validation and success states.
 */
test.describe("Contact message form", () => {
  test("shows validation errors and submits successfully", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator(".contact-form")).toBeVisible();
    await page.waitForTimeout(200);

    const submitButton = page.getByRole("button", { name: "[ SEND MESSAGE ]" });
    await submitButton.click();

    await expect(page.getByText("Please review the form fields highlighted below.")).toBeVisible();
    await expect(page.getByText("Name must have at least 2 characters")).toBeVisible();
    await expect(page.getByText("Please provide a valid email")).toBeVisible();

    await page.getByLabel("Name").fill("Luiz Bueno");
    await page.getByLabel("Email").fill("luiz@example.com");
    await page.getByLabel("Subject").fill("Project Collaboration");
    await page
      .getByLabel("Message")
      .fill("Hello Luiz, I would like to discuss a potential collaboration opportunity.");

    await submitButton.click();

    await expect(
      page.getByText("Message queued successfully. I will get back to you soon."),
    ).toBeVisible();
  });
});
