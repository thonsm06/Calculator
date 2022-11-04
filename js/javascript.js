let currentInput = ''; //only variable that accept input
let secondValue = ''; //store input after operator
let operator = ''; //store current operator
let resetValue = false; //clear everything 
let resetEquation = false; //clear after hitting equal
let previousButton = '';

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
numberButton.forEach(button => button.addEventListener('click', () => numerals(button.value)));

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('click', () => operation(button.value)));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => equal(equalButton.value));

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', percent)

const signButton = document.querySelector('.sign');
signButton.addEventListener('click', () => sign(signButton.value));

window.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === "Backspace") //spacebar
    {
        backspace(e.key);
    }
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    {
        operation(e.key);
    }
    else if (e.key === '=' || e.key === 'Enter')
    {
        equal(e.key);
    }
    else if (e.key === '.')
    {
        decimal(e.key);
    }
    else if (e.key === '%')
    {
        percent(e.key);

    }
    else if (e.key >= 0 && e.key <= 9)
    {
        numerals(e.key);
    }
})
function sign(key){
    if (previousButton === '=')
    {
        if (currentInput === '')
        {
            if (secondValue != '')
            {
                const second = Math.sign(secondValue);
                if (second === 1)
                {
                    displayEquation.textContent = `negative(${secondValue})`;
                    secondValue = `-${secondValue}`;
                    displayValue.textContent = `${secondValue}`;
                    
                }
                
            }
        }
    }
    else if (previousButton === "")
    {

    }
    else if (previousButton === '')
    {

    }
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function percent(key)
{
    
}
function backspace (key) {
    //when pressed backspace, delete last digit of currentInput
    if (currentInput !== '')
    {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '')
        {
            displayValue.textContent = '0';
        }
        else
        {
            displayValue.textContent = currentInput;
        }
        
    }
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function numerals(key) {
    if (previousButton === '=')
    {
        if (secondValue === '0')
        {
            currentInput += key;
            displayValue.textContent = currentInput;
        }
        else
        {
            clear();
            currentInput += key;
            displayValue.textContent = currentInput;
        }
    }
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    {
        if (secondValue === '') //part of first calculation
        {
            secondValue = currentInput;
            currentInput += key;
            displayValue.textContent = currentInput;
            displayEquation.textContent = `${secondValue} ${operator}`; 
        }
        else if (secondValue !== '')
        {
            currentInput += key;
            displayValue.textContent = currentInput;
        }
    }
    else
    {
        currentInput += key;
        displayValue.textContent = currentInput;
    }
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function operation(key) {

    if (previousButton === '=')
    {
        //secondValue = 
    }
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    { //if spamming operator button, calculate once if there are both value.
        if (currentInput !== '' && secondValue !== '')
        {
            const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
            secondValue = val;
            currentInput = '';
            displayEquation.textContent = val;
        }
        else if (currentInput === '' && secondValue !== '')
        {
            displayValue.textContent = secondValue;
            displayEquation.textContent = `${secondValue} ${key}`;
        }
        else if (currentInput !== '' && secondValue === '')
        {

        }
        else
        {

            displayEquation.textContent = `${displayValue.textContent} ${key}`;
        }
    }
    else if (previousButton === '')
    {
        secondValue = '0';
        displayValue.textContent = '0';
        displayEquation.textContent = `0 ${key}`;
    }
    else //if //(pB >= 0 && pB <= 9) //if previous was a digits button
    {
        if (operator === '')
        {
            secondValue = currentInput;
            displayEquation.textContent = `${secondValue} ${key}`;
            currentInput = '';
        }
        else
        {
            if (currentInput !== '' && secondValue !== '')
            {
                const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
                currentInput = '';
                secondValue = val;
                displayEquation.textContent = `${val} ${key}`;
                displayValue.textContent = val;
            }
            else if (currentInput !== '' && secondValue === '')
            {
    
            }
            else if (currentInput === '' && secondValue !== '')
            {
    
            }
            else
            {
                secondValue = currentInput;
                currentInput = '';
                displayEquation.textContent = `${secondValue} ${key}`;
            }    
        }
    }
    operator = key;
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function equal (key) {
    if (previousButton === '')
    {
        secondValue = '0';
        displayEquation.textContent = `0 =`;
    }
    else if (previousButton === '=')
    {   
        if (currentInput !== '' && secondValue !== '')
        {
            secondValue = displayValue.textContent;
            const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
            displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
            displayValue.textContent = val;
        }
    }   
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    {
        // try to calculate
        if (currentInput === '' && secondValue !== '')
        {
            currentInput = secondValue;
        }
        const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
        //secondValue = val;
        displayEquation.textContent = `${val} ${operator} ${currentInput} =`;
        displayValue.textContent = val;
    }
    else //equal after number
    {
        if (operator === '')
        {
            secondValue = currentInput;
            displayValue.textContent = currentInput;
            displayEquation.textContent = `${currentInput} =`;
            currentInput = '';
        }
        else
        {
            const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
            displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
            displayValue.textContent = val;
        }
    }
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}

function clear() {
    resetValue = false;
    displayEquation.textContent = '';
    displayValue.textContent = '0';
    currentInput = '';
    secondValue = '';
    operator = '';
    previousButton = '';
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
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
function log(current, operator, second, value, equation, previous) {
    console.log('current:', current, '\n', 'operator:', operator, '\n', 'second:', second, '\n',
        'Value:', value, '\n', 'Equation:', equation, '\n', 'Previous:', previous);
}