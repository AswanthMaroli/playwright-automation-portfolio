import { Locator, Page } from '@playwright/test';
import { CartComponent } from '@components/CartComponent';
import { HeaderComponent } from '@components/HeaderComponent';
import { WaitUtils } from '@utils/waitUtils';
import { AssertionUtils } from '@utils/assertionUtils';

export class InventoryPage {
  readonly inventoryItems: Locator;
  readonly filterSelect: Locator;

  readonly cart: CartComponent;
  readonly header: HeaderComponent;

  private readonly wait: WaitUtils;
  private readonly assertions: AssertionUtils;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('.inventory_item');
    this.filterSelect = page.locator('[data-test="product_sort_container"]');

    this.cart = new CartComponent(page);
    this.header = new HeaderComponent(page);
    this.wait = new WaitUtils(page);
    this.assertions = new AssertionUtils(page);
  }

  async assertLoaded(): Promise<void> {
    await this.assertions.expectOnInventoryPage();
    await this.wait.forVisible(this.inventoryItems.first());
  }

  async addFirstItemToCart(): Promise<void> {
    const firstAddToCartButton = this.page.locator('.inventory_item button').first();
    await firstAddToCartButton.click();
  }

  async getInventoryCount(): Promise<number> {
    return this.inventoryItems.count();
  }
}

