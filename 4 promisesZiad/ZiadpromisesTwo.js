var request = require('request');

function pause(ms) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, ms);
  });
}

function logStuff() {
  console.log('stuff');
}

logStuff();
pause(1000)
.then(logStuff)
.then(function() {
  return pause(1000);
})
.then(logStuff);

function requestPromise(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, result) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result.body);
      }
    })
  })
}

requestPromise('http://api.open-notify.org/iss-now.json')
.then(JSON.parse)
.then(function(result) {
  console.log(result);
})