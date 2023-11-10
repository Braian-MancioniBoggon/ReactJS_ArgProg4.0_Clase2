//Declaro los elementos que necesito usar del HTML
const numerosCalculadora = document.querySelectorAll(".numero");
const operadoresCalculadora = document.querySelectorAll(".operador");
const igual = document.getElementById("igual");
const reset = document.getElementById("reset");
const botonPunto = document.getElementById("punto");
const pantalla = document.getElementById("pantalla");
const pantallaChica = document.getElementById("pantallaChica");

//Declaro las variable que voy a utilizar
let numeroIngresado = "";
let operacionFinalizada = false;
let sinNumero = true;
let hayPunto = false;

//Borro todos los numeros ingresados para comenzar una cuenta nueva
const resetearCalculadora = () => {
    pantalla.value="";
    pantallaChica.value = "";
    numeroIngresado = "";
    reset.innerHTML = "C";
    hayPunto = false;
};

//Con esta funcion puedo borrar el numero que estoy ingresando para cambiarlo por otro menos cuando se muestra el resultado de la cuenta
const borrarCalculadora = () => {
    if (!operacionFinalizada){
        pantalla.value="";
        numeroIngresado = "";
        reset.innerHTML = "C";
        hayPunto = false;
    };
};

//Dependiendo si hay un numero ingresado o no se utiliza borrar o resetear calculadora
const borrarOresetear = () => {
    if (reset.innerHTML === "CE"){
        borrarCalculadora();
    } else {
        resetearCalculadora();
    };
};

//Ingreso los numeros deseados a la "pantalla" de la calculadora
const apretarNumero = (event) => {
    let numero = event.target.innerHTML;
    sinNumero = false;
    reset.innerHTML = "CE";
    //Si se esta mostrando el resultado de una cuenta, se va a borrar los datos de esa cuenta e ingresaran los nuevos numeros
    if (pantalla.value != "0"){
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

//Si el usuario ingresa dos signos seguidos, solo el ultimo signo va a quedar para la cuenta
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

//Ingreso el signo a la "pantalla" de la calculadora
const apretarOperador = (event) => {
    reset.innerHTML = "C";
    let operador = event.target.innerHTML;
    //Si no hay numeros no se puede utilizar los signos
    if (!sinNumero){
        //Si se muestra el resultado de una cuenta, al ingresar un signo se ingresa ese resultado como un numero para una nueva cuenta
        if(operacionFinalizada){
            operacionFinalizada = false;
            pantallaChica.value = "";
            pantallaChica.value = numeroIngresado;
            pantalla.value = "";
            validarOperador(operador);  
            hayPunto = false;      
        } else {
            pantallaChica.value += numeroIngresado;
            pantalla.value = "";
            validarOperador(operador); 
            hayPunto = false; 
        };
    };
}

//Ingreso un "." para colocar decimales
const apretarPunto = () => {
    let punto = botonPunto.innerHTML;
    if (!operacionFinalizada){
        if (pantalla.value !== ""){
            //Solo se puede agregar un "." por numero
            if (!hayPunto){
                pantalla.value += punto;
                hayPunto = true;
                numeroIngresado += punto;
            };
        };
    };
}

//Calculo la cuenta ingresada y muestro el resultado en la "pantalla"
const calcular = () => {
    reset.innerHTML = "C";
    if (!operacionFinalizada){
        pantallaChica.value += pantalla.value;
        resultado = eval(pantallaChica.value);
        resultado = Math.trunc(resultado * 100) / 100;
        //No se puede dividir por 0
        if (resultado == "Infinity"){
            pantalla.value = "Math error ";
            operacionFinalizada = true;
        //En el caso que el resultado de "Undefined" se va a mostrar "Math error"
        } else if (resultado == undefined){
            pantalla.value = "0";
            operacionFinalizada = true;
        } else if (isNaN()){
            pantalla.value = "0";
            operacionFinalizada = true;
        } else {
        pantalla.value = resultado;
        numeroIngresado = resultado;
        operacionFinalizada = true;
    };
    };
}

//Creo los eventos al apretar los numeros
numerosCalculadora.forEach((numero) => {
    numero.addEventListener("click", apretarNumero);
});

//Creo los eventos al apretar los signos
operadoresCalculadora.forEach((operador) => {
    operador.addEventListener("click", apretarOperador);
});

//Creo el evento para el signo "="
igual.addEventListener("click", () => {calcular()});

//Creo el evento para el boton "."
botonPunto.addEventListener("click", () => {apretarPunto()});

//Creo el evento para el boton "C" y "CE"
reset.addEventListener("click", () => {borrarOresetear()});