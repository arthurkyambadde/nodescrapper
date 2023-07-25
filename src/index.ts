import { getCompanyFacebookLink } from "./getCompanyFacebookLink/getCompanyFacebookLink";
import { getGoogleSearchLinks } from "./getGoogleSearchLinks/getGoogleSearchLinks";
import { getEmailAdress } from "./getCompanyEmail/getCompanyEmail";
import { readCompanyNames } from "./readCompanyName/readCompanyNames";
import { loginToFacebook } from "./loginToFacebook/loginToFacebook";
import { logOutOfFacebook } from "./logOutOfFacebook/logOutFacebook";
const path = require("path");
const fs = require("fs");
const webdriver = require("selenium-webdriver"); // Correct import for webdriver
const { Builder, By, until, Options } = require("selenium-webdriver");

const filePath = path.join(__dirname, "assets", "companies.txt");

(async () => {
  try {
    const companies = readCompanyNames(filePath);
    const companyEmails: string[] = [];

    const urlPromises = companies.map(async (company: any) => {
      const url = `https://www.google.com/search?q=${company}`;
      const googleResults: any = await getGoogleSearchLinks(url);
      return getCompanyFacebookLink(googleResults);
    });

    // Get all the Facebook page URLs
    const facebookPageURLs = await Promise.all(urlPromises);

    // Log in to Facebook
    let driver;
    try {
      // Configure Chrome options to disable notifications
      const capabilities = webdriver.Capabilities.chrome();
      capabilities.set("chromeOptions", { args: ["--disable-notifications"] });

      driver = await new Builder().forBrowser("chrome").build();

      await driver.get("https://www.facebook.com/");
      await driver
        .findElement(By.name(process.env.PASSWORD))
        .sendKeys(process.env.EMAIL_ADDRESS);
      await driver.findElement(By.name("pass")).sendKeys("mupsa2015");
      await driver.findElement(By.css('form[method="post"]')).submit();
      870;

      let index = 0;
      for (const facebookPage of facebookPageURLs) {
        const email = await getEmailAdress(driver, facebookPage);
        if (email) {
          const printStatement = `${email} is email address for ${companies[index]}`;
          index++;
          companyEmails.push(printStatement);
        } else {
          const printStatement = `Failed to get email for ${companies[index]} `;
          index++;
          companyEmails.push(printStatement);
        }
      }

      const emailsText = companyEmails.join("\n");
      fs.writeFileSync("emails.txt", emailsText);
      console.log("Emails written to emails.txt file.");
    } catch (error) {
      console.log("error:", error);
    } finally {
      if (driver) {
        logOutOfFacebook(driver);
      }
    }
  } catch (error) {
    console.log("error:", error);
  }
})();
