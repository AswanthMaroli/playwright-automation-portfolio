import { test, expect } from '@fixtures/baseTest';

test.describe('Authenticated dashboard', () => {
  test('displays inventory and allows checkout completion', async ({
    loginPage,
    inventoryPage,
    checkoutPage,
    dataUtils,
  }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await inventoryPage.assertLoaded();

    const inventoryCount = await inventoryPage.getInventoryCount();
    await expect(inventoryCount).toBeGreaterThan(0);

    await inventoryPage.addFirstItemToCart();
    const cartCount = await inventoryPage.cart.getItemCount();
    await expect(cartCount).toBe(1);

    await inventoryPage.cart.openCart();
    await checkoutPage.startCheckout();

    const user = dataUtils.buildCheckoutUser();
    await checkoutPage.submitCustomerDetails(user);
    await checkoutPage.completeCheckout();

    await expect(checkoutPage.checkoutCompleteHeader).toHaveText(/thank you for your order/i);
  });
});

