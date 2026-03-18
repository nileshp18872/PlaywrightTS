import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('OrangeHRM Login Scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Open url https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
  // 2. stored url in loginurl.
  await loginPage.goto();

  // 2. Verify Username and Password elements are visibled and enabled.
  await loginPage.verifyElementsVisibleAndEnabled();

  // 3. enter Username as Admin.
  // 4. enter Password as admin123.
  // 5. press login button.
  await loginPage.login('Admin', 'admin123');

  // 6. verify the page title as OrangeHRM.
  await loginPage.verifyPageTitle('OrangeHRM');

  // 7. click the login profile icon.
  // 8. press logout menu.
  await loginPage.logout();

  // 9. verify the current url as loginurl.
  await loginPage.verifyCurrentUrlIsLoginUrl();
});
