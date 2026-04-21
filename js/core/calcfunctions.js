export function prepOut(num) {
    return new Intl.NumberFormat('nb-NO', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(num);
}

export function prepInput(inputArray, negAllowed) {
    let regexAllowedChars = "";

    if (negAllowed === true) {
        regexAllowedChars = /^-?[0-9.,\s]*$/;
    } else {
        regexAllowedChars = /^[0-9.,\s]*$/;
    };

    const allInputsValid = inputArray.every(input => regexAllowedChars.test(input.value));
    if (!allInputsValid) return "invalidInput";

    const cleanedArray = inputArray.map(input => cleanString(input.value));

    const regexMultiplePeriods = /(?:[^.]*\.){2,}/;
    const hasMultiplePeriods = cleanedArray.some(str => regexMultiplePeriods.test(str));
    if (hasMultiplePeriods) return "tooManyPeriods";

    const inputEmpty = inputArray.some(input => input.value.length === 0);
    if (inputEmpty) return false;

    const hasIncompleteInput = cleanedArray.some(str => str === "" || str === ".");
    if (hasIncompleteInput) return false;

    const numberArray = cleanedArray.map(str => Number(str));

    if (numberArray.some(num => isNaN(num))) return false;

    return numberArray;
};

export function prepDatasetInput(dataset) {
    const datasetNoSpace = dataset.replace(/\s+/g, "");
    const allowedChars = /^[0-9.,]+$/;
    const isCharsAllowed = allowedChars.test(datasetNoSpace);

    if (dataset === "") {
        return false;
    } else if (isCharsAllowed === false) {
        return "invalidInput";
    };

    const datasetArray = datasetNoSpace.split(",");
    const datasetNoEmptyStrings = datasetArray.filter(Boolean);
    const datasetNumbers = datasetNoEmptyStrings.map(Number);

    if (datasetNumbers.length === 0) {
        return "noNumbers";
    };

    if (datasetNumbers.some(n => Number.isNaN(n))) {
        return "invalidFormat"
    };

    return datasetNumbers;
};

function cleanString(input) {
    const noSpaces = input.replace(/\s+/g, "");
    const toPeriod = noSpaces.replace(/,/g, '.');
    return toPeriod;
};

export function validateExponential(inputString) {
    const preppedString = inputString.replace(",", ".");
    const regexAllowedFormat = /^[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/;

    if (preppedString === "") {
        return false;

    } else if (regexAllowedFormat.test(preppedString)) {
        const preppedNum = Number(preppedString);
        return preppedNum;

    } else {
       return "invalidFormat";
    };
};

export function round(value, decimals) {
    if (value === 0) {
        return 0;
    } else if (value > 10**15 || value < 10**(-decimals)) {
        return String(value.toExponential(6)).replace(".", ",");
    } else {
        return rounding(value, decimals);
    };
};

export function prepExpOutput(value, decimals, expDecimals) {
    if (value === 0) {
        return 0;
    } else if (value > 1_000_000 || value < 0.001) {
        return String(value.toExponential(expDecimals)).replace(".", ",");
    } else {
        return rounding(value, decimals);
    };
};

function rounding(value, decimals) {
    const factor = 10**decimals;
    const roundedValue = Math.round((value + Number.EPSILON)*factor)/factor;
    const finalString = String(roundedValue).replace(".", ",");
    return finalString;
};