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

window.onload = (event) => {
    console.log('page is loaded');

    d3.json("samples.json").then(function(jdata) {
        // for (let i=0; i< jdata.names.length; i++) {
        //     if (jdata.samples[i].id === jdata.samples[0].id) {
        //         console.log(`First Id is ${jdata.samples[i].id}`);

        //         let ethnicity = jdata.metadata[i].ethnicity;
        //         let gender = jdata.metadata[i].gender;
        //         let age = jdata.metadata[i].age;
        //         let indLocation = jdata.metadata[i].location;
        //         let bbtype = jdata.metadata[i].bbtype;
        //         let wfreq = jdata.metadata[i].wfreq;

                d3.select('#demInfo')
                    .selectAll('p')
                    .data(jdata.metadata)
                    .enter()
                    .append('p')
                    .text (function(d, i) {
                        if (jdata.metadata[i].id === jdata.metadata[0].id) {
                            return jdata.metadata[i].id;
                        }
            
                    });
                
                
            
                
            // };
        // };
        

    });
};

// function init() {

//     // let dropdown = d3.select("#selDataset").node().value;
//     // console.log(`Ind with ID were selected: `, dropdown);
    
//     d3.json("samples.json").then(function(jdata) {
//         for (let i=0; i < jdata.names.length; i++) {
//             if (jdata.samples[i].id === '940') {
//                 // extract data for barchart
//                 sampleValue = jdata.samples[i].sample_values;
//                 sampleValue = sampleValue.slice(0, 10);

//                 otu_ids = jdata.samples[i].otu_ids;
//                 otu_ids = otu_ids.slice(0, 10);

//                 otuLabels = jdata.samples[i].otu_labels;
//                 otuLabels = otuLabels.slice(0, 10);

//                 // extract data for demographic info
//                 individumID = jdata.metadata[i].id;
//                 ethnicity = jdata.metadata[i].ethnicity;
//                 gender = jdata.metadata[i].gender;
//                 age = jdata.metadata[i].age;
//                 indLocation = jdata.metadata[i].location;
//                 bbtype = jdata.metadata[i].bbtype;
//                 wfreq = jdata.metadata[i].wfreq;

//             };
//         };
//         // remove previous Demographical info
//         var cardText = document.getElementsByClassName("card-text");
//         console.log(cardText);
//         var pNode = document.createElement("p");
//         var textToAppend = String("Ethnicity:").bold() + ethnicity; 
//         pNode.innerHTML = textToAppend;
//         cardText.appendChild(pNode);

    

        
//     };
// };


