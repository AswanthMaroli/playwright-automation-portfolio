import { test } from '@fixtures/baseTest';

test.describe('Login flow', () => {
  test('locked out user cannot authenticate', async ({ loginPage, envConfig }) => {
    await loginPage.goto();

    await loginPage.login(envConfig.users.lockedOut.username, envConfig.users.lockedOut.password);
    await loginPage.assertLockedOutError();
  });
});

