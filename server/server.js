var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var randomNum = require('./modules/randomNum.js')

var number = randomNum(100);
console.log(number);

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/submitGuess', function(req, res) {
    console.log(req.body);
    res.sendStatus(200);
})

app.post('/maxVal', function(req, res) {
    console.log(req.body);
    number = randomNum(req.body.maxVal);
    console.log(number);
    res.sendStatus(200);
})


app.get('/checkGuesses', function(req,res){
    
});

app.listen(port, function(){
    console.log('listening on port:', port);
    
})