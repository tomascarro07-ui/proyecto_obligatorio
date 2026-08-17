let ventasRealizadas = leerDeStorage("comprasRealizadas",[]);
let usuarioActual = validarSesion();

function misCompras() {
	let compras = "";
	for(let i = 0; i < ventasRealizadas.length; i++) {
		let venta = ventasRealizadas[i];
		if(venta.correo === usuarioActual.correo) {	
			compras += `<div class="card"> <p>Fecha: ${venta.fecha}</p> <p>Cantidad de productos: ${venta.cantidadProductos}</p> Detallado: <br> ${venta.nombreProductos} <p>Subtotal: $${venta.subtotal}</p> <p>IVA: $${venta.iva}</p> <h3>Total: $${venta.sumaTotal}</h3> </div> `
		}
	}
	document.getElementById("comprasRealizadas").innerHTML = compras
}

misCompras()