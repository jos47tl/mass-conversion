const { formatNumber, convertMass, combineMass } = require("../public/js/convert")

describe("formatNumber", () => {
  it("should not change value", () => {
    expect(formatNumber(1)).toBe(1);
    expect(formatNumber(0)).toBe(0);
    expect(formatNumber(-1)).toBe(-1);
  });
  it("round long decimals", () => {
    expect(formatNumber(1.111111111111111)).toBe(1.111111111);
    expect(formatNumber(0.999999999999999)).toBe(1);
  });
  it("scientific notation", () => {
    expect(formatNumber(12345678987654321)).toBe("1.234567899e+16");
    expect(formatNumber(0.00000000000000001)).toBe("1e-17");
  });
  it("edge cases", () => {
    expect(formatNumber("")).toBe(0);
    expect(formatNumber("a")).toBeNaN();
  })
})

describe("convertMass", () => {
  it("converting the same unit", () => {
    expect(convertMass(1, "kg", "kg")).toBe(1);
    expect(convertMass(0, "lb", "lb")).toBe(0);
  });
})
