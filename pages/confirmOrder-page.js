const { expect } = require('@playwright/test');
const { privateDecrypt } = require('crypto');

exports.ConfirmOrderPage = class ConfirmOrderPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.editBtn = page.getByRole('link', { name: ' Edit' });
    this.confirmBtn = page.getByRole('button', { name: 'Confirm Order ' });
    this.paymentAddress = page.locator('//div[@class="card-body"]').first();
    this.shippingAddress = page.locator('//div[@class="card-body"]').nth(1);
    this.orderComment = page.locator('//div[@class="card-body"]').nth(3);
  };

  async goTo() {
    this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/checkout/confirm');
  };

  //console log product name
  async getProductNames(productsNames) {
    await this.page.locator('//table[@class="table table-bordered table-hover mb-0"]//tr').nth(1).waitFor();
    const tableRowsCount = await this.page.locator('//table[@class="table table-bordered table-hover mb-0"]//tr').count();

    for (let i = 1; i < tableRowsCount - 3; i++) {
      let nameEl = await this.page.locator('//table[@class="table table-bordered table-hover mb-0"]//tr').nth(i).textContent();
      let productName = nameEl.split(' Product')[0];
      productsNames.push(productName);
    }
  }
};