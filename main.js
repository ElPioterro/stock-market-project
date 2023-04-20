// todos
//  klasa "towar"

var demand = 200;
var supply = 100;
var max = 10;
var min = -10;
var offset;
var price = 1000;
var reduction;
var day = 0;

function oneCycle() {
  offset = Math.random() * (max - min) + min;
  demand += offset;
  offset = Math.random() * (max - min) + min;
  supply += offset;

  supply >= demand ? (price -= offset) : (price += offset);

  day++;

  document.getElementById("tab").innerHTML +=
    "<tr><td>" +
    day +
    "</td><td>" +
    supply +
    "</td><td>" +
    demand +
    "</td><td>" +
    price +
    "</td> </tr>";
}
