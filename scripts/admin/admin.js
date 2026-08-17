let productos = leerDeStorage("productosRegistrados",[]);
let usuarioActual = validarSesion();

if(!usuarioActual.esAdministrador){
    alert("Acceso denegado");
    window.location.href = "index.html";
}

document.getElementById("idProducto").value = Number(productos.length + 1);

function limpiarControles() {
	document.getElementById("nombreProducto").value = "";
	document.getElementById("cantidadProducto").value = "";
	document.getElementById("precioProducto").value = "";
	document.getElementById("ivaProducto").value = "";
	document.getElementById("imgProducto").value = "";
}

