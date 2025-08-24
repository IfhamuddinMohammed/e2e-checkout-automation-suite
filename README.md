# Swag Labs Checkout Automation suite

## Overview

This suite automates an end-to-end user flow on the **Swag Labs** website using Playwright.
This test covers the purchase of multiple items, from login to order completion.

## Test Flows Covered

* Login as a standard user
* Selected and added 3 random products to cart
* Verify cart contents
* Proceed to checkout
* Enter customer details
* Verify overview page
* Complete the order
* Confirm successful order completion

## Project Stucture

E2E-SWAG-CHECKOUT/
├─ pages/
├─ test-data/
├─ test-results/
├─ tests/
├─ playwright.config.js
├─ README.md

## Setup Instructions

1. Clone this repository:
   git clone <https://github.com/IfhamuddinMohammed/e2e-checkout-automation-suite.git>
   cd <e2e-swag-checkout>

2. Install dependencies:
   npm install

3. Run the tests:
   npx playwright test

4. View the HTML report:
   npx playwright show-report
---

## Notes

Test data (users, customer info) is stored in `test-data/constants.js`.
