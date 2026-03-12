export function prepOut(num) {
    return new Intl.NumberFormat('nb-NO', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(num);
}

export function prepInput(inputArray) {
    const regexAllowedChars = /^[0-9.,\s]*$/;

    const allInputsValid = inputArray.every(input => regexAllowedChars.test(input.value));
    const inputEmpty = inputArray.some(input => input.value.length === 0);

    if (!allInputsValid) {
        return "invalidInput";
    };

    if (inputEmpty) {
        return false;
    };

    const cleanedArray = inputArray.map(input => cleanString(input.value));

    const regexMultiplePeriods = /(?:[^.]*\.){2,}/;
    const hasMultiplePeriods = cleanedArray.some(str => regexMultiplePeriods.test(str));

    if (hasMultiplePeriods) {
        return "tooManyPeriods";
    };

    return cleanedArray.map(str => Number(str));
};

function cleanString(input) {
    let noSpaces = input.replace(/\s+/g, "");
    let toPeriod = noSpaces.replace(",", ".");
    return toPeriod;
};