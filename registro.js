
//Array
const baseDeDatos = [];

// Nos traemos los elementos HTML
const btnRegistrarCliente = document.getElementById("agregarCliente")

// Loggin
function Cliente(usuario, contraseña, email) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.email = email;
}

// Generamos un Push para pushear los datos ingresados al array
btnRegistrarCliente.addEventListener("click", () => {
    // obtenemos los valores ingresados
    const nombreDeUsuario = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    //  Verificamos que los campos esten completos
    if (nombreDeUsuario === "" || email === "" || contraseña === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Complete los Campos',
            showConfirmButton: true
        })
    } else {
        // Creo un nuevo objeto cliente
        const nuevoCliente = new Cliente(nombreDeUsuario, contraseña, email);
        // Agregamos el nuevo cliente a la base de datos y al objeto 
        baseDeDatos.push(nuevoCliente);
        // Guardamos la base de datos en el almacenamiento local del navegador
        localStorage.setItem("datos", JSON.stringify(baseDeDatos));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Registro con Exito',
            showConfirmButton: true
        })
        
        // reiniciamos los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contraseña").value = "";
    }
    
});

