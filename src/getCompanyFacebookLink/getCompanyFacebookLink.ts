export async function getCompanyFacebookLink(links: string[]) {
  const expression: RegExp =
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;

  for (const url of links) {
    const match = expression.exec(url); // Use exec() instead of test() to get capturing groups
    if (match) {
      const facebookLink: string = match[0]; // Use match[0] to get the full matched URL

      console.log("Found Facebook Link:", facebookLink); // Log the Facebook link for debugging purposes

      return facebookLink;
    }
  }

  return null;
}
