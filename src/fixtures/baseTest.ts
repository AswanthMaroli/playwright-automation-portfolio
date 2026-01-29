import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { WaitUtils } from '@utils/waitUtils';
import { AssertionUtils } from '@utils/assertionUtils';
import { DataUtils } from '@utils/dataUtils';
import { getEnvironmentConfig } from '../config/environments';

type PagesFixture = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
};

type UtilsFixture = {
  waitUtils: WaitUtils;
  assertionUtils: AssertionUtils;
  dataUtils: typeof DataUtils;
};

type EnvironmentFixture = {
  envConfig: ReturnType<typeof getEnvironmentConfig>;
};

export const test = base.extend<PagesFixture & UtilsFixture & EnvironmentFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  waitUtils: async ({ page }, use) => {
    await use(new WaitUtils(page));
  },
  assertionUtils: async ({ page }, use) => {
    await use(new AssertionUtils(page));
  },
  dataUtils: async ({}, use: (fixture: typeof DataUtils) => Promise<void>) => {
    await use(DataUtils);
  },
  envConfig: async ({}, use: (cfg: ReturnType<typeof getEnvironmentConfig>) => Promise<void>) => {
    await use(getEnvironmentConfig());
  },
});

export { expect };

