protegerPagina();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])

function mostarVentas() {
	let ventas = "";
	let ventaTotal = 0;
	for(let i = 0; i < ventasRealizadas.length; i++) {
		let venta = ventasRealizadas[i]
		if(venta.metodoEntrega == "Envio-Domicilio") {
			ventas += `<div class="card"> <h3>Cliente: ${venta.persona}</h3> <p>Fecha: ${venta.fecha}</p> <p>Cantidad de productos: ${venta.cantidadProductos}</p> Detallado: <br> ${venta.nombreProductos} <p>Metodo de pago: ${venta.metodoPago} <p> Metodo de envio: ${venta.metodoEntrega} <p> Dirección de entrega: ${venta.direccion} <p>Subtotal: $${venta.subtotal.toFixed(2)}</p> <p>IVA: $${venta.iva.toFixed(2)}</p> <h3>Total: $${venta.sumaTotal.toFixed(2)}</h3> </div> `
		} else {
			ventas += `<div class="card"> <h3>Cliente: ${venta.persona}</h3> <p>Fecha: ${venta.fecha}</p> <p>Cantidad de productos: ${venta.cantidadProductos}</p> Detallado: <br> ${venta.nombreProductos} <p>Metodo de pago: ${venta.metodoPago} <p> Metodo de envio: ${venta.metodoEntrega}<p>Subtotal: $${venta.subtotal.toFixed(2)}</p> <p>IVA: $${venta.iva.toFixed(2)}</p> <h3>Total: $${venta.sumaTotal.toFixed(2)}</h3> </div> `
		}
		ventaTotal += Number(venta.sumaTotal.toFixed(2))
	}
	document.getElementById("comprasRealizadas").innerHTML = ventas
	document.getElementById("totalGanancia").innerHTML = `Ganancia total: $${ventaTotal.toFixed(2)}`
}
mostarVentas();
