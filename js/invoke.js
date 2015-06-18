$(function() {
	console.log( 'Ready to launch!' );
	generateNewComboList();
    $(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode in defaultFingerMapping) {
            addToQueue(defaultFingerMapping[keyCode])
            execute();
            console.log(queue.join(''))
        } else {
        }
    });
});

//var defaultFingerMapping = {68: 5, 49: 9, 81: 1, 87: 2, 69: 3, 82: 4}
var defaultFingerMapping = {68: d, 49: i, 81: q, 87: w, 69: e, 82: r}
// need function to assign new finger mappings

var combos = [
	{
	"name": "coldsnap",
	"color": "#3366FF",
	//"sequence": "911145",
    "sequence": "iqqqrd"
	},
	{
	"name": "ghostwalk",
	"color": "#6633FF",
	//"sequence": "911245",
    "sequence": "iqqwrd"
	},
	{
	"name": "icewall",
	"color": "#FF33CC",
	//"sequence": "911345",
    "sequence": "iqqerd",
	},
	{
	"name": "emp",
	"color": "#33CCFF",
	//"sequence": "922245",
    "sequence": "iwwwrd",
	},
	{
	"name": "tornado",
	"color": "#FF3366",
	//"sequence": "912245",
    "sequence": "iqwwrd",
	},
	{
	"name": "alacrity",
	"color": "#003DF5",
	//"sequence": "922345",
    "sequence": "iwwerd",
	},
	{
	"name": "sunstrike",
	"color": "#CC2B14",
	//"sequence": "933345",
    "sequence": "ieeerd",
	},
	{
	"name": "forgespirit",
	"color": "#CC33FF",
	//"sequence": "913345",
    "sequence": "iqeerd"
	},
	{
	"name": "chaosmeteor",
	"color": "#FF668C",
	//"sequence": "923345",
    "sequence": "iweerd",
	},
	{
	"name": "deafeningblast",
	"color": "#D9FF66",
	//"sequence": "912345",
    "sequence": "iqwerd",
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
