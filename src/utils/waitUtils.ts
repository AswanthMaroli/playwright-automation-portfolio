import { Locator, Page, expect } from '@playwright/test';

/**
 * Explicit wait utilities that wrap Playwright's locator assertions.
 * These avoid arbitrary time-based sleeps while keeping intent readable.
 */
export class WaitUtils {
  constructor(private readonly page: Page) {}

  async forUrlToContain(partialUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  async forVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async forHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  async forText(locator: Locator, text: string | RegExp): Promise<void> {
    await expect(locator).toHaveText(text);
  }

  async forCount(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
  }
}

