import { getVisiblePages } from "./pagination";

describe("getVisiblePages", () => {
  it("returns all pages when totalPages is 5 or less", () => {
    expect(getVisiblePages(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns ellipsis for middle ranges", () => {
    expect(getVisiblePages(5, 10)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
  });

  it("returns leading pages correctly near the start", () => {
    expect(getVisiblePages(2, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
  });

  it("returns trailing pages correctly near the end", () => {
    expect(getVisiblePages(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
  });
});