console.log("Hello World!");

// function timing(){
//     setTimeout(function(){
//         console.log("Hello World Again!!");
//     }, 3000);
// }

// timing();

// function timing(){
//     setInterval(function(){
//         console.log("interval");
//     }, 2000);
// }

// timing();



var i = 0;
function timing(){
     setTimeout(function(){
         i++;
         if( i < Infinity ){
            console.log("test");
            timing();
         }
     }, 2000);
} 

timing();

// Ziad solution **************************************

function setInterval(callback, milliseconds){
    setTimeout(function(){
        callback();
        setInterval(callback, milliseconds);
    }, milliseconds);
}

function logStuff() {
    console.log('forever');
}

setInterval(logStuff(), 1000);