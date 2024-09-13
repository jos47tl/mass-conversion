const express = require("express");
const app = express();
const port = 3000;
const convert = require("./convert");

app.use(express.json());

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
  // res.sendFile(__dirname + "/index.html");
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Server listening on port ${port}");
});
