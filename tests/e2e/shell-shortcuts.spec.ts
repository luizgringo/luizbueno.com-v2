import { type Page, expect, test } from "@playwright/test";

/**
 * Validates shell-level keyboard shortcuts for top-level route navigation.
 */
test.describe("Shell keyboard shortcuts", () => {
  /**
   * Dispatches a keyboard event directly on `window` for deterministic tests.
   *
   * @param page - Playwright page.
   * @param key - Keyboard key value.
   */
  async function dispatchShortcut(page: Page, key: string) {
    await page.evaluate((value) => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: value,
          bubbles: true,
          cancelable: true,
        }),
      );
    }, key);
  }

  test("navigates using function keys", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".status-bar")).toBeVisible();
    await page.waitForTimeout(200);

    await dispatchShortcut(page, "F2");
    await expect(page).toHaveURL(/\/portfolio$/);

    await dispatchShortcut(page, "F1");
    await expect(page).toHaveURL(/\/about$/);

    await dispatchShortcut(page, "F4");
    await expect(page).toHaveURL(/\/contact$/);

    await dispatchShortcut(page, "F3");
    await expect(page).toHaveURL(/\/$/);
  });

  test("navigates using number shortcuts", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".status-bar")).toBeVisible();
    await page.waitForTimeout(200);

    await dispatchShortcut(page, "2");
    await expect(page).toHaveURL(/\/portfolio$/);

    await dispatchShortcut(page, "3");
    await expect(page).toHaveURL(/\/about$/);

    await dispatchShortcut(page, "4");
    await expect(page).toHaveURL(/\/contact$/);

    await dispatchShortcut(page, "1");
    await expect(page).toHaveURL(/\/$/);
  });
});
