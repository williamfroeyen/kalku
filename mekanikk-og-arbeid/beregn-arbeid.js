let outputValue = "";

const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const input3 = document.querySelector("#input3");

const outputTextElement = document.querySelector("#oneResultText");
const resultExpTextElement = document.querySelector("#resultsExpText");

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);
input3.addEventListener("input", updateResult);

function updateResult() {
    let input1Value = parseFloat(input1.value);
    let input2Value  = parseFloat(input2.value);
    let input3Value  = parseFloat(input3.value);

    if (!isNaN(input1Value) && !isNaN(input2Value) && !isNaN(input3Value)) {
        outputValue = input1Value * input2Value * Math.cos(input3Value * Math.PI / 180);;
        outputValue = Math.round((outputValue + Number.EPSILON)*1000)/1000;
        outputValueLength = (outputValue + '').replace('.', '').length;

        if (outputValueLength > 10) {
            outputTextElement.textContent="For mange tall";
        } else {
            outputTextElement.textContent=`Totalt: ${outputValue} N`;
        }
    } else {
        outputTextElement.textContent="Totalt: ";
    }
};