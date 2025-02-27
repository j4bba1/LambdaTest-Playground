const { expect } = require('@playwright/test');
const { count } = require('console');

exports.CheckoutPage = class CheckoutPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.phone = page.getByRole('textbox', { name: 'Telephone' });
    //billing address
    this.firstNameBill = page.locator('//input[@id="input-payment-firstname"]');
    this.lastNameBill = page.locator('//input[@id="input-payment-lastname"]');
    this.companyBill = page.locator('//input[@id="input-payment-company"]');
    this.address1Bill = page.locator('//input[@id="input-payment-address-1"]');
    this.address2Bill = page.locator('//input[@id="input-payment-address-2"]');
    this.cityBill = page.locator('//input[@id="input-payment-city"]');
    this.postCodeBill = page.locator('//input[@id="input-payment-postcode"]');
    this.countryBill = page.locator('#input-payment-country');
    this.regionBill = page.locator('#input-payment-zone');

    this.sameAddressCheckBox = page.getByText('My delivery and billing');
    //shipping address
    this.newShipAddress = page.locator('#shipping-address').getByText('I want to use a new address');
    this.firstNameShip = page.locator('//input[@id="input-shipping-firstname"]');
    this.lastNameShip = page.locator('//input[@id="input-shipping-lastname"]');
    this.companyShip = page.locator('//input[@id="input-shipping-company"]');
    this.address1Ship = page.locator('//input[@id="input-shipping-address-1"]');
    this.address2Ship = page.locator('//input[@id="input-shipping-address-2"]');
    this.cityShip = page.locator('//input[@id="input-shipping-city"]');
    this.postCodeShip = page.locator('//input[@id="input-shipping-postcode"]');
    this.countryShip = page.locator('#input-shipping-country');
    this.regionShip = page.locator('#input-shipping-zone');
    //coupon
    this.coupon = page.getByRole('heading', { name: 'Use Coupon Code ' });
    this.couponBox = page.getByRole('textbox', { name: 'Enter your coupon here' });
    this.couponApplyBtn = page.getByRole('button', { name: 'Apply Coupon' })
    //certificate
    this.giftCert = page.getByRole('heading', { name: 'Use Gift Certificate ' });
    this.giftCertBox = page.getByRole('textbox', { name: 'Enter your gift certificate' });
    this.giftCertBtn = page.getByRole('button', { name: 'Apply Gift Certificate' });
    //Add comments
    this.commentBox = page.getByRole('textbox', { name: 'Add Comments About Your Order' });
    //checkboxes
    this.existAddress = page.locator('#payment-address').getByText('I want to use an existing');
    this.newAddress = page.locator('#payment-address').getByText('I want to use a new address');
    this.newsletterCheckBox = page.getByText('I wish to subscribe to the');
    this.privacyCheckBox = page.getByText('I wish to subscribe to the');
    this.termCheckBox = page.getByText('I have read and agree to the Terms & Conditions');
    //continue
    this.continueBtn = page.getByRole('button', { name: 'Continue ' });
    };

    async goTo() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout')
    }

    async fillBilling(firstName, lastName, company, address1, address2, city, postCode, country, region) {
        await this.firstNameBill.fill(firstName);
        await this.lastNameBill.fill(lastName);
        await this.companyBill.fill(company);
        await this.address1Bill.fill(address1);
        await this.address2Bill.fill(address2);
        await this.cityBill.fill(city);
        await this.postCodeBill.fill(postCode);
        await this.countryBill.selectOption(country);
        await this.regionBill.selectOption(region);
    };

    async fillShipping(firstName, lastName, company, address1, address2, city, postCode, country, region) {
        await this.firstNameShip.fill(firstName);
        await this.lastNameShip.fill(lastName);
        await this.companyShip.fill(company);
        await this.address1Ship.fill(address1);
        await this.address2Ship.fill(address2);
        await this.cityShip.fill(city);
        await this.postCodeShip.fill(postCode);
        await this.countryShip.selectOption(country);
        await this.regionShip.selectOption(region);
    };

    async addComment(comment) {
        await this.commentBox.fill(comment);
    };

};