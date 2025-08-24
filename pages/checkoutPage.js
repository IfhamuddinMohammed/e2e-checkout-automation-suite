const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;

     // Locators for checkout flow
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
  }

  // Verifying Checkout: Your Information page is loaded
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await expect(this.firstNameInput).toBeVisible();
  }

  // Filling in customer info (first name, last name, and the Zip/Postal code)
  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Clicking Continue to go to the overview page
  async continueToOverview() {
    await this.continueButton.click();
    await this.page.waitForURL(/checkout-step-two.html/);
    console.log('Continued to overview page');
  }

  // Verifying Checkout: Overview Page is loaded
  async verifyOverviewPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.finishButton).toBeVisible();
  }

  // Clicking Finish to complete the order
  async clickFinishButton() {
    await this.finishButton.click({ timeout: 10000 });
    console.log('Finish button clicked');
  }
}

module.exports = { CheckoutPage };
