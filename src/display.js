function displayLineChart() {
  // Clear the previous chart instance, if any
  let oldChart = Chart.getChart("lineChart");
  if (oldChart) {
    oldChart.destroy();
  }

  let file = document.querySelector("input[type=file]").files[0];
  if (!file) {
    alert("Please select a file!");
    return;
  }
  let reader = new FileReader();
  reader.onload = function (event) {
    let data = new Uint8Array(event.target.result);
    let workbook = XLSX.read(data, { type: "array" });
    let sheetName = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[sheetName];
    //   let columnName = document
    //     .getElementById("columnName")
    //     .value.toUpperCase();
    let columnName = "Price of one action".toUpperCase();
    let range = XLSX.utils.decode_range(worksheet["!ref"]);
    let columnNumber;
    for (let i = range.s.c; i <= range.e.c; ++i) {
      let address = XLSX.utils.encode_cell({ r: range.s.r, c: i });
      let cell = worksheet[address];
      if (cell && cell.t === "s" && cell.v.toUpperCase() === columnName) {
        columnNumber = i;
        break;
      }
    }
    if (!columnNumber) {
      alert("Column not found!");
      return;
    }
    let columnData = XLSX.utils
      .sheet_to_json(worksheet, { header: 1 })
      .map(function (row) {
        return row[columnNumber];
      })
      .slice(1); // exclude header row
    let chartData = {
      labels: Array.from({ length: columnData.length }, function (_, i) {
        return i;
      }),
      datasets: [
        {
          label: columnName,
          data: columnData,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
      ],
    };
    let chartOptions = {
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
          },
        },
        // https://stackoverflow.com/questions/72664130/chartjs-invalid-scale-configuration-for-scale-xaxes
        // Syntax V2
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true,
        //       },
        //     },
        //   ],
      },
    };
    let chartCtx = document.getElementById("lineChart").getContext("2d");
    let lineChart = new Chart(chartCtx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  };
  reader.readAsArrayBuffer(file);
}
