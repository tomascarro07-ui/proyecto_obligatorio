let usuarioActual = validarSesion();

document.addEventListener("DOMContentLoaded", function () {
	inicializarProductos();
	inicializarFiltro();
});

if(usuarioActual) {
	document.getElementById("usuarioActual").innerHTML = "¡Bienvenido <b>" + usuarioActual.nombre + "</b> a Mundo Periféricos!";
};

if(usuarioActual.esAdministrador === true) {
	document.getElementById("administrador").innerHTML = `<div class="menu"><a href="admin.html">Agregar productos</a> <a href="ventas_admin.html">Ventas realizadas</a> <a href="editar_filtros_admin.html">Editar categorias</a></div>`;
} else {
	document.getElementById("usuario").innerHTML = `<div class="menu"><a href="venta_usuario.html">Mis compras</a> <a href="guia_uso.html">Ayuda</a> <a href="cotizaciones.html">Cotizaciones</a>`;
};


