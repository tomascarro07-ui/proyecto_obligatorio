let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);


let parametros = new URLSearchParams(window.location.search);

let nombreOriginal = parametros.get("nombre");
let nombreProducto = parametros.get("nombre");
let stockNombre = parametros.get("cantidadUser");
let precioNombre = parametros.get("precio");
let fotoProducto = parametros.get("img");

let suma = 0;

document.getElementById("nombreProducto").innerHTML = `Nombre del producto: ${nombreProducto}`
document.getElementById("cantidadProducto").value = stockNombre
document.getElementById("precioProducto").innerHTML = `Subtotal del producto: ${precioNombre}`
document.getElementById("imgProducto").src = fotoProducto

document.addEventListener("DOMContentLoaded", function() {
	let formEditarProducto = document.getElementById("form-editarProducto");
	
	if(formEditarProducto) {
		formEditarProducto.addEventListener("submit",function (e) {
			e.preventDefault();
			for(let i = 0; i < productosCarrito.length; i++) {
				let productoCarrito = productosCarrito[i]
				
				for(let j = 0; j < productos.length; j++) {
					let producto = productos[j];
				
					if (nombreOriginal === productoCarrito.nombre && producto.nombreProducto === nombreOriginal) {
						let cantidadEditar = Number(document.getElementById("cantidadProducto").value);
						let stockDisponible = Number(producto.stockProducto) + Number(productoCarrito.cantidad);
						if(cantidadEditar <= stockDisponible) {
							let diferencia = cantidadEditar - productoCarrito.cantidad;
							if(diferencia >= 0) {
								producto.stockProducto -= Number(diferencia);
							} else {
								producto.stockProducto += -(Number(diferencia));
							};
							productoCarrito.cantidad = cantidadEditar;
							productoCarrito.precio = (productoCarrito.precioUnitario * cantidadEditar).toFixed(2);
							break;
						} else {
							alert("¡No tenemos esa cantidad de stock!");
							return;
						};
					};
				};
			};
			guardarEnStorage("productosRegistrados",productos);
			guardarEnStorage("productosMiCarrito",productosCarrito);
			window.location.href="carrito.html";
		});
	};
});


