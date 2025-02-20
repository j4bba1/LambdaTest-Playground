const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.myAccount = page.locator('//i[@class="icon fas fa-user"]');
    this.login = page.getByRole('link', { name: 'Login', exact: true });
    this.register = page.getByRole('link', { name: 'Register', exact: true })

    this.categoryBtn = page.getByRole('button', { name: 'Shop by Category' });
    this.components = page.getByRole('link', { name: 'Components' });
    this.cameras = page.getByRole('link', { name: 'Cameras', exact: true });
    this.phonesTablets = page.getByRole('link', { name: 'Phone, Tablets & Ipod' });
    this.software = page.getByRole('link', { name: 'Software' });
    this.mp3 = page.getByRole('link', { name: 'MP3 Players' });
    this.laptop = page.getByRole('link', { name: 'Laptops & Notebooks' });
    this.desktopMonitor = page.getByRole('link', { name: 'Desktops and Monitors' });
    this.printer = page.getByRole('link', { name: 'Printers & Scanners' });
    this.mice = page.getByRole('link', { name: 'Mice and Trackballs' });
    this.fashion = page.getByRole('link', { name: 'Fashion and Accessories' });
    this.beauty = page.getByRole('link', { name: 'Beauty and Saloon' });
    this.autopart = page.getByRole('link', { name: 'Autoparts and Accessories' });
    this.washingMachine = page.getByRole('link', { name: 'Washing machine' });
    this.gameConsole = page.getByRole('link', { name: 'Gaming consoles' });
    this.airCon = page.getByRole('link', { name: 'Air conditioner' });
    this.webCam = page.getByRole('link', { name: 'Web Cameras' });
  };

  async goTo() {
    await this.page.goto('/')
  }

  async goToLoginPage() {
    await expect(this.page).toHaveTitle('Your Store');
    //hover over "My account" and click "Login"
    await this.myAccount.hover();
    await this.login.click();
  }

  async goToRegisterPage() {
    //hover over "My account" and click "Register"
    await this.myAccount.hover();
    await this.register.click();
    await expect(this.page).toHaveTitle('Register Account');
  }

  async goToComponentPage() {
    await this.categoryBtn.click();
    await this.components.click();
  }

  async goToCameraPage() {
    await this.categoryBtn.click();
    await this.cameras.click();
  }
};