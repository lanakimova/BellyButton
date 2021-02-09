
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

d3.select("body").on("load", init());

function init() {

    d3.json("samples.json").then(function(jdata) {
        for (let i=0; i < jdata.names.length; i++) {
            if (jdata.samples[i].id === '940') {
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
        d3.select(".card-text").selectAll("p").remove();

        // add new element
        d3.select(".card-text").append("p").text(`Ethnicity: `).style('font-weight', 'bold').append("ps").text(`${ethnicity}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Gender: `).style('font-weight', 'bold').append("ps").text(`${gender}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Age: `).style('font-weight', 'bold').append("ps").text(`${age}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Location: `).style('font-weight', 'bold').append("ps").text(`${indLocation}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`bbtype: `).style('font-weight', 'bold').append("ps").text(`${bbtype}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`wfreq: `).style('font-weight', 'bold').append("ps").text(`${wfreq}`).style('font-weight', 'normal');

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
            title: "Top 10 Microbes that Colonize Human Navels",
            height: 400,
            width: 400
        
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
                size: sampleValue.map(d => d)
            }
        };

        var bubbleData = [ bubbleTrace ];

        var bubbleLayout = {
            title: 'OTU Value per OTU ID',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "OTU Value"
            }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // build a Gauge chart
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                gauge: {
                    
                    axis: {
                        range: [0, 10],
                        visible: true
                    },
                    steps: [
                        { range: [0, 1], color: "#d8f3dc"},
                        { range: [1, 2], color: "#b7e4c7"},
                        { range: [2, 3], color: "#95d5b2"},
                        { range: [3, 4], color: "#74c69d"},
                        { range: [4, 5], color: "#52b788"},
                        { range: [5, 6], color: "#40916c"},
                        { range: [6, 7], color: "#007d41"}, 
                        { range: [7, 8], color: "#006845"},
                        { range: [8, 9], color: "#134232"},
                        { range: [9, 10], color: "#033f2b"},


                    ]
                },
                title: { text: "Weekly frequency of belly button wash" },
                // marker: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '9-10'],
                type: "indicator",
                mode: "gauge+number",              
            }
        ];
        
        var layout = { width: 450, height: 300} 

        Plotly.newPlot('gauge', data, layout);
    });   
};


function showData() {

    let dropdown = d3.select("#selDataset").node().value;
    
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
        d3.select(".card-text").selectAll("p").remove();

        // add block Demographic Info
        d3.select(".card-text").append("p").text(`Ethnicity: `).style('font-weight', 'bold').append("ps").text(`${ethnicity}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Gender: `).style('font-weight', 'bold').append("ps").text(`${gender}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Age: `).style('font-weight', 'bold').append("ps").text(`${age}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`Location: `).style('font-weight', 'bold').append("ps").text(`${indLocation}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`bbtype: `).style('font-weight', 'bold').append("ps").text(`${bbtype}`).style('font-weight', 'normal');
        d3.select(".card-text").append("p").text(`wfreq: `).style('font-weight', 'bold').append("ps").text(`${wfreq}`).style('font-weight', 'normal');

        // build a Gauge chart
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                gauge: {
                    
                    axis: {
                        range: [0, 10],
                        visible: true
                    },
                    steps: [
                        { range: [0, 1], color: "#d8f3dc"},
                        { range: [1, 2], color: "#b7e4c7"},
                        { range: [2, 3], color: "#95d5b2"},
                        { range: [3, 4], color: "#74c69d"},
                        { range: [4, 5], color: "#52b788"},
                        { range: [5, 6], color: "#40916c"},
                        { range: [6, 7], color: "#007d41"}, 
                        { range: [7, 8], color: "#006845"},
                        { range: [8, 9], color: "#134232"},
                        { range: [9, 10], color: "#033f2b"},


                    ]
                },
                title: { text: "Weekly frequency of belly button wash" },
                marker: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '9-10'],
                type: "indicator",
                mode: "gauge+number",              
            }
        ];
        
        var layout = { width: 450, height: 300} 

        Plotly.newPlot('gauge', data, layout);
    });   
};