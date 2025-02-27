// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { RegisterPage } from '../pages/register-page';
import { LoginPage } from '../pages/login-page';
import { ComponentPage } from '../pages/component-page';
import { describe } from 'node:test';
import { CameraPage } from '../pages/camera-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { count, table } from 'console';
import { ConfirmOrderPage } from '../pages/confirmOrder-page';

const firstName = 'Wilfrid';
const lastName = 'Coren';
const email = 'wilfrid.coren@example.com';
const phone = '+420 123 123 123';
const password = 'password123';
const passwordConfirm = 'password123';
const newsletter = false;
const agreePolicy = true;


test.describe.skip('Registester new account and login with the registred data', () => {
  test.beforeEach(async ({ context })=> {
    await context.clearCookies();
  });

  test.skip('Register new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.goToRegisterPage();
    await registerPage.registerNewAcc(firstName, lastName, email, phone, password, passwordConfirm, newsletter);
    if(agreePolicy){
      await registerPage.agreePolicyCheck.check();
      await expect(registerPage.agreePolicyCheck).toBeChecked();

      await registerPage.continueBtn.click();
      await expect(registerPage.page).toHaveTitle('Your Account Has Been Created!');
    } else {
      await registerPage.continueBtn.click();
      await expect(registerPage.polickyCheckAlert).toBeVisible();
    };
  })

  test('Login new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await loginPage.loginAccount(email, password);
    await expect(page).toHaveTitle('My Account');
  })
});

//validating empty fields on registration page
[
  {name: 'Empty first name', firstName: '', lastName: 'Coren', email: 'email493_test@example.com', phone: '420 213 123 123', password: 'password123', passwordConfirm: 'password123', newsletter: false, expected: 'First Name must be between 1 and 32 characters!'},
  {name: 'Empty last name', firstName: 'Wilfrid', lastName: '', email: 'email493_test@example.com', phone: '420 213 123 123', password: 'password123', passwordConfirm: 'password123', newsletter: false, expected: 'Last Name must be between 1 and 32 characters!'},
  {name: 'Empty email', firstName: 'Wilfrid', lastName: 'Coren', email: '', phone: '420 213 123 123', password: 'password123', passwordConfirm: 'password123', newsletter: false, expected: 'E-Mail Address does not appear to be valid!'},
  {name: 'Empty phone', firstName: 'Wilfrid', lastName: 'Coren', email: 'email493_test@example.com', phone: '', password: 'password123', passwordConfirm: 'password123', newsletter: false, expected: 'Telephone must be between 3 and 32 characters!'},
  {name: 'Empty password', firstName: 'Wilfrid', lastName: 'Coren', email: 'email493_test@example.com', phone: '+420 123 123 123', password: '', passwordConfirm: 'password123', newsletter: false, expected: 'Password must be between 4 and 20 characters!'},
  {name: 'Empty password confrim', firstName: 'Wilfrid', lastName: 'Coren', email: 'email493_test@example.com', phone: '+420 123 123 123', password: 'password123', passwordConfirm: '', newsletter: false, expected: 'Password confirmation does not match password!'},
].forEach(({ name, firstName, lastName, email, phone, password, passwordConfirm, newsletter, expected}) => {
  test.describe.skip('Testing allerts for empty fields', () => {
    test.beforeEach(async ({ page, context }) => {
      await context.clearCookies();
      const homePage = new HomePage(page);

      await homePage.goTo()
      await homePage.goToRegisterPage();
    });

    test(`${name}`, async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.registerNewAcc(firstName, lastName, email, phone, password, passwordConfirm, newsletter);
      await registerPage.agreePolicyCheck.check();
      await registerPage.continueBtn.click();
      await expect(registerPage.fieldAlert.first()).toHaveText(expected);
    });
  });
});

test.describe('Buying the cheapest items from components page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test.fail('Buying the cheapest component - out of stock item', async ({ page }) => {
    const homePage = new HomePage(page);
    const componentPage = new ComponentPage(page);

    await homePage.goToComponentPage();
    await componentPage.pickCheapestItem();
    //wait for the page load
    await page.waitForTimeout(5000);
    await componentPage.outOfStock.check();
    await componentPage.outOfStock.isChecked();

    await page.waitForTimeout(5000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toHaveText('iPhone');
    await page.locator('//a[@class="text-ellipsis-2"]').first().click();
    let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Out of Stock');
    await addBtn.click();
  });

  test('Buying the cheapest component - in stock item', async ({ page }) => {
    const homePage = new HomePage(page);
    const componentPage = new ComponentPage(page);

    await homePage.goToComponentPage();
    await componentPage.pickCheapestItem();
    //wait for the page load
    await page.waitForTimeout(5000);
    await componentPage.inStock.check();
    await componentPage.inStock.isChecked();

    await page.waitForTimeout(5000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toHaveText('Nikon D300');
    await page.locator('//a[@class="text-ellipsis-2"]').first().click();
    let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Add to Cart');
    await addBtn.click();
    await expect(page.locator('#notification-box-top')).toBeVisible();
  });
});

