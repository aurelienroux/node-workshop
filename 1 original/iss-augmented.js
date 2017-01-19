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
            var url = ("https://maps.googleapis.com/maps/api/geocode/json?address=");
            request(url + result.userLocation, function(err, userLocResponse) {
                if (err) {console.log("Something bad happened", err);}
                else {
                    var searchResultsCity = JSON.parse(userLocResponse.body);
                    var lat2 = parseFloat(searchResultsCity.results[0].geometry.location.lat);
                    var lon2 = parseFloat(searchResultsCity.results[0].geometry.location.lng);

                    console.log("Distance between you and the ISS is " + calculDist(lat1, lat2, lon1, lon2) + " km");
                
                }// end of user else
            });// end of user request
        }//end of ISS else statement
    });//end of ISS request
});//end of prompt get 



// Ziad solution *******************************************************
// var toRadians = val => val * Math.PI / 180;

// function calculateDistance(lat1, lon1, lat2, lon2) {

//   var R = 6371e3; // metres
//   var φ1 = toRadians(lat1);
//   var φ2 = toRadians(lat2);
//   var Δφ = toRadians(lat2-lat1);
//   var Δλ = toRadians(lon2-lon1);

//   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//           Math.cos(φ1) * Math.cos(φ2) *
//           Math.sin(Δλ/2) * Math.sin(Δλ/2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//   var d = R * c;

//   return d;
// }


// var request = require('request');
// var prompt = require('prompt');

// request('http://api.open-notify.org/iss-now.json', function(err, result) {
//   if (err) {

//   }
//   else {
//     var issData = JSON.parse(result.body);

//     var issLat = (+issData.iss_position.latitude).toFixed(2);
//     var issLon = (+issData.iss_position.longitude).toFixed(2);

//     /*
//     1. Prompt user for their city
//     2. Use city to make an API call to gmaps and find userLat and userLon
//     3. Calculate the distance
//     */
//     prompt.get('city', function(err, answers) {
//       if (err) {

//       }
//       else {
//         var userCity = answers.city;

//         var gMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userCity;

//         request(gMapsUrl, function(err, result) {
//           if (err) {

//           }
//           else {
//             var gmapsData = JSON.parse(result.body);

//             var userLat = gmapsData.results[0].geometry.location.lat;
//             var userLon = gmapsData.results[0].geometry.location.lng;

//             var distance = calculateDistance(issLat, issLon, userLat, userLon);

//             console.log(distance);
//           }
//         });
//       }
//     });

//   }
// });