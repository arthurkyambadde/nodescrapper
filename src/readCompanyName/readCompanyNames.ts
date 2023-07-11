const fs = require("fs");

export const readCompanyNames = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        const companies = data.trim().split("\n");
        resolve(companies);
      }
    });
  });
};
