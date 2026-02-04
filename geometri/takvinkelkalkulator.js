const loddretttakhoydeElement = document.querySelector("#loddretttakhoyde");
const vannretttaklengdeElement = document.querySelector("#vannretttaklengde");
const skrataklengdeElement = document.querySelector("#skrataklengde");

const resultsList = document.querySelector("#resultsList");

loddretttakhoydeElement.addEventListener("input", finnUkjentLengde);
vannretttaklengdeElement.addEventListener("input", finnUkjentLengde);
skrataklengdeElement.addEventListener("input", finnUkjentLengde);

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
        const skrataklengdeOutput = avrunding(skrataklengde, 1000);
        const loddretttakhoydeOutput = avrunding(loddretttakhoydeInput, 1000);
        const vannretttaklengdeOutput = avrunding(vannretttaklengdeInput, 1000);
        finnHelning(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);

    } else if (!isNaN(loddretttakhoydeInput) && isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        // FINN VANNRETT TAKLENGDE
        if (skrataklengdeInput <= loddretttakhoydeInput) {
            renderList(["Skrå taklengde må være lengre enn høyden"]);
            return;
        }

        const vannretttaklengde = Math.sqrt(skrataklengdeInput**2 - loddretttakhoydeInput**2);
        const vannretttaklengdeOutput = avrunding(vannretttaklengde, 1000);
        const skrataklengdeOutput = avrunding(skrataklengdeInput, 1000);
        const loddretttakhoydeOutput = avrunding(loddretttakhoydeInput, 1000);
        finnHelning(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);
 
    } else if (isNaN(loddretttakhoydeInput) && !isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        // FINN LODDRETT TAKHØYDE
        if (skrataklengdeInput <= vannretttaklengdeInput) {
            renderList(["Skrå taklengde må være lengre enn vannrett lengde"]);
            return;
        }

        const loddretttakhoyde = Math.sqrt(skrataklengdeInput**2 - vannretttaklengdeInput**2);
        const loddretttakhoydeOutput = avrunding(loddretttakhoyde, 1000);
        const vannretttaklengdeOutput = avrunding(vannretttaklengdeInput, 1000);
        const skrataklengdeOutput = avrunding(skrataklengdeInput, 1000);
        
        finnHelning(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput);
 
    } else if (isNaN(loddretttakhoydeInput) && isNaN(vannretttaklengdeInput) && isNaN(skrataklengdeInput)) {
        resultsList.innerHTML = "";
    } else if (!isNaN(loddretttakhoydeInput) && !isNaN(vannretttaklengdeInput) && !isNaN(skrataklengdeInput)) {
        renderList(["Fyll maksimalt to felt"]);
    } else {
        renderList(["Fyll minst to felt"]);
    };
};

function avrunding(variabel, noyaktighet) {
    return Math.round((variabel + Number.EPSILON)*noyaktighet)/noyaktighet;
};

function finnHelning(loddretttakhoydeOutput, vannretttaklengdeOutput, skrataklengdeOutput) {
    const takvinkel = Math.atan(loddretttakhoydeOutput/vannretttaklengdeOutput);
    const takvinkelOutput = avrunding((takvinkel * (180 / Math.PI)), 100);
    const mmpermeterOutput = avrunding((Math.tan(takvinkel)*1000), 100);
    const helningsprosentOutput = avrunding((loddretttakhoydeOutput/vannretttaklengdeOutput)*100, 100);

    let outputItems = [];
    outputItems.push(`Skrå taklengde: ${skrataklengdeOutput} m`);
    outputItems.push(`Loddrett takhøyde: ${loddretttakhoydeOutput} m`);
    outputItems.push(`Vannrett avstand til midten: ${vannretttaklengdeOutput} m`);
    outputItems.push(`Takvinkel (grader): ${takvinkelOutput}°`);
    outputItems.push(`Takhelling (mm per meter): ${mmpermeterOutput} mm/m`);
    outputItems.push(`Takhelling (%): ${helningsprosentOutput}%`);
    renderList(outputItems);
};

function renderList(outputItems) {
    resultsList.innerHTML = "";
    outputItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        resultsList.appendChild(li);
    });
};