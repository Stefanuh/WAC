// Store the current value into a variable
var currentVal = document.getElementById("textarea").value;

// A function for the setInterval
function func(){
	// Check if the stored value is the same as the current value in the text area
	if (currentVal !== document.getElementById("textarea").value) {
		// If so, notify and overwrite the variable with the new current value
		console.log("The value changed from: '"+currentVal+"' to: '"+document.getElementById("textarea").value+"'");
		currentVal = document.getElementById("textarea").value;
	} else {
		// Otherwise notify and do nothing
		console.log("Nothings changed");
	}
}

// Make a 5 function repeater
setInterval(func, 5000);