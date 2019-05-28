    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    var level = data.WFREQ*20
    var degrees = 180 - level,
     radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9','7-8','6-7', '5-6', '4-5', '3-4',
                '2-3', '1-2', '0-1', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(0, 128, 0, 1)', 'rgba(0, 128, 0, .9)',
                            'rgba(0, 128, 0, .8)', 'rgba(0, 128, 0, .7)',
                            'rgba(0, 128, 0, .6)', 'rgba(0, 128, 0, .5)',
                            'rgba(0, 128, 0, .4)', 'rgba(0, 128, 0, .3)',
                            'rgba(0, 128, 0, .2)',
                            'rgba(255, 255, 255, 0)']},
      labels: ['Weird Flex but Ok','but Why??','Pretty Normal', 'Also Normal', 'Normal but only Just', 'Kinda Gross',
        'Yuck', 'EW!', 'Just Leave', ''],
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
      title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
