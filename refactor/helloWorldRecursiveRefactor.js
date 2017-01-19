function sayHello(){
    setInterval(function(){
        console.log("hello");
    }, 1000);
}

sayHello();

function helloAgain(){
    setTimeout(function(){
        console.log("hello again");
        helloAgain();
    }, 1500);
}

helloAgain();