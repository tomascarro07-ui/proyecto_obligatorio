import { GestorCarrito } from "../gestores/gestorCarrito.js";

let gestorCarrito = new GestorCarrito();

let productosCarrito = leerDeStorage("productosMiCarrito",[]);
usuarioActual = validarSesion();

function resumenCompra() {
	let carrito = "<h3>Productos: </h3>";
	let {sumaTotal,sumaIva,sumaSinIva} = gestorCarrito.calcularResumen(usuarioActual.correo);
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i]
		if(productoCarrito.usuario == usuarioActual.correo) {
			carrito +=` <div class="card"> <h3>${productoCarrito.nombre}</h3> <img src="${productoCarrito.foto}" width="150"> <p>Cantidad: ${productoCarrito.cantidad}</p> </div> `;
		}
	}
	let total = `<div class="card"> <h3>Resumen de la compra:</h3> Monto (sin IVA): ${sumaSinIva.toFixed(2)} <br> IVA: $${sumaIva.toFixed(2)} <br><br> <h3>TOTAL: $${sumaTotal.toFixed(2)}</h3> </div>`
	document.getElementById("micarrito").innerHTML = carrito
	document.getElementById("totalCompra").innerHTML = total
}

resumenCompra();

let envioDomicilio = document.getElementById("Envio-Domicilio");
let retiroSucrusal = document.getElementById("Retiro-pickUp");

envioDomicilio.addEventListener("change",mostrarTexto);
retiroSucrusal.addEventListener("change",mostrarTexto);

function mostrarTexto(){
	if(envioDomicilio.checked) {
		document.getElementById("direccion").innerHTML = `<label for="direccionCompra">Ingresa tu dirección</label> <br> <input id="direccionCompra" type="text" required>`
	} else if (retiroSucrusal.checked) {
		document.getElementById("direccion").innerHTML = ""
	}
}

let formConfirmar = document.getElementById("form-confirmar");
if(formConfirmar) {
	formConfirmar.addEventListener("submit",function(e){ 
		e.preventDefault();

		let metodoPago = document.querySelector('input[name="metodPago"]:checked').value
		let metodoEnvio = document.querySelector('input[name="metodeEnvio"]:checked')

		if (!metodoEnvio) {
			alert("Seleccione un método de envío");
			return;
		}
		
		let metodoEntrega = document.querySelector('input[name="metodeEnvio"]:checked').value
		let direccionEnvio;
		
		if(metodoEnvio.value === "Envio-Domicilio") {
			let inputDireccion = document.getElementById("direccionCompra");

			if(!inputDireccion || inputDireccion.value.trim() === "") {
				alert("Ingrese una dirección valida.");
				return;
			}

			direccionEnvio = inputDireccion.value;
		} else {
			direccionEnvio = "PickUp - Coronel Arroyo 521"
		}
		
		let datosEntrega = {
			metodoPago: metodoPago,
			metodoEntrega: metodoEntrega,
			direccion: direccionEnvio
		}
		guardarEnStorage("datosCompra",datosEntrega);
		window.location.href = "compra_realizada.html"
	})
}

