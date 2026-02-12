
var datos = {};
var i = 0;
var indicePregunta = 0;
var puntaje = 0

function extraer(){
    fetch ("https://opentdb.com/api.php?amount=10&category=15&type=multiple" )
    .then(response => response.json())
    .then(data =>{
        datos = data; 
        indicePregunta = 0;
        puntaje = 0;
        Mostrar();});
}

function Mostrar(){
    var tarjeta = document.getElementById("texto-pregunta");
    var cajaOpciones = document.getElementById("contenedor-opciones");
    var contadorTexto = document.getElementById("contador")
    cajaOpciones.innerHTML = "";
    
    var preguntaActual = datos.results[indicePregunta]
    tarjeta.innerHTML = preguntaActual.question;

    contadorTexto.innerText = `Pregunta ${indicePregunta + 1} de ${datos.results.length}`;

    var todasLasOpciones = [...preguntaActual.incorrect_answers, preguntaActual.correct_answer];
    todasLasOpciones.sort(() => Math.random() - 0.5);

    todasLasOpciones.forEach(opcion => {
        var btn = document.createElement("button");
        btn.innerHTML = opcion;
        btn.onclick = () => validarRespuesta(opcion, preguntaActual.correct_answer);
        cajaOpciones.appendChild(btn);
    });
}
function validarRespuesta(seleccionada, correcta) {
    if (seleccionada === correcta) {
        puntaje++;
    }
    indicePregunta++;
    if (indicePregunta < datos.results.length) {
        Mostrar(); 
    } else {
        mostrarResultadoFinal(); 
    }
}
function mostrarResultadoFinal() {
    document.getElementById("contenedor-juego").classList.add("oculto");
    document.getElementById("pantalla-resultado").classList.remove("oculto");
    
    document.getElementById("puntaje-final").innerText = `Puntaje: ${puntaje} / ${datos.results.length}`;
}
function respuestaI(pos, tarjetaO, preguntaA){
    for(let x = 0; x < 3; x++){
            var rIncorrecta = document.createElement("button");
            rIncorrecta.innerHTML = preguntaA.incorrect_answers[x]
            tarjetaO.appendChild(rIncorrecta);
        }
}
    
function reiniciarPagina() {
    location.reload();
}




