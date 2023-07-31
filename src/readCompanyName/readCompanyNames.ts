const fs = require("fs");

export const readCompanyNames = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const dataArray = data
      .split("\n")
      .filter((line: any) => line.trim() !== "");
    return dataArray;
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
};
