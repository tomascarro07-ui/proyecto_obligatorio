let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);


let parametros = new URLSearchParams(window.location.search);

let nombreOriginal = parametros.get("nombre");
let stockNombre = parametros.get("cantidadUser");

for(let i = 0; i < productosCarrito.length; i++) {
	let productoCarrito = productosCarrito[i]
	for(let j = 0; j < productos.length; j++) {
		let producto = productos[j];
		if(nombreOriginal === producto.nombreProducto) {
			document.getElementById("nombreProducto").innerHTML = `Nombre del producto: ${producto.nombreProducto}`
			document.getElementById("cantidadProducto").value = productoCarrito.cantidad;
			document.getElementById("precioProducto").innerHTML = `Subtotal del producto: ${producto.precioProducto}`
			document.getElementById("imgProducto").src = producto.imagenProducto
		}
	}
}

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


