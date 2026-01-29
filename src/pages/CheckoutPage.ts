import { Locator, Page } from '@playwright/test';
import { WaitUtils } from '@utils/waitUtils';
import { AssertionUtils } from '@utils/assertionUtils';
import { CheckoutUser } from '@utils/dataUtils';

export class CheckoutPage {
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;

  readonly errorMessage: Locator;
  readonly checkoutCompleteHeader: Locator;

  private readonly wait: WaitUtils;
  private readonly assertions: AssertionUtils;

  constructor(page: Page) {
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutCompleteHeader = page.locator('.complete-header');

    this.wait = new WaitUtils(page);
    this.assertions = new AssertionUtils(page);
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.assertions.expectUrlContains('checkout-step-one');
  }

  async submitCustomerDetails(user: Partial<CheckoutUser>): Promise<void> {
    if (user.firstName !== undefined) {
      await this.firstNameInput.fill(user.firstName);
    }
    if (user.lastName !== undefined) {
      await this.lastNameInput.fill(user.lastName);
    }
    if (user.postalCode !== undefined) {
      await this.postalCodeInput.fill(user.postalCode);
    }
    await this.continueButton.click();
  }

  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.wait.forVisible(this.checkoutCompleteHeader);
  }

  async assertValidationErrorContains(text: string | RegExp): Promise<void> {
    await this.wait.forVisible(this.errorMessage);
    await this.assertions.expectErrorMessage(text);
  }
}

