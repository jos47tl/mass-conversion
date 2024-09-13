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

function combineMass(json) {
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

module.exports = { convertMass, combineMass };
