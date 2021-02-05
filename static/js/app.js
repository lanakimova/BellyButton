
// create dropdown menu
d3.json("samples.json").then(function(data) {
    d3.select("#selDataset")
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text( function(d) {
            return d;
        });
});


function showData() {

    let dropdown = d3.select("#selDataset").node().value;
    console.log(`Ind with ID were selected: `, dropdown);
    
    d3.json("samples.json").then(function(jdata) {
        for (let i=0; i < jdata.names.length; i++) {
            if (jdata.samples[i].id === dropdown) {
                // extract data for barchart
                sampleValue = jdata.samples[i].sample_values;
                sampleValue = sampleValue.slice(0, 10);

                otu_ids = jdata.samples[i].otu_ids;
                otu_ids = otu_ids.slice(0, 10);

                otuLabels = jdata.samples[i].otu_labels;
                otuLabels = otuLabels.slice(0, 10);

                // extract data for demographic info
                individumID = jdata.metadata[i].id;
                ethnicity = jdata.metadata[i].ethnicity;
                gender = jdata.metadata[i].gender;
                age = jdata.metadata[i].age;
                indLocation = jdata.metadata[i].location;
                bbtype = jdata.metadata[i].bbtype;
                wfreq = jdata.metadata[i].wfreq;

            };
        };
        // remove previous Demographical info 
        d3.select(".panel-heading").selectAll("p").remove();

        // add block Demographic Info
        d3.select(".panel-heading").append("p").text(`ID: ${individumID}`);
        d3.select(".panel-heading").append("p").text(`Ethnicity: ${ethnicity}`);
        d3.select(".panel-heading").append("p").text(`Gender: ${gender}`);
        d3.select(".panel-heading").append("p").text(`Age: ${age}`);
        d3.select(".panel-heading").append("p").text(`Location: ${indLocation}`);
        d3.select(".panel-heading").append("p").text(`bbtype: ${bbtype}`);
        d3.select(".panel-heading").append("p").text(`wfreq: ${wfreq}`);

        // build a horizontal barchart
        var trace = {
            type: "bar",
            x: sampleValue,
            y: otu_ids.map(d => `OTU-${d} `),
            orientation: 'h',
            text: otuLabels
        };

        var plot_data = [ trace ];

        var layout = {
            title: `blabla`,
            xaxis: {
                autorange: true
            }
        
        };
        Plotly.newPlot("bar", plot_data, layout);

        // build a bubble chart

        var bubbleTrace = {
            x: otu_ids,
            y: sampleValue,
            mode: 'markers',
            text: otuLabels,
            marker: {
                color: otu_ids,
                size: sampleValue.map(d => d/2)
            }
        };

        var bubbleData = [ bubbleTrace ];

        var bubbleLayout = {
            title: 'bubble Chart',
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });   
};
