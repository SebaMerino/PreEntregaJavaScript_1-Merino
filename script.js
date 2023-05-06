//Implementamos Json y LocalStorage
let baseDeDatos = JSON.parse(localStorage.getItem("datos")) || [];

// Nos traemos los elementos HTML
const btnIniciarSesion = document.getElementById("inicioSesion");

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

// Agregamos el evento Click ah iniciar Sesion
btnIniciarSesion.addEventListener("click", () => {
    // obtenemos los valores ingresados
    const nombreDeUsuario = document.getElementById("nombre").value;
    const contraseña = document.getElementById("contraseña").value;

    // Buscamos en el Array el usuario 
    const usuarioRegistrado = baseDeDatos.find(usuario => usuario.usuario === nombreDeUsuario && usuario.contraseña === contraseña);
    localStorage.setItem("nombreDeUsuario", nombreDeUsuario);
    localStorage.getItem("contraseña", contraseña)
    
    if (!nombreDeUsuario || !contraseña){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Complete los Campos',
            showConfirmButton: true
        })
    
    } else if (!usuarioRegistrado) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Nombre de Usuario o Constraseña Incorrecto',
            showConfirmButton: true
        })
    }
    else {
        window.location.href = "../paginas/inicio.html";
    }

});
