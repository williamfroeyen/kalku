const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const outputTextElement = document.querySelector("#oneResultText")

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);

function updateResult() {
    let input1Value = parseFloat(input1.value);
    let input2Value = parseFloat(input2.value);
    let outputValue = "";

    if (!isNaN(input1Value) && !isNaN(input2Value)) {
        outputValue = Math.sqrt(input2Value**2-input1Value**2);
        outputValue = Math.round((outputValue + Number.EPSILON)*10000)/10000;
        outputValueLength = (outputValue + '').replace('.', '').length;
        if (outputValueLength > 12) {
            outputTextElement.textContent="For mange tall";
        } else if (isNaN(outputValue)) {
            outputTextElement.textContent="Katet: ";
        } else {
            outputTextElement.textContent=`Katet: ${outputValue}`;
        }
    } else {
        outputTextElement.textContent="Katet: ";
    }
};