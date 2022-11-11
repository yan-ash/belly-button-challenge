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
  let info_pannel = d3.select(".pannel_body").text();

  // using . map method to create an array
  let pannel_text = meta_data.map((info) => `${info.keys}:{info.values}`);
  console.log(pannel_text);
});
