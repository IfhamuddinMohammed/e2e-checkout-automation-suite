const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    // Cart page locators
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  // Confirming that we’re on the cart page
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.checkoutButton).toBeVisible();
  }

  // Getting all items currently in the cart
  async getCartItems() {
    await expect(this.cartItems.first()).toBeVisible({ timeout: 5000 });

    const itemsCount = await this.cartItems.count();
    console.log(`Found ${itemsCount} items in cart`);

    const cartItems = [];
    for (let i = 0; i < itemsCount; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      cartItems.push(name.trim());
    }
    return cartItems;
  }

  // Checking that the cart has the expected items
  async verifyCartContainsItems(expectedItems) {
    const cartItems = await this.getCartItems();

    console.log('Expected items:', expectedItems);
    console.log('Actual cart items:', cartItems);

    expect(cartItems.length).toBe(expectedItems.length);

    for (const expectedItem of expectedItems) {
      expect(cartItems).toContain(expectedItem);
    }

    console.log('Cart verification successful');
  }

  // Continuing to checkout flow
  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }

  // Returning to the products page
  async goBackToProducts() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/inventory.html/);
  }
}

module.exports = { CartPage };
