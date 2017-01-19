var request = require("request");
var prompt = require("prompt");

//DISTANCE MATH SNIPPET    
    Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};
                        
prompt.start();
prompt.get("answer", function(err, result){
    if (err) {
        console.log("this is prompt err", err);
    }
    else {
        var urlISS = "http://api.open-notify.org/iss-now.json";
        request(urlISS, function(errISS, response, body){
            if (errISS) {
                console.log("this is ISS request error", errISS);
            }
            else {
                var ISSanswer = JSON.parse(response.body);
                var issLat = (+ISSanswer.iss_position.latitude);
                var issLon = (+ISSanswer.iss_position.longitude);

                var urlUser = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result.answer;
                request(urlUser, function(errUserLoc, response, body){
                    if (errUserLoc) {
                        console.log("this is user loc error ", errUserLoc);
                    }
                    else {
                        var userAnswer = JSON.parse(response.body);
                        var userLat = (+userAnswer.results[0].geometry.location.lat);
                        var userLon = (+userAnswer.results[0].geometry.location.lng);

                        // // //CRAZY MATH DISTANCE CALCULATION
                        var R = 6371e3; // metres
                        var φ1 = userLat.toRadians();
                        var φ2 = issLat.toRadians();
                        var Δφ = (issLat-userLat).toRadians();
                        var Δλ = (issLon-userLon).toRadians();
                        
                        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                                Math.cos(φ1) * Math.cos(φ2) *
                                Math.sin(Δλ/2) * Math.sin(Δλ/2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                        var d = R * c;
                        
                        console.log("ISS is located at latitude " + issLat + " and longitude " + issLon);
                        console.log("User is located at latitude " + userLat + " and longitude " + userLon);
                        console.log("Distance between the two is " + (d/1000).toFixed(2) + " kms");
                    }
                });
            }
        });
    }
})