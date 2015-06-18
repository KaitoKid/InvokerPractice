
function changeItem(){
	var response = prompt("Please enter what key you want for Eul's", "1");
	defaultFingerMapping[49] = response;
}

function changeQuas(){
	var response = prompt("Please enter what key you want for Quas", "Q");
	defaultFingerMapping[81] = response;
}

function changeWex(){
	var response = prompt("Please enter what key you want for Wex", "W");	
	defaultFingerMapping[87] = response;
}

function changeExort(){
	var response = prompt("Please enter what key you want for Exort", "E");	
	defaultFingerMapping[69] = response;
}

function changeInvoke(){
	var response = prompt("Please enter what key you want for Invoke", "R");	
	defaultFingerMapping[82] = response;
}

function changeCast(){
	var response = prompt("Please enter what key you want for Cast", "D");	
	defaultFingerMapping[68] = response;
}

						<p> Change key assignments </p>
						<p> The combo goes item (Eul's) + skill + skill + skill + invoke + cast </p>
						<button id ="changeItem" type="button" class="btn btn-default btn-lg" onclick="changeItem();">Item</button>
						<button id ="changeQuas" type="button" class="btn btn-default btn-lg" onclick="changeQuas();">Quas</button>
						<button id ="changeWex" type="button" class="btn btn-default btn-lg" onclick="changeWex();">Wex</button>
						<button id ="changeExort" type="button" class="btn btn-default btn-lg" onclick="changeExort();">Exort</button>
						<button id ="changeInvoke" type="button" class="btn btn-default btn-lg" onclick="changeInvoke();">Invoke</button>
						<button id ="changeCast" type="button" class="btn btn-default btn-lg" onclick="chagneCast();">Cast</button>