// Een constructor die de eerste en tweede waarde opslaat en de operator
const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};

// Een functie die de invoer van de gebruiker toevoegd aan de waarde van de som
function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calculator;
	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
}

// Deze functie voegt een decimale punt toe aan de waarde - behalve als deze al staat
function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;
	if (!calculator.displayValue.includes(dot)) calculator.displayValue += dot;
}

// Deze functie neemt alle operators op op volgorde
function handleOperator(nextOperator) {
	const { firstOperand, displayValue, operator } = calculator
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand){
		calculator.operator = nextOperator;
		return;
	}
	
	if (firstOperand == null) {
		calculator.firstOperand = inputValue;
	} else if (operator) {
		const currentValue = firstOperand || 0;
		const result = performCalculation[operator](currentValue, inputValue);
		
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
}

// Dit is een constructor met alle operators en hun methode van rekenen
const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
	'=': (firstOperand, secondOperand) => secondOperand
};

// Deze functie reset de calculator constructor
function resetCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
}

// Deze functie selecteerd de HTML display element en geeft hier en waarde aan
function updateDisplay() {
	const display = document.querySelector('.calculator-screen');
	display.value = calculator.displayValue;
}

// Deze constructor selecteerd de keypad van de toetsenbord
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
	const { target } = event;
	
	if (!target.matches('button')) return;
	
	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}
	
	if (target.classList.contains('decimal')) {
		inputDecimal(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('all-clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});