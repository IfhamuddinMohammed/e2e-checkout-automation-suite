// User Data using to login
const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
};

// Customer information for checkout
const CUSTOMERS = {
  DEFAULT: {
    firstName: 'Lean Technologies',
    lastName: 'Dubai',
    postalCode: '74777'
  }
};

const TEST_CONSTANTS = {
  DEFAULT_ITEM_COUNT: 3,
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 15000
  }
};

// Environment configuration
const ENV_CONFIG = {
  QA: {
    baseUrl: 'https://www.saucedemo.com',
    timeout: 30000,
    headless: true
  }
};

module.exports = {
  USERS,
  CUSTOMERS,
  TEST_CONSTANTS,
  ENV_CONFIG,
  
  // For easier access
  STD_USER: USERS.STANDARD.username,
  STD_PASSWORD: USERS.STANDARD.password
};