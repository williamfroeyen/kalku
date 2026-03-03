let outputItems = [];
let boelgefartOutput;
let frekvensOutput;
let boelgelengdeOutput;
let periodeOutput;
let fotonenergi;
let straalingstype;
let planckskonstant = 6.62607e-34;

const frekvensInputElement = document.querySelector("#frekvensInputElement");
const periodeInputElement = document.querySelector("#periodeInputElement");
const boelgeLengdeInputElement = document.querySelector("#boelgelengdeInputElement");
const boelgeFartInputElement = document.querySelector("#boelgefartInputElement");
const elektromagnetiskValg = document.querySelector("#boelgetypeRadioElement1");
const mekaniskValg = document.querySelector("#boelgetypeRadioElement2");

const resultsList = document.querySelector("#resultsList");

frekvensInputElement.addEventListener("input", updateResult);
periodeInputElement.addEventListener("input", updateResult);
boelgeLengdeInputElement.addEventListener("input", updateResult);
boelgeFartInputElement.addEventListener("input", updateResult);
elektromagnetiskValg.addEventListener("input", updateResult);
mekaniskValg.addEventListener("input", updateResult);

function updateResult() {
    frekvensOutput = periodeOutput = boelgelengdeOutput = boelgefartOutput = fotonenergi = undefined;
    outputItems = [];
    
    const normalizedfrekvensInputElement = frekvensInputElement.value.replace(',', '.');
    const normalizedperiodeInputElement = periodeInputElement.value.replace(',', '.');
    const normalizedboelgeLengdeInputElement = boelgeLengdeInputElement.value.replace(',', '.');
    const normalizedboelgeFartInputElement = boelgeFartInputElement.value.replace(',', '.');

    let frekvensInput = parseFloat(normalizedfrekvensInputElement);
    let periodeInput = parseFloat(normalizedperiodeInputElement);
    let boelgelengdeInput = parseFloat(normalizedboelgeLengdeInputElement);
    let boelgefartInput = parseFloat(normalizedboelgeFartInputElement);

    if (isConflict(frekvensInput, periodeInput, boelgelengdeInput, boelgefartInput)) {
        return;
    };

    // PERIODE OG FREKVENS
    if (!isNaN(frekvensInput) && isNaN(periodeInput) && isNaN(boelgelengdeInput) && isNaN(boelgefartInput)) {
            periodeOutput = 1 / frekvensInput;
            frekvensOutput = frekvensInput;
            prepareResult("ingenfeil", "barefrekvensperiode");
    } else if (isNaN(frekvensInput) && !isNaN(periodeInput)) {
        if (isNaN(boelgelengdeInput) && isNaN(boelgefartInput)) {
            frekvensOutput = 1 / periodeInput;
            periodeOutput = periodeInput;
            prepareResult("ingenfeil", "barefrekvensperiode");
        } else { // GJØR OM PERIODE TIL FREKVENS
            frekvensOutput = 1 / periodeInput;
            frekvensInput = frekvensOutput;
        } 
    };

    // BØLGEFART, FREKVENS OG BØLGELENGDE
    if ((!isNaN(frekvensInput) || !isNaN(periodeInput)) && !isNaN(boelgelengdeInput)) {
        boelgefartOutput = frekvensInput * boelgelengdeInput;
        frekvensOutput = frekvensInput;
        boelgelengdeOutput = boelgelengdeInput;
        periodeOutput = 1 / frekvensOutput;
            prepareResult("ingenfeil", "toinputs");
    } else if (!isNaN(boelgefartInput) && !isNaN(boelgelengdeInput)) {
        frekvensOutput = boelgefartInput / boelgelengdeInput;
        boelgefartOutput = boelgefartInput;
        boelgelengdeOutput = boelgelengdeInput;
        periodeOutput = 1 / frekvensOutput;
            prepareResult("ingenfeil", "toinputs");
    } else if (!isNaN(boelgefartInput) && (!isNaN(frekvensInput) || !isNaN(periodeInput))) {
        boelgelengdeOutput = boelgefartInput / frekvensInput;
        boelgefartOutput = boelgefartInput;
        frekvensOutput = frekvensInput;
        periodeOutput = 1 / frekvensOutput;
            prepareResult("ingenfeil", "toinputs");
    };

    if (isNaN(frekvensInput) && isNaN(periodeInput) && isNaN(boelgelengdeInput) && isNaN(boelgefartInput)) {
        resultsList.innerHTML = "";
    } else if (isNaN(frekvensInput) && isNaN(periodeInput) && !isNaN(boelgelengdeInput) && isNaN(boelgefartInput)) {
        resultsList.innerHTML = "";
    } else if (isNaN(frekvensInput) && isNaN(periodeInput) && isNaN(boelgelengdeInput) && !isNaN(boelgefartInput)) {
        resultsList.innerHTML = "";
    };
};

