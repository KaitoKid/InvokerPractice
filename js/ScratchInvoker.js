$(function() {
	console.log( 'Ready to launch!' );
    $(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
		// If they press 'D', check if the two arrayLists are the same
		switch (keyCode) {
			
		// D
        case 68:
			addToQueue(5);
			addColor(5);
            shiftColor();
			execute();		
            break;
		// 1
        case 49:
            addToQueue(9);
			addColor(9);
            shiftColor();
			console.log(queue.join(''));
            break;
			
		// Q
        case 81:
			addColor(1);
            addToQueue(1);
            shiftColor();
			console.log(queue.join(''));
            break;
			
		// W
        case 87:
			addColor(2);
            addToQueue(2);
            shiftColor();
			console.log(queue.join(''));
            break;
			
		// E
        case 69:
			addColor(3);
            addToQueue(3);
            shiftColor();
			console.log(queue.join(''));
            break;
			
		// R
        case 82:
			addColor(4);
            addToQueue(4);
            shiftColor();
			console.log(queue.join(''));
            break;
			
        default:
            break;
    }
	});
});


$( "reset" ).click(function() {
	resetGame();
});


$( "start" ).click(function() {
	start();
});

$( "skip" ).click(function() {
	skip();
});


$( "endGame" ).click(function() {
	endGame();
});

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

var combos = [
	{
	"name": "coldsnap",
	"item": 9,
	"skill1": 1,
	"skill2": 1,
	"skill3": 1,
	"invoke": 4,
	"activate": 5,
	"sequence": "911145"
	},
	{
	"name": "ghostwalk",
	"item": 9,
	"skill1": 1,
	"skill2": 1,
	"skill3": 2,
	"invoke": 4,
	"activate": 5,
	"sequence": "911245"
	},
	{
	"name": "icewall",
	"item": 9,
	"skill1": 1,
	"skill2": 1,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "911345"
	},
	{
	"name": "emp",
	"item": 9,
	"skill1": 2,
	"skill2": 2,
	"skill3": 2,
	"invoke": 4,
	"activate": 5,
	"sequence": "922245"
	},
	{
	"name": "tornado",
	"item": 9,
	"skill1": 1,
	"skill2": 2,
	"skill3": 2,
	"invoke": 4,
	"activate": 5,
	"sequence": "912245"
	},
	{
	"name": "alacrity",
	"item": 9,
	"skill1": 2,
	"skill2": 2,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "922345"
	},
	{
	"name": "sunstrike",
	"item": 9,
	"skill1": 3,
	"skill2": 3,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "933345"
	},
	{
	"name": "forgespirit",
	"item": 9,
	"skill1": 1,
	"skill2": 3,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "913345"
	},
	{
	"name": "chaosmeteor",
	"item": 9,
	"skill1": 2,
	"skill2": 3,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "923345"
	},
	{
	"name": "deafeningblast",
	"item": 9,
	"skill1": 1,
	"skill2": 2,
	"skill3": 3,
	"invoke": 4,
	"activate": 5,
	"sequence": "912345"
	},
];

// This is the queue of combos objects
var queue = new Array();

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

// A chain of numbers that was just invoked
/**
var currentlyInvoked = 1;
**/

// This will check if there are 6 objects already in the queue array. If not, it adds one. If it does, removes the 1st and adds one.
function addToQueue(i){
/**
	if (queue.length < 6){
		queue.push(combos[i]);
	}
	else {
		queue.shift();
		queue.push(combos[i]);
	}
**/
	if (queue.length < 6){
		queue.push(i);
	}
	else {
		queue.shift();
		queue.push(i);
	}
}

// Adds a new color like the queue
function addColor(i){
	colorNumber.shift();
	colorNumber.push(i);
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
	howMany = 0;
	comboNumber = comboList[howMany];
	console.log(comboList);
	console.log("Your first combo is");
	console.log(combos[comboNumber].sequence);
	$('#nameofCombo').text(combos[howMany].name);
}

/**
// Compares 2 lists
function compareLists(a, b){
	var objectsAreSame = true;
	   for(var propertyName in a) {
		  if(a[propertyName] !== b[propertyName]) {
			 objectsAreSame = false;
			 break;
		  }
	   }
	   return objectsAreSame;	
}

// Takes the current queue and makes it an integer to compare with
 function invoke() {
	if (queue.length < 6){
		currentlyInvoked = toInteger(queue);
	}
	
	// If the queue is 6 long, it will drop the 1st one because it doesn't matter regarding the invoke
	else {
		currentlyInvoked = toInteger(queue).drop();
	}
}


// Compares currently 5 typed keys with first 5 numbers of sequence.
function checkInvoke(a){
	return (combos.[a].sequence.pop() == currentlyInvoked);
}
**/

function execute(){
	var a = queue.join('');
	var b = combos[comboNumber].sequence;
	console.log(queue.join(''));
	console.log(combos[comboNumber].sequence);
	if (a == b){
		resetQueue();
		howMany++;
		if (howMany <11){
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
			$('#correctNumber').text('Complete');			
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

function start(){
	generateNewComboList();
	var colorNumber = [0, 0, 0, 0, 0, 0];
	console.log("Game begun");
	$('#circleOne').css('background-color', '#FFFFFF');
	$('#circleTwo').css('background-color', '#FFFFFF');
	$('#circleThree').css('background-color', '#FFFFFF');	
	$('#circleFour').css('background-color', '#FFFFFF');
	$('#circleFive').css('background-color', '#FFFFFF');
	$('#circleSix').css('background-color', '#FFFFFF');
}

function shiftColor(){
	$('#presses').text('Presses: ' + presses++);
	console.log("Shifting color");
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
