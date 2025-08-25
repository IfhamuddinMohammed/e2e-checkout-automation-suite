# Swag Labs Checkout Automation suite

## Overview

This suite automates an end-to-end user flow on the **Swag Labs** website using Playwright.
This test covers the purchase of multiple items, from login to order completion.

## Test Flows Covered

- Login as a standard user
- Select and add 3 random products to the cart
- Verify cart contents
- Proceed to checkout
- Enter customer details (first name, last name, postal code)
- Verify order overview page
- Complete the order
- Confirm successful order completion

## Project Stucture
-------------------
E2E-SWAG-CHECKOUT/
├─ pages/                  # Page Object Model classes
│   ├─ authPage.js
│   ├─ productsPage.js
│   ├─ cartPage.js
│   ├─ checkoutPage.js
│   ├─ orderCompletePage.js
├─ tests/                  # Test specs
│   ├─ checkout.spec.js
├─ test-data/              # Test data & constants
│   ├─ constants.js
├─ playwright-report/       # Test execution HTML reports
│   ├─ index.html
├─ test-results/            # Raw test results
│   ├─ .last-run.json
├─ playwright.config.js     # Playwright configuration
├─ README.md                # Documentation


## Setup Instructions

1. Clone this repository:
   <https://github.com/IfhamuddinMohammed/e2e-checkout-automation-suite.git>

   cd <e2e-swag-checkout>

2. Install dependencies:
   npm install

3. Run the tests:
   npx playwright test

4. View the HTML report:
   npx playwright show-report
---

## Notes

Test data (users, customer info) is stored in test-data/constants.js.

Reports are generated in the playwright-report/ folder (index.html).

Raw execution results are available in the test-results/ folder.
