var request = require('request');

var url = "http://api.open-notify.org/iss-now.json";

request(url, function(err, response) {
  if (err) {
    console.log("Something bad happened", err);
  }
  else {
    var searchResults = JSON.parse(response.body);
    console.log(parseFloat(searchResults.iss_position.latitude).toFixed(2));
    console.log(parseFloat(searchResults.iss_position.longitude).toFixed(2));
    
    //var issLat = (+issDAta.iss_position.latitude).toFixed(2); + transforms to number, then apply toFixed
    //var issLon = (+issDAta.iss_position.longitude).toFixed(2);
    
  }
});
