const express = require("express");
const app = express();
const port = 3000;
const convert = require("./public/js/convert");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

function checkQuery(value, fromUnit, toUnit) {
  let pass = false;
  let message = "";
  if (!value || !fromUnit || !toUnit) {
    message = "Missing query parameter";
  } else if (fromUnit === toUnit) {
    message = "Conversion units cannot be identical";
  } else if (isNaN(parseFloat(value))) {
    message = "value must be a number";
  } else if (!conversions[fromUnit] || !conversions[toUnit]) {
    message = `Invalid units. Supported units are: ${Object.keys(conversions)}`;
  } else {
    pass = true;
  }

  if (!pass) {
    res.status(400);
    res.send(`${message}`);
  }
}

app.get("/api/convert", (req, res) => {
  const { value, fromUnit, toUnit } = req.query;

  checkQuery(value, fromUnit, toUnit);
  const result = convert.convertMass(value, fromUnit, toUnit);

  res.send(result);
});

app.post("/api/combine", (req, res) => {
  const { value1, unit1, value2, unit2, operation } = req.query;

  const validOperations = ["add", "subtract"];

  checkQuery(value1, unit1, unit2);
  if (!value1 || !unit1 || !value2 || !unit2 || !operation) {
    res.status(400);
    res.send("Missing query parameter");
  }
  if (isNaN(parseFloat(value1)) || isNaN(parseFloat(value2))) {
    res.status(400);
    res.send("Values must be numbers");
  }
  if (!validOperations.includes(operation)) {
    res.status(400);
    res.send(`Valid operations are: ${validOperations.join(", ")}`);
  }
  const result = convert.combineMass(value1, unit1, value2, unit2, operation);

  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port ${port}");
});
