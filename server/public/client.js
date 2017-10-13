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
    $div.append('<h4>Select a mode and then hit "Start Game" to play!</h4>')
    $div.append('<button class="difficulty" id="easy">Easy: 10</button>');
    $div.append('<button class="difficulty" id="medium">Medium: 50</button>');
    $div.append('<button class="difficulty" id="hard">Hard: 100</button>');
    $div.append('<button id="start">Start Game</button>');
    $('#container').append($div);
    $('h1').text('Can you guess the number?');
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
    $('.difficulty').removeClass('selectedButton');
    $(this).addClass('selectedButton');
    maxVal = 10;
}

function mediumMode() { 
    console.log('medium game');
    $('.difficulty').removeClass('selectedButton');
    $(this).addClass('selectedButton');
    maxVal = 50;
}

function hardMode() { 
    console.log('hard game');
    $('.difficulty').removeClass('selectedButton');
    $(this).addClass('selectedButton');
    maxVal = 100;
}

function appendPlay(){
    $('#container').empty();
    $('#container').append('<div>Round <span id="counter">0</span></div>');
    $('#container').append('<div>Pick a number between 1 and ' + maxVal + '</div>');
    var $playerDiv;
    for (var i = 1; i < 5; i += 1){
        $playerDiv = $('<div class="playerDivs" id="player' + i + '"></div>');
        $playerDiv.append('<input type="number" placeholder="Player ' + i + ' guess" id="input'+ i + '">');
        $playerDiv.append('<div>Player ' + i + '\'s hint:<span  id="hint' + (i-1) + '"></span></div>');
        $('#container').append($playerDiv);
    }
    $('#container').append('<button id="submit">Submit Guesses</button>');
    $('#container').append('<button id="cancel">Cancel Game</button>');
}
var rounds = 0;
function submitGuess(){
    var guess = {
        playerOneGuess: $('#input1').val(),
        playerTwoGuess: $('#input2').val(),
        playerThreeGuess: $('#input3').val(),
        playerFourGuess: $('#input4').val()

    }
    $('input').val('');
    rounds = rounds + 1;
    $('#counter').text(rounds);
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
    .done(function(response){
        console.log(response);
        $('.playerDivs').removeClass('higher');
        $('.playerDivs').removeClass('lower');

        for(var i=0; i<response.length; i+=1){
            $('#hint' + i).text(response[i])
            if (response[i] === 'Correct'){
                $('h1').text('Congrats, Player ' + (i + 1) + '!' );
                $('#container').empty();
                $('#container').append('<button id="cancel">Play Again</button>');
                $('#container').append()
            }
            $('#player'+(i+1)).addClass(response[i]);
            console.log($('#hint'+i));
        }

    })
    .fail(function (message) {
         console.log('error', message);
    });
}
