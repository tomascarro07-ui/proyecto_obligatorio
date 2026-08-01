let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);
let usuarioActual = validarSesion();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])

function resumenCompra() {
	let carrito = "Productos: <br><br>";
	let sumaTotal = 0;
	let sumaIva = 0;
	let sumaSinIva = 0; 
	let cantidadProducto = 0; 
	let nombreProducto = "";
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i];
		let monto = Number(productoCarrito.precio) / (1 + Number(productoCarrito.iva) / 100);
		let iva = Number(productoCarrito.precio) - monto;
		sumaSinIva += monto;
		sumaIva += iva;
		sumaTotal += Number(productoCarrito.precio);
		carrito += ` <div class="card"> <h3>${productoCarrito.nombre}</h3> <img src="${productoCarrito.foto}" width="150"> <p>Cantidad: ${productoCarrito.cantidad}</p> </div> `;
		cantidadProducto += productoCarrito.cantidad;
		nombreProducto += `Producto: ${productoCarrito.nombre}. Cantidad: ${productoCarrito.cantidad} <br>`;
	};
	let ventaRealizada = {
		fecha: new Date().toLocaleString(),
		persona: usuarioActual.nombre,
		correo: usuarioActual.correo,
		cantidadProductos: cantidadProducto,
		iva: sumaIva.toFixed(2),
		subtotal: sumaSinIva.toFixed(2),
		sumaTotal: sumaTotal.toFixed(2),
		nombreProductos: nombreProducto
	};
	ventasRealizadas.push(ventaRealizada);
	guardarEnStorage("comprasRealizadas",ventasRealizadas);
	guardarEnStorage("productosRegistrados",productos);
	vaciarCarrito();
	let total = `TOTAL: $${sumaTotal.toFixed(2)}`;
	document.getElementById("micarrito").innerHTML = carrito;
	document.getElementById("totalCompra").innerHTML = total;
};

resumenCompra();

function borrarCarrito() {
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i];
		for(let j = 0; j < productos.length; j++) {
			let producto = productos[j];
			if(productoCarrito.nombre === producto.nombreProducto) {
				producto.stockProducto += Number(productoCarrito.cantidad);
				break;
			};
		};
	};
	guardarEnStorage("productosRegistrados",productos);
	vaciarCarrito();
	return;
};

function vaciarCarrito() {
	guardarEnStorage("productosMiCarrito",[]);
}

