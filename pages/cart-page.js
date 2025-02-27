const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.coupon = page.getByRole('heading', { name: 'Use Coupon Code ' });
    this.couponBox = page.getByRole('textbox', { name: 'Enter your coupon here' });
    this.couponApplyBtn = page.getByRole('button', { name: 'Apply Coupon' });

    this.shippingTaxes = page.getByRole('heading', { name: 'Estimate Shipping & Taxes ' });
    this.countryBox = page.getByLabel('Country');
    this.regionBox = page.getByLabel('Region / State');
    this.postCodeBox = page.getByRole('textbox', { name: 'Post Code' });
    this.getQuotesBtn = page.getByRole('button', { name: 'Get Quotes' });
    this.flatRate = page.getByRole('radio', { name: 'Flat Shipping Rate - $' });
    this.shippingApplyBtn = page.getByRole('button', { name: 'Apply Shipping' });

    this.giftCert = page.getByRole('heading', { name: 'Use Gift Certificate ' });
    this.giftCertBox = page.getByRole('textbox', { name: 'Enter your gift certificate' });
    this.giftCertBtn = page.getByRole('button', { name: 'Apply Gift Certificate' });

    this.contShoppingBtn = page.getByRole('link', { name: 'Continue Shopping' });
    this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
  };

  async goTo() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
  };

  async enterCoupon(couponCode) {
    await this.coupon.click();
    await this.couponBox.fill(couponCode);
    await this.couponApplyBtn.click();
  };

  async enterShipTaxes(country, region, postCode) {
    await this.shippingTaxes.click();
    await this.countryBox.selectOption(country);
    await this.regionBox.selectOption(region);
    await this.postCodeBox.fill(postCode);
    await this.getQuotesBtn.click();
    await this.flatRate.check();
    await this.shippingApplyBtn.click();
  };

  async enterGift(giftCode) {
    await this.giftCert.click();
    await this.giftCertBox.fill(giftCode);
    await this.giftCertBtn.click();
  };

  async goToCheckout() {
    await this.checkoutBtn.click();
  }
};
