const numerosCalculadora = document.querySelectorAll(".numero");
const operadoresCalculadora = document.querySelectorAll(".operador");
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

const borrarCalculadora = () => {
    pantalla.value="";
    if (controlOperacion === 1){
        numero1 = 0;
    } else {
        numero2 = 0;
    };
};

let concatenarNumeros = (numero) => {
    if (controlOperacion === 1){
        if (pantalla === ""){
            pantalla.value = numero;
            numero1 = Number(pantalla.value);
        } else {
            pantalla.value += numero;
            numero1 = Number(pantalla.value);
        };
    } else {
        if (pantalla === ""){
            pantalla.value = numero;
            numero2 = Number(pantalla.value);
        } else {
            pantalla.value += numero;
            numero2 = Number(pantalla.value);
        };
    };
};

const obtenerOperador = (operador) => {
    if (controlOperacion === 1){
        pantalla.value="";
        simboloOperador = operador;
        controlOperacion++;
    } else {
        pantalla.value="";
        simboloOperador = operador;
        numero1 = calcularOperacion();
        controlOperacion++;
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
    };
};

const consultarNuevaOperacion = (nuevaOperacion, numero) => {
    let aux = 0;
    if (finalOperacion){
        aux = numero;
        resetearCalculadora();
        nuevaOperacion;
        pantalla.value = numero;
        numero1 = Number(numero);

    } else {
        nuevaOperacion;
    };
};

const apretarNumero = (event) => {
    let numero = event.target.innerHTML;
    consultarNuevaOperacion(concatenarNumeros(numero),numero);
}

const apretarOperador = (event) => {
    let operador = event.target.innerHTML;
    consultarNuevaOperacion(obtenerOperador(operador));
}

numerosCalculadora.forEach((numero) => {
    numero.addEventListener("click", apretarNumero);
})

operadoresCalculadora.forEach((operador) => {
    operador.addEventListener("click", apretarOperador);
})

igual.addEventListener("click", () => {finalizarCalculo()});

borrar.addEventListener("click", () => {borrarCalculadora()});

reset.addEventListener("click", () => {resetearCalculadora()});