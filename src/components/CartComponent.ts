import { Locator, Page } from '@playwright/test';

/**
 * Reusable cart-specific behaviors composed into pages that expose a cart.
 */
export class CartComponent {
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return Number(text || 0);
    }
    return 0;
  }
}

