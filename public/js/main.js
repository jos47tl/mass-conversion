const convertUrl = "http://localhost:3000/api/convert";
const combineUrl = "http://localhost:3000/api/combine";

const convertValue = document.getElementById("convertValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertButton = document.getElementById("convertButton");

const combineValue1 = document.getElementById("combineValue1");
const combineUnit1 = document.getElementById("combineUnit1");
const combineValue2 = document.getElementById("combineValue2");
const combineUnit2 = document.getElementById("combineUnit2");
const combineButton = document.getElementById("combineButton");

const selectDropdowns = document.getElementsByTagName("select");

// Options for selection dropdown menus
const options = [
  { value: "kg", text: "Kilogram (kg)" },
  { value: "g", text: "Gram (g)" },
  { value: "lb", text: "Pound (lb)" },
  { value: "oz", text: "Ounce (oz)" },
  { value: "t", text: "Metric ton (t)" },
  { value: "short_t", text: "Short ton (US ton)" },
  { value: "long_t", text: "Long ton (UK ton)" },
];

// Populates dropdown menus
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
      const cardID = "convertCard";
      const elementID = "convertResult";

      resetResult(cardID, elementID);
      let newResult = document.createElement("p");
      newResult.textContent = `${data.result} ${toUnitValue}`;
      const convertResult = document.getElementById(elementID);

      convertResult.append(newResult);
    })
    .catch((error) => console.error(error));
});

combineButton.addEventListener("click", () => {
  const value1 = combineValue1.value;
  const unit1 = combineUnit1.value;
  const value2 = combineValue2.value;
  const unit2 = combineUnit2.value;
  const operation = document.querySelector("input[type='radio']:checked").id;
  const queryString = `?value1=${value1}&unit1=${unit1}&value2=${value2}&unit2=${unit2}&operation=${operation}`;
  const fetchUrl = combineUrl + queryString;

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      const cardID = "combineCard";
      const elementID = "combineResult";

      resetResult(cardID, elementID);
      let result1 = document.createElement("p");
      let result2 = document.createElement("p");
      result1.style.marginBottom = 0;
      result1.textContent = `${data.result.value1} ${unit1}`;
      result2.textContent = `${data.result.value2} ${unit2}`;
      const combineResult = document.getElementById(elementID);

      combineResult.append(result1);
      combineResult.append(result2);
    })
    .catch((error) => console.error(error));
});

const resetResult = (cardID, elementID) => {
  const card = document.getElementById(cardID);
  let result = document.getElementById(elementID);
  result.remove();
  result = document.createElement("div");
  result.id = elementID;
  card.append(result);
};
