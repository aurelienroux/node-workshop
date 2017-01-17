var rand = Math.floor((Math.random() * 100) + 1);
var prompt = require('prompt');
var chances = 4;
var tries = 0;

prompt.start();

var guessGame = function(counter){
    prompt.get("answer", function (err, result) {
        if(result.answer == rand){
            console.log("you win! congratulations!");
            return;
        } else if ( chances === tries ){
            console.log("no more tries, sorry");
            return;
        } else{
            if( rand > result.answer){
                console.log("you number is too low");
                tries++;
                guessGame(tries);
            } else {
                 console.log("you number is too high");
                tries++;
                guessGame(tries);
            }
        }
        console.log(result.answer);
    });
};

guessGame(0);