const input1 = document.querySelector("#input1");
input1.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    let outputValue = "";
    if (inputValue.length > 0 && !isNaN(inputValue)) {
        outputValue = 16 * Math.log(inputValue) + 31;
        outputValue = Math.round(outputValue);
    }
    document.querySelector("#output1").value = outputValue;
});