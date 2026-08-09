let usuarioActual = validarSesion();
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);

let parametros = new URLSearchParams(window.location.search);

let productoNombre = parametros.get("nombre");
let stockNombre = Number(parametros.get("stock"));
let precioNombre = parametros.get("precio");
let fotoProducto = parametros.get("img");
let ivaProducto = parametros.get("iva");

document.getElementById("nombreProducto").innerHTML = `Nombre: ${productoNombre}`
document.getElementById("cantidadProducto").innerHTML = `Stock: ${stockNombre}`;
document.getElementById("precioProducto").innerHTML = `Precio: $${precioNombre}`;
document.getElementById("img").src = fotoProducto;
let precioAlCarrito = Number(precioNombre);

document.addEventListener("click",function() {
	let conversion = document.getElementById("tipoConversion").value
	let precioFinal;
	if(conversion == "dolar") {
		precioFinal = convertirPrecio(precioAlCarrito,"USD")
	} else if(conversion == "euro") {
		precioFinal = convertirPrecio(precioAlCarrito,"EUR")
	} else if(conversion == "peso-argentino") {
		precioFinal = convertirPrecio(precioAlCarrito,"ARS")
	} else(
		precioFinal = precioNombre
	)
	
	document.getElementById("precioProducto").innerHTML = `Precio: $${precioFinal}`
})
	

document.addEventListener("DOMContentLoaded",function(){
	let formProducto = document.getElementById("form-producto");
	if(formProducto) {
		formProducto.addEventListener("submit",function(e){
			e.preventDefault(); 
			
			if(!usuarioActual) {
				window.location.href = "login.html"
				return;
			} else {
				let cantidadAlCarrito = Number(document.getElementById("agregarCantProducto").value);
				let totalProducto = (cantidadAlCarrito * precioAlCarrito).toFixed(2);
				let repetido = false;
				if(cantidadAlCarrito <= stockNombre && cantidadAlCarrito > 0) {
					let agregarProducto = {
						nombre: productoNombre,
						precio: totalProducto,
						precioUnitario: precioAlCarrito,
						cantidad: cantidadAlCarrito,
						iva: ivaProducto,
						foto: fotoProducto,
						usuario: usuarioActual.correo
					};
					for(let i = 0; i < productos.length; i++) {
						let producto = productos[i];
						if(agregarProducto.nombre === producto.nombreProducto) {
							producto.stockProducto -= cantidadAlCarrito;
						};
						guardarEnStorage("productosRegistrados",productos);
					};
					for(let i = 0; i < productosCarrito.length; i++) {
						let productoCarrito = productosCarrito[i];
						if(productoCarrito.nombre === agregarProducto.nombre && productoCarrito.usuario == usuarioActual.correo) {
							productoCarrito.cantidad += agregarProducto.cantidad;
							productoCarrito.precio = Number(agregarProducto.precio) + Number(productoCarrito.precio);
							repetido = true;
							break;
						};
					};
					if(!repetido) {
						productosCarrito.push(agregarProducto);
					};
					
					
					guardarEnStorage("productosMiCarrito",productosCarrito);
					alert("¡Producto agregado correctamente!");
					window.location.href = "index.html";
					return;
					
				} else if (cantidadAlCarrito > stockNombre) {
					alert("¡No tenemos esa cantidad! Intente de nuevo");
					return;
				} else if (cantidadAlCarrito <= 0) {
					alert("¡Ingrese un número valido!");
					return;
				}
			}	
		});
	};
});
	
function avisarStock() {
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i]
		if(producto.nombreProducto === productoNombre) {
			if(producto.stockProducto === 0) {
				document.getElementById("enviarBtn").innerHTML = "";
				document.getElementById("faltaStock").innerHTML = `<button class="btn btn-secondary" type="button" onclick="alert('¡Se ha informado!')">¡Informar falta de stock!</button>`
				return;
			}
		}
	}
}
avisarStock() 