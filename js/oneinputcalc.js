import { prepInput, rounding } from '../js/calcfunctions.js';

const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");
const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");
const formula = inputElement.dataset.formula;
const outputDecimals = inputElement.dataset.decimals;

inputElement.addEventListener("input", (e) => {
    outputElement.value = "";
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputArray = [e.target];
    const preppedArray = prepInput(inputArray);

    if (preppedArray === "invalidInput") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Kun tall, komma og punktum er tillatt.";

    } else if (preppedArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Kun ett komma eller punktum er tillatt.";

    } else if (preppedArray) {
        calculate(preppedArray[0]);
    };
});

function calculate(preppedNum) {
    const calculated = Function("x", `return ${formula}`)(preppedNum);
    const finalString = rounding(calculated, outputDecimals);
    outputElement.value = finalString;
};