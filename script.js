// Vars
const SUM_OP = "+";
const SUB_OP = "-";
const MULT_OP = "*";
const DIV_OP = "/";
const DECIMAL_POINT = ".";
const ZERO = "0";
const MEME = "u tried bro";

let firstNum = ZERO;
let operator;
let secondNum;
let resultNum;

let display = document.querySelector('.display');

// Functions
let add = (numA, numB) => numA + numB;
let subtract = (numA, numB) => numA - numB;
let multiply = (numA, numB) => numA * numB;
let divide = (numA, numB) => numA / numB;

let operate = (operator, numA, numB) => {
    console.log("OPERATING " + numA + operator + numB);
    let operation;
    switch(String(operator)) {
        case SUM_OP:
            operation = add;
            break;
        case SUB_OP:
            operation = subtract;
            break;
        case MULT_OP:
            operation = multiply;
            break;
        case DIV_OP:
            if (numB === ZERO) return MEME;
            operation = divide;
            break;
    }
    return Math.round(operation(Number(numA), Number(numB)) * 100) / 100;
};

let computeNumber = (number) => {
    console.log("Computing Number " + number);
    console.log("OPERATION " + operator);
    let updatedDisplay = '';
    if (!operator && resultNum) { // previous result isn't the first number
        firstNum = undefined;
        resultNum = undefined;
    }
    if (!firstNum || firstNum == ZERO) { // new first number
        console.log("New First Number");
        if (number == DECIMAL_POINT) firstNum = ZERO + number;
        else firstNum = number;
        updatedDisplay = firstNum;
    } else {
        if (!operator) { // no operator yet, so another digit for first number
            firstNum += number;
            updatedDisplay = firstNum;
        } else {
            if (!secondNum) { // new second number
                console.log("New Second Number");
                if (number == DECIMAL_POINT) secondNum = ZERO + number;
                else secondNum = number;
                updatedDisplay = secondNum;
            } else { // new digit for second number
                secondNum += number;
                updatedDisplay = secondNum;
            }
        }
    }
    updateDisplay(updatedDisplay);
};

let computeOperator = (newOperator) => {
    console.log("COMPUTING OPERATOR " + firstNum + " operator " + secondNum);
    if (!operator) {
        operator = newOperator;
    } else {
        if (firstNum) {
            if (!secondNum) secondNum = firstNum; // uses same num in both side of operator
            computeOperation(newChainOperator = newOperator);
        }
    }
};

let computeOperation = (newChainOperator = undefined) => {
    let result;
    if (!operator) { // can't operate
        return;
    } else {
        if (!firstNum) { // can't operate
            return;
        } else {
            if (!secondNum) {
                result = operate(operator, firstNum, firstNum);
            } else {
                result = operate(operator, firstNum, secondNum);
            }
        }
    }
    updateDisplay(result);
    firstNum = result;
    resultNum = result;
    secondNum = undefined;
    operator = newChainOperator; // new operator may appear for a chain operation
};

let updateDisplay = (update) => {
    display.innerHTML = update;
    console.log("Updated HTML Display");
    console.log(display.innerHTML);
};

let clearDisplay = () => {
    secondNum = undefined;
    operator = undefined;
    resultNum = undefined;
    updateDisplay(ZERO);
    firstNum = ZERO;
};

// Button Events
const numberBtns = document.querySelectorAll('.number-btn');
numberBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => computeNumber(e.target.innerHTML));
});

const operationBtns = document.querySelectorAll('.operation-btn');
operationBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => computeOperator(e.target.innerHTML));
});
const equalsBtn = document.querySelector('.equals-btn');
equalsBtn.addEventListener('click', (e) => computeOperation());
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', (e) => clearDisplay());
