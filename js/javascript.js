let currentInput = '';
let secondValue = '';
let operator = '';
let resetValue = false;
let resetEquation = false;

const displayScreen = document.querySelector('.displayContainer');
let displayEquation = displayScreen.querySelector('.displayEquation')
displayEquation.textContent = '';
let displayValue = displayScreen.querySelector('.displayValue')
displayValue.textContent = '';

function color(button) {
    console.log(1);
    button.style.backgroundColor = 'orange';
}
const buttonColor = document.querySelectorAll('button');
//buttonColor.forEach(button => button.addEventListener('mouseover', function color(button){}))
buttonColor.forEach(button => button.addEventListener('mouseenter', function () {
    //etDefault();
    button.style.boxShadow = "0px 0px 15px 1px rgba(0, 0, 0, 0.6) inset";
    console.log(button.style.backgroundColor);
}))

buttonColor.forEach(button => button.addEventListener('mouseleave', function () {
    button.style.boxShadow = "none";
    console.log(button.style.backgroundColor);
}))

console.log()
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
