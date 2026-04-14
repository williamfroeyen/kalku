import { rounding, prepInput } from '../core/calcfunctions.js';

const verticalHeight = document.querySelector("#loddretttakhoyde");
const horizontalLength = document.querySelector("#vannretttaklengde");
const slopedLength = document.querySelector("#skrataklengde");

const errorMessageContainer = document.querySelector("#errorMessageContainer");
const errorMessageText = document.querySelector("#errorMessageText");

const resultsList = document.querySelector("#resultsList");
const outputDecimals = 3;

verticalHeight.addEventListener("input", inputEvent);
horizontalLength.addEventListener("input", inputEvent);
slopedLength.addEventListener("input", inputEvent);

function inputEvent() {
    errorMessageContainer.classList.add("hidden");
    resultsList.innerHTML = "";

    if (verticalHeight.value === "" && horizontalLength.value !== "" && slopedLength.value !== "") {
        const numberArray = prepInput([horizontalLength, slopedLength]);
        if (errorCheck(numberArray)) calcVerticalHeight(numberArray);

    } else if (verticalHeight.value !== "" && horizontalLength.value === "" && slopedLength.value !== "") {
        const numberArray = prepInput([verticalHeight, slopedLength]);
        if (errorCheck(numberArray)) calcHorizontalLength(numberArray);

    } else if (verticalHeight.value !== "" && horizontalLength.value !== "" && slopedLength.value === "") {
        const numberArray = prepInput([verticalHeight, horizontalLength]);
        if (errorCheck(numberArray)) calcSlopedLength(numberArray);
    } else if (verticalHeight.value !== "" && horizontalLength.value !== "" && slopedLength.value !== "") {
        displayError("Fyll maksimalt to felt.");
    };
};

function errorCheck(numberArray) {
    if (numberArray === "invalidInput") {
        displayError("Bare tall, komma og punktum er tillatt.");
        return false;

    } else if (numberArray === "tooManyPeriods") {
        displayError("Kun ett komma eller punktum er tillatt.");
        return false;
    };

    return true;
};

function calcVerticalHeight(numberArray) {
    const [horizontalNum, slopedNum] = numberArray;

    if (slopedNum <= horizontalNum) {
        displayError("Skrå taklengde må være lengre enn vannrett lengde.");
        return;
    };

    const verticalNum = Math.sqrt(slopedNum**2 - horizontalNum**2);
    calcSlopeAngle(verticalNum, horizontalNum, slopedNum);

};

function calcHorizontalLength(numberArray) {
    const [verticalNum, slopedNum] = numberArray;

    if (slopedNum <= verticalNum) {
        displayError("Skrå taklengde må være lengre enn høyden.");
        return;
    };
    
    const horizontalNum = Math.sqrt(slopedNum**2 - verticalNum**2);
    calcSlopeAngle(verticalNum, horizontalNum, slopedNum);
};

function calcSlopedLength(numberArray) {
    const [verticalNum, horizontalNum] = numberArray;
    const slopedNum = Math.sqrt(verticalNum**2 + horizontalNum**2);

    calcSlopeAngle(verticalNum, horizontalNum, slopedNum);
};

function calcSlopeAngle(verticalNum, horizontalNum, slopedNum) {
    const slopeAngleRad = Math.atan(verticalNum/horizontalNum);
    const slopeAngleDeg = (slopeAngleRad * (180 / Math.PI));
    const mmpermeter = Math.tan(slopeAngleRad)*1000;
    const slopePercent = (verticalNum/horizontalNum)*100;
    const resultArray = [verticalNum, horizontalNum, slopedNum, slopeAngleDeg, mmpermeter, slopePercent];

    prepareOutput(resultArray);
};

function prepareOutput(resultArray) {
    const roundedArray = resultArray.map(result => rounding(result, outputDecimals));
    const [verticalString, horizontalString, slopedString, slopeAngleDeg, mmpermeter, slopePercent] = roundedArray;

    let outputItems = [];
    outputItems.push(`Skrå taklengde: ${slopedString} m`);
    outputItems.push(`Loddrett takhøyde: ${verticalString} m`);
    outputItems.push(`Vannrett avstand til midten: ${horizontalString} m`);
    outputItems.push(`Takvinkel (grader): ${slopeAngleDeg}°`);
    outputItems.push(`Takhelling (mm per meter): ${mmpermeter} mm/m`);
    outputItems.push(`Takhelling (%): ${slopePercent}%`);
    renderOutput(outputItems);
};

function renderOutput(outputItems) {
    resultsList.innerHTML = "";
    outputItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = String(item).replace(".", ",");
        resultsList.appendChild(li);
    });
};

function displayError(message) {
    errorMessageContainer.classList.remove("hidden");
    errorMessageText.textContent = message;
};


