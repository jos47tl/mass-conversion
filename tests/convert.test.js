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
    expect(formatNumber("a")).toBe(0);
    expect(formatNumber(null)).toBe(0);
    expect(formatNumber(undefined)).toBe(0);
  })
})

describe("convertMass", () => {
  it("converting the same unit", () => {
    expect(convertMass(1, "kg", "kg")).toBe(1);
    expect(convertMass(0, "lb", "lb")).toBe(0);
    expect(convertMass(-1, "long_t", "long_t")).toBe(-1);
  });
  it("simple conversions", () => {
    expect(convertMass(2, "kg", "lb")).toBe(4.409245244);
    expect(convertMass(4.409245244, "lb", "kg")).toBe(2);
  });
  it("scientific notation", () => {
    expect(convertMass(100, "t", "mg")).toBe("1e+11");
    expect(convertMass(0.000001, "oz", "short_t")).toBe("3.125016328e-11");
  });
  it("edge cases", () => {
    expect(convertMass("", "kg", "lb")).toBe(0);
    expect(convertMass("a", "kg", "lb")).toBe(0);
    expect(convertMass(null, "kg", "lb")).toBe(0);
    expect(convertMass(undefined, "kg", "lb")).toBe(0);
    expect(convertMass(1, "kg", "fake_unit")).toBe(0);
  })
})

describe("combineMass", () => {
  it("simple addition", () => {
    const output = {
      result1: 2,
      result2: 2,
    }
    expect(combineMass(1, "kg", 1, "kg", "add")).toEqual(output);
  });
  it("simple subtraction", () => {
    const output = {
      result1: 0,
      result2: 0,
    }
    expect(combineMass(1, "kg", 1, "kg", "subtract")).toEqual(output);
  });
  it("differing units", () => {
    const output = {
      result1: 3.36077711,
      result2: 7.409245244,
    }
    expect(combineMass(2, "kg", 3, "lb", "add")).toEqual(output);
  });
  it("fix rounding error", () => {
    const output = {
      result1: 1.001,
      result2: 1001,
    }
    expect(combineMass(1, "kg", 1, "g", "add")).toEqual(output);
  });
  it("scientific notation", () => {
    const output = {
      result1:	"9.0718e+10",
      result2:	100.000000001,
    }
    expect(combineMass(1, "mg", 100, "short_t", "add")).toEqual(output);
  });
})