const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForSelector('input[name="username"]');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  try {
    await page.waitForSelector('.oxd-userdropdown-tab', { timeout: 10000 });
    console.log("Login successful, dropdown found");
  } catch (e) {
    console.log("Failed to find dropdown");
    const html = await page.content();
    require('fs').writeFileSync('page.html', html);
  }
  await browser.close();
})();
