let usuarioActual = validarSesion();

function esAdmin() {
    if(!usuarioActual || !usuarioActual.esAdmin) {
        return false;
    }
    return true;
}

function protegerPagina() {
    if(!esAdmin()) {
        window.location.href = "index.html";
    }
}