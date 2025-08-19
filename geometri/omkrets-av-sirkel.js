const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = 2 * Math.PI * inputValue;
        outputValue = Math.round((outputValue + Number.EPSILON)*10000)/10000;
    }
    document.querySelector("#output1").value = outputValue;
});