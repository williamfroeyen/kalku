const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");

inputElement.addEventListener("input", (e) => {
    const inputString = e.target.value.trim();
    const validFormat = /^[0-9]*([.,][0-9]*)?$/.test(inputString);
    let outputString = "";

    if (validFormat && inputString.length > 0) {
        const inputNum = parseFloat(inputString.replace(",", "."));

        if (!isNaN(inputNum)) {
            let calculated = inputNum * 0.295735296;
            calculated = Math.round((calculated + Number.EPSILON)*10000)/10000;
            outputString = String(calculated).replace(".", ",");
        };
    };

    outputElement.value = outputString;
});