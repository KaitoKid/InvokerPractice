$(function () {
	$(document).keydown(function (event) {
		if ($.browser.msie)
		{ handleKeyboard(event.keyCode.toString()); }
		else
		{ handleKeyboard(event.which.toString()); }
	});


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

	//default keys QWER
	/**
	if (!$.cookie('quasKey')) {
		$.cookie('quasKey', '81');
	}

	if (!$.cookie('wexKey')) {
		$.cookie('wexKey', '87', { expires: 9999 });
	}

	if (!$.cookie('exortKey')) {
		$.cookie('exortKey', '69', { expires: 9999 });
	}

	if (!$.cookie('invokeKey')) {
		$.cookie('invokeKey', '82', { expires: 9999 });
	}

	if (!$.cookie('spellOneKey')) {
		$.cookie('spellOneKey', '68', { expires: 9999 });
	}

	if (!$.cookie('spellTwoKey')) {
		$.cookie('spellTwoKey', '70', { expires: 9999 });
	}

	$('#lblQuasKey').text(String.fromCharCode('81'));
	$('#lblWexKey').text(String.fromCharCode('87'));
	$('#lblExortKey').text(String.fromCharCode('69'));
	$('#lblInvokeKey').text(String.fromCharCode('82'));
	$('#lblSpellOneKey').text(String.fromCharCode('68'));
	$('#lblSpellTwoKey').text(String.fromCharCode('70'));
	$('#lblSpellOneWarning').hide();

	window.spellQueue = new Object();
	window.spellQueue = ["", "", ""];

	window.nextSpellNumber = new Array();
	window.nextSpellNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	window.spellList = new Array();
	window.spellList[0] = new Object();
	window.spellList[0].value = "Cold Snap";
	window.spellList[0].keycombo1 = "quas quas quas";

	window.spellList[1] = new Object();
	window.spellList[1].value = "Ghost Walk";
	window.spellList[1].keycombo1 = "quas quas wex";
	window.spellList[1].keycombo2 = "quas wex quas";
	window.spellList[1].keycombo3 = "wex quas quas";

	window.spellList[2] = new Object();
	window.spellList[2].value = "Ice Wall";
	window.spellList[2].keycombo1 = "quas quas exort";
	window.spellList[2].keycombo2 = "quas exort quas";
	window.spellList[2].keycombo3 = "exort quas quas";

	window.spellList[3] = new Object();
	window.spellList[3].value = "Tornado";
	window.spellList[3].keycombo1 = "wex wex quas";
	window.spellList[3].keycombo2 = "wex quas wex";
	window.spellList[3].keycombo3 = "quas wex wex";

	window.spellList[4] = new Object();
	window.spellList[4].value = "Deafening Blast";
	window.spellList[4].keycombo1 = "quas wex exort";
	window.spellList[4].keycombo2 = "quas exort wex";
	window.spellList[4].keycombo3 = "wex quas exort";
	window.spellList[4].keycombo4 = "wex exort quas";
	window.spellList[4].keycombo5 = "exort wex quas";
	window.spellList[4].keycombo6 = "exort quas wex";

	window.spellList[5] = new Object();
	window.spellList[5].value = "Forge Spirit";
	window.spellList[5].keycombo1 = "exort exort quas";
	window.spellList[5].keycombo2 = "exort quas exort";
	window.spellList[5].keycombo3 = "quas exort exort";

	window.spellList[6] = new Object();
	window.spellList[6].value = "EMP";
	window.spellList[6].keycombo1 = "wex wex wex";

	window.spellList[7] = new Object();
	window.spellList[7].value = "Alacrity";
	window.spellList[7].keycombo1 = "wex wex exort";
	window.spellList[7].keycombo2 = "wex exort wex";
	window.spellList[7].keycombo3 = "exort wex wex";

	window.spellList[8] = new Object();
	window.spellList[8].value = "Chaos Meteor";
	window.spellList[8].keycombo1 = "exort exort wex";
	window.spellList[8].keycombo2 = "exort wex exort";
	window.spellList[8].keycombo3 = "wex exort exort";

	window.spellList[9] = new Object();
	window.spellList[9].value = "Sun Strike";
	window.spellList[9].keycombo1 = "exort exort exort";
**/
});


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

function enqueueElement(spell) {
	window.spellQueue[0] = window.spellQueue[1];
	$('#divOne').css('background-color', $('#divTwo').css('background-color'));
	window.spellQueue[1] = window.spellQueue[2];
	$('#divTwo').css('background-color', $('#divThree').css('background-color'));
	window.spellQueue[2] = spell;

	switch (spell) {
		case 'quas':
			$('#divThree').css('background-color', window.quasColor);
			break;
		case 'wex':
			$('#divThree').css('background-color', window.wexColor);
			break;
		case 'exort':
			$('#divThree').css('background-color', window.exortColor);
			break;
		default:
			break;
	}

}

