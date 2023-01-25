const screenOperation = document.getElementById("screen_operation")
const screenResult = document.getElementById("screen_result")
const buttons = document.getElementById("buttons");

let completedOperation = false;

screenOperation.innerHTML = "0"
screenResult.innerHTML = "0"



const lastOperationArray= () => {

    let lastOperation = screenOperation.innerHTML.split(/[)(+*/-]/g).filter(Boolean)

    console.log(lastOperation)
    return lastOperation;
}


const checkLastValue = () => {
    return screenOperation.innerHTML.slice(-1)
}

const checkLastNum = () => {
   
    let lastOpSign = screenOperation.innerHTML.split(/[)(+*/]/g).filter(Boolean); 
    let lastNum = parseFloat(lastOpSign.slice(-1));

    console.log(lastNum)
    return lastNum;
}



const writeOperation = (text) => {

    //Si TEXT es [1-9] se borra el 0 inicial, excepto si es "." => 0.ddd
    if (screenOperation.innerHTML == "0" && text !== "."){
        screenOperation.innerHTML = ""
    }
    
    //Despues de presionar "=" => Si es SIGNO la operación pasa arriba.
    if (completedOperation === true && isNaN(text)){
        screenOperation.innerHTML = screenResult.innerHTML;
        completedOperation = false;
    }

    //Despues de presionar "=" => Si es NUM la operación se reinicia.
    if (completedOperation === true && !isNaN(text)){
        screenOperation.innerHTML = "";
        screenResult.innerHTML = "0";
        completedOperation = false;
    }
    
    //Si se introducen 2 SIGNOS seguidos se borra.
    if (isNaN(checkLastValue()) && isNaN(text) && checkLastValue() !== ")") {
        screenOperation.innerHTML = screenOperation.innerHTML.slice(0,-1)
    }

    //Control de longitud de la OPERACION (max 30)
    if (screenOperation.innerHTML.length < 20){
        screenOperation.style.fontSize = "1.5em";
        screenOperation.style.marginBottom = "0";
        screenOperation.innerHTML += text;

    } else if (screenOperation.innerHTML.length <= 30){
        screenOperation.style.fontSize = "1em";
        screenOperation.style.marginBottom = "0.65em";
        screenOperation.innerHTML += text;
    };

    //Si detecta un "-" antes de un NUM se aplican paréntesis => +(-NUM)
    if (screenOperation.innerHTML.match(/\-\d+(\.\d+)?$/g)){
        let match = screenOperation.innerHTML.match(/\-\d+(\.\d+)?$/g)
        screenOperation.innerHTML = screenOperation.innerHTML.replace(/\-\d+(\.\d+)?$/g, `+(${match})`)
    }

}

const writeResult = () => {

    if(isNaN(checkLastValue()) && checkLastValue() !== ")"){
        screenOperation.innerHTML = screenOperation.innerHTML.slice(0,screenOperation.innerHTML.length-1)
    }

    screenResult.innerHTML = eval(screenOperation.innerHTML)
    completedOperation = true;

    if (screenResult.innerHTML.length > 8 && !screenResult.innerHTML.includes(".")){
        screenResult.style.fontSize = "2em";
        screenResult.style.marginTop = "1em";
        

    } else if (screenResult.innerHTML.length > 8 && screenResult.innerHTML.includes(".")){

        screenResult.innerHTML = parseFloat(screenResult.innerHTML).toFixed(4);
        screenResult.style.fontSize = "2em";
        screenResult.style.marginTop = "1em";
        screenResult.innerHTML = Number.parseInt(screenResult.innerHTML).toExponential(4);

    } else if (screenResult.innerHTML.length > 9){

        // screenResult.innerHTML = parseFloat(screenResult.innerHTML).toFixed(4);
        screenResult.style.fontSize = "2em";
        screenResult.style.marginTop = "1em";
        screenResult.innerHTML = Number.parseFloat(screenResult.innerHTML).toExponential(10);
    
    } else {
        screenResult.style.fontSize = "4em";
        screenResult.style.marginTop = "0";
    }

    if (screenResult.innerHTML.includes(".") && screenResult.innerHTML.slice(-1) == "0"){
        screenResult.innerHTML = screenResult.innerHTML.slice(0,-1)
    }

}


const applyPercentage = () => {

    let lastNum = checkLastNum()
    
    if (Number.isInteger(lastNum) && lastNum > 0){
        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[\d]+$/g, `${lastNum / 100}`);
        console.log("entero+")

    } else if (!Number.isInteger(lastNum) && lastNum > 0) {
        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[.\d]+$/g, `${lastNum * 100}`);
        console.log("decimal+")

    }else if (Number.isInteger(lastNum) && lastNum < 0){
        console.log("entero-")

        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[()-\d]+$/g, `(${lastNum / 100})`);

    }else if (!Number.isInteger(lastNum) && lastNum < 0){
        console.log("decimal-")

        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[.()-\d]+$/g, `(${lastNum * 100})`);

    } else {
        return;
    }
}

const changeSign = () => {

    let lastNum = checkLastNum()

    if (Number.isInteger(lastNum) && lastNum > 0){
        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[\d]+$/g, `(${lastNum * -1})`);
        console.log("entero+")

    } else if (!Number.isInteger(lastNum) && lastNum > 0) {
        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[.\d]+$/g, `(${lastNum * -1})`);
        console.log("decimal+")

    }else if (Number.isInteger(lastNum) && lastNum < 0){
        console.log("entero-")

        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[()-\d]+$/g, `${lastNum * -1}`);

    }else if (!Number.isInteger(lastNum) && lastNum < 0){
        console.log("decimal-")

        screenOperation.innerHTML = screenOperation.innerHTML.replace(/[.()-\d]+$/g, `${lastNum * -1}`);

    } else {
        return;
    };
};


const resetScreen = () => {
    screenOperation.innerHTML = "0"
    screenResult.innerHTML = "0"
}

buttons.addEventListener("click", (e) =>{
    if (e.target.value !== "" && e.target.value !== undefined){
        
        switch (e.target.value){
            case "=": writeResult();break;
            case "C": resetScreen();break;
            case "+/-": changeSign();break;
            case "%": applyPercentage();break;
            case ",": if (Number.isInteger(checkLastNum()) && checkLastValue() !== ")"){writeOperation(".")};break;

            default: if (checkLastValue() == ")") {
                    if (isNaN(e.target.value)){writeOperation(e.target.value)};
                } else {
                    checkLastNum()
                    writeOperation(e.target.value);
                };
            break;
        }
    }
})

