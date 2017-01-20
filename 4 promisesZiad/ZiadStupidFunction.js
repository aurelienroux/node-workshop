// This function returns a promise for the number 1. It fails 50% of the time.
function stupidFunction() {
  if (Math.random() > 0.5) {
    return Promise.resolve(1);
  }
  else {
    return Promise.reject(new Error('ALL YOUR BASE ARE BELONG TO US'));
  }
}

stupidFunction()
.then(
  function(result) {
    console.log(result);
    return stupidFunction();
  },
  // we can pass an error callback to .then to recover from a specific error
  function(err) {
    console.log('something bad happened, i will try to recover');
    return stupidFunction();
  }
)
.then(function(result) {
  console.log(result);
  return stupidFunction();
})
// if we didn't catch an error using try/catch (synchronous) or a failureCallback, then we can
// catch the error here. it will "bubble up", just like in regular synchronous code.
.catch(function(err) {
  console.log('something went wrong at some point');
})