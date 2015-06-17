$(function () {
	$(document).keydown(function (event) {
		if ($.browser.msie)
		{ handleKeyboard(event.keyCode.toString()); }
		else
		{ handleKeyboard(event.which.toString()); }
	});

	//Initiate everything

	window.currentSpellIndex = 0;
	window.quasColor = "#00FFFF";
	window.wexColor = "#FF00FF";
	window.exortColor = "#FFD700";
	window.gameMode = "None";
	window.spellsInvoked = 0;
	window.keysPressed = 0;
	window.endlessGameStarted = false;
	window.invokedSpells = [null, null];
	window.challengeSpells = [new Object(), new Object()];
	window.spellsCast = 0;
	window.challengeSpellOneIndex = 0;
	window.challengeSpellTwoIndex = 1;

	//QWE Spells

	window.spellQueue = new Array();

	window.nextSpellNumber = new Array();
	window.nextSpellNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	window.spellList = new Array();
	window.spellList[0] = new Object();
	window.spellList[0].value = "Cold Snap";
	window.spellList[0].keycombo1 = [1, 1, 1];

	window.spellList[1] = new Object();
	window.spellList[1].value = "Ghost Walk";
	window.spellList[1].keycombo1 = [1, 1, 2];

	window.spellList[2] = new Object();
	window.spellList[2].value = "Ice Wall";
	window.spellList[2].keycombo1 = [1, 1, 3];

	window.spellList[3] = new Object();
	window.spellList[3].value = "Tornado";
	window.spellList[3].keycombo1 = [1, 2, 2];

	window.spellList[4] = new Object();
	window.spellList[4].value = "Deafening Blast";
	window.spellList[4].keycombo1 = [1, 2, 3];

	window.spellList[5] = new Object();
	window.spellList[5].value = "Forge Spirit";
	window.spellList[5].keycombo1 = [1, 3, 3]

	window.spellList[6] = new Object();
	window.spellList[6].value = "EMP";
	window.spellList[6].keycombo1 = [2, 2, 2];

	window.spellList[7] = new Object();
	window.spellList[7].value = "Alacrity";
	window.spellList[7].keycombo1 = [2, 2, 3];

	window.spellList[8] = new Object();
	window.spellList[8].value = "Chaos Meteor";
	window.spellList[8].keycombo1 = [2, 3, 3];

	window.spellList[9] = new Object();
	window.spellList[9].value = "Sun Strike";
	window.spellList[9].keycombo1 = [3, 3, 3];

});

//Keyboard stuff and I have no clue what's going on
function handleKeyboard(key) {
	if ((window.timer && window.timer.active && (window.gameMode == 'Classic' || window.gameMode == 'TimeTrial' || window.gameMode == 'Challenge')) ||
		(window.endlessGameStarted = true && window.gameMode == 'Endless')) {
		switch (key) {
			case '81':
				enqueueElement('quas');
				break;
			case '87':
				enqueueElement('wex');
				break;
			case '69':
				enqueueElement('exort');
				break;
			case '82':
				invokeSpell();
				break;                       
			case '68':
				castSpell(0);
				break;   
			case '70':
				castSpell(1);
				break;
		//	case '1':
		//		enqueueElement('eul');
		//	case '2':
		//		enqueueElement('blink');
		//	case '3'
		//		enqueneElement('force');
			default:
				break;
		}

		$('#lblKeysPressed').text('Keys Pressed: ' + window.keysPressed++);
	}
}

// REMEMBER spell IS AN INTEGER. It's an array of integers within an array

function enqueueElement(spell) {
	window.spellQueue[0] = window.spellQueue[1];
	$('#divOne').css('background-color', $('#divTwo').css('background-color'));
	window.spellQueue[1] = window.spellQueue[2];
	$('#divTwo').css('background-color', $('#divThree').css('background-color'));
	window.spellQueue[2] = spell;

	switch (spell) {
		case 1:
			$('#divThree').css('background-color', window.quasColor);
			break;
		case 2:
			$('#divThree').css('background-color', window.wexColor);
			break;
		case 3:
			$('#divThree').css('background-color', window.exortColor);
			break;
		default:
			break;
	}

}

//Checks if two arrays are the same

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) 
		return false;
    while (i--) {
        if (a[i] !== b[i]) 
			return false;
    }
    return true;
};

//Returns the array list of Q, W, E (Length is 3, from 0-2)

function getSpellQueue() {
	return (window.spellQueue);
}

