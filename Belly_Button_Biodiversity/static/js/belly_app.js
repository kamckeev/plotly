function dataMetadata(sample) {
  var sample_url =`/metadata/${sample}`
  var panel=d3.select('#sample-metadata')
  panel.html("")
  var tbody=panel.append('tbody')
  d3.json(sample_url).then(function(data){
    Object.entries(data).forEach(([key,value])=>{
      var row=tbody.append('tr')
      row.append('td').text(`${key}: ${value}`)
    })
  })
}


//// Making some charts ///
function buildChart(sample) {
  var chart_url = `/samples/${sample}`
      d3.json(chart_url).then(function(data){
/// Bubble Chart ///      
      var id = data.otu_ids
      var values = data.sample_values
      var labels = data.otu_labels
      var trace1 = {
        x: id,
        y: values,
        mode: 'markers',
        text: labels,
        marker: {
          size: values,
          color: id
        }
      }
      var bubbleData =[trace1]
      Plotly.newPlot('bubble',bubbleData)


/// Guage Chart ///
      var level = data.WFREQ*20
      var degrees = 180 - level,
      radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);

      var data =[{
        type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color: 'blue'},
        showlegend: false,
        name: 'frequency',
        text: level,
        hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ['8-9','7-8','6-7', '5-6', '4-5', '3-4','2-3', '1-2', '0-1'],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors:['rgba(0, 128, 0, 1)', 'rgba(0, 128, 0, .9)',
                                'rgba(0, 128, 0, .8)', 'rgba(0, 128, 0, .7)',
                                'rgba(0, 128, 0, .6)', 'rgba(0, 128, 0, .5)',
                                'rgba(0, 128, 0, .4)', 'rgba(0, 128, 0, .3)',
                                'rgba(0, 128, 0, .2)',
                                'rgba(255, 255, 255, 0)']},
          labels: ['Obsessively Squeaky clean...','Extra Squeaky Clean!','Showers Daily','Showers Regularly','Showers Regularly','Showers Ocassionally','Low','A Bit Dusty','Full of Lint'],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];
        var layout = {
          shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing</b> <br> Scrubs per Week',
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);




/// Pie Chart ///      
      var top_sample_values = values.slice(0,10)
      var top_otu_ids = id.slice(0,10)
      var top_labels=labels.slice(0,10)
      var trace2={
        values: top_sample_values,
        labels: top_otu_ids,
        hovertext: top_labels,
        hoverinfo: "label+text+value+percent",
        type: "pie"
      }
      var pieData=[trace2]
      Plotly.newPlot('pie',pieData)
    })
}

function init() {
  var selector = d3.select("#selDataset");
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildChart(firstSample);
    dataMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildChart(newSample);
  dataMetadata(newSample);
}

init();