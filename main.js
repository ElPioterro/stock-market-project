var actionPrice = 0; // cena jednej akcji
var actionTotal = 0; // liczba wszystkich akcji
var actionAvailable = 0; // liczba dostępnych akcji
var actionQuantity = 0; // liczba z jaką ilością akcji
var actionCount = 0; // liczba posiadanych akcji
var trNumber = 0; // kolejny numer transakcji
var speedOfUpdate = 3000;
var PlayerName = "Player1";

// Measure the scrollbar width
function scrollbarMeasure() {
  var scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // console.warn(scrollbarWidth);

  // Delete the div
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

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
  setInterval(Update, speedOfUpdate);
}

function buyAction() {
  // Clears error logs
  document.getElementById("error-log").innerHTML = "";
  document.getElementById("error-log2").innerHTML = "";

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
  Update("bought", PlayerName);
}

function sellAction() {
  // Clears error logs
  document.getElementById("error-log").innerHTML = "";
  document.getElementById("error-log2").innerHTML = "";

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
  Update("sold", PlayerName);
}

function Update(type = "-", clientID = "-") {
  var table = document.getElementById("tab");

  if (table.childElementCount == 21) {
    // table.removeChild(table.firstChild);
  }

  table.innerHTML += `<tr class="item"><td>${trNumber}</td><td>${clientID}</td><td>${type}</td><td>${actionPrice.toFixed(
    4
  )}$</td><td>${actionAvailable}</td></tr>`;
  console.log(actionPrice);
}

// Changes table width
function changeTableWidth() {
  document.getElementsByTagName(
    "table"
  )[0].style.width = `calc(${90}% - ${scrollbarMeasure()}px)`;
}

changeTableWidth();
