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
numberButton.forEach(button => button.addEventListener('click', () => {
    /* what to do when digits are pressed after other classes
    if previous was equal button, clear everything and starts new calculation
    if previous was operator button, set second to input if cleared, otherwise, 
        make calculation and set second to new total, then clear currentInput ready for new input
    if keep adding to currentInput
    */
    if (previousButton === '=')
    {
        if (secondValue === '0')
        {
            currentInput += button.value;
            displayValue.textContent = currentInput;
        }
        else
        {
            clear();
            currentInput += button.value;
            displayValue.textContent = currentInput;
        }
    }
    else if (previousButton === '+' || previousButton === '-' || previousButton === '*' || previousButton === '/')
    {
        if (secondValue === '') //part of first calculation
        {
            secondValue = currentInput;
            currentInput += button.value;
            displayValue.textContent = currentInput;
            displayEquation.textContent = `${secondValue} ${operator}`; 
        }
        else if (secondValue !== '')
        {
            currentInput += button.value;
            displayValue.textContent = currentInput;
        }
    }
    else
    {
        currentInput += button.value;
        displayValue.textContent = currentInput;
    }

    /* if (resetValue === true) //reset everything right after clicking equal
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
    } */
    //currentInput += button.value; //update input
    //displayValue.textContent = currentInput; //update display with input
    previousButton = button.value;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}));

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => button.addEventListener('click', () => {
    /* What to do when operator are click after other classes
    if previous was digits, update second to current
    */
    //const pB = Number(previousButton);
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
            displayEquation.textContent = `${secondValue} ${button.value}`;
        }
        else if (currentInput !== '' && secondValue === '')
        {

        }
        else
        {

            displayEquation.textContent = `${displayValue.textContent} ${button.value}`;
        }
    }
    else if (previousButton === '')
    {
        secondValue = '0';
        displayValue.textContent = '0';
        displayEquation.textContent = `0 ${button.value}`;
    }
    else //if //(pB >= 0 && pB <= 9) //if previous was a digits button
    {
        if (operator === '')
        {
            secondValue = currentInput;
            displayEquation.textContent = `${secondValue} ${button.value}`;
            currentInput = '';
        }
        else
        {
            if (currentInput !== '' && secondValue !== '')
            {
                const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
                currentInput = '';
                secondValue = val;
                displayEquation.textContent = `${val} ${button.value}`;
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
                displayEquation.textContent = `${secondValue} ${button.value}`;
            }    
        }
    }


    /* if (resetEquation === true)
    {
        //currentInput = displayValue.textContent; //set current to total, ready for very next transfer
        resetEquation = false;
    }
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
        previousButton = button.value;
    operator = button.value;
    displayEquation.textContent = `${secondValue} ${operator} `; //update equation */
    //resetValue = true;
    operator = button.value;
    previousButton = button.value;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
}));

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('mousedown', () => {
    /*what to do when click on equal
    if click before anything else, set to 0=
    if click after operator, calculate based on existing values
    if click after number without operator, set to number=
    */
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

/*     if (currentInput === '' && operator === '') //clicking enter without all variables
    {
        //const val = `${operate(operator, secondValue, currentInput)}`
    } */
/*     resetValue = true;
    resetEquation = true;
    const val = `${operate(operator, Number(secondValue), Number(currentInput))}`;
    displayValue.textContent = val;
    displayEquation.textContent = `${secondValue} ${operator} ${currentInput} =`;
    secondValue = val; //update secondValue to new total
    //currentInput = ''; //clear current value */
    previousButton = equalButton.value;
    log(currentInput, operator, secondValue, displayValue.textContent, displayEquation.textContent, previousButton);
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