// #read in json data and log data

d3.json("data/samples.json").then(function (data) {
  console.log(data);
  let sample_data = data.samples;
  let meta_data = data.metadata;
  let default_data = sample_data[0];
  let default_data_value = default_data.sample_values;
  let otu_ids = default_data.otu_ids;
  let otu_labels = default_data.otu_labels;

  // create default barchart
  let defau_bar = [
    {
      x: default_data_value.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    },
  ];

  let bar_layout = {
    title: "The top 10 Microbial Species in Belly Buttons",
  };
  Plotly.newPlot("bar", defau_bar, bar_layout);
});

//  define layout

// Display the default plot
