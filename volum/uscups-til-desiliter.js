import { prepInput, rounding } from '../calcfunctions.js';

const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");
const errorMessageContainer = document.querySelector("#errorMessageContainer");
const errorMessageText = document.querySelector("#errorMessageText");
const outputDecimals = 3;

inputElement.addEventListener("input", (e) => {
    outputElement.value = "";
    errorMessageContainer.classList.add("hidden");
    errorMessageText.textContent="";

    const inputArray = [e.target];
    const preppedArray = prepInput(inputArray);

    if (preppedArray === "invalidInput") {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent="Bare tall, komma og punktum er tillatt.";

    } else if (preppedArray === "tooManyPeriods") {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent="Kun ett komma eller punktum er tillatt.";

    } else if (preppedArray) {
        calculate(preppedArray[0]);
    };
});

function calculate(preppedNum) {
    const calculated = preppedNum * 2.36588237;
    const finalString = rounding(calculated, outputDecimals);
    outputElement.value = finalString;
};