const { expect } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameBox = page.getByRole('textbox', { name: 'First Name*' });
    this.lastNameBox = page.getByRole('textbox', { name: 'Last Name*' });
    this.emailBox = page.getByRole('textbox', { name: 'E-Mail*' });
    this.telephoneBox = page.getByRole('textbox', { name: 'Telephone*' });
    this.passwordBox = page.getByRole('textbox', { name: 'Password*' });
    this.passwordConfirmBox = page.getByRole('textbox', { name: 'Password Confirm*' });
    this.yesNewsletter = page.getByText('Yes');
    this.noNewsletter = page.getByText('No', { exact: true });
    this.agreePolicyCheck = page.getByText('I have read and agree to the');
    //alerts
    this.polickyCheckAlert = page.locator('//div[@class="alert alert-danger alert-dismissible"]');
    this.fieldAlert = page.locator('//div[@class="text-danger"]')

    this.continueBtn = page.getByRole('button', { name: 'Continue' });
  };

  async goTo() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
  };

  async registerNewAcc(firstName, lastName, email, phone, password, passwordConfirm, subNewsletter) {
    await expect(this.page).toHaveTitle('Register Account');
    // fill in data
    await this.firstNameBox.fill(firstName);
    await this.lastNameBox.fill(lastName);
    await this.emailBox.fill(email);
    await this.telephoneBox.fill(phone);
    await this.passwordBox.fill(password);
    await this.passwordConfirmBox.fill(passwordConfirm);
    //check yes or no
    if(subNewsletter){
        await this.yesNewsletter.check();
        await expect(this.yesNewsletter).toBeChecked();
    };
  }
};