
var datos = {};

function extraer(){
    fetch ("https://opentdb.com/api.php?amount=20&category=15&type=multiple" )
    .then(response => response.json())
    .then(data =>{datos = data; Mostrar();});
}

function Mostrar(){
    var tarjeta = document.getElementById("texto-pregunta");
    var cajaOpciones = document.getElementById("contenedor-opciones");

    cajaOpciones.innerHTML = "";

    var preguntaActual = datos.results[0]

    tarjeta.innerHTML = preguntaActual.question;

    var btnCorrecto = document.createElement("button");
    btnCorrecto.innerHTML = preguntaActual.correct_answer;
    cajaOpciones.appendChild(btnCorrecto);

    respuestaI(0, cajaOpciones);
}
function respuestaI(pos, tarjeta){
    for(let i = 0; i < 3; i++){
            var respuestaI = document.createElement("button");
            respuestaI.innerHTML = datos.results[pos].incorrect_answers[i]
            tarjeta.appendChild(respuestaI);
        }
}
    





