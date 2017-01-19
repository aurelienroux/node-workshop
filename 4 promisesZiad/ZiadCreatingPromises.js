// how to create a promise?

// 1. create a promise that is automatically resolved with a value
var p1 = Promise.resolve("123");

// 2. create a promise that is automatically rejected with an error
var p2 = Promise.reject(new Error('whatever went wrong'));

// 3. create a promise that will resolve when an array of promises have all resolved
var p3 = Promise.all([p1, p2, Promise.resolve(3)])

// 4. create a promise by calling the then method of another promise (catch == then)
var p4 = p3.then(console.log);

// 5. create a promise by calling the Promise constructor and passing an executor function
var p5 = new Promise(function(resolve, reject) {
  if (Math.random() > 0.5) {
    resolve(1);
  }
  else {
    reject(new Error('too low'))
  }
  setTimeout(function() {
    resolve()
  }, 1000)
});