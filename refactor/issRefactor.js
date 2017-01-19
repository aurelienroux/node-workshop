var request = require("request");
var colors = require("colors")
var url = "http://api.open-notify.org/iss-now.json";

request(url, function(err, response, body){
    if(err){
        console.log(err);
    }
    else{
        var answer = JSON.parse(response.body);
        var lat = (+answer.iss_position.latitude).toFixed(2);
        var lon = (+answer.iss_position.longitude).toFixed(2);
        
        console.log("The ISS is actually at " + lat.rainbow+ " of latitude, and " + lon.rainbow + " of longitude");
        
    }
});