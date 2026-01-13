const tempinput = document.querySelector("#tempinput");
tempinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '.');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = 2.898e-3 / inputValue;
        finalresult = outputValue.toExponential(6);
    }
    document.querySelector("#intensoutput").value = finalresult;
});

const intensinput = document.querySelector("#intensinput");
intensinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '.');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = 2.898e-3 / inputValue;
        finalresult = outputValue.toExponential(6);
    }
    document.querySelector("#tempoutput").value = finalresult;
});