const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = (5 / 9) * (parseFloat(inputValue) - 32);
        outputValue = Math.round((outputValue + Number.EPSILON)*1000)/1000;
    }
    document.querySelector("#output1").value = outputValue;
});