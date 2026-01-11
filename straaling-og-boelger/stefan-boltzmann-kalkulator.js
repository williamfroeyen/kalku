const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = parseFloat(e.target.value);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = inputValue**4 * 5.670374419e-8;
        finalresult = outputValue.toExponential(6);
    }
    document.querySelector("#output1").value = finalresult;
});