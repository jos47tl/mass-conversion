const express = require("express");
const app = express();
const port = 3000;
const convert = require("./public/js/convert");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/api/convert", (req, res) => {
  const { value, fromUnit, toUnit } = req.query;
  const result = convert.convertMass(value, fromUnit, toUnit);
  res.send({ result });
});

app.get("/api/combine", (req, res) => {
  const { value1, unit1, value2, unit2, operation } = req.query;
  const result = convert.combineMass(value1, unit1, value2, unit2, operation);
  res.send({ result });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port ${port}");
});
