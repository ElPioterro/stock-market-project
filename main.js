let actionPrice = 0; // cena jednej akcji
let actionTotal = 0; // liczba wszystkich akcji
let actionAvailable = 0; // liczba dostępnych akcji
let actionQuantity = 0; // liczba z jaką ilością akcji
let actionCount = 0; // liczba posiadanych akcji

// Get the canvas element
var canvas = document.getElementById("graph");
var ctx = canvas.getContext("2d");

// Set up the data
var data = [];

// Set up the scale
var xScale = canvas.width / (data.length - 1);
var yScale = canvas.height / Math.max(...data);

// Starting point
var initialValue = 500;

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
  console.log(`Original action price: ${actionPrice}`);
  console.log(`Number of all actions: ${actionTotal}`);

  data.push(actionPrice);
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
  actionAvailable -= actionQuantity;
  actionCount += actionQuantity;
  actionPrice *= 1 + (actionQuantity * actionQuantity) / actionTotal / 1000;
  Update();
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
  actionAvailable += actionQuantity;
  actionCount -= actionQuantity;
  actionPrice *= 1 - (actionQuantity * actionQuantity) / actionTotal / 1000;
  Update();
}

function Update() {
  if (actionPrice <= 0) {
    Array.from(document.getElementsByTagName("button")).forEach((element) => {
      element.disabled = true;
    });
    console.log(`%cBankruptcy`, `font-size: 2em; color: red;`);
    document.getElementById(
      "error-log2"
    ).innerHTML = `<tr class="item bankruptcy"><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td><td>Bankruptcy</td></tr>`;
    return;
  }

  data.push(actionPrice * 10);
  console.log(`actionPrice: ${actionPrice}`);

  xScale = canvas.width / (data.length - 1);
  yScale = canvas.height / Math.max(...data);

  //Clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw the line graph
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - (data[0] * yScale) / 2); //OPTIONAL yScale / 2
  for (var i = 0; i < data.length; i++) {
    ctx.lineTo(i * xScale, canvas.height - data[i] * yScale) / 2; //OPTIONAL yScale / 2
  }
  ctx.stroke();
  ctx.closePath();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
