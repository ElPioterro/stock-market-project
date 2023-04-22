var actionPrice = 0; // cena jednej akcji
var actionTotal = 0; // liczba wszystkich akcji
var actionAvailable = 0; // liczba dostępnych akcji
var actionQuantity = 0; // liczba z jaką ilością akcji
var actionCount = 0; // liczba posiadanych akcji
var trNumber = 0; // kolejny numer transakcji

function Setup() {
  actionTotal = document.getElementById("actionTotal").value;
  actionPrice = document.getElementById("actionPrice").value;
  actionTotal = parseInt(actionTotal);
  actionPrice = parseInt(actionPrice);
  actionAvailable = actionTotal;
  if (
    isNaN(actionPrice) ||
    isNaN(actionTotal) ||
    actionPrice == null ||
    actionTotal == null ||
    actionPrice <= 0 ||
    actionTotal <= 0
  ) {
    document.getElementById("error-log").innerHTML = "Invalid input";
    return;
  }

  document.getElementById("setSection").style.display = "none";
  document.getElementById("buy-btn").disabled = false;
  console.log(actionPrice);
  console.log(actionTotal);
}

function buyAction() {
  actionQuantity = document.getElementById("actionQuantity").value;
  actionQuantity = parseInt(actionQuantity);
  if (actionQuantity <= 0 || actionQuantity == null) {
    document.getElementById("error-log2").innerHTML = "Invalid input";
    return;
  } else if (actionQuantity > actionAvailable) {
    document.getElementById("error-log2").innerHTML =
      "Not enough actions to buy";
    return;
  }
  document.getElementById("sell-btn").disabled = false;

  trNumber++;
  actionAvailable -= actionQuantity;
  actionCount += actionQuantity;
  actionPrice *= 1 + (actionQuantity * actionQuantity) / actionTotal / 1000;
  Update("bought");
}

function sellAction() {
  actionQuantity = document.getElementById("actionQuantity").value;
  actionQuantity = parseInt(actionQuantity);
  if (actionQuantity <= 0 || actionQuantity == null) {
    document.getElementById("error-log2").innerHTML = "Invalid input";
    return;
  } else if (actionQuantity > actionCount) {
    document.getElementById("error-log2").innerHTML =
      "Not enough actions to sell";
    return;
  }
  trNumber++;
  actionAvailable += actionQuantity;
  actionCount -= actionQuantity;
  actionPrice *= 1 - (actionQuantity * actionQuantity) / actionTotal / 1000;
  Update("sold");
}

function Update(type) {
  document.getElementById(
    "tab"
  ).innerHTML += `<tr><td>${trNumber}</td><td>${type}</td><td>${actionPrice.toFixed(
    4
  )}$</td><td>${actionAvailable}</td></tr>`;
  console.log(actionPrice);
}
