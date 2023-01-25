const bingoCard = [
    { number: 3, matched: false },
    { number: 4, matched: false },
    { number: 5, matched: false },
    { number: 13, matched: false },
    { number: 45, matched: false },
];

//Generador de números del 1 al 99 - se repiten.
const numberGenerator = () => {
    console.clear();

    generatedNumber = Math.floor((Math.random()*99)+1);
    console.log("Last number is " + generatedNumber);
    return generatedNumber;
};

//Seguir jugando - Pregunta, genera un nº y lo guarda.

let usedNumbers = [];

const askNewTurn = () => {
    
    if (usedNumbers.length === 0){
        newTurn = confirm("¿Comenzar a JUGAR?");
    } else {
        newTurn = confirm("Seguir jugando");
    };

    usedNumbers.push(numberGenerator());
    console.log(usedNumbers);
    return newTurn;
};

//Comprueba si ha salido el numero en bingoCard y lo valida.
const matchNumber = () => {
    bingoCard.forEach((element)=>{
        if (usedNumbers.includes(element.number)){
            element.matched = true;
        };
    });
    console.table(bingoCard);
};

function bingo() {
    do {
        askNewTurn();
        matchNumber();
    } while (newTurn === true);
};

bingo(); //Output generatedNumber, usedNumbers[], bingoCard table.