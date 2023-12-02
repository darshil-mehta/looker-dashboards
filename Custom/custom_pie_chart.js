// custom_pie_chart_chartjs.js

(function (looker, Chart) {
  looker.plugins.visualizations.add({
    id: "custom_pie_chart_chartjs",
    label: "Custom Pie Chart",
    options: {
      color: {
        type: "string",
        label: "Color",
      },
    },
    handleErrors: function (data, resp) {
      return true;
    },
    create: function (element, config) {
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "customPieChartCanvas");
      canvas.style.margin = 'auto';
      canvas.style.height = '80%';
      canvas.style.width = '80%';
      element.appendChild(canvas);

      // Initialize the Chart.js instance
      this.chart = new Chart(canvas, {
        type: "pie",
        options: {
          plugins: {
            legend: {
              position: 'right', // This sets the legend position to the right
            }
          },
          onClick: function (event, elements) {
            if (elements && elements.length > 0) {
              var data = event.chart.config._config.data;
              var label = data.labels;
              var value = data.datasets[0].data;
              // Trigger drill-down
              LookerCharts.Utils.openDrillMenu({
                links: value[elements[0].index].links,
                event: { pageX: event.x, pageY: event.y },
              });
            }
          },
        },
      });
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
      // Extract the data from Looker response
      var values = data;
      if(values && values.length != 0){

      // Generate the chart data
      var FinalData = [];
      var finalLabel = [];
      let sum = 0;
      var other_links = [];
      values.forEach(function (currentValue, index) {
        var cell = currentValue[queryResponse.fields.measure_like[0].name];
        if (index < 19) {
          FinalData.push(cell);
          finalLabel.push(
            currentValue[queryResponse.fields.dimensions[0].name].value
          );
        } else {
          cell.links[0].label_prefix =
            currentValue[queryResponse.fields.dimensions[0].name].value +
            "-" +
            cell.links[0].label_value;
          cell.links[0].label =
            currentValue[queryResponse.fields.dimensions[0].name].value +
            "-" +
            cell.links[0].label_value;
          other_links.push(cell.links[0]);

          sum = sum + currentValue[queryResponse.fields.measure_like[0].name].value;
        }
      });
      // add Other label and data
      finalLabel.push("Other");
      FinalData.push({
        rendered: sum.toString(),
        links: other_links,
        value: sum,
      });
      var finalCharData = {
        datasets: [{ data: FinalData, backgroundColor: ["#1A73E8", "#12B5CB", "#E52592", "#E8710A", "#F9AB00", "#7CB342", "#9334E6", "#80868B", "#079c98", "#A8A116", "#EA4335", "#FF8168", "#76abf1", "#71d3e0", "#ef7cbe", "#f1aa6c", "#fbcd66", "#b0d18e", "#be85f0", "#b3b6b9"] }],
        labels: finalLabel
      }
      // Update the chart with the data
      this.chart.data = finalCharData;
      this.chart.update();
    }
    else {
        var canvas = document.getElementById("customPieChartCanvas")
        const ctx = canvas.getContext("2d");
        ctx.font = "50px serif";
        ctx.fillText("No Data Available");
      // Signal the completion of rendering
      doneRendering();
    },
  });
})(looker, Chart);