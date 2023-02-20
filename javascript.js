function add(a,b)
{
    return a+b;
}
function subtract(a,b)
{
    return a-b;
}
function multiply(a,b)
{
    return a*b;
}
function divide(a,b)
{
    return a/b;
}
function operate(operator,a,b)
{
    if(operator == '+')
        return add(a,b);
    else if(operator == '-')
        return subtract(a,b);
    else if(operator == '*')
        return multiply(a,b);
    else
        return divide(a,b);            
}
function checkKey(key)
{
    if(key == '1' || key == '2' || key =='3' || key == '4' || key == '5'
     || key == '6' || key =='7' || key =='8' || key =='9' || key=='0' || key =='.')
        return 2;
    else if (key == '+' || key == '-' || key == '*' || key == "/" || key == "=")
        return 1;
    else if (key == 'Backspace')
        return 3;
    else 
        return 0;            
}
function changeDisplay(e)
{
    let displayValue = document.querySelector(".displayText");
    let oldValue = displayValue.textContent; 
    // get value from display
    console.log(e.key);
    let correctKey = checkKey(e.key);
    // check which key is pressed in case of keyboard, operator or number
    if(correctKey == 1)
        evaluateOperator(e);// operator pressed
    if(correctKey == 3)
        removeLast();    

    // clicked from keyboard
    // number pressed
    if(correctKey == 2)
    {

        if(oldValue !== '0')
            displayValue.textContent = oldValue + e.key;
    else
        displayValue.textContent = e.key; 
    }
    //clicked from screen
    else if(this.id != undefined)
    {
        if(oldValue !== '0')
            displayValue.textContent = oldValue + this.id;
        else
            displayValue.textContent = this.id; 
    }
   
       
}
function clearDisplay()
{
    let displayValue = document.querySelector(".displayText");
    displayValue.textContent = "0";
}
function removeLast(e)
{
    let displayValue = document.querySelector(".displayText");
    let length = displayValue.textContent.length;
    if(length!=1)
    {
        let content = displayValue.textContent.slice(0,length-1);
        displayValue.textContent = content;
    }
    else
        displayValue.textContent = "0";    
}
function isOperator(char)
{
    if(char =='+'||char=='-'||char == '*'||char=='/')
        return true;
    return false;    
}
function checkOperator(display)
{
    let words = display.split("");
    let operator = words.filter( char => isOperator(char));
    return operator.pop();

}
function evaluateOperator(e)
{
    let displayValue = document.querySelector(".displayText")
    // check if already an operator present in display text
    let operator = checkOperator(displayValue.textContent);
    // if from keyboard use e.key else use this.id as operator
    let result = this.id;
    if(e.key)
    {
        result = e.key;
    }
    if(operator)
    {
        // if operator present
        let array = displayValue.textContent.split(operator);

        // we need the last two elements of split in case of -12 - 24 case -> ['',12,24]
        // normal case [12,24]
        let second = +array.pop();
        let first = +array.pop();
        if(array.length>0)
            first = 0 - first; // -12,24,- 
        // get left and right of operator
        if(second == 0 && operator == '/')
        {
            displayValue.textContent = "Sorry this is not possible";
            window.setTimeout(clearDisplay,2000);
            return;
        }
        let answer = + (operate(operator,first,second)).toFixed(2);
        //+ to convert to number
        // remove previous operator and add result and new operator
        if(result !='equal' && result !='=')
            displayValue.textContent = answer + result;
        else
            displayValue.textContent = answer;
    }
    else
    {
        // no operator available add operator

        oldValue = displayValue.textContent;
        if(result!='equal' && result!='=')
            displayValue.textContent = oldValue + result;
    }
}
// add click event on numbers
let displayValue = document.querySelector(".displayText");
let numbers = document.querySelectorAll(".number");
numbers.forEach(number =>
    {
        number.addEventListener('click',changeDisplay);
    });
// add clear button event listener
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click',clearDisplay); 

// add delete button event listener
let deleteButton = document.querySelector("#delete");
deleteButton.addEventListener('click',removeLast);

// add event on click of *,/,-,+
let operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(op =>
    {
        op.addEventListener('click',evaluateOperator);
    });

// for pressing number key  and operator keys  
document.addEventListener('keydown',changeDisplay);

