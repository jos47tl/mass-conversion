const convertUrl = "http://localhost:3000/api/convert";
const combineUrl = "http://localhost:3000/api/combine";

let convertValue = document.getElementById("convertValue");
let fromUnit = document.getElementById("fromUnit");
let toUnit = document.getElementById("toUnit");
let convertButton = document.getElementById("convertButton");
let resultCard = document.getElementById("resultCard");

convertButton.addEventListener("click", () => {
  const value = convertValue.value;
  const fromUnitValue = fromUnit.value;
  const toUnitValue = toUnit.value;
  const queryString = `?value=${value}&fromUnit=${fromUnitValue}&toUnit=${toUnitValue}`;
  const fetchUrl = convertUrl + queryString;

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let element = document.createElement("div");
      element.textContent = String(data.result) + toUnitValue;
      resultCard.append(element);
    })
    .catch((error) => console.error(error));
});
