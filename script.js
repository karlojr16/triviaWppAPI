
var datos = {};
var i = 0;

function extraer(){
    fetch ("https://opentdb.com/api.php?amount=20&category=15&type=multiple" )
    .then(response => response.json())
    .then(data =>{datos = data; Mostrar();});
}

function Mostrar(){
        
        let correcta = false;
        var tarjeta = document.getElementById("texto-pregunta");
        var cajaOpciones = document.getElementById("contenedor-opciones");
        

        cajaOpciones.innerHTML = "";

        var preguntaActual = datos.results[i]

        tarjeta.innerHTML = preguntaActual.question;

        var btnCorrecto = document.createElement("button");
        btnCorrecto.innerHTML = preguntaActual.correct_answer;
        cajaOpciones.appendChild(btnCorrecto);
        btnCorrecto.addEventListener("click", function(event){
            correcta = true;
            if(correcta){
            i++
            Mostrar();
        }
        });
        respuestaI(i, cajaOpciones, preguntaActual);


}
function respuestaI(pos, tarjetaO, preguntaA){
    for(let x = 0; x < 3; x++){
            var rIncorrecta = document.createElement("button");
            rIncorrecta.innerHTML = preguntaA.incorrect_answers[x]
            tarjetaO.appendChild(rIncorrecta);
        }
}
    





