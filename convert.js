const conversion = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523125,
  t: 1000,
  short_t: 907.18,
  long_t: 1016.047,
};

function convertMass(value, fromUnit, toUnit) {
  let result = {
    value: value,
    unit: toUnit,
  };

  if (fromUnit !== toUnit) {
    const kgMass = value * conversion[fromUnit];
    result.value = kgMass / conversion[toUnit];
  }

  return result;
}

console.log(convertMass(1, "kg", "kg")); // Output: 1
console.log(convertMass(1, "kg", "t")); // Output: 0.001
console.log(convertMass(50, "g", "oz")); // Output: 1.763698