function invokeSpell() {

	if (window.gameMode != "Challenge") {
		var currentChallengeSpell = window.spellList[window.nextSpellNumber[window.currentSpellIndex]];


		if (isSpellCorrect(currentChallengeSpell)) {
			window.currentSpellIndex++;
			displayNextSpell();
		}
	}
	else {
			var newInvokedSpell = getNewlyInvokedSpell();

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
	}
		

	$('#lblSpellsInvoked').text("Spells Invoked: " + ++window.spellsInvoked);

	if (window.gameMode == 'Classic') {
		$('#lblSpellsLeft').text("Spells Left: " + (10 - window.currentSpellIndex));
	}

}        

function isSpellCorrect(currentChallengeSpell) {
	var currentSpellQueue = getSpellQueue();

	if (currentChallengeSpell.spell) {
		return (currentSpellQueue == currentChallengeSpell.spell.keycombo1 ||
			currentSpellQueue == currentChallengeSpell.spell.keycombo2 ||
			currentSpellQueue == currentChallengeSpell.spell.keycombo3 ||
			currentSpellQueue == currentChallengeSpell.spell.keycombo4 ||
			currentSpellQueue == currentChallengeSpell.spell.keycombo5 ||
			currentSpellQueue == currentChallengeSpell.spell.keycombo6)
	}
	else {
		return (currentSpellQueue == currentChallengeSpell.keycombo1 ||
			currentSpellQueue == currentChallengeSpell.keycombo2 ||
			currentSpellQueue == currentChallengeSpell.keycombo3 ||
			currentSpellQueue == currentChallengeSpell.keycombo4 ||
			currentSpellQueue == currentChallengeSpell.keycombo5 ||
			currentSpellQueue == currentChallengeSpell.keycombo6)
	}
	
}

function getNewlyInvokedSpell()
{
	for(var i=0; i<window.spellList.length; i++)
	{
		var checkAgainstSpell = new Object();
		checkAgainstSpell.spell = window.spellList[i];

		if(isSpellCorrect(checkAgainstSpell))
		{                    
			return checkAgainstSpell;
		}
	}
}

function displayNextSpell() {
	if (window.currentSpellIndex < 10) {
		if (window.gameMode != 'Challenge') {
			$('#lblSpell').text(window.spellList[window.nextSpellNumber[window.currentSpellIndex]].value);
		}
		else {
			$('#lblSpell').text(window.challengeSpells[0].spell.value + ", " + window.challengeSpells[1].spell.value)                    
		}
	}
	else {
		switch(window.gameMode)
		{
			case 'Classic':
				window.timer.stop();
				$('#lblSpell').html('Arcana known only to me!<br />Congratulations! Your time: ' + window.count + ' seconds.');
				$('#btnStart').text('Restart');
				$('#btnStart').show();
				$('#btnReturn').show();
				break;
			case 'TimeTrial': 
				setupQueueForRandomSpellSelection();
				$('#lblSpell').text(window.spellList[window.nextSpellNumber[window.currentSpellIndex]].value);                       
				break;
			case 'Endless':
				setupQueueForRandomSpellSelection();
				$('#lblSpell').text(window.spellList[window.nextSpellNumber[window.currentSpellIndex]].value);
				break;
			case 'Challenge':                    
				setupQueueForRandomSpellSelection();
				$('#lblSpell').html(window.challengeSpells[window.CurrentSpellIndex].spell.value + ", " + window.challengeSpells[window.currentSpellIndex + 1].spell.value);
				break;
		}
	}
}

function setupQueueForRandomSpellSelection()
{
	window.currentSpellIndex = 0;
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.reverse();
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.reverse();
	window.nextSpellNumber.sort(sortRandom);
}

function getSpellQueue() {
	return (window.spellQueue[0] + " " + window.spellQueue[1] + " " + window.spellQueue[2]);
}

function sortRandom()
{ return (0.5 - Math.random()); }

function generatedItem(){
	var itemList = ["euls", "blink", "force"];
	var i = Math.floor((Math.random() * 3) + 1);
	return itemList[i];
}

function randomItem(i) {
	var newCombo = window.spellList[i].keycombo[i];
	newCombo += newCombo.push(generatedItem());
	return newCombo;
}

