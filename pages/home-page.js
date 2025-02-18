const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.myAccount = page.locator('//i[@class="icon fas fa-user"]');
    this.login = page.getByRole('link', { name: 'Login', exact: true });
    this.register = page.getByRole('link', { name: 'Register', exact: true })
  };

  async goToLoginPage() {
    await this.page.goto('/')
    await expect(this.page).toHaveTitle('Your Store');
    //hover over "My account" and click "Login"
    await this.myAccount.hover();
    await this.login.click();
    await expect(this.page).toHaveTitle('Account Login');
  }

  async goToRegisterPage() {
    await this.page.goto('/')
    await expect(this.page).toHaveTitle('Your Store');
    //hover over "My account" and click "Register"
    await this.myAccount.hover();
    await this.register.click();
    await expect(this.page).toHaveTitle('Register Account');
  }
};