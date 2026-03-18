import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.loginUrl);

  }

  async verifyElementsVisibleAndEnabled() {
    const usernameInput = this.page.locator('input[name="username"]');
    const passwordInput = this.page.locator('input[name="password"]');

    await expect(usernameInput).toBeVisible({ timeout: 15000 });
    await expect(usernameInput).toBeEnabled();

    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
  }

  async login(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click({ timeout: 15000 });

  }

  async verifyPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title, { timeout: 15000 });
  }

  async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click({ timeout: 15000 });
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }

  async verifyCurrentUrlIsLoginUrl() {
    await expect(this.page).toHaveURL(new RegExp('.*auth/login.*'));
  }
}
