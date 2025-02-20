const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.useCoupon = page.getByRole('heading', { name: 'Use Coupon Code ' });
    this.enterCoupon = page.getByRole('textbox', { name: 'Enter your coupon here' });
    this.applyCouponBtn = page.getByRole('button', { name: 'Apply Coupon' });

    this.ShippingTaxes = page.getByRole('heading', { name: 'Estimate Shipping & Taxes ' });
    this.countryBox = page.getByLabel('Country');
    this.regionBox = page.getByLabel('Region / State');
    this.postCodeBox = page.getByRole('textbox', { name: 'Post Code*' });
    this.getQuotesBtn = page.getByRole('button', { name: 'Get Quotes' });

    this.giftCert = page.getByRole('heading', { name: 'Use Gift Certificate ' });
    this.enterGiftCert = page.getByRole('textbox', { name: 'Enter your gift certificate' });
    this.applyGiftCert = page.getByRole('button', { name: 'Apply Gift Certificate' });

    this.contShoppingBtn = page.getByRole('link', { name: 'Continue Shopping' });
    this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
  };

  async goTo() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
  };
};