var rand = (Math.floor(Math.random() * 100) +1 );
var prompt = require("prompt");
var tries= 4;

console.log("Try to guess a number between 1 and 100");
prompt.start();

function guessNumber(){
    prompt.get("answer", function(err, result){
        if(err){
            console.log("this is prompt err", err);
        }
        else {
            // if number is right
            if ( rand == result.answer){
                console.log("Congrats, you win!");
            }
            // if no more tries
            else if ( tries === 0) {
                console.log("Sorry! no more tries");
            }
            else {
                // if number is too low
                if( rand < result.answer ){
                    console.log("Your number is too high. Try again");
                    tries--;
                    guessNumber();
                }
                // if number is too high
                if( rand > result.answer ){
                    console.log("Your number is too low. Try again");
                    tries--;
                    guessNumber();
                }
            }
        }
    });
}

guessNumber();