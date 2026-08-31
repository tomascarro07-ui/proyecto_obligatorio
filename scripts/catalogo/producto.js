usuarioActual = validarSesion();
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);

let parametros = new URLSearchParams(window.location.search);

let productoNombre = parametros.get("nombre");
let cotizacion = parametros.get("cotizacion");
let precioAlCarrito = 0;
let precioNombre = 0;
let ivaProducto = 0;
let stockProducto = 0;
let fotoProducto = "";

for(let i = 0; i < productos.length; i++) {
	let producto = productos[i];
	if(productoNombre === producto.nombreProducto) {
		document.getElementById("nombreProducto").innerHTML = `Nombre: ${producto.nombreProducto}`
		document.getElementById("cantidadProducto").innerHTML = `Stock: ${producto.stockProducto}`;
		document.getElementById("img").src = producto.imagenProducto;
		
		precioAlCarrito = Number(producto.precioFinal);
		precioNombre = Number(producto.precioProducto);
		ivaProducto = producto.ivaProducto;
		stockProducto = producto.stockProducto;
		fotoProducto = producto.imagenProducto;
	}
}

document.addEventListener("cotizacionesListas",function() {
	let precioFinal = precioAlCarrito;
	if(cotizacion == "dolar") {
		document.getElementById("tipoConversion").value = cotizacion
		precioFinal = convertirPrecio(precioAlCarrito,"USD")
	} else if (cotizacion == "euro") {
		document.getElementById("tipoConversion").value = cotizacion
		precioFinal = convertirPrecio(precioAlCarrito,"EUR")
	} else if(cotizacion == "peso-argentino") {
		document.getElementById("tipoConversion").value = cotizacion
		precioFinal = convertirPrecio(precioAlCarrito,"ARS")
	} else {
		precioFinal = precioAlCarrito
	};
	document.getElementById("precioProducto").innerHTML = `Precio: $${precioFinal}`;
});

document.addEventListener("click",function() {
	let conversion = document.getElementById("tipoConversion").value
	let precioFinal;
	if(conversion == "dolar") {
		precioFinal = convertirPrecio(precioAlCarrito,"USD")
	} else if(conversion == "euro") {
		precioFinal = convertirPrecio(precioAlCarrito,"EUR")
	} else if(conversion == "peso-argentino") {
		precioFinal = convertirPrecio(precioAlCarrito,"ARS")
	} else {
		precioFinal = precioAlCarrito
	};
	
	document.getElementById("precioProducto").innerHTML = `Precio: $${precioFinal}`
})
	
function avisarStock() {
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i]
		if(producto.nombreProducto === productoNombre) {
			if(producto.stockProducto === 0) {
				document.getElementById("enviarBtn").innerHTML = "";
				document.getElementById("faltaStock").innerHTML = `<button class="mp-btn mp-btn-secondary" type="button" onclick="alert('¡Se ha informado!')">¡Informar falta de stock!</button>`
				return;
			}
		}
	}
}
avisarStock() 

