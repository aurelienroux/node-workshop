var request = require('request');
var prompt = require('prompt');

//distance programm snippet********************************
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

//distance calcul************************************************************
function calculDist(la1, la2, lo1, lo2){
    var R = 6371e3; // metres
    var φ1 = la1.toRadians();
    var φ2 = la2.toRadians();
    var Δφ = (la2-la1).toRadians();
    var Δλ = (lo2-lo1).toRadians();
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;
    // return answer in km
    return Math.round(d/1000)
}

//prompt **************************************************
prompt.start();
prompt.get("userLocation", function (err, result) {
    if(err)
    console.log('Command-line input received:');
    console.log('location: ' + result.userLocation);

    // ISS location***************************************
    request("http://api.open-notify.org/iss-now.json", function(err, ISSresponse) {
        if (err) {console.log("Something bad happened", err);}
        else {
            var searchResults = JSON.parse(ISSresponse.body);
            var lat1 = parseFloat(searchResults.iss_position.latitude);
            var lon1 = parseFloat(searchResults.iss_position.longitude);

            // user location ********************************************
            request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.userlocation, function(err, userLocResponse) {
                if (err) {console.log("Something bad happened", err);}
                else {
                    var searchResults = JSON.parse(userLocResponse.body);
                    var lat2 = parseFloat(searchResults.results[0].geometry.location.lat);
                    var lon2 = parseFloat(searchResults.results[0].geometry.location.lng);
                
                    console.log("Distance between you and the ISS is " + calculDist(lat1, lat2, lon1, lon2) + " km");
                
                }// end of user else
            });// end of user request
        }//end of ISS else statement
    });//end of ISS request
});//end of prompt get 

