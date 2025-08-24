const { expect } = require('@playwright/test');

// Products Page Locators

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  // Making sure we are on the products page
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.productItems.first()).toBeVisible();
  }

  // Adding a given number of random products to the cart
  async addRandomItemsToCart(itemCount = 3) {
    const totalItems = await this.productItems.count();
    if (itemCount > totalItems) {
      throw new Error(`Requested ${itemCount} items but only ${totalItems} available`);
    }

    const selectedItems = [];
    const selectedIndexes = new Set();

    // Picking unique random indexes
    while (selectedIndexes.size < itemCount) {
      const randomIndex = Math.floor(Math.random() * totalItems);
      selectedIndexes.add(randomIndex);
    }

    // Adding selected items
    for (const index of selectedIndexes) {
      const item = this.productItems.nth(index);
      const itemName = (await item.locator('.inventory_item_name').textContent()).trim();
      const addButton = item.locator('button.btn_primary.btn_inventory');

      await addButton.click();
      selectedItems.push(itemName);
    }

    // Confirming that the cart badge is updated
    await expect(this.cartBadge).toHaveText(itemCount.toString());

    return selectedItems;
  }

  // Going to the cart page
  async navigateToCart() {
    await this.page.goto('/cart.html');
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.page.locator('.cart_item, .cart_empty').first()).toBeVisible({ timeout: 5000 });
    console.log('Navigated to cart page');
  }

  // Getting the current cart count from badge
  async getCartItemCount() {
    const countText = await this.cartBadge.textContent();
    return countText ? parseInt(countText.trim(), 10) : 0;
  }
}

module.exports = { ProductsPage };
