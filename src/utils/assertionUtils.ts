import { Expect, Page, expect } from '@playwright/test';

/**
 * Higher-level assertion helpers that encode business intent.
 * Keeps test files focused on behavior, not selector-level detail.
 */
export class AssertionUtils {
  private readonly expect: Expect['expect'];

  constructor(private readonly page: Page) {
    this.expect = expect;
  }

  async expectOnLoginPage(): Promise<void> {
    await this.expect(this.page).toHaveURL(/saucedemo\.com\/?/);
    await this.expect(this.page.getByText('Swag Labs')).toBeVisible();
  }

  async expectOnInventoryPage(): Promise<void> {
    await this.expect(this.page).toHaveURL(/inventory\.html/);
    await this.expect(this.page.getByTestId('inventory-container')).toBeVisible();
  }

  async expectUrlContains(fragment: string): Promise<void> {
    await this.expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async expectErrorMessage(text: string | RegExp): Promise<void> {
    const error = this.page.locator('[data-test="error"]');
    await this.expect(error).toBeVisible();
    await this.expect(error).toContainText(text);
  }
}

