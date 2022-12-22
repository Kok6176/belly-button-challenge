// url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function plotGauge(selection) {
  d3.json(url).then(function(sample){
      // identify the row with selected id within the json
      var filteredMetaData = sample.metadata.filter(function(m){
        // return the identified row
          return m.id == selection
      });
      // read the value in washing frequency for the identified row
      var wfreq = filteredMetaData[0].wfreq
      console.log(wfreq);
      //  setup the data needed to show the gauge
      var data = [
        { 
            type: 'scatter',
            x: [0], y:[0],
            marker: {size: 14, color:'850000'},
            showlegend: false,
            name: 'wfreq',
            text: wfreq,
            hoverinfo: 'text+name'
        },
        { 
            values: [
                50/9,
                50/9,
                50/9,
                50/9,
                50/9,
                50/9,
                50/9,
                50/9,
                50/9,
                50 // for the bottom half of the pie chart which will be hidden
            ],
            rotation: 90,
            text: [
                "8-9",
                "7-8",
                "6-7",
                "5-6",
                "4-5",
                "3-4",
                "2-3",
                "1-2",
                "0-1",
                "" // for the bottom half of the pie chart which will be hidden
            ],
            textinfo: 'text',
            textposition:'inside',
            marker: {
                colors: [
                    "rgba(14, 127, 0, .5)",
                    "rgba(50, 143, 10, 0.5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(142, 178, 35 , .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(184, 205, 68, .5)",
                    "rgba(202, 209, 95, .5)",
                    "rgba(210, 206, 145, .5)",
                    "rgba(232, 226, 202, .5)",
                    "rgba(255, 255, 255, 0)"
                ]
            },
            labels: [ // Define labels of each gauge element
                "8-9",
                "7-8",
                "6-7",
                "5-6",
                "4-5",
                "3-4",
                "2-3",
                "1-2",
                "0-1",
                ""
            ],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
    }];
    // set the layout for the plotted gauge
    var layout = {
        shapes:[{
            type: 'path',
            path: gaugePointer(wfreq) ,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        height: 500,
        width: 500,
        xaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        },
        yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false,
            range: [-1, 1]
        },
        title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"
    }
    // plot the gauge
    Plotly.newPlot('gauge', data, layout);
  });
};


function gaugePointer(wfreq){
	
	// Display pointer in gauge chart using svg-path
  var level = wfreq * 20;
  // Trig to calc meter point
  var degrees = 180 - level,
      radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  
   var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
  
  var mainPath = path1,
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);
	console.log(degrees)
	return path;

}



