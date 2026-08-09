document.addEventListener("DOMContentLoaded", function () {
	inicializarProductos();
	inicializarFiltro();
});

let usuarioActual = validarSesion();

if(!usuarioActual) {
	document.getElementById("usuarioActual").innerHTML = "¡Bienvenido a Mundo Periféricos!";
	document.getElementById("sesion").innerHTML = `<button class="mp-btn mp-btn-small" onclick="window.location.href='login.html'">Iniciar sesión</button>`
} else {
	document.getElementById("usuarioActual").innerHTML = "¡Bienvenido <b>" + usuarioActual.nombre + "</b> a Mundo Periféricos!";
	document.getElementById("sesion").innerHTML = `<button class="mp-btn mp-btn-small" onclick="cerrarSesion()">Cerrar sesión</button>`
	
	if(usuarioActual.esAdministrador === true) {
		document.getElementById("administrador").innerHTML = `<div class="menu"><a href="admin.html">Agregar productos</a> <a href="ventas_admin.html">Ventas realizadas</a> <a href="editar_filtros_admin.html">Editar categorias</a></div>`;
	} else {
		document.getElementById("usuario").innerHTML = `<div class="menu"><a href="venta_usuario.html">Mis compras</a> <a href="guia_uso.html">Ayuda</a> <a href="cotizaciones.html">Cotizaciones</a>`;
	};



}

