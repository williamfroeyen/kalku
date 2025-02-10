const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const outputTextElement = document.querySelector("#oneResultText")

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);

function updateResult() {
    let input1Value = parseFloat(input1.value)/100;
    let input2Value = parseFloat(input2.value);
    let outputValue = "";

    if (!isNaN(input1Value) && !isNaN(input2Value)) {
        outputValue = input2Value / (input1Value * input1Value);
        outputValue = Math.round((outputValue + Number.EPSILON)*100)/100;
        outputValueLength = (outputValue + '').replace('.', '').length;

        if (outputValueLength > 12) {
            outputTextElement.textContent="For mange tall";
        } else {
            outputTextElement.textContent=`Resultat: ${outputValue}`;
        }
    } else {
        outputTextElement.textContent="Resultat: ";
    }
};