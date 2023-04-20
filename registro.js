
//Array
const baseDeDatos = [];

// Loggin
function Cliente(usuario, contraseña, email) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.email = email;
}


// Generamos un Push para pushear los datos ingresados al array
const btnRegistrarCliente = document.getElementById("agregarCliente")
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
        console.log(baseDeDatos);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Complete los Campos',
            showConfirmButton: true
        })
    }

    // Redirigimos al usuario a la apaina de inicio
    // window.location.href = "../index.html";
});