function isConflict(frekvensInput, periodeInput, boelgelengdeInput, boelgefartInput) {
    if (!isNaN(frekvensInput) && !isNaN(periodeInput)) {
        prepareResult("frekvensperiodekonflikt");
        return true;
    } else if ((!isNaN(frekvensInput) || !isNaN(periodeInput))&& !isNaN(boelgelengdeInput) && !isNaN(boelgefartInput)) {
        prepareResult("treinputskonflikt");
        return true;
    } else {
        return false;
    }
}

function prepareResult(feil, inputtype) {
    if (elektromagnetiskValg.checked) {
        fotonenergi = planckskonstant * frekvensOutput;
            if (frekvensOutput >= 3e19) {
                straalingstype = "Gammastråling";
            } else if (frekvensOutput >= 3e16) {
                straalingstype = "Røntgenstråling";
            } else if (frekvensOutput >= 7.5e14) {
                straalingstype = "Ultrafiolett stråling";
            } else if (frekvensOutput >= 4e14) {
                straalingstype = "Synlig lys";
            } else if (frekvensOutput >= 3e11) {
                straalingstype = "Infrarød";
            } else if (frekvensOutput >= 3e8) {
                straalingstype = "Mikrobølger";
            } else {
                straalingstype = "Radiobølger";
        }
    };

    // SJEKK FOR FEIL
    if (feil === "frekvensperiodekonflikt") {
        outputItems = ["Feil:", "Fyll enten periode, eller frekvens"];
    } else if (feil === "treinputskonflikt") {
        outputItems = ["Feil:", "Fyll maksimalt to felt"];
    } else if (feil === "ingenfeil") {
        // SJEKK OM TO INPUTS ELLER BARE FREKVENS OG PERIODE
        if (inputtype === "toinputs") {
            // SJEKK OK ELEKTROMAGNETISK STRÅLING ELLER IKKE
            if (elektromagnetiskValg.checked) {
                outputItems = [`Frekvens: ${frekvensOutput} Hz`, `Periode: ${periodeOutput} s`, `Bølgelengde: ${boelgelengdeOutput} m`, `Bølgefart: ${boelgefartOutput} m/s`,
                    `Fotonenergi: ${fotonenergi} J` , `Strålingstype: ${straalingstype}`
                ];
            } else if (mekaniskValg.checked) {
                outputItems = [`Frekvens: ${frekvensOutput} Hz`, `Periode: ${periodeOutput} s`, `Bølgelengde: ${boelgelengdeOutput} m`, `Bølgefart: ${boelgefartOutput} m/s`];
            }
        } else if (inputtype === "barefrekvensperiode") {
            // SJEKK OK ELEKTROMAGNETISK STRÅLING ELLER IKKE
            if (elektromagnetiskValg.checked) {
                outputItems = [`Frekvens: ${frekvensOutput} Hz`, `Periode: ${periodeOutput} s`, `Fotonenergi: ${fotonenergi} J`, `Strålingstype: ${straalingstype}`];
            } else if (mekaniskValg.checked) {
                outputItems = [`Frekvens: ${frekvensOutput} Hz`, `Periode: ${periodeOutput} s`];
            }
        }
    }
    renderList(outputItems);
};

function renderList(outputItems) {
    resultsList.innerHTML = "";
    outputItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = String(item).replace(".", ",");
        resultsList.appendChild(li);
    });
};