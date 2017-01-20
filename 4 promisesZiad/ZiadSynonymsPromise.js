var requestPromise = require('request-promise');
var synonymsUrl = 'http://words.bighugelabs.com/api/2/34f7de7253e531a60ff98736f56ced36/';

// This function takes an array of words (strings) and returns a promise for an array
// of the synonyms of those words, in the same order as the words in the input array.
function getSynonyms(words) {
  // Array.isArray is an ES2015 function.
  if (!Array.isArray(words)) {
    // Promise.reject creates a new promise that gets automatically rejected.
    // This is useful because it makes our getSynonyms function consistent: it always returns a promise.
    return Promise.reject(new Error('you need an array'));
  }
  else {
    // Here we are using map to take the list of words to a list of promises.
    // As soon as we call requestPromise, it fires off the request. This means that
    // all the requests pretty much get fired at the same time.
    // We're chaining a .then(JSON.parse) to parse the response from requestPromise immediately.
    // This will make our function return an array of objects rather than an array of JSON strings!
    var synPromises = words.map(function(word) {
      return requestPromise(synonymsUrl + word + '/json').then(JSON.parse);
    });

    return Promise.all(synPromises);
  }
}

// Simple usage of the getSynonyms function
getSynonyms(['sun','moon'])
.then(function(synonyms) {
  console.log(synonyms);
})
.catch(function(err) {
  console.log(err)
})

// NOTE: a better way of having done this is create a function getSynonym that takes ONE word
// and returns its synonyms. Then, use getSynonym as the callback of the .map inside getSynonyms.
// as an exercise, do it!