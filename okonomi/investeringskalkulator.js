let outputValue = "";
let avkastning = 0;
let utenAvkastning = 0;

const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const input3 = document.querySelector("#input3");
const input4 = document.querySelector("#input4");

const outputTextElement = document.querySelector("#oneResultText");
const resultExpTextElement = document.querySelector("#resultsExpText");

input1.addEventListener("input", updateResult);
input2.addEventListener("input", updateResult);
input3.addEventListener("input", updateResult);
input4.addEventListener("input", updateResult);

function updateResult() {
    let startBeloep = parseFloat(input1.value.replace(",", "."));
    let maendeligBidrag = parseFloat(input2.value.replace(",", "."));
    let antallAar = parseFloat(input3.value.replace(",", "."));
    let aarligRente = parseFloat(input4.value.replace(",", "."));
    let aarligRentePF = aarligRente / 100;

    if (!isNaN(startBeloep) && !isNaN(maendeligBidrag) && !isNaN(antallAar) && !isNaN(aarligRente)) {
        outputValue = startBeloep * (1 + aarligRentePF / 12)**(12*antallAar)+maendeligBidrag*(((1 + aarligRentePF / 12)**(12*antallAar)-1) / (aarligRentePF / 12))
        utenAvkastning = startBeloep + maendeligBidrag*12*antallAar;
        avkastning = outputValue - utenAvkastning;
        avkastning = Math.round((avkastning + Number.EPSILON)*1)/1;
        outputValue = Math.round((outputValue + Number.EPSILON)*1)/1;
        outputValueLength = (outputValue + '').replace('.', '').length;

        if (outputValueLength > 12) {
            outputTextElement.textContent="For mange tall";
            resultExpTextElement.textContent="";
        } else if (aarligRente == 0) {
            outputTextElement.textContent=`Verdi: ${utenAvkastning} kr`;
            resultExpTextElement.textContent=`Avkastning: 0 kr. Etter å ha spart ${maendeligBidrag} kr per måned i ${antallAar} år, med en årlig rente på ${aarligRente}% og et startbeløp på 
            ${startBeloep} kr, vil du sitte med ${utenAvkastning} kr etter ${antallAar} år.`
        } else {
            outputTextElement.textContent=`Verdi: ${outputValue} kr`;
            resultExpTextElement.textContent=`Avkastning: ${avkastning} kr. Etter å ha spart ${maendeligBidrag} kr per måned i ${antallAar} år, med en årlig rente på ${aarligRente}% og et startbeløp på 
            ${startBeloep} kr, vil du sitte med ${outputValue} kr etter ${antallAar} år.`
        }
    } else {
        outputTextElement.textContent="Verdi: ";
        resultExpTextElement.textContent="";
    }
};