import { extractEnteredNumberValues, extractNumbers } from './src/parser.js';
import { generateResultText, outputResult } from './src/output.js';
import { validateStringNotEmpty, validateNumber } from './src/util/validation.js';
import { add, calculateResult } from './src/math.js';
import { transformToNumber } from './src/util/numbers.js';

const form = document.querySelector('form');
// const output = document.getElementById('result');

function formSubmitHandler(event) {
    event.preventDefault();
    // const formData = new FormData(form);
    // const numberInputs = extractNumbers(formData);
    const numberInputs = extractEnteredNumberValues(form);

    // let result = '';
    //
    // try {
    //     const numbers = [];
    //     for (const numberInput of numberInputs) {
    //         validateStringNotEmpty(numberInput);
    //         const number = transformToNumber(numberInput);
    //         validateNumber(number);
    //         numbers.push(number);
    //     }
    //     result = add(numbers).toString();
    // } catch (error) {
    //     result = error.message;
    // }
    const result = calculateResult(numberInputs);

    // let resultText = '';
    //
    // if (result === 'invalid') {
    //     resultText = 'Invalid input. You must enter valid numbers.';
    // } else if (result !== 'no-calc') {
    //     resultText = 'Result: ' + result;
    // }
    let resultText = generateResultText(result);

    // output.textContent = resultText;
    outputResult(resultText);
}

form.addEventListener('submit', formSubmitHandler);
