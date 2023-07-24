const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

export async function getEmailAdress(driver: any, facebookPageURL: any) {
  try {
    await driver.get(facebookPageURL);

    // Wait for the elements containing the phone number and email address
    await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[3]/div[2]/div/div/span | /html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[4]/div[2]/div/div/span"
        )
      ),
      20000 // Increased timeout to 20 seconds
    );

    const elements = await driver.findElements(
      By.xpath(
        "/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[3]/div[2]/div/div/span | /html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[4]/div[2]/div/div/span"
      )
    );

    let email = null;
    for (const element of elements) {
      const text = await element.getText();
      if (text && text.includes("@")) {
        email = text;
        break;
      }
    }

    if (email) {
      return email;
    } else {
      console.log("No valid email address found.");
    }
  } catch (error) {
    console.error("Error scraping company email:", error);
  }
}
