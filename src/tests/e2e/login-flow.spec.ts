import { test } from '@fixtures/baseTest';

test.describe('Login flow', () => {
  test('locked out user cannot authenticate', async ({ loginPage }) => {
    await loginPage.goto();

    const env = process.env.TEST_ENV ?? 'dev';
    const { users } = (await import('@config/environments')).getEnvironmentConfig();

    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.assertLockedOutError();
  });
});

