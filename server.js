const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const convert = require("./public/js/convert");

app.get("/api/convert", (req, res) => {
  const { value, fromUnit, toUnit } = req.query;
  const result = convert.convertMass(value, fromUnit, toUnit);
  res.send(result);
});

app.post("/api/combine", (req, res) => {
  const result = convert.combineMass(req.body);
  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port ${port}");
});
