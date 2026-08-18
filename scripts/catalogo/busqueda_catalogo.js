usuarioActual = validarSesion();
let productos = leerDeStorage("productosRegistrados",[]);
let parametros = new URLSearchParams(window.location.search);
let productoNombre = parametros.get("nombre");

document.addEventListener("DOMContentLoaded",function(){
	let busqueda = "<center><h2>Esto hemos encontrado</h2></center> <br>";
	let busquedaInexistente = "<center><h2>No hemos encontrado ningún producto...</h2></center>";
	let productosBuscados = 0;
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		let nombre = producto.nombreProducto.toLowerCase().replaceAll(" ", "");
		let busquedaUser = productoNombre.toLowerCase().replaceAll(" ", "")
		if(nombre.includes(busquedaUser)) {
			busqueda += `<div class="card"> ${producto.nombreProducto} <br> <img width="150px" src="${producto.imagenProducto}"><br> <button class="mp-btn mp-btn-primary" onclick="window.location.href='producto.html?nombre=${producto.nombreProducto}&stock=${producto.stockProducto}&precio=${producto.precioFinal}&img=${producto.imagenProducto}&iva=${producto.ivaProducto}'"> Ver detalles </button> <br><br><br> </div> `;
			productosBuscados++;
		};
	};
	if(productosBuscados === 0) {
		document.getElementById("catalogoProductos").innerHTML = busquedaInexistente;
		return;
	}
	document.getElementById("catalogoProductos").innerHTML = busqueda;
});

