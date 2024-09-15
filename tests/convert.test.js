const { formatNumber, convertMass, combineMass } = require("../public/js/convert")

describe("formatNumber function", () => {
  it("leave number as is", () => {
    expect(formatNumber(1)).toBe(1);
    expect(formatNumber(0)).toBe(0);
    expect(formatNumber(-1)).toBe(-1);
    expect(formatNumber(0.0000000001)).toBe(0.0000000001);
    expect(formatNumber(999999999)).toBe(999999999);
  });
  it("rounds to the nearest 9th decimal", () => {
    expect(formatNumber(1.111111111111)).toBe(1.111111111);
    expect(formatNumber(0.999999999999)).toBe(1);
  });
  it("small/large are formatted to scientific notation", () => {
    expect(formatNumber(0.0000000001)).toBe("1e-10");
    expect(formatNumber(1000000000)).toBe("1e+9");
  })
});
