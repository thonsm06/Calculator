let displayScreen = document.querySelector('.displayContainer');
let displayEquation = document.createElement('output');
displayEquation.classList.add('displayEquation');
displayEquation.textContent = '';
displayScreen.appendChild(displayEquation);
let displayValue = document.createElement('output');
displayValue.classList.add('displayValue');
displayValue.textContent = '';
displayScreen.appendChild(displayValue);

let firstValue = '';
let secondValue = '';
let operator = '';
let resetValue = false;

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
    let result = 0;
    if (operator === '+')
    {
        result = add(Number(num1), Number(num2));
    }
    else if (operator === '-')
    {
        result = sub(Number(num1), Number(num2));
    }
    else if (operator === '*')
    {
        result = mul(Number(num1), Number(num2));
    }
    else if (operator === '/')
    {
        result = div(Number(num1), Number(num2));
    }
    console.log(result);
    displayValue.textContent = result;
}

//operate('/', 2, 5);

function evaluate() {
    if (displayValue.textContent != '')
    {
        displayValue.textContent = '';    
    }
}

const numberButton = document.querySelectorAll('.digits');
numberButton.forEach(button => button.addEventListener('mousedown', () => {
    if (resetValue === true)
    {
        displayValue.textContent = '';
        resetValue = false;
    }
    displayValue.textContent += button.value;
    if (secondValue === '' && firstValue === '')
    {
        firstValue += button.value;
        console.log(firstValue)
    }
    else if (secondValue === '' && firstValue !== '')
    {
        secondValue += button.value;
    }
}));

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('mousedown', () => {
    if (firstValue !== '' && secondValue !== '')
    {
        evaluate();
    }
    if(firstValue !== '' && secondValue === '')
    {
        operator = button.value;
        resetValue = true;
        displayEquation.textContent = firstValue + button.value;
        //displayValue.textContent = button.value; //reset display to operator selection
        console.log(displayEquation.textContent)
    }
    
}));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => {
    operate(operator, firstValue, secondValue);
})

const clear = document.querySelector('.clear');
clear.addEventListener('mousedown', () => {
    resetValue = false;
    displayEquation.textContent = '';
    displayValue.textContent = '';
    firstValue = '';
    secondValue = '';
})
