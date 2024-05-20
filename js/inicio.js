"use_strict";

let lenguaje = localStorage.getItem("lenguaje") || "es_ES";
localStorage.setItem("lenguaje", lenguaje);

let botonesInicio = document.querySelectorAll('.botones button');
botonesInicio[0].innerText = texto[lenguaje]["boton_jugar"];
botonesInicio[1].innerText = texto[lenguaje]["boton_tutorial"];

const botonesLenguaje = document.querySelectorAll('.lenguaje button');

botonesLenguaje[0].addEventListener("click", ()=>{
    localStorage.setItem("lenguaje", "es_ES");
    lenguaje = "es_ES";
    botonesInicio[0].innerText = texto[lenguaje]["boton_jugar"];
    botonesInicio[1].innerText = texto[lenguaje]["boton_tutorial"]; 
})

botonesLenguaje[1].addEventListener("click", ()=>{
    localStorage.setItem("lenguaje", "es_CA");
    lenguaje = "es_CA";
    botonesInicio[0].innerText = texto[lenguaje]["boton_jugar"];
    botonesInicio[1].innerText = texto[lenguaje]["boton_tutorial"];
})

botonesLenguaje[2].addEventListener("click", ()=>{
    localStorage.setItem("lenguaje", "en_EN");
    lenguaje = "en_EN";
    botonesInicio[0].innerText = texto[lenguaje]["boton_jugar"];
    botonesInicio[1].innerText = texto[lenguaje]["boton_tutorial"];
})
