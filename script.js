const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".currency__dropdown select");
const button = document.querySelector(".currency__button");
const fromCurrency = document.querySelector(".currency__fromSelect select");
const toCurrency = document.querySelector(".currency__toSelect select");
const message = document.querySelector(".currency__rate");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
    select.addEventListener("change", (evt) => {
      updateflag(evt.target);
    });
  }
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount");
  // console.log(amount.value)
  if (amount.value < 1) {
    alert("Please enter Valid Amount");
  }

  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
  // console.log(fromCurrency.value)
  // console.log(toCurrency.value)

  let response = await fetch(URL);
  let data = await response.json();
  let rate =
    data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  // console.log(rate);

  let totalAmount = amount.value * rate;
  // console.log(totalAmount);

  message.innerText = `${amount.value} ${
    fromCurrency.value
  } = ${totalAmount.toFixed(2)} ${toCurrency.value}`;
};

button.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
