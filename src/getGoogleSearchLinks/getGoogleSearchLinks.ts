const cheerio = require("cheerio");
const axios = require("axios");

export async function getGoogleSearchLinks(url: string) {
  const links_data: string[] = [];

  try {
    const response = await axios.get(url);
    const data = await response.data;

    const $ = cheerio.load(data);
    const links = $("a");

    $(links).each(function (index: number, element: any) {
      links_data.push($(element).attr("href"));
    });

    return links_data;
  } catch (error) {
    return error;
  }
}
