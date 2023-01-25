const questions = [
  {
    letter: "a",
    answer: "abducir",
    status: 0,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    question: "CON LA C. Niño, crío, bebé",
  },
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    question: "CON LA I. Templo cristiano",
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    question: "CON LA L. Hombre lobo",
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
  },
  { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
  },
];


const pointsTable = [];
let passedQuestions = [];
let answer = "";
let user = "User";
let pointsCounter = 0;
let time = 800;
let index = 0;
let stay = true;

const formInput = document.getElementById("form").addEventListener("submit", (e)=>{e.preventDefault();sendAnswer()});
const btnPlay = document.getElementById("play").addEventListener("click", pasapalabra)
const btnPass = document.getElementById("pass").addEventListener("click",(e)=>{e.preventDefault();passQuestion()});



document.getElementById("form").style.display = "none";
// document.getElementById('form').classList.add('.form_container-show');

function startGame() {

  document.getElementById("play").style.display = "none";
  document.getElementById("form").style.display = "flex";


  showQuestion(index);

  const timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerHTML = time;
      if(time == 0){clearInterval(timer); endGame();};
  },1000);
};




let round = false;

function checkStatus() {
  let allQuestionsAnswered = questions.every(function(element){return element.status === 1 || element.status === 2});

  console.log(allQuestionsAnswered)

  questions.forEach((element) => {
    if (element.status === 1){
      letterIndex = questions.indexOf(element)
      document.querySelector(`.letter${letterIndex}`).style.background = "radial-gradient(circle, #24d900e8, #008d07)";
    } else if (element.status === 2){
      letterIndex = questions.indexOf(element)
      document.querySelector(`.letter${letterIndex}`).style.background = "radial-gradient(circle, #d90000e7, #8d0000)";
    } else if (element.status === 3){
      letterIndex = questions.indexOf(element)
      document.querySelector(`.letter${letterIndex}`).style.background = "radial-gradient(circle, #d9d500, #8d8b00";
    }
  })

  if (allQuestionsAnswered === true){
    endGame();

  } else if (index === 26 && passedQuestions.length === 0){
    endGame();

  } else if (index === 26 && passedQuestions.length > 0){
    round = true;
    index = 0;
    
    console.log(round)
    return round, index;

  } else {
    index++
    return index;
  }
  console.log(index)
}



function sendAnswer() {

  answer = textInput.value;
  getAnswer(answer);

  checkStatus();
  textInput.value = "";

  showQuestion(index);
};


function showQuestion(index) {
  
  console.log(passedQuestions)

  if (round === true && passedQuestions.length < index){
    endGame();

  } else if (round === true && passedQuestions.length > index){
    
    currentQuestion.innerHTML = questions[passedQuestions[index]].question;
    
  } else if (round === false){

    currentQuestion.innerHTML = questions[index].question;

  } else {
    endGame();
  }
  
};

function passQuestion() {
  
  answer = "pasapalabra"
  getAnswer(answer);

  checkStatus();
  textInput.value = "";

  showQuestion(index);
}
  


function getAnswer(answer) {
  
  answer = answer.toLowerCase();
  console.log(answer)

  if (answer === null){
    answer = "end"
  };

  if (answer === questions[index].answer){
    questions[index].status = 1;
    pointsCounter++;
    Qstatus.innerHTML = `CORRECT, you have ${pointsCounter} points!`;
    return;

  } else if (answer === "pasapalabra" && round === false){
    questions[index].status = 3;
    passedQuestions.push(index);
    Qstatus.innerHTML = `PASAPALABRA`;
    return;

  } else if (answer === "pasapalabra" && round === true){
    questions[passedQuestions[index]].status = 3;
    passedQuestions.push(passedQuestions[index]);
    Qstatus.innerHTML = `PASAPALABRA`;
    return;

  } else if (answer === "end"){
    Qstatus.innerHTML = `JUEGO INTERRUMPIDO`;
    return endGame();

  } else {
    questions[index].status = 2;
    Qstatus.innerHTML = `INCORRECT! :(`;
    return;
  };
};


const getUser = () =>{
  alert("Bienvenido al PASAPALABRA de ISDI Coders");
  user = prompt("Introduce tu nombre para guardar tu puntuación");
  alert("Preparados...listos...YA!");
};


const endGame = () =>{
  
  alert("El juego ha finalizado");
  stay = confirm("¿Quieres volver a jugar?");

  if (stay === true){

    pointsCounter = 0;
    passedQuestions = [];
    stay = true;

    questions.forEach((element) => {
      element.status = 0;
    })

    pasapalabra();
    return;

  } else {
    alert("Hasta pronto");
    location.reload();
    return;
  };
};


const showPoints = () =>{
  if (answer === "end"){
    return;
  
  } else {
    pointsTable.push({player: user, points: pointsCounter})

    pointsTable.sort(function(a,b){
      return b.points - a.points;
    });
  
    console.log(`JUGADOR: ${user}\nACIERTOS: ${pointsCounter} FALLOS: ${27 - pointsCounter}`);

    console.table(pointsTable);
    endGame();
  };
};

function onClickAnimation() {
  document.getElementById('circle').classList.add('circle-animation');

}



function pasapalabra (){
  // getUser();

  onClickAnimation()

  startGame();

  // showPoints();
};
