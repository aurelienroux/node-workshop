var rand = Math.floor((Math.random() * 100) + 1);
var prompt = require('prompt');
var chances = 4;
var tries = 0;

prompt.start();

var guessGame = function(counter){
    prompt.get("answer", function(err, result) {
        if(result.answer == rand){
            console.log("you win! congratulations!");
            return;
        } else if ( chances === tries ){
            console.log("no more tries, sorry");
            return;
        } else {
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

// Ziad solution *****************************************************
// var prompt = require('prompt');
// /*
// 1. Create a number between 1 and 100
// 2. Give the user 5 guesses to find the number
//   a. if the guess is too low or too high, tell the user and ask again
//   b. if the guess is correct then congratulate the user and finsih
//   c. if the guesses are expired, tell the user how bad they are and finish
// */

// function guessTheNumber() {
//   var numberToGuess = 1 + Math.floor(Math.random() * 100); // 1 to 100
//   console.log(numberToGuess);
//   var remainingGuesses = 5;
//   var currentGuesses = [];

//   function playTheGame() {
//     if (remainingGuesses > 0) {
//       prompt.get('guess', function(err, answers) {
//         var userGuess = +answers.guess;
//         currentGuesses.push(userGuess);

//         if (userGuess < numberToGuess) {
//           console.log('too low!');
//           remainingGuesses = remainingGuesses - 1;
//           playTheGame();
//         }
//         else if (userGuess > numberToGuess) {
//           console.log('too high!');
//           remainingGuesses = remainingGuesses - 1;
//           playTheGame();
//         }
//         else if (userGuess === numberToGuess) {
//           console.log('you win!');
//           guessTheNumber();
//         }
//         else {
//           console.log('you did not type a number');
//         }
//       });
//     }
//     else {
//       console.log('you lose. the number was ' + numberToGuess + ' and your guesses were ' + currentGuesses);
//       guessTheNumber();
//     }
//   }

//   playTheGame();
// }

// guessTheNumber();