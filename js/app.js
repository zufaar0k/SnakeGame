"use scrict";

const numPuntuacion = document.querySelector(".puntuacion");
const maxNumPuntuacion = document.querySelector(".max-puntuacion");

//  *        Variables iniciales
let lenguaje = localStorage.getItem("lenguaje") || "es_ES";
localStorage.setItem("lenguaje", lenguaje);
const columnas = 20;
const filas = 20;
let puntuacion = 1;
let puntuacionMax = localStorage.getItem("max-puntuacion") || 0;
puntuacionMax = (puntuacion >= puntuacionMax) ? puntuacion : puntuacionMax;
localStorage.setItem("max-puntuacion", puntuacionMax);
numPuntuacion.innerHTML = `${texto[lenguaje]["puntuacion"]}: ${puntuacion}`;
maxNumPuntuacion.innerHTML = `${texto[lenguaje]["max_puntuacion"]}: ${puntuacionMax}`;
const botones = document.querySelectorAll('.botones button');
botones[0].innerText = texto[lenguaje]["boton_reiniciar"];
botones[1].innerText = texto[lenguaje]["boton_atras"];

// Matriz de los ticks restantes para estar mostrando un bloque
let matrizTicksRestantesBloques = [ ];
for(let i = 0; i < filas; ++i) {
    matrizTicksRestantesBloques[i] = [ ];
    for(let j = 0; j < columnas; ++j) {
        matrizTicksRestantesBloques[i][j] = 0;
    }
}


// Posicion inicial de la cabeza
let cabezaX = 1;
let cabezaY = 1;
actualizarCanvas();

// Posicion inicial de la comida
let frutaX = 12;
let frutaY = 1;
pintarFruta();

// Dirección inicial
let direccion = [0,0]; // [0,-1] arriba, [0,1] abajo, [-1,0] izquierda, [1,0] derecha
let intencionDireccion = [1,0];

let ticks;
let velocidadTicks = 150;

iniciarTicks(velocidadTicks);


//  *         Eventos

// Teclado
document.addEventListener("keydown", 
    (event)=> {
        switch(event.key){
            case "ArrowUp":
                event.preventDefault();
                intencionDireccion = [0,-1];
                break;
            case "ArrowDown":
                event.preventDefault();
                intencionDireccion = [0,1];
                break;
            case "ArrowLeft":
                event.preventDefault();
                intencionDireccion = [-1,0];
                break;
            case "ArrowRight":
                event.preventDefault();
                intencionDireccion = [1,0];
                break;
            default:
                break;
        }
});

botones[0].addEventListener("click", ()=>{
    if(!botones[0].getAttribute("disabled")){
        reiniciar();
    }
})


//  *        Funciones

function cambiarDireccion(nuevaDir){
    if(!direccion[0]){
        if(!nuevaDir[1]){
            direccion = nuevaDir;
        }
    }
    else if (!direccion[1]){
        if(!nuevaDir[0]){
            direccion = nuevaDir;
        }
    }
}

function moverse(avanzar){
    if(((cabezaX + avanzar[0]) >= filas) || ((cabezaY + avanzar[1]) >= columnas) || ((cabezaX + avanzar[0]) < 0) || ((cabezaY + avanzar[1]) < 0)){
        morir();
    }
    else{
        cabezaX += avanzar[0];
        cabezaY += avanzar[1];

        console.log("X: " + cabezaX + "Y: " + cabezaY);
        if((cabezaX) === frutaX && (cabezaY) === frutaY){
            if(velocidadTicks > 50){
                velocidadTicks -= 2;
            }
            cambiarVelocidad(velocidadTicks);
            cambiarPosFruta();
            puntuacion++;
            sumarTickBloquesOcupados();
            puntuacionMax = (puntuacion >= puntuacionMax) ? puntuacion : puntuacionMax;
            localStorage.setItem("max-puntuacion", puntuacionMax);
            numPuntuacion.innerHTML = `${texto[lenguaje]["puntuacion"]}: ${puntuacion}`;
            maxNumPuntuacion.innerHTML = `${texto[lenguaje]["max_puntuacion"]}: ${puntuacionMax}`;
            actualizarCanvas();
        }
        if(matrizTicksRestantesBloques[cabezaY][cabezaX] >= 1){
            morir();
        }
        else{
            matrizTicksRestantesBloques[cabezaY][cabezaX] = puntuacion;
            actualizarCanvas();
        }
    }
}

