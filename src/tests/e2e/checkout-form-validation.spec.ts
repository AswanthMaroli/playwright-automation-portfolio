import { test } from '@fixtures/baseTest';

test.describe('Checkout form validation', () => {
  test('requires mandatory fields before proceeding', async ({
    loginPage,
    inventoryPage,
    checkoutPage,
    dataUtils,
  }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await inventoryPage.assertLoaded();

    await inventoryPage.addFirstItemToCart();
    await checkoutPage.cart.openCart();

    await checkoutPage.startCheckout();

    await checkoutPage.submitCustomerDetails({});
    await checkoutPage.assertValidationErrorContains(/first name is required/i);

    const user = dataUtils.buildCheckoutUser({ firstName: '', lastName: '', postalCode: '' });
    await checkoutPage.submitCustomerDetails({ firstName: user.firstName });
    await checkoutPage.assertValidationErrorContains(/last name is required/i);

    await checkoutPage.submitCustomerDetails({ firstName: user.firstName, lastName: user.lastName });
    await checkoutPage.assertValidationErrorContains(/postal code is required/i);
  });
});

