const requestPromise = require("request-promise");
const promptPromise = require("prompt-promise");
const issUrl = "http://api.open-notify.org/iss-now.json";
const userUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var issLat;
var issLon;
var userLat;
var userLon;
//DISTANCE MATH SNIPPET *****************************
    Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

// PROMISES ***********************************
const issLocation = requestPromise(issUrl);

//CHAINING *************************************
function theDistance(){
    issLocation
    .then(function(issData){
        var issData = JSON.parse(issData);
        issLat = (+issData.iss_position.latitude);
        issLon = (+issData.iss_position.longitude);
        return promptPromise("what is your city: ");
    })
    .then(function(userAns){
        return requestPromise(userUrl+userAns);
    })
    .then(function(userData){
        var userData = JSON.parse(userData);
        userLat = userData.results[0].geometry.location.lat;
        userLon = userData.results[0].geometry.location.lng;
    
        //CRAZY MATH DISTANCE CALCULATION
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
    
            return(console.log("Distance to ISS is " + (d/1000).toFixed(2) + " kms"));
    })
    .catch(err=>console.log(err));
}

theDistance();