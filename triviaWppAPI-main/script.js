let preguntas = [];
let indiceActual = 0;
let puntaje = 0;

const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", iniciarJuego);
nextBtn.addEventListener("click", siguientePregunta);
restartBtn.addEventListener("click", reiniciarJuego);

function iniciarJuego() {
    startBtn.classList.add("hidden"); //  desaparece botón empezar
    game.classList.remove("hidden");
    fetchPreguntas();
}

function fetchPreguntas() {
    fetch("https://opentdb.com/api.php?amount=10&category=15&type=multiple")
        .then(res => res.json())
        .then(data => {
            preguntas = data.results;
            mostrarPregunta();
        });
}

function mostrarPregunta() {
    limpiarRespuestas();
    nextBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");

    let preguntaActual = preguntas[indiceActual];
    questionElement.innerHTML = preguntaActual.question;

    let respuestas = [...preguntaActual.incorrect_answers];
    respuestas.push(preguntaActual.correct_answer);
    respuestas.sort(() => Math.random() - 0.5);

    respuestas.forEach(respuesta => {
        const button = document.createElement("button");
        button.innerHTML = respuesta;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => seleccionarRespuesta(button, preguntaActual.correct_answer));
        answersElement.appendChild(button);
    });

    scoreElement.innerHTML = `Pregunta ${indiceActual + 1} de ${preguntas.length} | Puntaje: ${puntaje}`;
}

function limpiarRespuestas() {
    answersElement.innerHTML = "";
}

function seleccionarRespuesta(button, correcta) {
    const botones = document.querySelectorAll(".answer-btn");

    botones.forEach(btn => {
        btn.disabled = true;
        if (btn.innerHTML === correcta) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    });

    if (button.innerHTML === correcta) {
        puntaje++;
    }

    nextBtn.classList.remove("hidden");
}

function siguientePregunta() {
    indiceActual++;
    if (indiceActual < preguntas.length) {
        mostrarPregunta();
    } else {
        finalizarJuego();
    }
}

function finalizarJuego() {
    questionElement.innerHTML = " Juego terminado";
    answersElement.innerHTML = "";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden"); //  aparece reiniciar
    scoreElement.innerHTML = `Puntaje final: ${puntaje} / ${preguntas.length}`;
}

function reiniciarJuego() {
    indiceActual = 0;
    puntaje = 0;
    restartBtn.classList.add("hidden");
    fetchPreguntas();
}
