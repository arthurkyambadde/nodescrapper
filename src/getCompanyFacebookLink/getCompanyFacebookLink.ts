export async function getCompanyFacebookLink(
  links: string[],
  expression: RegExp
) {
  for (const url of links) {
    const match = expression.test(url);
    if (match) {
      const startIndex = url.indexOf("/url?q=") + 7;
      const endIndex = url.indexOf("&sa=U&ved=");
      const facebookLink = url.slice(startIndex, endIndex);

      console.log(facebookLink);

      return facebookLink;
    }
  }

  return null;
}
