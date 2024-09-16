const request = require("supertest");
const app = require("../app");

const convert = "/api/convert";
const combine = "/api/combine";

const convertTestCases = [
  {
    description: "simple conversion from kg to lb",
    value: 1,
    fromUnit: "kg",
    toUnit: "lb",
    output: {
      result: 2.204622622,
    },
    status: 200,
  },
  {
    description: "invalid fromUnit",
    value: 1,
    fromUnit: "fake_unit",
    toUnit: "lb",
    output: {
      error: "Invalid unit parameter",
    },
    status: 400,
  },
  {
    description: "invalid toUnit",
    value: 1,
    fromUnit: "kg",
    toUnit: "fake_unit",
    output: {
      error: "Invalid unit parameter",
    },
    status: 400,
  },
];

describe(`GET ${convert}`, () => {
  convertTestCases.forEach((testCase) => {
    it(testCase.description, async () => {
      const queryString = `${convert}?value=${testCase.value}&fromUnit=${testCase.fromUnit}&toUnit=${testCase.toUnit}`;

      const response = await request(app).get(queryString);
      expect(response.status).toBe(testCase.status);
      expect(response.body).toEqual(testCase.output);
    });
  });
});

const combineTestCases = [
  {
    description: "simple addition of kg and lb",
    value1: 2,
    unit1: "kg",
    value2: 3,
    unit2: "lb",
    operation: "add",
    output: {
      result1: 3.36077711,
      result2: 7.409245244,
    },
    status: 200,
  },
  {
    description: "simple subtraction of oz and lb",
    value1: 1,
    unit1: "oz",
    value2: 1,
    unit2: "lb",
    operation: "subtract",
    output: {
      result1: -15,
      result2: -0.9375,
    },
    status: 200,
  },
  {
    description: "rounding floating point precision",
    value1: 1,
    unit1: "kg",
    value2: 1,
    unit2: "g",
    operation: "add",
    output: {
      result1: 1.001,
      result2: 1001,
    },
    status: 200,
  },
  {
    description: "invalid unit parameter",
    value1: 1,
    unit1: "fake_unit",
    value2: 1,
    unit2: "g",
    operation: "add",
    output: {
      error: "Invalid unit parameter",
    },
    status: 400,
  },
];

describe(`GET ${combine}`, () => {
  combineTestCases.forEach((testCase) => {
    it(testCase.description, async () => {
      const queryString = `${combine}?value1=${testCase.value1}&unit1=${testCase.unit1}&value2=${testCase.value2}&unit2=${testCase.unit2}&operation=${testCase.operation}`;

      const response = await request(app).get(queryString);
      expect(response.status).toBe(testCase.status);
      expect(response.body).toEqual(testCase.output);
    });
  });
});
