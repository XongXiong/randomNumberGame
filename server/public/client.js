$(document).ready(readyNow);

function readyNow(){
    console.log('script and jquery sourced');
    appendSetUp();
    clickHandler();
};

function clickHandler(){
    $('#container').on('click', '#start', startGame);
    $('#container').on('click', '#easy', easyMode);
    $('#container').on('click', '#medium', mediumMode);
    $('#container').on('click', '#hard', hardMode);
    // TO-DO: create handlers for play mode
}

function appendSetUp(){

var $div = $('<div></div>');
    $('#container').empty();
    $div.append('<button id="easy">Easy</button>');
    $div.append('<button id="medium">Medium</button>');
    $div.append('<button id="hard">Hard</button>');
    $div.append('<button id="start">Start Game</button>');
    $('#container').append($div);
   
};

function startGame(){
    console.log('start game')
    appendPlay();
}

function easyMode() { 
    console.log('easy game');
    
}

function mediumMode() { 
    console.log('medium game');
    
}

function hardMode() { 
    console.log('hard game');
    
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
    $('#container').append('<div>Max Number: <span id="range">0</span></div>');
    $('#container').append('<button id="cancel">Cancel Game</button>');
}











