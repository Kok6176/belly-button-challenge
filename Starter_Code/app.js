url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// const dataHW = 'samples.json'
// Fetch the JSON data and console log it
d3.json(url).then(function(dataHW) {
    console.log(dataHW);
  });
// apply function to promise
// d3.json(dataHW).then(function(data){
//     console.log(data) 
// }).catch(console.log('Promise rejected'))

// Function for adding Options to the select tag
function addOptions(){
    d3.json(url).then(function(sample){
        // An array of IDs from the metadata
        var metadataID = sample.metadata.map(d=>d.id);
        console.log(metadataID);
        
        // Add option tags with metatdataID to the select tag
        var DatasetInput = d3.select("#selDataset");
        metadataID.forEach(function(id){
            DatasetInput.append("option").attr('value',id).text(id);
        });
    });
}

// Function for plotting charts
function plotCharts(selection){
    d3.json(url).then(function(sample){
        console.log("Data", sample);
        
        var filteredSamplesData = sample.samples.filter(s=> s.id == selection);
        console.log("Filtered Data:",filteredSamplesData);
        
        var otuID = filteredSamplesData[0].otu_ids.slice(0,10).reverse().map(id=>id);
        var sampleValues = filteredSamplesData[0].sample_values.slice(0,10).reverse();
        var otuLabels = filteredSamplesData[0].otu_labels.slice(0,10).reverse();
        console.log("otuLabels", otuLabels,sampleValues,otuID);

        var buotuID = filteredSamplesData[0].otu_ids.reverse().map(id=>id);
        var busampleValues = filteredSamplesData[0].sample_values.reverse();
        var buotuLabels = filteredSamplesData[0].otu_labels.reverse();


        // Plot bar chart
        var data = [{
            type: 'bar',
            x: sampleValues,
            y: otuID.map(id=>"OTU"+id),
            text: otuLabels,
            orientation: 'h'
            }];
        
        Plotly.newPlot('bar', data);
        

        // Plot Bubble Chart
        var bubbleData = [{
            x: buotuID,
            y: busampleValues,
            mode: 'markers',
            marker: {
                size: busampleValues,
                color: buotuID,
                sizeref: 2
            },
            text: otuLabels,
            type: 'scatter'
        }];
        
        var bubbleLayout = {
            // title: 'Bubble Chart',
            showlegend: false,
            xaxis: {title:"OTU ID"},
            height: 500,
            width: 1000
        };
        
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}

// data for demographic info Panel
function demographInfo(selection){
    d3.json(url).then(function(sample){
        console.log("Data", sample);
        var filteredmetadataData = sample.metadata.filter(s=> s.id == selection);
        var paneloutput = d3.select("#sample-metadata");

        // Remove the existing information before displaying new one
        paneloutput.text('')

        Object.entries(filteredmetadataData[0]).forEach(([key,value])=>{
            paneloutput.append('p').text(`${key} : ${value}`)

        })
        
    });

}


// Function for displaying the default page
function init(){
    addOptions();
    optionChanged(940);
}

init();

// when dropdown value is changed ,it displays the change in demographic info , barchart, bubblechart and washing frequency gauge
function optionChanged(abc){
    plotCharts(abc);
    demographInfo(abc);
    plotGauge(abc);
}