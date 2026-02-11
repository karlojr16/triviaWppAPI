
var datos = {};

function extraer(){
    fetch ("https://opentdb.com/api.php?amount=20&category=15&type=multiple" )
    .then(response => response.json())
    .then(data => datos = data);
}

function Mostrar(){
    var tarjeta = document.getElementById("principal");

    for (let i = 0; i < datos.results.length; i++){
        var parrafo = document.createElement("p");
        parrafo.innerHTML = datos.results[i].type;

        var pregunta = document.createElement("h1");
        pregunta.innerHTML = datos.results[i].question; 

        tarjeta.appendChild(parrafo);
        tarjeta.appendChild(pregunta);

        var respuestaC = document.createElement("h3");
        respuestaC.innerHTML = datos.results[i].correct_answer;
        tarjeta.appendChild(respuestaC);
        respuestaI(i);
       
    }
function respuestaI(pos){
     for(let i = 0; i < 3; i++){
            var respuestaI = document.createElement("h3");
            respuestaI.innerHTML = datos.results[pos].incorrect_answers[i]
            tarjeta.appendChild(respuestaI);
        }
}
    





}