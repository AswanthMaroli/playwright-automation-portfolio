import { Locator, Page } from '@playwright/test';

/**
 * Application header / navigation bar behaviors.
 */
export class HeaderComponent {
  readonly title: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.app_logo');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}

