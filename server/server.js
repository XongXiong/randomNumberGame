var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var randomNum = require('./modules/randomNum.js')

var number = randomNum(100);
console.log(number);
var guesses;
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/submitGuess', function(req, res) {
    console.log(req.body);
    guesses = req.body;
    res.sendStatus(200);
})

app.post('/maxVal', function(req, res) {
    console.log(req.body);
    number = randomNum(req.body.maxVal);
    console.log(number);
    res.sendStatus(200);
})


app.get('/checkGuesses', function(req,res){

    res.send(checkGuesses());
});

function checkGuesses(){
    var guessArray = [];
    var results = []
    guessArray.push(parseInt(guesses.playerOneGuess));
    guessArray.push(parseInt(guesses.playerTwoGuess));
    guessArray.push(parseInt(guesses.playerThreeGuess));
    guessArray.push(parseInt(guesses.playerFourGuess));
    console.log(guessArray);

    for(var i=0; i<guessArray.length; i+=1){
        
        
        if (guessArray[i] === number){
            console.log(i, 'Correct');
            results.push('correct')

        }else if(guessArray[i] > number){
            console.log(i ,'lower');
            results.push('lower')

            
        }else if(guessArray[i]< number){
            console.log(i ,'higher');
            results.push('higher')

            
        }
    
    }
    console.log(results);
    return results;
}


app.listen(port, function(){
    console.log('listening on port:', port);
});