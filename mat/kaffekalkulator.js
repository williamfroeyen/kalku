const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    let outputValue2 = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = inputValue * 6;
        outputValue2 = outputValue / 10; 
        outputValue = Math.round((outputValue + Number.EPSILON)*10000)/10000;
        outputValue2 = Math.round((outputValue2 + Number.EPSILON)*10)/10;
    }
    document.querySelector("#output1").value = outputValue;
    document.querySelector("#output2").value = outputValue2;
});