const conversions = {
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
  const kgMass = value * conversions[fromUnit];
  const result = kgMass / conversions[toUnit];

  return result;
}

function combineMass(value1, unit1, value2, unit2, operation) {
  const kgMass1 = value1 * conversions[unit1];
  const kgMass2 = value2 * conversions[unit2];
  let kgTotal;

  if (operation === "add") {
    kgTotal = kgMass1 + kgMass2;
  } else if (operation === "subtract") {
    kgTotal = kgMass1 - kgMass2;
  }

  const result = {
    value1: kgTotal / conversions[unit1],
    value2: kgTotal / conversions[unit2],
  };

  return result;
}

/*
function listMass(json) {
  let result = {
    values: [],
    units: [],
  };
  let kgTotal = 0;

  for (let i = 0; i < json.values.length; i++) {
    const unit = json.units[i];
    const operation = json.operations[i];
    const kgMass = json.values[i] * conversion[unit];

    if (operation === "add") {
      kgTotal += kgMass;
    } else if (operation === "subtract") {
      kgTotal -= kgMass;
    }
    if (!result.units.includes(unit)) {
      result.units.push(unit);
    }
  }

  for (let i = 0; i < result.units.length; i++) {
    const converted = convertMass(kgTotal, "kg", result.units[i]);
    result.values.push(converted.value);
  }

  return result;
}
*/

module.exports = { conversions, convertMass, combineMass };
