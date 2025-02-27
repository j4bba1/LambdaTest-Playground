const { expect } = require('@playwright/test');
const { log } = require('console');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async loginAccount(email, password) {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  };
};

