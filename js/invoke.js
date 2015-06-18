$(function() {
	console.log( 'Ready to launch!' );
	generateNewComboList();
});

function start(){
    // let's be deterministic
	// generateNewComboList();
    
    initialize();
}

function initialize() {
	var colorNumber = [0, 0, 0, 0, 0, 0];
	console.log("Game begun");
	$('#circleOne').css('background-color', '#FFFFFF');
	$('#circleTwo').css('background-color', '#FFFFFF');
	$('#circleThree').css('background-color', '#FFFFFF');	
	$('#circleFour').css('background-color', '#FFFFFF');
	$('#circleFive').css('background-color', '#FFFFFF');
	$('#circleSix').css('background-color', '#FFFFFF');
    $(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode in defaultFingerMapping) {
            addToQueue(defaultFingerMapping[keyCode])
            execute();
            shiftColor();
            console.log(queue.join(''))
        } else {
        }
    });
}

//var defaultFingerMapping = {68: 5, 49: 9, 81: 1, 87: 2, 69: 3, 82: 4}
var defaultFingerMapping = {68: 'd', 49: 'i', 81: 'q', 87: 'w', 69: 'e', 82: 'r'}
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

// The next combo you need
var comboNumber = 0;

// How many you've done
var howMany = 0;

// Number of presses
var presses = 0;

// Your color history
var colorNumber = [0, 0, 0, 0, 0, 0];

// This will check if there are 6 objects already in the queue array. If not, it adds one. If it does, removes the 1st and adds one.
function addToQueue(i){
	queue.shift();
	queue.push(i);
}

// Array shuffler
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// This makes a new combo list
function generateNewComboList(){
	var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	comboList = shuffle(numbers);
	comboNumber = comboList[howMany];
	console.log(comboList);
	console.log("Your first combo is");
	console.log(combos[comboNumber].sequence);
}


function execute(){
	var a = queue.join('');
	var b = combos[comboNumber].sequence;
	if (a == b){
		resetQueue();
		howMany++;
		if (howMany <11){
			comboNumber = comboList[howMany];
			console.log("Your next combo is");
			console.log(combos[comboNumber].sequence);
		}
		else {
			endGame();
		}
	}
	else {
		console.log("Wrong combo");
	}
}

function resetQueue(){
	queue = [];
}

function endGame(){
	console.log("You finished.");
	resetGame();
}

function resetGame(){
	resetQueue();
	generateNewComboList();
	comboNumber = 0;
	howMany = 0;
}


$( "reset" ).click(function() {resetGame();});
$( "start" ).click(function() {start();});
$( "skip" ).click(function() {skip();});
$( "endGame" ).click(function() {endGame();});

var colors = [
	"#FFFFFF", 
	"#6633FF",
	"#FF33CC",
	"#33CCFF",
	"#FF3366",
	"#003DF5",
	"#CC2B14",
	"#CC33FF",
	"#FF668C",
	"#D9FF66"
]

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
	generateNewComboList();
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
	console.log("Shifting color");
    console.log(colorNumber[0])
	$('#circleOne').css('background-color', colors[colorNumber[0]]);
	$('#circleTwo').css('background-color', colors[colorNumber[1]]);	
	$('#circleThree').css('background-color', colors[colorNumber[2]]);	
	$('#circleFour').css('background-color', colors[colorNumber[3]]);	
	$('#circleFive').css('background-color', colors[colorNumber[4]]);	
	$('#circleSix').css('background-color', colors[colorNumber[5]]);
}

function skip(){
	resetQueue();
	howMany++;
	if (howMany <10){
			comboNumber = comboList[howMany];
			console.log("You have completed " + howMany + " combos");
			console.log("You have " + (10-howMany) + " combos to go");
			console.log("Your next combo is");
			console.log(combos[comboNumber].sequence);
			$('#correctNumber').text('Correct: ' + howMany);
			$('#nameofCombo').text(combos[howMany].name);
		}
		else {	
			endGame();			
		}
}

