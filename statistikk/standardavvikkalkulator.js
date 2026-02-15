const userInput = document.querySelector("#textareastat");
const stdavvikPopulasjonValg = document.querySelector("#stdavvikRadioElementPop");
const stdavvikStikkproeveValg = document.querySelector("#stdavvikRadioElementStikk");
const outputTextElement = document.querySelector("#oneResultText");
const errorMessageContainer = document.querySelector("#errorMessageContainer");
const errorMessageText = document.querySelector("#errorMessageText");


stdavvikStikkproeveValg.addEventListener("input", charCheck);
stdavvikPopulasjonValg.addEventListener("input", charCheck);
userInput.addEventListener("input", charCheck);

function charCheck() {
    let inputValueString = String(userInput.value);
    inputValueString = inputValueString.replace(/\s+/g, "");
    const allowedChars = /^[0-9.,]+$/;

    const isCharsAllowed = allowedChars.test(inputValueString);
    
    if (isCharsAllowed === false && !!inputValueString) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent="Bare tall, komma og punktum er tillatt";
    } else if (isCharsAllowed === true && !!inputValueString) {
        errorMessageContainer.classList.add("hidden");
        calculateResult(inputValueString);
    } else {
        errorMessageContainer.classList.add("hidden");
        outputTextElement.textContent=`Standardavvik:`;
    };
};

function calculateResult(inputValueString) {
    const inputValueArray = inputValueString.split(",");
    const arrayRemovedEmptyStrings = inputValueArray.filter(Boolean);
    const arrayNumbers = arrayRemovedEmptyStrings.map(Number);

    let sum = 0;
    let squareSum = 0;
    let standarddeviation = 0;

    if (arrayNumbers.length === 0) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Fyll feltet med tall";
        outputTextElement.textContent = "Standardavvik:";
        return;
    } else if (arrayNumbers.length === 1) {
        outputTextElement.textContent = "Standardavvik:";
        return;
    };
    
    if (arrayNumbers.some(n => Number.isNaN(n))) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Ugyldig tallformat (sjekk bruk av punktum/komma)";
        outputTextElement.textContent = "Standardavvik:";
        return;
    };
    
    arrayNumbers.forEach((element) => {
        sum += element;
    });

    const theAverage = sum / arrayNumbers.length;

    arrayNumbers.forEach((element) => {
        squareSum += (element - theAverage)**2;
    });

    if (stdavvikPopulasjonValg.checked) {
        standarddeviation = Math.sqrt(squareSum / arrayNumbers.length);

    } else if (stdavvikStikkproeveValg.checked) {
        standarddeviation = Math.sqrt(squareSum / (arrayNumbers.length - 1));
    }

    if (standarddeviation > 100000) {
        standarddeviation = standarddeviation.toExponential(4);
    } else {
        standarddeviation = Math.round((standarddeviation + Number.EPSILON)*1000)/1000;
    };
    outputTextElement.textContent = `Standardavvik: ${standarddeviation}`;
};

