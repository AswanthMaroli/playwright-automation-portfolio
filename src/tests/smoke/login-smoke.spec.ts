import { test, expect } from '@fixtures/baseTest';

// Smoke-level guardrail: can a standard user authenticate and reach the dashboard?
test.describe('Login smoke', () => {
  test('standard user can log in and see inventory', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    await inventoryPage.assertLoaded();

    const count = await inventoryPage.getInventoryCount();
    await expect(count).toBeGreaterThan(0);
  });
});

