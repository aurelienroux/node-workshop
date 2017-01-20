var randNum = (Math.floor(Math.random() * 100) + 1);
var promptPromise = require("prompt-promise");

function theGame(){
    var chances = 4;
    function guessNum(){
    promptPromise("Guess a number between 1 and 100: ")
    .then(function(userNum){
        if( userNum == randNum ){
            console.log("congrats, you win!");
            theGame();
        }
        else if( chances == 0 ){
            console.log("sorry, no more tries");
            theGame();
        }
        else {
            if( userNum > randNum ){
                console.log("your number is too high. try again");
                chances--;
                guessNum();
            }
            else {
                console.log("your number is too low. try again");
                chances--;
                guessNum();
            }
        }
    })
    .catch( err => console.log("error detected", err));
    }
    guessNum(); 
}

theGame();
