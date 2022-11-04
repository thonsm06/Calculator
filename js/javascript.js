//#region Initialize
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
//#endregion

//#region highlights
const buttonColor = document.querySelectorAll('button');
buttonColor.forEach(button => button.addEventListener('mouseenter', () => {
    button.style.boxShadow = "0px 0px 28px 3px rgba(0, 0, 0, 0.25) inset";
}))
buttonColor.forEach(button => button.addEventListener('mouseleave', () => {
    button.style.boxShadow = "none";
}))

window.addEventListener('keydown', (event) => {
    var key = event.key;
    for(let i = 0; i < buttonColor.length; i++)
    {
        if (buttonColor[i].value === key)
        {
            buttonColor[i].style.boxShadow = "0px 0px 28px 3px rgba(0, 0, 0, 0.25) inset";
        }
    }
})
window.addEventListener('keyup', (event) => {
    var key = event.key;
    for(let i = 0; i < buttonColor.length; i++)
    {
        if (buttonColor[i].value === key)
        {
            buttonColor[i].style.boxShadow = "none";
        }
    }
})

const shadow = document.querySelector('.main'); //select main
shadow.style.boxShadow = '0px 0px 10px 2px rgba(0, 0, 0, 0.5'; //add drop shadow to entire calculator
//#endregion

//#region Selections
const numberButton = document.querySelectorAll('.digits');
numberButton.forEach(button => button.addEventListener('click', () => numerals(button.value)));
const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('click', () => operation(button.value)));
const parenthesesButton = document.querySelectorAll('.parentheses');
parenthesesButton.forEach(button => button.addEventListener('click', () => parentheses(button.value)));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => equal(equalButton.value));
const clearAllButton = document.querySelector('.clearAll');
clearAllButton.addEventListener('click', () => clearAll(clearAllButton.value));
const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => percent(percentButton.value));
const signButton = document.querySelector('.sign');
signButton.addEventListener('click', () => sign(signButton.value));
const periodButton = document.querySelector('.period');
periodButton.addEventListener('click', () => period(periodButton.value));
const clearLastButton = document.querySelector('.clearLast');
clearLastButton.addEventListener('click', () => clearLast(clearLastButton.value));
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => deletion(deleteButton.value));
const powerButton = document.querySelector('.power');
powerButton.addEventListener('click', () => power(powerButton.value));
//#endregion

window.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === "Backspace") //spacebar
    {
        deletion(e.key);
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

//#region FUNCTIONS
function power(key) {
    
}
function parentheses(key) {

}
function period(key){

}
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
    else if (previousButton >= 0 && previousButton <= 9)
    {
        if (Math.sign(currentInput) === 1) //if positive, turn negative
        {
            
            currentInput = `-${currentInput}`;
            displayValue.textContent = currentInput.toString();
        }
        else
        {
            currentInput = `${currentInput*-1}`;
            displayValue.textContent = currentInput;
        }
    }
    else if (previousButton === '+/-') //if spamming sign button, keep switching positive and negative
    {
        if (Math.sign(currentInput) === 1) //if positive, turn negative
        {
            
            currentInput = `-${currentInput}`;
            displayValue.textContent = currentInput.toString();
        }
        else
        {
            currentInput = `${currentInput*-1}`;
            displayValue.textContent = currentInput;
        }
    }
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function percent(key)
{
    if (previousButton === '=')
    {

    }
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    {

    }
    else if (previousButton === '')
    {

    }
    else if (previousButton >= 0 && previousButton <= 9)
    {
        if (secondValue === '')
        {
            currentInput = '0';
            secondValue = '0';
            displayEquation.textContent = `${secondValue}`;
            displayValue.textContent = currentInput;
        }
    }
}
function deletion (key) {
    //when pressed backspace, delete last digit of currentInput
    if (currentInput !== '')
    {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '')
        {
            currentInput = '';
            displayValue.textContent = '0';
        }
        else
        {
            displayValue.textContent = currentInput;
        }
        
    }
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function numerals(key) { //run when detecting number keys
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
function operation(key) { //run when detecting operator keys

    if (previousButton === '=')
    {
        //secondValue = 
    }
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    { //if spamming operator button, calculate once if there are both value.
        if (currentInput !== '' && secondValue !== '')
        {
            const val = round(`${operate(operator, Number(secondValue), Number(currentInput))}`);
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
                const val = round(`${operate(operator, Number(secondValue), Number(currentInput))}`);
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
function equal (key) { //run on equal or Enter
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
            const val = round(`${operate(operator, Number(secondValue), Number(currentInput))}`);
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
            const val = round(`${operate(operator, Number(secondValue), Number(currentInput))}`);
            displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
            displayValue.textContent = val;
        }
    }
    previousButton = key;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function clearAll(key) { //run on delete
    resetValue = false;
    displayEquation.textContent = '';
    displayValue.textContent = '0';
    currentInput = '';
    secondValue = '';
    operator = '';
    previousButton = '';
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}
function clearLast(key) {

}
function round(num) { //run on calculation 
    if (Number(num) % 1 !== 0)
    {
        num = (Number(num).toFixed(2)).toString();
        if (num.charAt(num.length-1) === '0')
        {
            num = num.slice(0, -1);
        }
        return num;
    }
    else return num;
}
//#endregion

// #region Math functions
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
// #endregion



//DEBUG
function log(current, operator, second, value, equation, previous) {
    console.log('current:', current, '\n', 'operator:', operator, '\n', 'second:', second, '\n',
        'Value:', value, '\n', 'Equation:', equation, '\n', 'Previous:', previous);
}