/*
import { round2Num } from '../core/calcfunctions.js';

const loddretttakhoydeElement = document.querySelector("#loddretttakhoyde");
const vannretttaklengdeElement = document.querySelector("#vannretttaklengde");
const skrataklengdeElement = document.querySelector("#skrataklengde");

const resultsList = document.querySelector("#resultsList");

loddretttakhoydeElement.addEventListener("input", finnUkjentLengde);
vannretttaklengdeElement.addEventListener("input", finnUkjentLengde);
skrataklengdeElement.addEventListener("input", finnUkjentLengde);

const twodecimals = 2;
const threedecimals = 3;

function finnUkjentLengde() {
    const loddretttakhoydeInput = parseFloat(loddretttakhoydeElement.value.replace(',', '.'));
    const vannretttaklengdeInput = parseFloat(vannretttaklengdeElement.value.replace(',', '.'));
    const skrataklengdeInput = parseFloat(skrataklengdeElement.value.replace(',', '.'));


    if (loddretttakhoydeInput == 0 || vannretttaklengdeInput == 0 || skrataklengdeInput == 0) {
        renderList(["Feltene kan ikke ha verdien null"]);
        return;
    } else if (loddretttakhoydeInput < 0 || vannretttaklengdeInput < 0 || skrataklengdeInput < 0) {
        renderList(["Feltene kan ikke ha negative tall"]);
        return;
    } else if (!isNaN(loddretttakhoydeInput) && !isNaN(vannretttaklengdeInput) && isNaN(skrataklengdeInput)) {
        // FINN LENGDEN AV SKRÅTAKET
        const skrataklengde = Math.sqrt(loddretttakhoydeInput**2 + vannretttaklengdeInput**2);
        const skrataklengdeOutput = round2Num(skrataklengde, threedecimals);
        const loddretttakhoydeOutput = round2Num(loddretttakhoydeInput, threedecimals);
        const vannretttaklengdeOutput = round2Num(vannretttaklengdeInput, threedecimals);
        findSlope(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);

    } else if (!isNaN(loddretttakhoydeInput) && isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        // FINN VANNRETT TAKLENGDE
        if (skrataklengdeInput <= loddretttakhoydeInput) {
            renderList(["Skrå taklengde må være lengre enn høyden"]);
            return;
        }

        const vannretttaklengde = Math.sqrt(skrataklengdeInput**2 - loddretttakhoydeInput**2);
        const vannretttaklengdeOutput = round2Num(vannretttaklengde, threedecimals);
        const skrataklengdeOutput = round2Num(skrataklengdeInput, threedecimals);
        const loddretttakhoydeOutput = round2Num(loddretttakhoydeInput, threedecimals);
        console.log(vannretttaklengde);
        findSlope(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);
 
    } else if (isNaN(loddretttakhoydeInput) && !isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        // FINN LODDRETT TAKHØYDE
        if (skrataklengdeInput <= vannretttaklengdeInput) {
            renderList(["Skrå taklengde må være lengre enn vannrett lengde"]);
            return;
        }

        const loddretttakhoyde = Math.sqrt(skrataklengdeInput**2 - vannretttaklengdeInput**2);
        const loddretttakhoydeOutput = round2Num(loddretttakhoyde, threedecimals);
        const vannretttaklengdeOutput = round2Num(vannretttaklengdeInput, threedecimals);
        const skrataklengdeOutput = round2Num(skrataklengdeInput, threedecimals);
        
        findSlope(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);
 
    } else if (isNaN(loddretttakhoydeInput) && isNaN(vannretttaklengdeInput) && isNaN(skrataklengdeInput)) {
        resultsList.innerHTML = "";
    } else if (!isNaN(loddretttakhoydeInput) && !isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        renderList(["Fyll maksimalt to felt"]);
    } else {
        renderList(["Fyll minst to felt"]);
    };
};

function findSlope(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput) {
    const takvinkel = Math.atan(loddretttakhoydeOutput/vannretttaklengdeOutput);
    const takvinkelOutput = round2Num((takvinkel * (180 / Math.PI)), twodecimals);
    const mmpermeterOutput = round2Num((Math.tan(takvinkel)*1000), twodecimals);
    const helningsprosentOutput = round2Num((loddretttakhoydeOutput/vannretttaklengdeOutput)*100, twodecimals);

    let outputItems = [];
    outputItems.push(`Skrå taklengde: ${skrataklengdeOutput} m`);
    outputItems.push(`Loddrett takhøyde: ${loddretttakhoydeOutput} m`);
    outputItems.push(`Vannrett avstand til midten: ${vannretttaklengdeOutput} m`);
    outputItems.push(`Takvinkel (grader): ${takvinkelOutput}°`);
    outputItems.push(`Takhelling (mm per meter): ${mmpermeterOutput} mm/m`);
    outputItems.push(`Takhelling (%): ${helningsprosentOutput}%`);
    renderList(outputItems);
};

*/