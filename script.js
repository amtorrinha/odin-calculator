// Vars
const SUM_OP = "+";
const SUB_OP = "-";
const MULT_OP = "*";
const DIV_OP = "/";
const DECIMAL_POINT = ".";
const NEGATIVE_POSITIVE = "+/-";
const PERCENTAGE = "%";
const ZERO = "0";
const MEME = "Nice try, bud!";

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
    let updatedDisplay;
    if ((firstNum && !secondNum && !operator && firstNum.length == 16) || 
            (secondNum && secondNum.length == 16)) return; // calculator display digit limit reached
    if (number === PERCENTAGE) {
        updatedDisplay = computePercentage();
        if (updatedDisplay) updateDisplay(updatedDisplay);
        return;
    }
    if (number === NEGATIVE_POSITIVE) {
        updatedDisplay = computeNegative();
        if (updatedDisplay) updateDisplay(updatedDisplay);
        return;
    }
    if (!operator && resultNum) { // previous result isn't the first number
        firstNum = undefined;
        resultNum = undefined;
    }
    if (!firstNum || firstNum == ZERO) { // new first number
        if (number == DECIMAL_POINT) firstNum = ZERO + number;
        else firstNum = number;
        updatedDisplay = firstNum;
    } else {
        if (!operator) { // no operator yet, so another digit for first number
            if (number == DECIMAL_POINT && firstNum.indexOf(DECIMAL_POINT) > -1) return; // ignores if already existing decimal point
            firstNum += number;
            updatedDisplay = firstNum;
        } else {
            if (!secondNum) { // new second number
                if (number == DECIMAL_POINT) secondNum = ZERO + number;
                else secondNum = number;
                updatedDisplay = secondNum;
            } else { // new digit for second number
                if (number === DECIMAL_POINT && secondNum.indexOf(DECIMAL_POINT) > -1) return;
                secondNum += number;
                updatedDisplay = secondNum;
            }
        }
    }
    if(updatedDisplay) updateDisplay(updatedDisplay);
};

let computePercentage = () => {
    if (secondNum) {
        secondNum = Number(secondNum) / 100;
        return secondNum;
    } else if (firstNum) {
        firstNum = Number(firstNum) / 100;
        return firstNum;
    }
};

let computeNegative = () => { // adds or remove negative symbol if conditions are met
    if (secondNum) {
        if (secondNum[0] === SUB_OP) {
            secondNum = secondNum.slice(1);
        } else {
            secondNum = SUB_OP + secondNum;
        }
        return secondNum;
    } else if (firstNum) {
        if (firstNum[0] === SUB_OP) {
            firstNum = firstNum.slice(1);
        } else {
            firstNum = SUB_OP + firstNum;
        }
        return firstNum;
    }
};

let computeOperator = (newOperator) => {
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

let updateDisplay = (update) => display.innerHTML = update;

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
