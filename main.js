// todos
//  klasa "towar"

var demand = 200;
var supply = 100;
var max = 10;
var min = -10;
var offset;
var price = 1000;
var prevPrice = 1000;
var reduction;
var day = 0;

function oneCycle() {
  offset = Math.random() * (max - min) + min;
  demand += offset;
  offset = Math.random() * (max - min) + min;
  supply += offset;

  supply >= demand ? (price -= offset) : (price += offset);

  day++;

  var priceColor = price <= prevPrice ? "red" : "green";
  var styleChange = "<td style='" + "color: " + priceColor + "'>";
  var priceExtra =
    prevPrice - price >= 0
      ? (price - prevPrice).toFixed(2) + "↓"
      : (price - prevPrice).toFixed(2) + "↑";

  document.getElementById("tab").innerHTML +=
    "<tr><td>" +
    day +
    "</td><td>" +
    supply.toFixed(2) +
    "</td><td>" +
    demand.toFixed(2) +
    "</td>" +
    styleChange +
    price.toFixed(2) +
    " $</td>" +
    styleChange +
    priceExtra +
    " </td></tr>";
  prevPrice = price;
}
