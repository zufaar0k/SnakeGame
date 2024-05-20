"use_strict";

let lenguaje = localStorage.getItem("lenguaje") || "es_ES";
localStorage.setItem("lenguaje", lenguaje);
// Seleccionar s existentes del HTML
const titulo = document.querySelector('.container .header .cj');
const subtitulo = document.querySelector('.container .tutorial h2:first-of-type');
const objetivo = document.querySelector('.container .tutorial p:first-of-type');
const controlesTitulo = document.querySelector('.container .tutorial h2:nth-of-type(2)');
const ul = document.querySelector('.container .tutorial ul');
const comentario = document.querySelector('.container .tutorial p:last-of-type');
const boton = document.querySelectorAll('div button')[0];

// Actualizar contenido con los datos del tutorial
titulo.innerText = texto[lenguaje]["titulo"];
subtitulo.innerText = texto[lenguaje]["subtitulo"];
objetivo.innerText = texto[lenguaje]["objetivo"];
controlesTitulo.innerText = texto[lenguaje]["controles"]["titulo"];

// Limpiar lista de pasos antes de actualizarla
ul.innerHTML = '';
const pasos = texto[lenguaje]["controles"]["pasos"];
for (let i = 0; i < pasos.length; i++) {
    const paso = pasos[i];
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.innerText = paso["titulo"] + ": ";
    li.appendChild(strong);
    li.innerText += paso["descripcion"];
    ul.appendChild(li);
}

comentario.innerText = texto[lenguaje]["comentario"];
boton.innerText = texto[lenguaje]["boton_atras"];

