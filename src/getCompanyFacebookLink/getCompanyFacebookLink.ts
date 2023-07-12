export async function getCompanyFacebookLink(links: string[]) {
  const expression: RegExp =
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;

  for (const url of links) {
    const match = expression.test(url);
    if (match) {
      const startIndex = url.indexOf("/url?q=") + 7;
      const endIndex = url.indexOf("&sa=U&ved=");
      const facebookLink: string = url.slice(startIndex, endIndex);

      return facebookLink;
    }
  }

  return null;
}
