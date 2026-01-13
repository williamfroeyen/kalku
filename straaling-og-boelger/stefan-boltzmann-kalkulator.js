const tempinput = document.querySelector("#tempinput");
tempinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '.');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = inputValue**4 * 5.670374419e-8;
        finalresult = outputValue.toExponential(6);
    }
    document.querySelector("#utstroutput").value = finalresult;
});

const utstrinput = document.querySelector("#utstrinput");
utstrinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '.');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = (inputValue / 5.670374419e-8)**0.25;
        finalresult = outputValue.toExponential(6);
    }
    document.querySelector("#tempoutput").value = finalresult;
});