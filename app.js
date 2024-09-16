const express = require("express");
const app = express();
const convert = require("./public/js/convert");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/api/convert", (req, res) => {
  const { value, fromUnit, toUnit } = req.query;

  if (!value || !fromUnit || !toUnit) {
    return res.status(400).send({ error: "Missing query parameter"});
  }
  if (!(fromUnit in convert.conversions) || !(toUnit in convert.conversions)) {
    return res.status(400).send({ error: "Invalid unit parameter"});
  }

  const result = convert.convertMass(value, fromUnit, toUnit);
  res.status(200).send({ result });
});

app.get("/api/combine", (req, res) => {
  const { value1, unit1, value2, unit2, operation } = req.query;

  if (!value1 || !unit1 || !value2 || !unit2 || !operation) {
    return res.status(400).send({ error: "Missing query parameter"});
  }
  if (!(unit1 in convert.conversions) || !(unit2 in convert.conversions)) {
    return res.status(400).send({ error: "Invalid unit parameter"});
  }
  if (!(operation === "add" || operation === "subtract")) {
    return res.status(400).send({ error: "Invalid operation parameter"});
  }

  const result = convert.combineMass(value1, unit1, value2, unit2, operation);
  res.status(200).send(result);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

module.exports = app;
