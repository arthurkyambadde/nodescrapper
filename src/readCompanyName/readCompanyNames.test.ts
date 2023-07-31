const fs = require("fs");
const { Buffer } = require("node:buffer");
import { readCompanyNames } from "./readCompanyNames";

jest.mock("fs", () => {
  return {
    readFileSync: jest.fn(),
  };
});

describe("readCompanyNames", () => {
  afterEach(() => {
    fs.readFileSync.mockReset();
  });

  it("returns empty array if there is an error", () => {
    fs.readFileSync = jest.fn().mockImplementationOnce(() => {
      throw new Error("something went wrong while reading the file");
    });
    const result = readCompanyNames("sample_path");
    expect(result).toEqual([]);
  });

  it("returns empty array if the buffer returned is empty", () => {
    fs.readFileSync = jest.fn().mockImplementationOnce(() => {
      return new Buffer.from([]);
    });
    const result = readCompanyNames("sample_path");
    expect(result).toEqual([]);
  });

  it("returns a trimmed list of content", () => {
    fs.readFileSync = jest.fn().mockImplementationOnce(() => {
      return `nbs\nntv\nubc\n\n\n\nspark Tv`;
    });
    const result = readCompanyNames("sample_path");
    expect(result).toEqual(["nbs", "ntv", "ubc", "spark Tv"]);
  });
});
