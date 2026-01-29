import { Locator, Page, expect } from '@playwright/test';
import { WaitUtils } from '@utils/waitUtils';
import { AssertionUtils } from '@utils/assertionUtils';
import { getEnvironmentConfig } from '@config/environments';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  private readonly wait: WaitUtils;
  private readonly assertions: AssertionUtils;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.wait = new WaitUtils(page);
    this.assertions = new AssertionUtils(page);
  }

  async goto(): Promise<void> {
    const { baseURL } = getEnvironmentConfig();
    await this.page.goto(baseURL);
    await this.assertions.expectOnLoginPage();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser(): Promise<void> {
    const env = getEnvironmentConfig();
    await this.login(env.users.standard.username, env.users.standard.password);
  }

  async assertLockedOutError(): Promise<void> {
    await this.wait.forVisible(this.errorMessage);
    await expect(this.errorMessage).toContainText(/locked out/i);
  }
}

