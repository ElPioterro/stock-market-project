let actionPrice = 0; // cena jednej akcji
let actionTotal = 0; // liczba wszystkich akcji
let actionAvailable = 0; // liczba dostępnych akcji
let actionQuantity = 0; // liczba z jaką ilością akcji
let actionCount = 0; // liczba posiadanych akcji
let trNumber = 0; // kolejny numer transakcji
let speedOfUpdate = 3000; //szybkość aktualizacji tabeli
let PlayerName = "Player1"; // nazwa klienta
let BotNumber = 0; //numer bota
let BotsTimers = []; //numer bota

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
  document.getElementById("add-bot-btn").disabled = false;
  console.log(`Original action price: ${actionPrice}`);
  console.log(`Number of all actions: ${actionTotal}`);

  // Sets up timers;
  // setInterval(Update, speedOfUpdate);
}

function buyAction() {
  // Clears error logs
  document.getElementById("error-log").innerHTML = "";
  document.getElementById("error-log2").innerHTML = "";

  actionQuantity = document.getElementById("actionQuantity").value;
  actionQuantity = parseInt(actionQuantity);

  if (actionQuantity <= 0 || actionQuantity === null || isNaN(actionQuantity)) {
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

  if (actionQuantity <= 0 || actionQuantity === null || isNaN(actionQuantity)) {
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

function addBot() {
  let bot = new Bot("BOT-" + BotNumber);
  let BotInterval = 2000; //szybkość bota
  // randomly updates bot action
  // (function loop() {
  //   let BotInterval = randomNumber(1000, 3000); //szybkość bota
  //   var rand = Math.round(BotInterval);
  //   setTimeout(function () {
  //     bot.createEvent.bind(bot);
  //     loop();
  //   }, rand);
  // })();
  BotsTimers.push(setInterval(bot.createEvent.bind(bot), BotInterval));
  BotNumber++;
}

function Update(type = "-", clientName = "-") {
  let table = document.getElementById("tab");
  if (actionPrice <= 0) {
    Array.from(document.getElementsByTagName("button")).forEach((element) => {
      element.disabled = true;
    });
    Array.from(BotsTimers).forEach((element) => {
      clearInterval(element);
      console.log(`Bot ${BotsTimers.indexOf(element)} stopped`);
    });
    console.log(`%cBankruptcy`, `font-size: 2em; color: red;`);
    table.innerHTML += `<tr class="item bankruptcy"><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td></tr>`;
    return;
  }

  // if (table.childElementCount == 21) {
  //   table.removeChild(table.firstChild);
  // }

  table.innerHTML += `<tr class="item"><td>${trNumber}</td><td>${clientName}</td><td>${type}</td><td>${actionPrice.toFixed(
    4
  )}$</td><td>${actionAvailable}</td></tr>`;
  console.log(`actionPrice: ${actionPrice}`);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

changeTableWidth();
