function exportTableToExcel() {
  var table1 = document.getElementById("table1");
  var table2 = document.getElementById("tab");

  // merge the tables
  var mergedTable = document.createElement("table");

  // ...code to merge tables...
  var mergedTable = document.createElement("table");

  // clone the first row of the first table and append it to the new table
  var firstRow = table1.rows[0].cloneNode(true);
  mergedTable.appendChild(firstRow);

  // loop through each row of the first table and clone it, then append it to the new table
  for (var i = 1; i < table1.rows.length; i++) {
    var newRow = table1.rows[i].cloneNode(true);
    mergedTable.appendChild(newRow);
  }

  // repeat for the second table
  if (table2) {
    // Add rows from table2 to mergedTable
    for (var i = 0; i < table2.rows.length; i++) {
      var newRow = table2.rows[i].cloneNode(true);
      mergedTable.appendChild(newRow);
    }
  } else {
    console.error("Table2 element not found");
  }
  // replace the first table with the merged table
  // table1.replaceWith(mergedTable);

  // create an empty CSV string
  var csv = "";

  // loop through each row of the merged table
  for (var i = 0; i < mergedTable.rows.length; i++) {
    // loop through each cell in the row
    for (var j = 0; j < mergedTable.rows[i].cells.length; j++) {
      // add the cell value to the CSV string
      csv += mergedTable.rows[i].cells[j].textContent;

      // add a comma if this is not the last cell in the row
      if (j < mergedTable.rows[i].cells.length - 1) {
        csv += ",";
      }
    }

    // add a newline character after the last cell in the row
    csv += "\n";
  }

  // create a Blob object with the CSV data
  var blob = new Blob([csv], { type: "text/csv" });

  // create an anchor element to trigger the download
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tabledata.csv";

  // trigger the download
  document.body.appendChild(link);
  link.click();

  // remove the anchor element
  document.body.removeChild(link);
}
