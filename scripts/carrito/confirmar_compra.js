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
		document.getElementById("direccion").innerHTML = `<label for="direccionCompra">Ingresa tu dirección</label> <br> <input id="direccionCompra" type="text" required>`
	} else if (tipo === "sucursal") {
		document.getElementById("direccion").innerHTML = ""
	}
}

function confirmarCompra() {
    let metodoPago = document.querySelector('input[name="metodPago"]:checked').value;

    let metodoEnvio = document.querySelector('input[name="metodeEnvio"]:checked');

    if (!metodoEnvio) {
        alert("Seleccione un método de envío");
        return;
    }

    metodoEnvio = metodoEnvio.value
	let inputDireccion = document.getElementById("direccion");
	let direccionEnvio;
	if(direccionEnvio) {
		direccionEnvio = inputDireccion
	} else {
		direccionEnvio = "PickUp"
	}
	
    let datosEntrega = {
		metodoPago: metodoPago,
		metodoEntrega: metodoEnvio,
		direccion: direccionEnvio
	}
	guardarEnStorage("datosCompra",datosEntrega);
	window.location.href = "compra_realizada.html"
}