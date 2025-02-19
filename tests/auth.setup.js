import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const email = 'wilfrid.coren@example.com';
const password = 'password123';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginAccount(email, password)
    await expect(page).toHaveTitle('My Account')

    await page.context().storageState({ path: authFile })
});