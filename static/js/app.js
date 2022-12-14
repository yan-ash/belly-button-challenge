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
          .slice(0, 10)
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
        },
      },
    ];
    let bubble_layout = {
      title: "Microbial Species in Belly Buttons(Bubble Chart)",
      showlegend: false,
    };
    // Display the default bubble plot
    Plotly.newPlot("bubble", default_bubble, bubble_layout);

    // Create the keys and pairs for the demographic info pannel
    let info_pannel = d3.select("#sample-metadata");
    info_pannel.html("");
    //for each info_data  using Object.entries method to add onto the info pannel
    Object.entries(info_data).forEach(([key, value]) => {
      info_pannel.append("h6").text(`${key}:${value}`);
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
