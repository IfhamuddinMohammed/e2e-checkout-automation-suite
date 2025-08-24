const { expect } = require('@playwright/test');

class OrderCompletePage {
  constructor(page) {
    this.page = page;
    this.completionHeader = page.locator('.complete-header');
    this.completionText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Making sure the order complete page is loaded
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.completionHeader).toBeVisible();
  }

  // Confirming the order completion message and UI elements
  async verifyOrderCompletion() {
    await expect(this.completionHeader).toHaveText('Thank you for your order!');
    await expect(this.completionText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(this.backHomeButton).toBeVisible();
    console.log('Order completion verified');
  }
}

module.exports = { OrderCompletePage };
