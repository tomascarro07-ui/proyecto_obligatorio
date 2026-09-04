usuarioActual = validarSesion();
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);
let cotizacion = "";
let cantidadTotal = 0;

if(!usuarioActual) {
	document.getElementById("usuarioActual").innerHTML = "¡Bienvenido a Mundo Periféricos!";
	document.getElementById("sesion").innerHTML = `<button class="mp-btn mp-btn-small" onclick="window.location.href='login.html'">Iniciar sesión</button>`
	document.getElementById("cotizaciones").innerHTML = "";
} else {
	document.getElementById("usuarioActual").innerHTML = "¡Bienvenido <b>" + usuarioActual.nombre + "</b> a Mundo Periféricos!";
	document.getElementById("sesion").innerHTML = `<button class="mp-btn mp-btn-small" onclick="cerrarSesion()">Cerrar sesión</button>`
	
	document.getElementById("tipoConversion").addEventListener("change", function() {
		cotizacion = this.value;
		mostrarCatalogo(document.getElementById("filtroTipo").value || "todas");
	});
	
	if(usuarioActual.esAdministrador === true) {
		document.getElementById("administrador").innerHTML = `<div class="menu">
			<a href="admin.html">Agregar productos</a> 
			<a href="ventas_admin.html">Ventas realizadas</a> 
			<a href="editar_categorias_admin.html">Editar categorias</a>
		</div>`;
	} else {
		document.getElementById("usuario").innerHTML = `<div class="menu">
			<a href="compras_usuario.html">Mis compras</a> 
			<a href="guia_uso.html">Ayuda</a> 
			<a href="cotizaciones.html">Cotizaciones</a>
		</div>`;
	};

	let cantidadTotal = 0;

	for(let i = 0; i < productosCarrito.length; i++) {
		if(productosCarrito[i].usuario === usuarioActual.correo) {
			cantidadTotal += Number(productosCarrito[i].cantidad);
		}
	}

	document.getElementById("cantidadCarrito").innerHTML = cantidadTotal;

}

let formBuscador = document.getElementById("form-buscador");
if(formBuscador) {
	formBuscador.addEventListener("submit",function(e){
		if(document.getElementById("buscador").value.trim() === "") {
			e.preventDefault();
		}
	});
}

let mensajeCarrito = leerDeStorage("mensajeCarrito",false);
if(mensajeCarrito) {
	let toastElemento = document.getElementById("toastCarrito");
    let toast = new bootstrap.Toast(toastElemento, { delay: 3000 });

    toast.show();

    guardarEnStorage("mensajeCarrito", false);
}


