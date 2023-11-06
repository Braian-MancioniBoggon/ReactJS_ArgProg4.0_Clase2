const numerosCalculadora = document.querySelectorAll(".numero");
const operadoresCalculadora = document.querySelectorAll(".operador");
const igual = document.getElementById("igual");
const reset = document.getElementById("reset");
const borrar = document.getElementById("borrar");
const pantalla = document.getElementById("pantalla");
const pantallaChica = document.getElementById("pantallaChica");

let numeroIngresado = "";
let operacionFinalizada = false;
let sinNumero = true;

const resetearCalculadora = () => {
    pantalla.value="";
    pantallaChica.value = "";
    numeroIngresado = "";
};

const borrarCalculadora = () => {
    if (!operacionFinalizada){
        pantalla.value="";
        numeroIngresado = "";
    };
};

const apretarNumero = (event) => {
    let numero = event.target.innerHTML;
    sinNumero = false;
    if (operacionFinalizada){
        pantalla.value = "";
        pantalla.value += numero;
        pantallaChica.value = "";
        numeroIngresado = "";
        numeroIngresado += numero;
        operacionFinalizada = false;
    } else {
        pantalla.value += numero;
        numeroIngresado += numero;
    }
}

const validarOperador = (operadorIngresado) => {
    let anteUltimoCaracter = pantallaChica.value.substring(pantallaChica.value.length, pantallaChica.value.length - 1);
    if (anteUltimoCaracter === "+" || anteUltimoCaracter === "-" || anteUltimoCaracter === "*" || anteUltimoCaracter === "/"){
        pantallaChica.value = pantallaChica.value.substring(0, pantallaChica.value.length - 1);
        pantallaChica.value += operadorIngresado;
    } else {
        pantallaChica.value += operadorIngresado;
    };
    numeroIngresado = "";
}

const apretarOperador = (event) => {
    let operador = event.target.innerHTML;
    if (!sinNumero){
        if(operacionFinalizada){
            operacionFinalizada = false;
            pantallaChica.value = "";
            pantallaChica.value = numeroIngresado;
            pantalla.value = "";
            validarOperador(operador);        
        } else {
            pantallaChica.value += numeroIngresado;
            pantalla.value = "";
            validarOperador(operador);  
        };
    };
}

const calcular = () => {
    if (!operacionFinalizada){
        pantallaChica.value += pantalla.value;
        resultado = eval(pantallaChica.value);
        if (resultado == "Infinity"){
            pantalla.value = "Math error ";
            operacionFinalizada = true;
        } else if (resultado == undefined){
            pantalla.value = "0";
            operacionFinalizada = true;
        } else {
            pantalla.value = resultado;
            numeroIngresado = resultado;
            operacionFinalizada = true;
        };
    };
}

numerosCalculadora.forEach((numero) => {
    numero.addEventListener("click", apretarNumero);
});

operadoresCalculadora.forEach((operador) => {
    operador.addEventListener("click", apretarOperador);
});

igual.addEventListener("click", () => {calcular()});

borrar.addEventListener("click", () => {borrarCalculadora()});

reset.addEventListener("click", () => {resetearCalculadora()});
