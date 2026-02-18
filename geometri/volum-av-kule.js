const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = (4/3) * Math.PI * inputValue**3;
        outputValue = Math.round((outputValue + Number.EPSILON)*10000)/10000;
    };
    document.querySelector("#output1").value = outputValue;
});