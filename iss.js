var url = "http://api.open-notify.org/iss-now.json";

var request = require('request');

request(url, function(err, response) {
  if (err) {
    console.log("Something bad happened", err);
  }
  else {
    var searchResults = JSON.parse(response.body);
    console.log(parseFloat(searchResults.iss_position.latitude).toFixed(2));
    console.log(parseFloat(searchResults.iss_position.longitude).toFixed(2));
  }
});