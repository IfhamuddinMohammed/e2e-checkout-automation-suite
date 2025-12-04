// User Data for login
const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
};

// Customer information for checkout
const CUSTOMERS = {
  DEFAULT: {
    firstName: 'Softbuilders Software Design LLC',
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
  },
  UAT: {
    baseUrl: 'https://uat.saucedemo.com',
    timeout: 45000,
    headless: false
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
