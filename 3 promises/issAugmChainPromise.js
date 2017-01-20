var requestPromise = require("request-promise");
var promptPromise = require("prompt-promise");
const userUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var issData, issLat, issLon, userData, userLat, userLon;
//DISTANCE MATH SNIPPET *****************************
    Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

var issReq = requestPromise("http://api.open-notify.org/iss-now.json");

function getIssData(data){
    issData = JSON.parse(data);
    issLat = (+issData.iss_position.latitude);
    issLon = (+issData.iss_position.longitude);
    return promptPromise("Where are you ? ");
}

function getUserUrl(city){
    return requestPromise(userUrl + city);
}

function getUserData(data){
    userData = JSON.parse(data);
    userLat = (+userData.results[0].geometry.location.lat);
    userLon = (+userData.results[0].geometry.location.lng);
    return calculateDis(userLat, userLon, issLat, issLon);
}

function calculateDis(userLat, userLon, issLat, issLon){
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

    return (d/1000).toFixed(2);
}
 
function displayFinal(answer){
    console.log(answer);
}

function theDistance(){
    issReq
    .then(getIssData)
    .then(getUserUrl)
    .then(getUserData)
    .then(displayFinal)
    .catch( err => console.log("code error", err) );
}

theDistance();