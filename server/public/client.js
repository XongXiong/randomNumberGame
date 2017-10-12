$(document).ready(readyNow);

function readyNow(){
    console.log('script and jquery sourced');
    appendSetUp();
};

function appendSetUp(){

var $div = $('<div></div>');
    $('#container').empty();
    $div.append('<button id="easy">Easy</button>');
    $div.append('<button id="medium">Medium</button>');
    $div.append('<button id="hard">Hard</button>');
    $div.append('<button id="start">Start Game</button>');
    $('#container').append($div);
    $('#container').on('click', '#start', startGame);
    $('#container').on('click', '#easy', easyMode);
    $('#container').on('click', '#medium', mediumMode);
    $('#container').on('click', '#hard', hardMode);
};

function startGame(){
    console.log('start game')
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













