// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { RegisterPage } from '../pages/register-page';
import { LoginPage } from '../pages/login-page';
import { ComponentPage } from '../pages/component-page';
import { describe } from 'node:test';
import { CameraPage } from '../pages/camera-page';


test.describe.skip('Registester new account and login with the registred data', () => {
  test.beforeEach(async ({ context })=> {
    await context.clearCookies();
  });

  const firstName = 'Wilfrid';
  const lastName = 'Coren';
  const email = 'wilfrid.coren@example.com';
  const phone = '+420 123 123 123';
  const password = 'password123';
  const passwordConfirm = 'password123';
  const newsletter = false;
  const agreePolicy = true;
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


test.describe.configure({ mode: 'parallel'})

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
    await page.waitForTimeout(2000);
    await componentPage.outOfStock.check();
    await componentPage.outOfStock.isChecked();

    await page.waitForTimeout(2000);
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
    await page.waitForTimeout(2000);
    await componentPage.inStock.check();
    await componentPage.inStock.isChecked();

    await page.waitForTimeout(2000);
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
    //wait for the page load
    await page.waitForTimeout(2000);
    await cameraPage.outOfStock.check();
    await expect(cameraPage.outOfStock).toBeChecked();

    await page.waitForTimeout(2000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]"]').first()).toContainText('iMac');
    await page.locator('//a[@class="text-ellipsis-2"]"]').first().click();
    let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Out of Stock');
    await addBtn.click();
  });

  test('Buying the highest rated item from cameras page - in stock item', async ({ page }) => {
    const homePage = new HomePage(page);
    const cameraPage = new CameraPage(page);

    await homePage.goToCameraPage();
    await cameraPage.pickHighestRatedItem();
    //wait for the page load
    await page.waitForTimeout(2000);
    await cameraPage.inStock.check();
    await cameraPage.inStock.isChecked();

    await page.waitForTimeout(2000);
    await expect(page.locator('//a[@class="text-ellipsis-2"]').first()).toContainText('iMac');
    await page.locator('//a[@class="text-ellipsis-2"]').first().click();
    let addBtn = await page.locator('//button[@title="Add to Cart"]').nth(1);
    await expect(addBtn).toHaveText('Add to Cart');
    await addBtn.click();
    await expect(page.locator('#notification-box-top')).toBeVisible();
  });
});