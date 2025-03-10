const { expect } = require('@playwright/test');

exports.ComponentPage = class ComponentPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sortBy = page.locator('//select[@id="input-sort-212403"]');

    this.inStock = page.locator('#mz-filter-panel-0-5').getByText('In stock');
    this.outOfStock = page.locator('#mz-filter-panel-0-5').getByText('Out Of Stock');
  };

  async goTo() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25');
  }

  async pickCheapestItem() {
    await this.sortBy.selectOption('Price (Low > High)');
  }
};