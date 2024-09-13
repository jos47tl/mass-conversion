const convertUrl = "http://localhost:3000/api/convert";
const combineUrl = "http://localhost:3000/api/combine";

let convertValue = document.getElementById("convertValue");
let fromUnit = document.getElementById("fromUnit");
let toUnit = document.getElementById("toUnit");
let convertButton = document.getElementById("convertButton");
let resultCard = document.getElementById("resultCard");

let displayResult = {
  value: 0,
  unit: 0,
};

convertButton.addEventListener("click", () => {
  const value = convertValue.value;
  const fromUnitValue = fromUnit.value;
  const toUnitValue = toUnit.value;
  const queryString = "?value=${value}&from=${fromUnitValue}&to=${toUnitValue}";
  const fetchUrl = convertUrl + queryString;

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      displayResult.value = data.value;
      displayResult.unit = data.unit;
    })
    .catch((error) => console.error(error));

  let element = document.createElement("div");
  element.textContent = "TESTING";
  //element.textContent = String(displayResult.value) + displayResult.unit;
  resultCard.append(element);
});
