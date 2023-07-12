const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

export async function getEmailAdress(facebookPageURL: any) {
  let driver: any;

  try {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.get(facebookPageURL);

    await driver
      .findElement(By.name("email"))
      .sendKeys("arthurkyambadde9@gmail.com"); // Replace with your email
    await driver.findElement(By.name("pass")).sendKeys("mupsa2015"); // Replace with your password

    // Submit the login form
    await driver.findElement(By.css('form[method="post"]')).submit();

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
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}
