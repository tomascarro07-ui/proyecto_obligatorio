let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let usuarioActual = validarSesion();

function resumenCompra() {
	let carrito = "<h3>Productos: </h3>"
	let sumaTotal = 0;
	let sumaIva = 0;
	let sumaSinIva = 0; 
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i]
		let monto = Number(productoCarrito.precio) / (1 + Number(productoCarrito.iva) / 100);
		let iva = Number(productoCarrito.precio) - monto;
		sumaSinIva += monto
		sumaIva += iva
		sumaTotal += Number(productoCarrito.precio)
		carrito +=` <div class="card"> <h3>${productoCarrito.nombre}</h3> <img src="${productoCarrito.foto}" width="150"> <p>Cantidad: ${productoCarrito.cantidad}</p> </div> `;
	}
	let total = `<div class="card"> <h3>Resumen de la compra:</h3> Monto (sin IVA): ${sumaSinIva.toFixed(2)} <br> IVA: $${sumaIva.toFixed(2)} <br><br> <h3>TOTAL: $${sumaTotal.toFixed(2)}</h3> </div>`
	document.getElementById("micarrito").innerHTML = carrito
	document.getElementById("totalCompra").innerHTML = total
}

resumenCompra();

function mostrarTexto(tipo){
	if(tipo === "domicilio") {
		document.getElementById("direccion").innerHTML = `<label for="direccion">Ingresa tu dirección</label> <br> <input type="text" required>`
	} else if (tipo === "sucursal") {
		document.getElementById("direccion").innerHTML = ""
	}
}