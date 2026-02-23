const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const outputTextElement = document.querySelector("#oneResultText")

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);

function updateResult() {
    let input1Value = parseFloat(input1.value.replace(",", "."));
    let input2Value = parseFloat(input2.value.replace(",", "."));
    let outputValue = "";

    if (!isNaN(input1Value) && !isNaN(input2Value)) {
        outputValue = Math.sqrt(input2Value**2-input1Value**2);
        outputValue = Math.round((outputValue + Number.EPSILON)*10000)/10000;
        outputValue = String(outputValue).replace(".", ",");

        if (outputValue.length > 11) {
            outputTextElement.textContent="For mange tall";
        } if (input1Value > input2Value) {
            outputTextElement.textContent="Kjent katet må være mindre enn hypotenusen";
        } else {
            outputTextElement.textContent=`Ukjent katet: ${outputValue}`;
        }
    } else {
        outputTextElement.textContent="Ukjent katet: ";
    }
};