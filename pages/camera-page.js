const { expect } = require('@playwright/test');

exports.CameraPage = class CameraPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sortBy = page.locator('#input-sort-212403');

    this.inStock = page.locator('#mz-filter-panel-0-5').getByText('In stock');
    this.outOfStock = page.locator('#mz-filter-panel-0-5').getByText('Out Of Stock');
  };

  async goTo() {
    this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33')
  };

  async pickHighestRatedItem() {
    await this.sortBy.selectOption('Rating (Highest)')
  };
};