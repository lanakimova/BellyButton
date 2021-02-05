var indId = 941;

var indEthnicity = d3.json("samples.json").then(function(data) {
    for (var i=0; i < data.metadata.length; i++) {
         var indEthnicity;
        if (data.metadata[i].id === indId) {
            indEthnicity =  data.metadata[i].ethnicity;
            
            
            return indEthnicity;
        }
    };  
    
});

console.log(indEthnicity)


d3.json("samples.json").then(function(error, data) {
    data.map(function(d) {
        console.log(`MAP`, d.metadata)
    });
});