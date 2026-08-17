let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);
let usuarioActual = validarSesion();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])
let datosEntrega = leerDeStorage("datosCompra",[])

function resumenCompra() {
	let carrito = "Productos: <br><br>";
	let sumaTotal = 0;
	let sumaIva = 0;
	let sumaSinIva = 0; 
	let cantidadProducto = 0; 
	let nombreProducto = "";
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i];
		if(productoCarrito.usuario == usuarioActual.correo) {
			let monto = Number(productoCarrito.precio) / (1 + Number(productoCarrito.iva) / 100);
			let iva = Number(productoCarrito.precio) - monto;
			sumaSinIva += monto;
			sumaIva += iva;
			sumaTotal += Number(productoCarrito.precio);
			carrito += ` <div class="card"> <h3>${productoCarrito.nombre}</h3> <img src="${productoCarrito.foto}" width="150"> <p>Cantidad: ${productoCarrito.cantidad}</p> </div> `;
			cantidadProducto += productoCarrito.cantidad;
			nombreProducto += `Producto: ${productoCarrito.nombre}. Cantidad: ${productoCarrito.cantidad} <br>`;
		}
	};

	let ventaRealizada = new Venta (
		ventasRealizadas.length + 1,
		new Date().toLocaleString(),
		usuarioActual.nombre,
		usuarioActual.correo,
		cantidadProducto,
		Number(sumaIva.toFixed(2)),
		Number(sumaSinIva.toFixed(2)),
		nombreProducto,
		datosEntrega.metodoPago,
		datosEntrega.metodoEntrega,
		datosEntrega.direccion
	);
	
	ventasRealizadas.push(ventaRealizada);
	guardarEnStorage("comprasRealizadas",ventasRealizadas);
	guardarEnStorage("productosRegistrados",productos);
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
	return;
};
