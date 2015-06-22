function practice() {
    var combosToDo = ["1", "2"];
    initialize('practice');
    start(combosToDo);
}

function baseline() {
    var combosToDo = ["3", "4"];
    initialize('baseline');
    start(combosToDo);
}

function training() {
    var combosToDo = ["4", "5"];
    initialize('training');
    start(combosToDo);
}

function posttest() {
    var combosToDo = ["5", "6"];
    initialize('posttest');
    start(combosToDo);
}


function start(combosToDo){
    // let's be deterministic
	// generateNewComboList();
    comboList = combosToDo;
	comboNumber = comboList.shift();
	console.log("Your first combo is");
	console.log(combos[comboNumber].sequence);
	console.log("Game begun");
}

function Circle(color, letter) {
    this.color = color;
    this.letter = letter;
}

function updateCircles() {
    _.each(queue, function(circle, i) {
        $('#' + queueIds[i]).css('background-color', circle.color);
        $('#' + queueIds[i]).text(circle.letter);
    })
}

var queueIds = ['circleOne', 'circleTwo', 'circleThree', 'circleFour', 'circleFive', 'circleSix'];
var queueKeys = ['1', 'q', 'w', 'e', 'r', 'd'];

function initialize(mode) {
    queue = _.map(queueKeys, function(key) {return new Circle(colorMapping[key], key)});
    updateCircles();
	console.log(comboList);
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
        'task mode': mode
    }
    addToResponseData((new Date).getTime().toString(), 'initialize', data)
	
}

function configureFingers(name, key) {
    var response = prompt("Please enter what key you want for " + name, String.fromCharCode(key))
    var value = defaultFingerMapping[key]
    delete defaultFingerMapping[key]
    defaultFingerMapping[response.charCodeAt(0) - 32] = value;
}

//var defaultFingerMapping = {68: 5, 49: 9, 81: 1, 87: 2, 69: 3, 82: 4}
var defaultFingerMapping = {68: 'd', 49: '1', 81: 'q', 87: 'w', 69: 'e', 82: 'r'}
var colorMapping = {'d': '#6633FF', '1': '#FF33CC', 'q': '#33CCFF', 'w': '#FF3366', 'e': '#003DF5', 'r': '#CC2B14'}
// Your color history
var queue;
// need function to assign new finger mappings

var combos = [
	{
	"name": "coldsnap",
	"color": "#3366FF",
    "sequence": "1qqqrd"
	},
	{
	"name": "ghostwalk",
	"color": "#6633FF",
    "sequence": "1qqwrd"
	},
	{
	"name": "icewall",
	"color": "#FF33CC",
    "sequence": "1qqerd",
	},
	{
	"name": "emp",
	"color": "#33CCFF",
    "sequence": "1wwwrd",
	},
	{
	"name": "tornado",
	"color": "#FF3366",
    "sequence": "1qwwrd",
	},
	{
	"name": "alacrity",
	"color": "#003DF5",
    "sequence": "1wwerd",
	},
	{
	"name": "sunstrike",
	"color": "#CC2B14",
    "sequence": "1eeerd",
	},
	{
	"name": "forgespirit",
	"color": "#CC33FF",
    "sequence": "1qeerd"
	},
	{
	"name": "chaosmeteor",
	"color": "#FF668C",
    "sequence": "1weerd",
	},
	{
	"name": "deafeningblast",
	"color": "#D9FF66",
    "sequence": "1qwerd",
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


function addToQueue(color, letter){
	queue.shift();
	queue.push(new Circle(color, letter));
    updateCircles();
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
        addToQueue(colorMapping[defaultFingerMapping[keyCode]], defaultFingerMapping[keyCode])
        var currentQueue = _.map(queue, function(q) {return q.letter}).join('');
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
	queue = [0, 0, 0, 0, 0, 0];
	$('#circleOne').css('background-color', '#FFFFFF');
	$('#circleTwo').css('background-color', '#FFFFFF');
	$('#circleThree').css('background-color', '#FFFFFF');	
	$('#circleFour').css('background-color', '#FFFFFF');
	$('#circleFive').css('background-color', '#FFFFFF');
	$('#circleSix').css('background-color', '#FFFFFF');
	$('#correctNumber').text('Correct: ' + howMany);
	console.log("Game has been reset");
}


function showHideMenuClick(){
	if ($('#cheatsheet').css('display') == 'block') {
                $('#cheatsheet').css('display', 'none');
                $('#btnShowHide').text('Show Cheat Sheet');
            }
            else {
                $('#cheatsheet').css('display', 'block');
                $('#btnShowHide').text('Hide Cheat Sheet');
            }
}
