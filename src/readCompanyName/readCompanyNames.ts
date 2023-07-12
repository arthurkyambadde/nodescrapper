const fs = require("fs");

export const readCompanyNames = (filePath: string) => {
  const data = fs.readFileSync(filePath, "utf8");
  const dataArray = data.split("\n").filter((line: any) => line.trim() !== "");
  return dataArray;
};
