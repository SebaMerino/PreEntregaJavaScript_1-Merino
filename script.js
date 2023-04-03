
let intentos = 3;
let opcion;

//Array 
const baseDeDatos = [];

// Loggin
function Cliente(usuario, contraseña, saldoActual) {
    this.usuario = usuario;
    this.contraseña = Number(contraseña);
    this.saldoActual = Number(saldoActual);
}

// Creamos el Objeto 
const persona = new Cliente(prompt("Cree su nombre de usuario"), prompt("Cree su contraseña en numero"), Number(prompt("Ingrese su saldo actual")));

// Generamos un Push para pushear los datos ingresados al array
baseDeDatos.push(persona);

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
    alert("Su Saldo Actual es de: $" + persona.saldoActual);
}

// Generamos un For tradiconal
for (let i = 0; i < 3; i++) {
    let user = prompt("Ingrese su usuario");
    let pass = Number(prompt("Ingrese su contraseña"));

    // Si coloca otro dato que no sean los pedido les saldra el siguien mensaje
    if (!user || !pass) {
        alert("ingresa los datos solicitados");

    } else {

        const buscarCliente = (ar, busqueda) => {
            const encontrado = ar.find((cliente) => {
                return cliente.usuario.includes(busqueda);
            })
            return encontrado;
        }
        const usuarioEncontrado = buscarCliente(baseDeDatos, user)
        console.log(usuarioEncontrado);

        // Si los datos ingresados Coinciden le damos la Bienvenida
        if ( user == persona.usuario && pass == persona.contraseña) {

            alert("Bienvenido " + persona.usuario);
            alert("Bienvenido al Menu Principal");

            // Creamos el Menu para hacer las operaciones
            do {
                opcion = Number(prompt("Que operacion desea realizar: \n1.Depositar dinero \n2.Extraer dinero \n3.Consultar Saldo \n4.Consultar Datos de la Cuenta \n5.Salir"));

                switch (opcion) {
                    case 1:
                        ingresarDinero();
                        break;
                    case 2:
                        retiroDinero();
                        break;
                    case 3:
                        consultarSaldo();
                        break;
                    case 4:
                        consultarDatos();
                        break;
                    case 5:
                        alert("Muchas Gracias")
                        break;
                    default:
                        alert("Ingrese una opcion correcta")
                }
            } while (opcion != 5);
            break;
        } else {
            alert("Usuario y/o Contraseña incorrecto. Te quedan " + intentos + " intentos");
            intentos--;
        }
    }
}
if (intentos <= 0) { alert("Usuario Bloqueado"); }
