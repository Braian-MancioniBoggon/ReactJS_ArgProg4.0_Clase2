const pantalla = document.getElementById("pantalla");
const cero = document.getElementById("cero");
const uno = document.getElementById("uno");
const dos = document.getElementById("2");
const tres = document.getElementById("3");
const cuatro = document.getElementById("4");
const cinco = document.getElementById("5");
const seis = document.getElementById("6");
const siete = document.getElementById("7");
const ocho = document.getElementById("8");
const nueve = document.getElementById("9");
const mas = document.getElementById("mas");
const menos = document.getElementById("menos");
const por = document.getElementById("por");
const dividir = document.getElementById("dividir");
const igual = document.getElementById("igual");
const reset = document.getElementById("reset");
const borrar = document.getElementById("borrar");

let numero1 = 0;
let numero2 = 0;
let resultado = 0;
let simboloOperador = "";
let controlOperacion = 1;
let finalOperacion = false;

const resetearCalculadora = () => {
    pantalla.value="";
    numero1 = 0;
    numero2 = 0;
    resultado = 0;
    simboloOperador = "";
    controlOperacion = 1;
    finalOperacion = false;
};

let concatenarNumeros = (numero) => {
    if (controlOperacion === 1){
        if (pantalla === ""){
            pantalla.value = numero;
            numero1 = Number(pantalla.value);
            console.log(`numero1: ${numero1}`);
        } else {
            pantalla.value += numero;
            numero1 = Number(pantalla.value);
            console.log(`numero1: ${numero1}`);
        };
    } else {
        if (pantalla === ""){
            pantalla.value = numero;
            numero2 = Number(pantalla.value);
            console.log(`numero2: ${numero2}`);
        } else {
            pantalla.value += numero;
            numero2 = Number(pantalla.value);
            console.log(`numero2: ${numero2}`);
        };
    };
};

const obtenerOperador = (operador) => {
    if (controlOperacion === 1){
        pantalla.value="";
        simboloOperador = operador;
        controlOperacion++;
        console.log(`menor a 2 operador: ${operador}`);
        console.log(`menor a 2 control: ${controlOperacion}`);
        console.log(`menor a 2 numero2: ${numero2}`);
    } else {
        pantalla.value="";
        simboloOperador = operador;
        numero1 = calcularOperacion();
        controlOperacion++;
        console.log(`mayor a 2 operador: ${operador}`);
        console.log(`mayor a 2 control: ${controlOperacion}`);
        console.log(`mayor a 2 numero1: ${numero1}`);
        console.log(`mayor a 2 numero2: ${numero2}`);
    };
};

const operacionMatematica = () => {
    switch(simboloOperador){
        case "+":
            resultado = numero1 + numero2;
        break;
        case "-":
            resultado = numero1 - numero2;
        break;
        case "/":
            if(numero2 > 0){
                resultado = numero1 / numero2;
            } else {
                resultado = "No se puede dividir entre cero"
            };      
        break;
        case "*":
            resultado = numero1 * numero2;
        break;
        default:
            resultado = 0;
        break;
    };
};

const calcularOperacion = () => {
    if (simboloOperador !== ""){
        operacionMatematica();
        return resultado;
    };
};

const finalizarCalculo = () => {
    if (simboloOperador !== ""){
        operacionMatematica();
        pantalla.value=resultado;
        controlOperacion = 1;
        finalOperacion = true;
        console.log(resultado);
    };
};

const consultarNuevaOperacion = (nuevaOperacion) => {
    if (finalOperacion){
        resetearCalculadora();
        nuevaOperacion;
    } else {
        nuevaOperacion;
    };
};

uno.addEventListener("click", () => {consultarNuevaOperacion(concatenarNumeros(uno.innerHTML))});
mas.addEventListener("click", () => {consultarNuevaOperacion(obtenerOperador(mas.innerHTML))});
igual.addEventListener("click", () => {finalizarCalculo()});
reset.addEventListener("click", () => {resetearCalculadora()});