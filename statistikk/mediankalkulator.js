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
        outputTextElement.textContent=`Median:`;
    };
};

function calculateResult(inputValueString) {
    const inputValueArray = inputValueString.split(",");
    const arrayRemovedEmptyStrings = inputValueArray.filter(Boolean);
    const arrayNumbers = arrayRemovedEmptyStrings.map(Number);
    const arraySorted = arrayNumbers.sort((a, b) => a - b);
    let medianValue = 0;

    if (arrayNumbers.length === 0) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Fyll feltet med tall";
        outputTextElement.textContent = "Median:";
        return;
    };
    
    if (arrayNumbers.some(n => Number.isNaN(n))) {
        errorMessageContainer.classList.remove("hidden");
        errorMessageText.textContent = "Ugyldig tallformat (sjekk bruk av punktum/komma)";
        outputTextElement.textContent = "Median:";
        return;
    };

    if (arraySorted.length % 2 === 0) {
        const middleArrayLongLength = Math.floor(arraySorted.length / 2);
        const middleArrayShortLength = middleArrayLongLength - 1;
        const lowMidNum = Number(arraySorted[middleArrayShortLength]);
        const highMidNum = Number(arraySorted[middleArrayLongLength]);
        medianValue = (lowMidNum + highMidNum) / 2;

    } else {
        const middleOfArray = Math.floor(arraySorted.length / 2);
        medianValue = Number(arraySorted[middleOfArray]);
    };

    if (medianValue > 100000000000) {
        medianValue = medianValue.toExponential(4);
    } else {
        medianValue = Math.round((medianValue + Number.EPSILON)*10000)/10000;
    };
    outputTextElement.textContent = `Median: ${medianValue}`;
};

