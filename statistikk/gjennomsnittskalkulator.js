const userInput = document.querySelector("#textareastat");
const outputTextElement = document.querySelector("#oneResultText");
const errorMessageContainer = document.querySelector("#errorMessageContainer");
const errorMessageText = document.querySelector("#errorMessageText");

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
        outputTextElement.textContent=`Gjennomsnitt:`;
    };
};

function calculateResult(inputValueString) {
    const inputValueArray = inputValueString.split(",");
    const arrayRemovedEmptyStrings = inputValueArray.filter(Boolean);
    const arrayNumbers = arrayRemovedEmptyStrings.map(Number);
    let theAverage;
    let sum = 0;

    if (arrayNumbers.length === 0) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Fyll feltet med tall";
        outputTextElement.textContent = "Gjennomsnitt:";
        return;
    };
    
    if (arrayNumbers.some(n => Number.isNaN(n))) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Ugyldig tallformat (sjekk bruk av punktum/komma)";
        outputTextElement.textContent = "Gjennomsnitt:";
        return;
    };
    
    arrayNumbers.forEach((element) => {
        sum += element;
    });

    theAverage = sum / arrayNumbers.length;

    if (theAverage > 100000000) {
        theAverage = theAverage.toExponential(4);
    } else {
        theAverage = Math.round((theAverage + Number.EPSILON)*10000)/10000;
    };
    outputTextElement.textContent = `Gjennomsnitt: ${theAverage}`;
};

