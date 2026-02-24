const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");

inputElement.addEventListener("input", (e) => {
    const inputString = e.target.value.trim();
    const validFormat = /^[0-9]*([.,][0-9]*)?$/.test(inputString);
    let outputString = "";

    if (validFormat && inputString.length > 0) {
        const inputNum = parseFloat(inputString.replace(",", "."));

        let calculated = 16 * Math.log(inputNum) + 31;
        calculated = Math.round(calculated);
        outputString = String(calculated).replace(".", ",");
    };

    outputElement.value = outputString;
});