//Check if spell is right

function isSpellCorrect(currentChallengeSpell) {
	var currentSpellQueue = getSpellQueue();
	return arraysIdentical(currentSpellQueue, currentChallengeSpell);
}

// Goes through all of the spells and returns the spellList integer if it matches what they entered, otherwise it returns 10.
function getNewlyInvokedSpell()
{
	for(var i=0; i<window.spellList.length; i++)
	{
		var checkAgainstSpell = window.spellList[i];
		if(isSpellCorrect(checkAgainstSpell))
		{                    
			return checkAgainstSpell;
		}
	}
	
	return -1;
}

// Spell invoking (R key). It calls function of checking if you got spell right and grabbing a new spell
function invokeSpell() {

	//This is what they entered
	var newInvokedSpell = getNewlyInvokedSpell();

	//InvokedSpells is the arrayList
	//This gives someone a mission
	if (window.invokedSpells[0] == null ||
		(newInvokedSpell.spell.value != window.invokedSpells[0].spell.value)) {

		window.invokedSpells[1] = window.invokedSpells[0];
		window.invokedSpells[0] = newInvokedSpell;

		$('#lblSpellOne').text(window.invokedSpells[0].spell.value);

		if (window.invokedSpells[1]) {
			$('#lblSpellTwo').text(window.invokedSpells[1].spell.value);
		}

		$('#lblSpellOneWarning').hide();
	}
	else {
		$('#lblSpellOneWarning').show();
	}
		

	$('#lblSpellsInvoked').text("Spells Invoked: " + ++window.spellsInvoked);
	$('#lblSpellsLeft').text("Spells Left: " + (10 - window.currentSpellIndex));

}

// Shows the next spell they have to do, or ends the game if it's their 10th
function displayNextSpell() {
	if (window.currentSpellIndex < 10) {
		//Should it be $ or Window?
		$('#lblSpell').text(window.challengeSpells[0].spell.value + ", " + window.challengeSpells[1].spell.value)                    
	}
	else {
			window.timer.stop();
			$('#lblSpell').html('Arcana known only to me!<br />Congratulations! Your time: ' + window.count + ' seconds.');
			$('#btnStart').text('Restart');
			$('#btnStart').show();
			$('#btnReturn').show();
			break;
	}
}

// Random sorter
function sortRandom(){ 
	return (0.5 - Math.random()); 
}

// Cycles spell list randomly a couple of times
function setupQueueForRandomSpellSelection(){
	window.currentSpellIndex = 0;
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.reverse();
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.reverse();
	window.nextSpellNumber.sort(sortRandom);
}

//Actually casting the spell
function castSpell(which) {
	// Check if invoked
	if()
		
	//Check if there's an item in front
	//	if there is, check if it's activated
	displayNextSpell()
}


//Loads the game
function loadGame(gameType) {
	window.gameMode = gameType;
	switch (window.gameMode) {
		case 'Classic':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left to solve: 10');
			$('#lblSpellsInvoked').html('Spells Invoked: 0');
			break;
		default:
			break;
	}

	$('#lblKeysPressed').html('Keys Pressed: 0');

}

//Starts the game, jQuery stuff
function startGame() {
	$('#divOne').css('background-color', '#FFFFFF');
	$('#divTwo').css('background-color', '#FFFFFF');
	$('#divThree').css('background-color', '#FFFFFF');

	window.currentSpellIndex = 0;
	window.spellsInvoked = 0;
	window.keysPressed = 0;
	window.spellsCast = 0;
	window.spellQueue = //something here;
	
	$('#lblSpellsInvoked').html('Spells Invoked: 0');
	$('#lblKeysPressed').html('Keys Pressed: 0');
}

// Starts a classic game of getting 10 spells right
function startClassic() {

	// I can't jQuery yet (I don't remember anything) so you'll have to implement timer
	window.timer = $.timer(function () {
		$('#lblTimer').html('Time: ' + (30 - ++(window.count)) + ' seconds');

		// This the end if we ever need it
		/**
		if (count >= 30) {
			window.timer.stop();

			$('#lblSpell').html('My mind....unravels!<br />You failed to invoke all 10 spells in 30 seconds.');
			$('#btnStart').text('Restart');
			$('#btnStart').show();
			$('#btnReturn').show();
		}
		**/ 
	});
	
	window.timer.set({ time: 1000, autostart: false });

	window.count = 0;

	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);

	window.timer.play(true);

	displayNextSpell();
   
}

