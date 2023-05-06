//Array
const baseDeDatos = [];

// Nos traemos los elementos HTML
const saldoActualElement = document.getElementById("saldo");
const ingresoButtonElement = document.getElementById("ingreso");
const estraerDineroElement = document.getElementById("extraer");
const transferirElement = document.getElementById("transferir");
const nombreUsuarioHeader = document.getElementById("nombreUsuarioHeader");


// Obtenemos datos del localStorage
const nombreUsuario = localStorage.getItem("nombreDeUsuario");
const contraseñaUsuario = localStorage.getItem("contraseña");


// Actualizar el contenido del span con el nombre del usuario
document.getElementById("user-menu").textContent = nombreUsuario;

// Cargamos el saldo actual del localStorage
let salActual = parseFloat(localStorage.getItem(`${nombreUsuario}+saldoActual`)) || 0;
actualizarSaldo(salActual);

// Mostrar el nombre del usuario en el header
nombreUsuarioHeader.innerHTML = `Bienvenido ${nombreUsuario.toLocaleUpperCase()}`

function actualizarSaldo(saldo) {
    saldoActualElement.textContent = `SALDO ACTUAL: $${saldo.toFixed(2)}`;
}


// Agregar un evento de clic al nombre de usuario
nombreUsuarioHeader.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Crear el menú desplegable
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    // Crear el elemento de "Cerrar sesión"
    const logoutItem = document.createElement("a");
    logoutItem.classList.add("dropdown-item");
    logoutItem.textContent = "Cerrar sesión";
    logoutItem.addEventListener("click", () => {
        // Cerrar la sesión y redirigir a la página principal
        window.location.href = "../index.html";
    });

    // Agregar el elemento de "Cerrar sesión" al menú desplegable
    dropdownMenu.appendChild(logoutItem);

    // Agregar el menú desplegable al header
    const usernameElement = nombreUsuarioHeader;
    usernameElement.appendChild(dropdownMenu);
    // Agregar la clase 'show' al menú desplegable para que se muestre
    dropdownMenu.classList.add("show");

    // Agregar evento de clic al documento
  document.addEventListener("click", (event) => {
    // Verificar si el elemento clicado está dentro del menú desplegable
    const isClickInsideMenu = dropdownMenu.contains(event.target);

    if (!isClickInsideMenu) {
      // Si el elemento clicado está fuera del menú desplegable, cerrarlo
      dropdownMenu.remove();
    }
  });
});


// Ingresamos plata con el Evento CLICK
ingresoButtonElement.addEventListener('click', async () => {
    const { value: number } = await Swal.fire({
        title: "Ingrese el monto que desee",
        input: "number",
        inputPlaceholder: "Aqui",
        inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off"
        }
    });

    if (number) {
        Swal.fire(`ingreso: $ ${number} pesos`);
    }
    if (number !== null && number !== '') {
        salActual += parseFloat(number);
        baseDeDatos.push({
            tipo: 'Ingreso',
            monto: parseFloat(number),
            saldo: salActual,
        });
        // Guardamos los datos en el localStorage
        localStorage.setItem(`${nombreUsuario}+baseDeDatos`, JSON.stringify(baseDeDatos));
        localStorage.setItem(`${nombreUsuario}+saldoActual`, salActual.toFixed(2));
        actualizarSaldo(salActual);
    }
});

// Extraemos plata con el Evento CLICK
estraerDineroElement.addEventListener('click', async () => {
    const { value: number } = await Swal.fire({
        title: "Ingrese el monto que desee extraer",
        input: "number",
        inputPlaceholder: "Monto",
        inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off"
        }
    });

    if (number) {
        Swal.fire(`Se ha extraido: $ ${number} pesos`);
    }
    if (number !== null && number !== '') {
        if (parseFloat(number) <= salActual) {
            salActual -= parseFloat(number);
            baseDeDatos.push({
                tipo: 'Extracción',
                monto: parseFloat(number),
                saldo: salActual
            });
            // Guardamos los datos en el localStorage
            localStorage.setItem(`${nombreUsuario}+baseDeDatos`, JSON.stringify(baseDeDatos));
            localStorage.setItem(`${nombreUsuario}+saldoActual`, salActual.toFixed(2));
            actualizarSaldo(salActual); // Actualizamos el saldo en pantalla

        } else {
            Swal.fire(`No tiene suficiente saldo para extraer $ ${number} pesos`);
        }
    }
});

// Transferimos plata con el Evento CLICK
transferirElement.addEventListener('click', async () => {
    const { value: monto } = await Swal.fire({
        title: "Ingrese el monto a transferir",
        input: "number",
        inputPlaceholder: "Monto",
        inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off"
        }
    });
    if (monto) {
        const { value: cuenta } = await Swal.fire({
            title: "Ingrese la cuenta destino",
            input: "text",
            inputPlaceholder: "CBU",
            inputAttributes: {
                maxlength: 22,
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (cuenta) {
            if (parseFloat(monto) <= salActual) {
                salActual -= parseFloat(monto);
                baseDeDatos.push({
                    tipo: 'Transferencia',
                    monto: parseFloat(monto),
                    cuentaDestino: cuenta,
                    saldo: salActual

                });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Transferencia enviada con Exito',
                    showConfirmButton: true
                });
                // Guardamos los datos en el localStorage
                localStorage.setItem(`${nombreUsuario}+baseDeDatos`, JSON.stringify(baseDeDatos));
                localStorage.setItem(`${nombreUsuario}+saldoActual`, salActual.toFixed(2));
                actualizarSaldo(salActual); // Actualizamos el saldo en pantalla

            } else {
                Swal.fire(`No tiene suficiente saldo para transferir $${monto} pesos`);
            }
        }
    }
});


