const webdriver = require("selenium-webdriver");

const originalWebDriver = webdriver;

jest.mock("selenium-webdriver", () => ({
  Capabilities: {
    chrome: jest.fn(),
  },
}));