function restarTickBloquesOcupados(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(matrizTicksRestantesBloques[i][j] >= 1){
                matrizTicksRestantesBloques[i][j]--;
            }
        }
    }
}

function sumarTickBloquesOcupados(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(matrizTicksRestantesBloques[i][j] >= 1){
                matrizTicksRestantesBloques[i][j]++;
            }
        }
    }
}

function pintarBloquesOcupados(){
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let num = (i*filas) + (j+1);
            let blqActual = document.getElementById("blq" + num);
            if(matrizTicksRestantesBloques[i][j] >= 1){
                if(blqActual === null){
                    let bloque = document.createElement("div");
                    if(!direccion[0] && direccion[1] === -1){
                        bloque.classList.add("cabeza-arriba"); 
                    }
                    if(!direccion[0] && direccion[1] === 1){
                        bloque.classList.add("cabeza-abajo"); 
                    }
                    if(direccion[0] === -1 && !direccion[1]){
                        bloque.classList.add("cabeza-izquierda"); 
                    }
                    if(direccion[0] === 1 && !direccion[1]){
                        bloque.classList.add("cabeza-derecha"); 
                    }
                    bloque.id = "blq" + num;
                    bloque.style.gridArea = (i+1) + " / " + (j+1);
                    canvas.appendChild(bloque.cloneNode(true));
                }
                else{
                    if(matrizTicksRestantesBloques[i][j] < puntuacion){
                        blqActual.classList.remove("cabeza-arriba");
                        blqActual.classList.remove("cabeza-abajo");
                        blqActual.classList.remove("cabeza-izquierda");
                        blqActual.classList.remove("cabeza-derecha");
                        blqActual.classList.add("cuerpo");
                    }
                }
            }
            else if (blqActual !== null){
                if(!(blqActual.classList.contains("fruta"))){
                    blqActual.remove();
                }
            }
        }
    }
}

function pintarFruta(){
    let num = ((frutaY)*filas) + (frutaX+1);
    let bloque = document.createElement("div"); 
    bloque.classList.add("fruta");
    bloque.id = "blq" + num;
    bloque.style.gridArea = (frutaY+1) + " / " + (frutaX+1);
    canvas.appendChild(bloque.cloneNode(true));
}

function borrarFruta(){
    let num = ((frutaY)*filas) + (frutaX+1);
    document.getElementById("blq" + num).remove();
}

function cambiarPosFruta() {
    borrarFruta();
    let contador = 0;
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(matrizTicksRestantesBloques[i][j] === 0){
                contador++;
            }
        }
    }
    let aleatorio = Math.floor(Math.random() * contador);

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(matrizTicksRestantesBloques[i][j] === 0){
                aleatorio--;
                if(aleatorio === 0){
                    frutaX = j;
                    frutaY = i;
                }
            }
        }
    }
    pintarFruta();
}

function actualizarCanvas(){
    pintarBloquesOcupados();
    restarTickBloquesOcupados();
}

function iniciarTicks(velocidad){
    ticks = setInterval(()=> {
        cambiarDireccion(intencionDireccion);
        moverse(direccion);
    }, velocidad);
}

function cambiarVelocidad(nuevaVelocidad){
    clearInterval(ticks);
    iniciarTicks(nuevaVelocidad);
}

function morir(){
    clearInterval(ticks);
    alert("Has muerto.");
    botones[0].style.visibility = 'visible';
}

function reiniciar(){

    if(ticks){
        clearInterval(ticks);
    }

    // Borrar el tablero
    canvas.innerHTML = '';

    // Reiniciar matriz de bloques ocupados
    for(let i = 0; i < filas; ++i) {
        matrizTicksRestantesBloques[i] = [ ];
        for(let j = 0; j < columnas; ++j) {
            matrizTicksRestantesBloques[i][j] = 0;
        }
    }
    blqActual = null;

    matrizTicksRestantesBloques[1][1] = 1;

    // Reiniciar variables
    puntuacion = 1;
    numPuntuacion.innerHTML = `${texto[lenguaje]["puntuacion"]}: ${puntuacion}`;
    cabezaX = 1;
    cabezaY = 1;
    frutaX = 12;
    frutaY = 1;
    direccion = [0,0];
    intencionDireccion = [1,0];
    actualizarCanvas();
    pintarFruta();

    velocidadTicks = 150;
    iniciarTicks(velocidadTicks);
}

