let displayScreen = document.querySelector('.displayContainer');
let displayEquation = document.createElement('output');
displayEquation.classList.add('displayEquation');
displayEquation.textContent = '';
displayScreen.appendChild(displayEquation);
let displayValue = document.createElement('output');
displayValue.classList.add('displayValue');
displayValue.textContent = '';
displayScreen.appendChild(displayValue);

let currentInput = '';
let secondValue = '';
let operator = '';
let resetValue = false;
let resetEquation = false;
function add(a, b){
    return a + b;
}
function sub(a, b){
    return a - b;
}
function mul(a, b){
    return a * b;
}
function div(a, b){
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator === '+')
    {
        return add(Number(num1), Number(num2));
    }
    else if (operator === '-')
    {
        return sub(Number(num1), Number(num2));
    }
    else if (operator === '*')
    {
        return mul(Number(num1), Number(num2));
    }
    else if (operator === '/')
    {
        return div(Number(num1), Number(num2));
    }
}


const numberButton = document.querySelectorAll('.digits');
numberButton.forEach(button => button.addEventListener('mousedown', () => {
    if (resetValue === true)
    {
        displayValue.textContent = '';
        resetValue = false;
    }
    if (resetEquation === true) //clear the calculator after clicking on equal
    {
        currentInput = '';
        displayValue.textContent = '';
        secondValue = '';
        displayEquation.textContent = '';
        resetEquation = false;
    }
    currentInput += button.value;
    displayValue.textContent = currentInput;
}));

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('mousedown', () => {
    if (resetEquation === true)
    {
        currentInput = displayValue.textContent; //set current to total, ready for very next transfer
        resetEquation = false;
    }
    secondValue = currentInput; //transfer currentInput into secondValue
    console.log(secondValue);
    currentInput = ''; //clear currentInput, ready for new number
    operator = button.value;
    displayEquation.textContent = `${secondValue} ${operator} `; //update equation
    //resetValue = true;

}));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => {
    if (currentInput === '' && operator === '') //clicking enter without all variables
    {
        const val = `${operate(operator, secondValue, currentInput)}`
    }
    resetEquation = true;
    const val = `${operate(operator, secondValue, currentInput)}`
    displayValue.textContent = val;
    displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
    secondValue = val; //update secondValue to new total
    //currentInput = ''; //clear current value
    console.log(currentInput, secondValue);

})

const clear = document.querySelector('.clear');
clear.addEventListener('mousedown', () => {
    resetValue = false;
    displayEquation.textContent = '';
    displayValue.textContent = '';
    currentInput = '';
    secondValue = '';
})
