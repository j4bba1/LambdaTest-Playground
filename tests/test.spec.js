// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { RegisterPage } from '../pages/register-page';

test.describe('Registester new account and login with the registred data', () => {
  const firstName = 'Wilfrid';
  const lastName = 'Coren';
  const email = 'wilfrid.coren@example.com';
  const phone = '+420 123 123 123';
  const password = 'password123';
  const passwordConfirm = 'password123';
  const newsletter = false;
  const agreePolicy = false;

  test('Register new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.goToRegisterPage();
    await registerPage.registerNewAcc(firstName, lastName, email, phone, password, passwordConfirm, newsletter, agreePolicy);
  })
  
});

