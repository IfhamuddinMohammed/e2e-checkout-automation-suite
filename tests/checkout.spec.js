const { test } = require('@playwright/test');
const { AuthPage } = require('../pages/authPage');
const { ProductsPage } = require('../pages/productsPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');
const { OrderCompletePage } = require('../pages/orderCompletePage');
const testData = require('../test-data/constants');

test.describe(' To Purchase 3 Random items from Swag Labs Website', () => {
  test(' To Complete the checkout process with multiple items', async ({ page }) => {
    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderCompletePage = new OrderCompletePage(page);

    page.setDefaultTimeout(45000);

    // Step 1: Logging the user into Swag Labs website
    await test.step('User authentication', async () => {
      console.log('Authenticating as standard user');
      await authPage.navigate();
      await authPage.login(
        testData.USERS.STANDARD.username,
        testData.USERS.STANDARD.password
      );
      await productsPage.verifyPageLoaded();
      console.log(' Authentication successful - Products page loaded');
    });

    // Step 2: Picking and adding items to the cart
    let selectedItems;
    await test.step('Adding products to cart', async () => {
      console.log('Selecting 3 random products...');
      selectedItems = await productsPage.addRandomItemsToCart(3);
      console.log('Products added to cart:', selectedItems);
    });

    // Step 3: Navigating towards the cart and confirming the added items
    await test.step('Reviewing cart contents', async () => {
      await productsPage.navigateToCart();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartContainsItems(selectedItems);
      console.log('Cart is verified');
    });

    // Step 4: Starting checkout process
    await test.step('Completing purchase', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.verifyPageLoaded();
    });

    // Step 5: Filling out customer information with zip/postal code
    await test.step('Enter customer details', async () => {
      await checkoutPage.fillCustomerInformation(
        testData.CUSTOMERS.DEFAULT.firstName,
        testData.CUSTOMERS.DEFAULT.lastName,
        testData.CUSTOMERS.DEFAULT.postalCode
      );
      console.log('Customers information and zip code filled');
      await checkoutPage.continueToOverview();
    });

    // Step 6: Verifying overview page is loaded
    await test.step('Verify overview page is loaded', async () => {
      await checkoutPage.verifyOverviewPageLoaded();
      console.log('Overview page is loaded successfully');
    });

    // Step 7: Submitting the order
    await test.step('Completing purchase', async () => {
      await checkoutPage.verifyOverviewPageLoaded();
      await checkoutPage.clickFinishButton();
      await page.waitForURL(/checkout-complete.html/, { timeout: 10000 });
      console.log('Clicked Finish button on overview page');
    });

    // Step 8: Verifying the successful completion of the order
    await test.step('Complete purchase and verify', async () => {
      await orderCompletePage.verifyPageLoaded();
      await orderCompletePage.verifyOrderCompletion();
      console.log('Order purchased successfully!');
    });

    // Step 9: Taking a Screenshot for the order confirmation.
    await page.screenshot({ path: 'test-results/checkout-success.png' });
  });
});
