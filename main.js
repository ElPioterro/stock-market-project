let actionPrice = 0; // cena jednej akcji
let actionTotal = 0; // liczba wszystkich akcji
let actionAvailable = 0; // liczba dostępnych akcji
let actionQuantity = 0; // liczba z jaką ilością akcji
let actionCount = 0; // liczba posiadanych akcji
let trNumber = 0; // kolejny numer transakcji
let speedOfUpdate = 3000;
let PlayerName = "Player1";
let BotInterval = 3000;
let Bot1 = new Bot("Bot");

// Measure the scrollbar width
function scrollbarMeasure() {
  let scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // console.warn(scrollbarWidth);

  // Delete the div
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

// Changes table width
function changeTableWidth() {
  document.getElementsByTagName(
    "table"
  )[0].style.width = `calc(${90}% - ${scrollbarMeasure()}px)`;
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

  // Sets up timers;
  setInterval(Update, speedOfUpdate);
  setInterval(Bot1.Update(), BotInterval);
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

function Update(type = "-", clientName = "-") {
  let table = document.getElementById("tab");

  if (table.childElementCount == 21) {
    // table.removeChild(table.firstChild);
  }

  table.innerHTML += `<tr class="item"><td>${trNumber}</td><td>${clientName}</td><td>${type}</td><td>${actionPrice.toFixed(
    4
  )}$</td><td>${actionAvailable}</td></tr>`;
  console.log(actionPrice);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

changeTableWidth();
