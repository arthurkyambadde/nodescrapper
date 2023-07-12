import { getCompanyFacebookLink } from "./getCompanyFacebookLink/getCompanyFacebookLink";
import { getGoogleSearchLinks } from "./getGoogleSearchLinks/getGoogleSearchLinks";
import { getEmailAdress } from "./getCompanyEmail/getCompanyEmail";
import { readCompanyNames } from "./readCompanyName/readCompanyNames";
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "assets", "companies.txt");

(async () => {
  try {
    const companies = readCompanyNames(filePath);
    const companyEmails: string[] = [];

    companies.map(async (company: any) => {
      const url = `https://www.google.com/search?q=${company}`;

      const googleResults: any = await getGoogleSearchLinks(url);

      const facebookPage = await getCompanyFacebookLink(googleResults);

      const email = await getEmailAdress(facebookPage);
      companyEmails.push(email);

      console.log("email", email);

      const emailsText = companyEmails.join("\n");
      fs.writeFileSync("emails.txt", emailsText);
      console.log("Emails written to emails.txt file.");
    });
  } catch (error) {
    console.log("error:", error);
  }
})();
