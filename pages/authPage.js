const { expect } = require('@playwright/test');

class AuthPage {
  constructor(page) {
    this.page = page;

    // Login page Locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigating to login page
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveTitle('Swag Labs');
    console.log('Login page loaded');
  }

  // Performing login with the given username and password that is available on the login page
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    console.log(`Logged in with the user: ${username}`);
  }
}

module.exports = { AuthPage };
