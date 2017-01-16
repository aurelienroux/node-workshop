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
