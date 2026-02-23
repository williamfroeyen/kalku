const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const outputTextElement = document.querySelector("#oneResultText");

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);

function updateResult() {
    let input1Value = parseFloat(input1.value.replace(",", "."))/100;
    let input2Value = parseFloat(input2.value.replace(",", "."));
    let outputValue = "";

    if (!isNaN(input1Value) && !isNaN(input2Value)) {
        outputValue = input2Value / (input1Value * input1Value);
        outputValue = Math.round((outputValue + Number.EPSILON)*100)/100;
        outputValue = String(outputValue).replace(".", ",");

        if (outputValue.length > 12) {
            outputTextElement.textContent="For mange tall";
        } else {
            outputTextElement.textContent=`BMI: ${outputValue}`;
        }
    } else {
        outputTextElement.textContent="BMI: ";
    }
};