let currentInput = ''; //only variable that accept input
let secondValue = ''; //store input after operator
let operator = ''; //store current operator
let resetValue = false; //clear everything 
let resetEquation = false; //clear after hitting equal

const displayScreen = document.querySelector('.displayContainer');
let displayEquation = displayScreen.querySelector('.displayEquation')
displayEquation.textContent = '';
let displayValue = displayScreen.querySelector('.displayValue')
displayValue.textContent = '0';

const buttonColor = document.querySelectorAll('button');
buttonColor.forEach(button => button.addEventListener('mouseenter', () => {
    button.style.boxShadow = "0px 0px 28px 3px rgba(0, 0, 0, 0.25) inset";
}))
buttonColor.forEach(button => button.addEventListener('mouseleave', () => {
    button.style.boxShadow = "none";
}))

const numberButton = document.querySelectorAll('.digits');
numberButton.forEach(button => button.addEventListener('click', () => {
    if (resetValue === true)
    {
        clear();
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
    currentInput += button.value; //update input
    displayValue.textContent = currentInput; //update display with input
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent);
}));

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('click', () => {
    
    if (resetEquation === true)
    {
        //currentInput = displayValue.textContent; //set current to total, ready for very next transfer
        resetEquation = false;
    }
    else
    {

        if (currentInput !== '' && secondValue !== '') //click an operator instead of equal
        {
            const val = `${operate(operator, Number(secondValue), Number(currentInput))}`; //calculate with the old operator
            currentInput = '';
            secondValue = val;
            displayValue.textContent = val;
            operator = button.value;
            displayEquation.textContent = `${val} ${operator}`;
        }
        else if (currentInput !== '' && secondValue === '') //clicked on operator with only currentInput
        { //add operator to displayEquation using either 0 or current secondValue
            secondValue = currentInput;
            currentInput = '';
        }
        else if (currentInput === '' && secondValue !== '') //click on operator with only secondValue
        {//does nothing
            
        }
        else
        {
            secondValue = currentInput; //transfer currentInput into secondValue
            currentInput = ''; //clear currentInput, ready for new number
        }
    }          
    operator = button.value;
    displayEquation.textContent = `${secondValue} ${operator} `; //update equation
    //resetValue = true;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent);
}));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => {
    if (currentInput === '' && operator === '') //clicking enter without all variables
    {
        //const val = `${operate(operator, secondValue, currentInput)}`
    }
    resetValue = true;
    resetEquation = true;
    const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
    displayValue.textContent = val;
    displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
    secondValue = val; //update secondValue to new total
    //currentInput = ''; //clear current value
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent);
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

function clear() {
    resetValue = false;
    displayEquation.textContent = '';
    displayValue.textContent = '0';
    currentInput = '';
    secondValue = '';
    operator = '';
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent);
}

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
    if (operator === '+') return add(num1, num2);
    else if (operator === '-') return sub(num1, num2);
    else if (operator === '*') return mul(num1, num2);
    else if (operator === '/') return div(num1, num2);
}

const shadow = document.querySelector('.main'); //select main
shadow.style.boxShadow = '0px 0px 10px 2px rgba(0, 0, 0, 0.5'; //add drop shadow to entire calculator


//DEBUG
function log(current, operator, second, value, equation) {
    console.log('current:', current, '\n', 'operator:', operator, '\n', 'second:', second, '\n',
        'Value:', value, '\n', 'Equation:', equation);
}