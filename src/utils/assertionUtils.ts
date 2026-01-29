import { Page, expect } from '@playwright/test';

/**
 * Higher-level assertion helpers that encode business intent.
 * Keeps test files focused on behavior, not selector-level detail.
 */
export class AssertionUtils {
  constructor(private readonly page: Page) {}

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/saucedemo\.com\/?/);
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
  }

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByTestId('inventory-container')).toBeVisible();
  }

  async expectUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async expectErrorMessage(text: string | RegExp): Promise<void> {
    const error = this.page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(text);
  }
}

