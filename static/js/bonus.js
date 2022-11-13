// call function getCharts
function getCharts(x) {
  // #read in json data and log data
  d3.json("data/samples.json").then(function (data) {
    console.log(data);
    let sample_data = data.samples;
    let meta_data = data.metadata;
    // let default_data = sample_data[0];

    // use filter() to loop through all the element ID
    let default_data = sample_data.filter((elem) => elem.id == x)[0];
    let info_data = meta_data.filter((elem) => elem.id == x)[0];
    let default_data_value = default_data.sample_values;
    let otu_ids = default_data.otu_ids;
    let otu_labels = default_data.otu_labels;

    // create default barchart
    let default_bar = [
      {
        x: default_data_value.slice(0, 10).reverse(),
        y: otu_ids
          .slice(0, 9)
          .map((otu_ids) => `OTU${otu_ids}`)
          .reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    //  define layout
    let bar_layout = {
      title: "The top 10 Microbial Species in Belly Buttons",
    };

    // Display the default bar plot
    Plotly.newPlot("bar", default_bar, bar_layout);

    // create default Bubble plot
    let default_bubble = [
      {
        x: otu_ids,
        y: default_data_value,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: default_data_value,
          color: otu_ids,
          colorscale: "YlOrRd",
        },
      },
    ];
    let bubble_layout = {
      title: "Microbial Species in Belly Buttons(Bubble Chart)",
      showlegend: false,
    };
    // Display the default bubble plot
    Plotly.newPlot("bubble", default_bubble, bubble_layout);

    // declare gauge chart

    let default_gauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: info_data.wfreq,
        title: { text: "Belly Button Washing Frequency<br> Scrubs per Week" },
        type: "indicator",

        mode: "gauge+number",
        gauge: {
          axis: {
            visible: true,
            range: [null, 9],
            tickwidth: 2,
            tickcolor: "black",
          },
          bar: { color: "gray" },
          steps: [
            { range: [0, 1], color: "#ffffff" },
            { range: [1, 2], color: "#f2ffe6" },
            { range: [2, 3], color: "#c6ffb3" },
            { range: [3, 4], color: "#b3ff66" },
            { range: [4, 5], color: "#66ff33" },
            { range: [5, 6], color: "#33cc00" },
            { range: [6, 7], color: "#269900" },
            { range: [7, 8], color: "#1a6600" },
            { range: [8, 9], color: "#0d3300" },
          ],
        },
      },
    ];

    var gauge_layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", default_gauge, gauge_layout);

    // Create the keys and pairs for the demographic info pannel
    let info_pannel = d3.select("#sample-metadata");
    info_pannel.html("");
    // using . map method to create an array
    Object.entries(info_data).forEach(([key, value]) => {
      info_pannel.append("h5").text(`${key}:${value}`);
    });
  });
}
// declare funtion getData
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  d3.json("data/samples.json").then(function (data) {
    console.log(data);
    let name_Data = data.names;
    name_Data.forEach((element) => {
      dropdownMenu.append("option").text(element).property("value", element);
    });

    getCharts(name_Data[0]);
  });
}

getData();

function optionChanged(x) {
  getCharts(x);
}
