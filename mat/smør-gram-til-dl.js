const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = inputValue / 85;
        outputValue = Math.round((outputValue + Number.EPSILON)*100)/100;
    }
    document.querySelector("#output1").value = outputValue;
});