function configureControls() {
	//keydown recognizes only capital ascii codes
	var quasKey = prompt("Press Key for Quas").toUpperCase();
	var wexKey = prompt("Press Key for Wex").toUpperCase();
	var exortKey = prompt("Press Key for Exort").toUpperCase();
	var invokeKey = prompt("Press Key for Invoke").toUpperCase();
	var spellOneKey = prompt("Press Key for Spell One").toUpperCase();
	var spellTwoKey = prompt("Press Key for Spell Two").toUpperCase();

	$.cookie('quasKey', quasKey.charCodeAt(0), { expires: 9999 });
	$.cookie('wexKey', wexKey.charCodeAt(0), { expires: 9999 });
	$.cookie('exortKey', exortKey.charCodeAt(0), { expires: 9999 });
	$.cookie('invokeKey', invokeKey.charCodeAt(0), { expires: 9999 });
	$.cookie('spellOneKey', spellOneKey.charCodeAt(0), { expires: 9999 });
	$.cookie('spellTwoKey', spellTwoKey.charCodeAt(0), { expires: 9999 });

	$('#lblQuasKey').text(quasKey[0]);
	$('#lblWexKey').text(wexKey[0]);
	$('#lblExortKey').text(exortKey[0]);
	$('#lblInvokeKey').text(invokeKey[0]);
	$('#lblSpellOneKey').text(spellOneKey[0]);
	$('#lblSpellTwoKey').text(spellTwoKey[0]);
}

function loadGame(gameType) {
	window.gameMode = gameType;
	$('#btnConfigure').hide();
	$('#btnStart').show();
	$('#btnClassic').hide();
	$('#btnTimeTrial').hide();
	$('#btnReturn').show();
	$('#btnEndless').hide();
	$('#btnChallenge').hide()
	$('#settingsHeader').hide();
	$('#playHeader').hide();
	$('#lblSpell').show();

	$('#lblSpell').text('Click start to begin.');


	switch (window.gameMode) {
		case 'Classic':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: 10');
			$('#lblSpellsInvoked').html('Spells Invoked: 0');
			break;
		case 'TimeTrial':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: -');
			$('#lblSpellsInvoked').html('Spells Invoked: 0');
			break;
		case 'Endless':
			$('#lblSpellsLeft').html('Spells Left: -');
			$('#lblTimer').html('Time: -');
			break;
		case 'Challenge':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: -');
			$('#lblSpellsInvoked').html('Spells Cast: 0');
			break;
		default:
			break;
	}

	$('#lblKeysPressed').html('Keys Pressed: 0');

}

function startGame() {
	$('#divOne').css('background-color', '#FFFFFF');
	$('#divTwo').css('background-color', '#FFFFFF');
	$('#divThree').css('background-color', '#FFFFFF');

	window.currentSpellIndex = 0;
	window.spellsInvoked = 0;
	window.keysPressed = 0;
	window.spellsCast = 0;
	window.spellQueue = //soething here;
	window.challengeSpellOneIndex = 0;
	window.challengeSpellTwoIndex = 1;

	//Yes this is duplicate code, makes it easier to do "Restart"
	switch (window.gameMode) {
		case 'Classic':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: 10');
			startClassic();
			break;
		case 'TimeTrial': 
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: -');                   
			startTimeTrial();
			break;
		case 'Endless':
			$('#lblSpellsLeft').html('Spells Left: -');
			$('#lblTimer').html('Time: 0 seconds');
			window.endlessGameStarted = true;
			startEndless();
			break;
		case 'Challenge':
			$('#lblTimer').html('Time: 30 seconds');
			$('#lblSpellsLeft').html('Spells Left: -');
			$('#lblSpellOne').html('Spell One');
			$('#lblSpellTwo').html('Spell Two');
			startChallenge();
		default:
			break;
	}
	
	$('#lblSpellsInvoked').html('Spells Invoked: 0');
	$('#lblKeysPressed').html('Keys Pressed: 0');
}

function returnToMain() {
	window.gameMode = 'None';

	if (window.timer) {
		window.timer.stop();
		window.timer = null;
	}

	window.count = 0;

	$('#btnConfigure').show();
	$('#btnStart').hide();
	$('#btnClassic').show();
	$('#btnTimeTrial').show();
	$('#btnReturn').hide();
	$('#btnEndless').show();
	$('#btnChallenge').show();
	$('#settingsHeader').show();
	$('#playHeader').show();
	$('#lblSpell').hide();
	$('#lblSpellOneWarning').hide();
	$('#lblSpellOne').html('Spell One');
	$('#lblSpellTwo').html('Spell Two');
	
	$('#divOne').css('background-color', window.quasColor);
	$('#divTwo').css('background-color', window.wexColor);
	$('#divThree').css('background-color', window.exortColor);

	$('#lblTimer').html('Time: -');
	$('#lblSpellsLeft').html('Spells Left: -');
	$('#lblSpellsInvoked').html('Spells Invoked: -');
	$('#lblKeysPressed').html('Keys Pressed: -');

	$('#btnStart').text('Start');

	window.endlessGameStarted = false;
}

