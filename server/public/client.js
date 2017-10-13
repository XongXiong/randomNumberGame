$(document).ready(readyNow);

function readyNow(){
    console.log('script and jquery sourced');
    appendSetUp();
    clickHandler();
};

function clickHandler(){
    // Setup handlers
    $('#container').on('click', '#start', startGame);
    $('#container').on('click', '#easy', easyMode);
    $('#container').on('click', '#medium', mediumMode);
    $('#container').on('click', '#hard', hardMode);
    // Play mode handlers
    $('#container').on('click', '#submit', submitGuess);
    $('#container').on('click', '#cancel', appendSetUp);
}

function appendSetUp(){

var $div = $('<div></div>');
    $('#container').empty();
    $div.append('<button id="easy">Easy: 10</button>');
    $div.append('<button id="medium">Medium: 50</button>');
    $div.append('<button id="hard">Hard: 100</button>');
    $div.append('<button id="start">Start Game</button>');
    $('#container').append($div);
   
};

var maxVal = 10; 

function startGame(){
    console.log('start game');
    appendPlay();
    $.ajax({
        method: 'POST',
        url: '/maxVal',
        data: {maxVal: maxVal}
    }).done(function(response){
        console.log("maxVal POST:",response);        
    }).fail(function(message){
        console.log('error!', message);
        
    })
}

function easyMode() { 
    console.log('easy game');
    maxVal = 10;
}

function mediumMode() { 
    console.log('medium game');
    maxVal = 50;
}

function hardMode() { 
    console.log('hard game');
    maxVal = 100;
}

function appendPlay(){
    $('#container').empty();
    var $playerDiv;
    for (var i = 1; i < 5; i += 1){
        $playerDiv = $('<div id="player' + i + '"></div>');
        $playerDiv.append('<input type="text" placeholder="Player ' + i + ' guess" id="input'+ i + '">');
        $playerDiv.append('<div id="hint' + i + '">hint</div>');
        $('#container').append($playerDiv);
    }
    $('#container').append('<div>Round <span id="counter">0</span></div>');
    $('#container').append('<button id="submit">Submit Guesses</button>');
    $('#container').append('<div>Max Number: ' + maxVal + '</div>');
    $('#container').append('<button id="cancel">Cancel Game</button>');
}

function submitGuess(){
    var guess = {
        playerOneGuess: $('#input1').val(),
        playerTwoGuess: $('#input2').val(),
        playerThreeGuess: $('#input3').val(),
        playerFourGuess: $('#input4').val()
    }
    $.ajax({
        method: 'POST',
        url: '/submitGuess',
        data: guess
    }) .done(function(response){
        console.log("guesses:",response);
        checkGuesses();
        
    }) .fail(function(message){
        console.log('error', message);
        
    });
}


function checkGuesses(){
    $.ajax({
        method: 'GET',
        url: '/checkGuesses'
    })
    .done()
    .fail()
}










