$(function() {
	console.log( 'Ready to launch!' );
    initialize();
    start();
});

function start(){
    // let's be deterministic
	// generateNewComboList();
    comboList = ["1", "2"]  
	comboNumber = comboList.shift();
	console.log("Your first combo is");
	console.log(combos[comboNumber].sequence);
	console.log("Game begun");
}

function initialize() {
	var colorNumber = [0, 0, 0, 0, 0, 0];
	console.log(comboList);
	$('#circleOne').css('background-color', '#FFFFFF');
	$('#circleTwo').css('background-color', '#FFFFFF');
	$('#circleThree').css('background-color', '#FFFFFF');	
	$('#circleFour').css('background-color', '#FFFFFF');
	$('#circleFive').css('background-color', '#FFFFFF');
	$('#circleSix').css('background-color', '#FFFFFF');
    $(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
        execute(keyCode);
    });
    $(document).keyup(function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        addToResponseData((new Date).getTime().toString(), 'key up', {})
    })
    var data = {
        'finger mappings': defaultFingerMapping,
        'dota2 level': 0,
        'invoker level': 0,
        'task mode': 'practice'
    }
    addToResponseData((new Date).getTime().toString(), 'initialize', data)
}

//var defaultFingerMapping = {68: 5, 49: 9, 81: 1, 87: 2, 69: 3, 82: 4}
var defaultFingerMapping = {68: 'd', 49: 'i', 81: 'q', 87: 'w', 69: 'e', 82: 'r'}
var colorMapping = {'d': '#6633FF', 'i': '#FF33CC', 'q': '#33CCFF', 'w': '#FF3366', 'e': '#003DF5', 'r': '#CC2B14'}
// need function to assign new finger mappings

var combos = [
	{
	"name": "coldsnap",
	"color": "#3366FF",
    "sequence": "iqqqrd"
	},
	{
	"name": "ghostwalk",
	"color": "#6633FF",
    "sequence": "iqqwrd"
	},
	{
	"name": "icewall",
	"color": "#FF33CC",
    "sequence": "iqqerd",
	},
	{
	"name": "emp",
	"color": "#33CCFF",
    "sequence": "iwwwrd",
	},
	{
	"name": "tornado",
	"color": "#FF3366",
    "sequence": "iqwwrd",
	},
	{
	"name": "alacrity",
	"color": "#003DF5",
    "sequence": "iwwerd",
	},
	{
	"name": "sunstrike",
	"color": "#CC2B14",
    "sequence": "ieeerd",
	},
	{
	"name": "forgespirit",
	"color": "#CC33FF",
    "sequence": "iqeerd"
	},
	{
	"name": "chaosmeteor",
	"color": "#FF668C",
    "sequence": "iweerd",
	},
	{
	"name": "deafeningblast",
	"color": "#D9FF66",
    "sequence": "iqwerd",
	},
];

// This is the queue of combos objects
var queue = ["z", "z", "z", "z", "z", "z"];

// This is the list of 10 combo integers that we will use for the challenge
var comboList = new Array();

var comboNumber;
var responseData = {};

function addToResponseData(timestamp, state, data) {
    responseData[timestamp] = {
        'state': state,
        'data': data,
    }
}

// Number of presses
var presses = 0;

// Your color history
var colorNumber = [0, 0, 0, 0, 0, 0];

// This will check if there are 6 objects already in the queue array. If not, it adds one. If it does, removes the 1st and adds one.
function addToQueue(i){
	queue.shift();
	queue.push(i);
}

function addColor(i){
	colorNumber.shift();
	colorNumber.push(i);
}

// Array shuffler
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function execute(keyCode){
    var timestamp = (new Date).getTime().toString();
    var targetQueue = combos[comboNumber].sequence;
    var successState = 'unmatched';
    if (keyCode in defaultFingerMapping) {
        addToQueue(defaultFingerMapping[keyCode])
        addColor(colorMapping[defaultFingerMapping[keyCode]]);
        shiftColor();
        var currentQueue = queue.join('');
        console.log(targetQueue);
        console.log(currentQueue);
        if (targetQueue == currentQueue) {
            successState = 'matched';
            if (comboList.length > 0) {
                comboNumber = comboList.shift();
                console.log("Your next combo is");
                console.log(combos[comboNumber].sequence);
            } else {
                endGame();
            }
        }
    }
    var data = {
        'key event': keyCode,
        'target queue': targetQueue,
        'current queue': currentQueue,
        'success state': successState,
    };
    addToResponseData(timestamp, 'key down', data);
}

function endGame(){
	console.log("You finished.");
	resetGame();
}

function resetGame(){
    $(document).unbind('')
	resetQueue();
	//generateNewComboList();
	comboNumber = 0;
	howMany = 0;
}


$( "reset" ).click(function() {resetGame();});
$( "start" ).click(function() {start();});
$( "skip" ).click(function() {skip();});
$( "endGame" ).click(function() {endGame();});


function resetQueue(){
	queue = [];
}

function endGame(){
	$('#correctNumber').text('Complete');	
	$('#nameofCombo').text('Press reset to play again');
	console.log("You have finished");
}

function resetGame(){
	resetQueue();
	//generateNewComboList();
	comboNumber = 0;
	howMany = 0;
	var colorNumber = [0, 0, 0, 0, 0, 0];
	$('#circleOne').css('background-color', '#FFFFFF');
	$('#circleTwo').css('background-color', '#FFFFFF');
	$('#circleThree').css('background-color', '#FFFFFF');	
	$('#circleFour').css('background-color', '#FFFFFF');
	$('#circleFive').css('background-color', '#FFFFFF');
	$('#circleSix').css('background-color', '#FFFFFF');
	$('#correctNumber').text('Correct: ' + howMany);
	console.log("Game has been reset");
}


function shiftColor(){
	$('#presses').text('Presses: ' + presses++);
	$('#circleOne').css('background-color', colorNumber[0]);
	$('#circleTwo').css('background-color', colorNumber[1]);	
	$('#circleThree').css('background-color', colorNumber[2]);	
	$('#circleFour').css('background-color', colorNumber[3]);	
	$('#circleFive').css('background-color', colorNumber[4]);
	$('#circleSix').css('background-color', colorNumber[5]);
}