test.describe('Buying highest rated item from cameras page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.fail('Buying the highest rated item from cameras page - out of stock item', async ({ page }) => {
    const homePage = new HomePage(page);
    const cameraPage = new CameraPage(page);

    await homePage.goToCameraPage();
    await cameraPage.pickHighestRatedItem();
    await page.waitForTimeout(5000);
    await cameraPage.outOfStock.check();
    await cameraPage.outOfStock.isChecked();

    await page.waitForTimeout(5000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toHaveText('iMac');
    await page.locator('//a[@class="text-ellipsis-2"]').first().click();
    let addBtn = page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Out of Stock');
    await addBtn.click();
  });

  test('Buying the highest rated item from cameras page - in stock item', async ({ page }) => {
    const homePage = new HomePage(page);
    const cameraPage = new CameraPage(page);

    await homePage.goToCameraPage();
    await cameraPage.pickHighestRatedItem();
    //wait for the page load
    await page.waitForTimeout(5000);
    await cameraPage.inStock.check();
    await cameraPage.inStock.isChecked();

    await page.waitForTimeout(5000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toContainText('iMac');
    await page.locator('//a[@class="text-ellipsis-2"]').first().click();
    let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Add to Cart');
    await addBtn.click();
    await expect(page.locator('#notification-box-top')).toBeVisible();
  });
});

test.describe('Applying coupon, taxes, gift certificate', () => {
  test.beforeEach(async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goTo();
    await expect(page).toHaveTitle('Shopping Cart');
  });

  test.afterEach(async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goToCheckout()
    await expect(page).toHaveTitle('Checkout');
  });

  test('Use coupon code - invalid coupone', async ({ page }) => {
    const cartPage = new CartPage(page);
    const couponCode = "INVLAIDCODE";
      
    await cartPage.enterCoupon(couponCode);
    await expect(page.getByText('Warning: Coupon is either')).toBeVisible();
  });

  test('Fill in shipping and taxes info', async ({ page }) => {
    const cartPage = new CartPage(page);
    const country = "Czech Republic";
    const region = "Praha"
    const postCode = "15000"

    await cartPage.enterShipTaxes(country, region, postCode);
    await expect(page.getByText('Success: Your shipping')).toBeVisible();
  });

  test('Use gift certificate code - invalid code', async ({ page }) => {
    const cartPage = new CartPage(page);
    const giftCode = "INVALIDGIFTCODE"

    await cartPage.enterGift(giftCode);
    await expect(page.getByText('Warning: Gift Certificate is')).toBeVisible();
  });
});

test.describe('Filling checkout page', () => {
  test.beforeEach(async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.goTo();
    await expect(page).toHaveTitle('Checkout');
  });

  test('Fill billing address', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    const company = ' ';
    const address1 = 'Mojmírova 5';
    const address2 = '';
    const city = 'Prague';
    const postCode = '13000';
    const country = 'Czech Republic';
    const region = 'Praha';

    // Check checkbox "I want to use a new address"
    // await checkoutPage.newAddress.check();

    if(await checkoutPage.newAddress.isChecked() === true) {
      await checkoutPage.fillBilling(firstName, lastName, company, address1, address2, city, postCode, country, region);
    }

    // Uncheck checkbox "My delivery and billing addresses are the same."
    //await checkoutPage.sameAddressCheckBox.uncheck();

    if(await checkoutPage.sameAddressCheckBox.isChecked() === false) {
      await checkoutPage.fillShipping(firstName, lastName, company, address1, address2, city, postCode, country, region);
    }

    //adding comment
    //let comment = ''
    let comment = 'Testing comment 123 @& ů§ú)'

    if(comment.length > 0) {
      await checkoutPage.addComment(comment);
    }

    let checkTerms = true;
    if(checkTerms) {
      await checkoutPage.termCheckBox.check();
      await expect(checkoutPage.termCheckBox).toBeChecked();
      await checkoutPage.continueBtn.click();
      await expect(page).toHaveTitle('Confirm Order');
    } else {
      await checkoutPage.continueBtn.click();
      await expect(page.getByText('Warning: You must agree to')).toBeVisible();

    };
  });
})

