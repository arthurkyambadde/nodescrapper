import { getCompanyFacebookLink } from "./getCompanyFacebookLink/getCompanyFacebookLink";
import { getGoogleSearchLinks } from "./getGoogleSearchLinks/getGoogleSearchLinks";
import { getEmailAdress } from "./getCompanyEmail/getCompanyEmail";

const company: string = "dstv";
const url = `https://www.google.com/search?q=${company}`;

const expression: RegExp =
  /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;

(async () => {
  try {
    const googleResults: any = await getGoogleSearchLinks(url);

    const facebookPage = await getCompanyFacebookLink(
      googleResults,
      expression
    );

    const email = await getEmailAdress(facebookPage);

    console.log("email", email);
  } catch (error) {
    console.log("error:", error);
  }
})();
