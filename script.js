
//Implementamos Json y LocalStorage
let baseDeDatos = JSON.parse(localStorage.getItem("datos")) || [];

// Creamos un objeto que contendrá los datos cargados
const datos = {
    clientes: baseDeDatos
};

// Loggin
function Cliente(usuario, contraseña, email) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.email = email;
}

// Ingresar Dinero a la Cuenta
function ingresarDinero() {
    let ingreso = Number(prompt("Ingrese la cantidad de desee depositar "));
    persona.saldoActual = (persona.saldoActual + ingreso);
    alert("Ingresó $" + ingreso);
}

// Retirar Dinero de la Cuenta
function retiroDinero() {
    let retiro = Number(prompt("Ingrese el monto que desee extraer"));
    if (retiro <= persona.saldoActual) {
        persona.saldoActual = (persona.saldoActual - retiro);
        alert("Extrajo: $" + retiro);
    } else {
        alert("Su saldo es insuficiente");
    }
}

//  Consulta Datos
function consultarDatos() {
    alert("Su Nombre de Usuario es: " + persona.usuario);
    alert("Su Contraseña es: " + persona.contraseña);
}

// Consultar Saldo
function consultarSaldo() {
    alert("Su Saldo Actual es de: $");
}

// Agregamos el evento Click ah iniciar Sesion
const btnIniciarSesion = document.getElementById("inicioSesion");
btnIniciarSesion.addEventListener("click", () => {
    // obtenemos los valores ingresados
    const nombreDeUsuario = document.getElementById("nombre").value;
    const contraseña = document.getElementById("contraseña").value;

    // Buscamos en el Array el usuario 
    const usuarioRegistrado = baseDeDatos.find(usuario => usuario.usuario === nombreDeUsuario && usuario.contraseña === contraseña);
    console.log(usuarioRegistrado);
    if (usuarioRegistrado) {
        window.location.href = "../paginas/inicio.html";
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Complete los Campos',
            showConfirmButton: true
        })
    }
});
