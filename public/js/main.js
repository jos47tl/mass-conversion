const convertUrl = "http://localhost:3000/api/convert";
const combineUrl = "http://localhost:3000/api/combine";

const convertValue = document.getElementById("convertValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertButton = document.getElementById("convertButton");
const combineButton = document.getElementById("combineButton");
const convertResult = document.getElementById("convertResult");
const selectDropdowns = document.getElementsByTagName("select");

const options = [
  { value: "kg", text: "Kilogram (kg)" },
  { value: "g", text: "Gram (g)" },
  { value: "lb", text: "Pound (lb)" },
  { value: "oz", text: "Ounce (oz)" },
  { value: "t", text: "Metric ton (t)" },
  { value: "short_t", text: "Short ton (US ton)" },
  { value: "long_t", text: "Long ton (UK ton)" },
];

for (let i = 0; i < selectDropdowns.length; i++) {
  const select = selectDropdowns[i];
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.text = option.text;
    select.appendChild(optionElement);
  });
}

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