test.describe('Veryfing data', () => {
  test('Veryfing data - product name, adress, comment', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmOrder = new ConfirmOrderPage(page);

    await checkoutPage.goTo();

    if(await page.locator('#content').getByText('Your shopping cart is empty!').isVisible() === true) {
      const homePage = new HomePage(page);
      const componentPage = new ComponentPage(page);
      const cameraPage = new CameraPage(page);
  
      await homePage.goToComponentPage();
      await componentPage.pickCheapestItem();
      //wait for the page load
      await page.waitForTimeout(5000);
      await componentPage.inStock.check();
      await componentPage.inStock.isChecked();
  
      await page.waitForTimeout(5000);
      await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toHaveText('Nikon D300');
      await page.locator('//a[@class="text-ellipsis-2"]').first().click();
      let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
      await expect(addBtn).toHaveText('Add to Cart');
      await addBtn.click();
      await expect(page.locator('#notification-box-top')).toBeVisible();

      await page.goto('/')

      await homePage.goToCameraPage();
      await cameraPage.pickHighestRatedItem();
      //wait for the page load
      await cameraPage.inStock.check();
      await cameraPage.inStock.isChecked();

      await page.waitForTimeout(5000);
      await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toContainText('iMac');
      await page.locator('//a[@class="text-ellipsis-2"]').first().click();
      let addBtn2 = await page.locator('//button[@title="Add to Cart"]').nth(1);
      await expect(addBtn2).toHaveText('Add to Cart');
      await addBtn2.click();
      await expect(page.locator('#notification-box-top')).toBeVisible();
      await checkoutPage.goTo();
    };

    const company = ' ';
    const address1 = 'Mojmírova 5';
    const address2 = '';
    const city = 'Prague';
    const postCode = '13000';
    const country = 'Czech Republic';
    const region = 'Praha';

    // Check checkbox "I want to use a new address"
    // await checkoutPage.newAddress.check();

    if(await checkoutPage.newAddress.isChecked() === true) {
      await checkoutPage.fillBilling(firstName, lastName, company, address1, address2, city, postCode, country, region);
    }

    // Uncheck checkbox "My delivery and billing addresses are the same."
    // await checkoutPage.sameAddressCheckBox.uncheck();
    // Add new shipping address
    // await checkoutPage.newShipAddress.check()

    if(await checkoutPage.sameAddressCheckBox.isChecked() === false) {
      const company = ' ';
      const address1Ship = 'U Kříže 10';
      const address2Ship = '';
      const cityShip = 'Karlovy Vary';
      const postCodeShip = '23100';
      const countryShip = 'Czech Republic';
      const regionShip = 'Karlovarský';
      await checkoutPage.fillShipping(firstName, lastName, company, address1Ship, address2Ship, cityShip, postCodeShip, countryShip, regionShip);
    }

    //adding comment
    //const comment = ''
    const comment = 'Testing comment 123 @& ů§ú)'

    if(comment.length > 0) {
      await checkoutPage.addComment(comment);
    }

    await checkoutPage.termCheckBox.check();
    await expect(checkoutPage.termCheckBox).toBeChecked();
    await checkoutPage.continueBtn.click();
    await expect(page).toHaveTitle('Confirm Order');

    //veryfing product name
    let productNames = [];
    const expectedNames = ['Nikon D300', 'iMac'];
    await confirmOrder.getProductNames(productNames);
    for(let i = 0; i > expectedNames.length; i++) {
      expect(productNames[i]).toEqual(expectedNames[i]);
    }

    //veryfing payment and shipping address
    let isPaymentShippingAddress = true;
    if (isPaymentShippingAddress) {
      await expect(await confirmOrder.paymentAddress.textContent()).toEqual(await confirmOrder.shippingAddress.textContent());
    } else {
      await expect(await confirmOrder.paymentAddress.textContent()).not.toEqual(await confirmOrder.shippingAddress.textContent());
    }

    await expect(confirmOrder.orderComment).toHaveText(comment);

    //click od "Edit" button
    //await confirmOrder.editBtn.click();
    //await expect(page).toHaveTitle('Checkout')

    //finish the order
    await confirmOrder.confirmBtn.click();
    await expect(page).toHaveTitle('Your order has been placed!');
  });
});
