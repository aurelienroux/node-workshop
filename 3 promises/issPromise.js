var requestPromise = require("request-promise");
var url = "http://api.open-notify.org/iss-now.json";
var request = require("request");

// ISS PROMISE 1st VERSION**************************************
var myProm = new Promise(function(resolve, reject){
    request(url, function(err, body, response){
        if(err){
            reject(err);
        }
        else{
            try {
                resolve(JSON.parse(response));
            } catch (e) {
                reject(e);
            }
        }
    });
});

myProm
.then(function(data){
    console.log(data);
})
.catch(function(promiseErr){
    console.log(promiseErr);
});

// ISS PROMISE 2nd VERSION ***********************************
var promAgain = requestPromise(url);

promAgain
.then(function(data){
    var data = JSON.parse(data);
    console.log("the ISS is at latitude " + data.iss_position.latitude);
    console.log("the ISS is at longitude " + data.iss_position.longitude);
    
})
.catch(function(err){
    console.log("this is error", err);
});

// ISS PROMISE 3rd VERSION ***********************************
var issData = requestPromise(url);

issData
.then( data => console.log(JSON.parse(data)))
.catch( err => console.log(err));