function startClassic() {

	window.timer = $.timer(function () {
		$('#lblTimer').html('Time: ' + (30 - ++(window.count)) + ' seconds');

		if (count >= 30) {
			window.timer.stop();

			$('#lblSpell').html('My mind....unravels!<br />You failed to invoke all 10 spells in 30 seconds.');
			$('#btnStart').text('Restart');
			$('#btnStart').show();
			$('#btnReturn').show();
		}
	});
	window.timer.set({ time: 1000, autostart: false });

	window.count = 0;

	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);

	window.timer.play(true);

	$('#btnStart').hide();
	$('#btnReturn').hide();

	displayNextSpell();
   
}

function startTimeTrial() {

	window.timer = $.timer(function () {
		$('#lblTimer').html('Time: ' + (30 - ++(window.count)) + ' seconds');

		if (count >= 30) {
			window.timer.stop();

			$('#lblSpell').html('So begins a new age of knowledge!<br \>You invoked ' + window.spellsInvoked + " spells in 30 seconds.");
			$('#btnStart').text('Restart');
			$('#btnStart').show();
			$('#btnReturn').show();
		}
	});
	window.timer.set({ time: 1000, autostart: false });

	window.count = 0;

	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);

	window.timer.play(true);

	$('#btnStart').hide();
	$('#btnReturn').hide();

	displayNextSpell();
}

function startEndless() {

	$('#btnStart').text('Restart');

	if (!window.timer) {
		window.timer = $.timer(function () {
			$('#lblTimer').html('Time: ' + (++(window.count)) + ' seconds')
		});
		window.timer.set({ time: 1000, autostart: false });

		window.timer.play(true);
	}

	window.count = 0;
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	
	displayNextSpell();
}

function startChallenge() {

	window.timer = $.timer(function () {
		$('#lblTimer').html('Time: ' + (30 - ++(window.count)) + ' seconds');

		if (count >= 30) {
			window.timer.stop();

			$('#lblSpell').html('The bliss of comprehension!<br \>You cast ' + window.spellsCast + " combinations in 30 seconds.");
			$('#btnStart').text('Restart');
			$('#btnStart').show();
			$('#btnReturn').show();
		}
	});
	window.timer.set({ time: 1000, autostart: false });
	
	window.invokedSpells = [null, null];
	window.count = 0;

	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);
	window.nextSpellNumber.sort(sortRandom);

	window.challengeSpells[0].spell = window.spellList[window.nextSpellNumber[window.currentSpellIndex]];
	window.challengeSpells[0].hasBeenCast = false;
	window.challengeSpells[1].spell = window.spellList[window.nextSpellNumber[window.currentSpellIndex+1]];
	window.challengeSpells[1].hasBeenCast = false;
	
	window.timer.play(true);

	$('#btnStart').hide();
	$('#btnReturn').hide();

	displayNextSpell();
}

function castSpell(which) {

	var spellCast = window.invokedSpells[which];

	var spellOneHtml = window.challengeSpells[0].spell.value;
	var spellTwoHtml = window.challengeSpells[1].spell.value;

	if (spellCast && spellCast.spell  && spellCast.spell.value == window.challengeSpells[0].spell.value) {
		window.challengeSpells[0].hasBeenCast = true;
		spellOneHtml = "<s>" + spellOneHtml + "</s>";
	}
	else if (spellCast && spellCast.spell && spellCast.spell.value == window.challengeSpells[1].spell.value) {
		window.challengeSpells[1].hasBeenCast = true;
		spellTwoHtml = "<s>" + spellTwoHtml + "</s>";
	}
	
	$('#lblSpell').html(spellOneHtml + ", " + spellTwoHtml);
   
	if(window.challengeSpells[0].hasBeenCast && window.challengeSpells[1].hasBeenCast) {
		window.spellsCast++;
		window.currentSpellIndex += 2;

		if (currentSpellIndex > 8) {
			setupQueueForRandomSpellSelection();
			window.currentSpellIndex = 0;
		}

		window.challengeSpells[0].spell = window.spellList[window.nextSpellNumber[window.currentSpellIndex]];
		window.challengeSpells[0].hasBeenCast = false;
		window.challengeSpells[1].spell = window.spellList[window.nextSpellNumber[window.currentSpellIndex + 1]];
		window.challengeSpells[1].hasBeenCast = false;
   
		displayNextSpell();
	}
}
