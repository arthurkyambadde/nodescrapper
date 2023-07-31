const { filePath } = require("./index.ts");

describe.skip("filePath", () => {
  test("it should return the correct file path", () => {
    const expectedFilePath =
      "/home/arthurkyam/Desktop/Open source/nodescrapper/src/assets/companies.txt";

    expect(filePath).toBe(expectedFilePath);
  });

  test("it should have 'companies.txt' in the file path", () => {
    expect(filePath).toContain("companies.txt");
  });
});
