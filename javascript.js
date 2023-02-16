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
console.log(operate("+",3,2));
console.log(operate("*",5,4));