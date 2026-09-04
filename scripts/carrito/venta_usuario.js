let ventasRealizadas = leerDeStorage("comprasRealizadas",[]);
usuarioActual = validarSesion();

function misCompras() {
	let compras = "";
	for(let i = 0; i < ventasRealizadas.length; i++) {
		let venta = ventasRealizadas[i];
		if(venta.correo === usuarioActual.correo) {	
			if(venta.estado == "Entregado") {
				compras += `<div class="card"> 
					<h2>Número de compra: Compra #${venta.id} </h2> 
					<p>Fecha: ${venta.fecha}</p> 
					<p>Cantidad de productos: ${venta.cantidadProductos}</p> 
					<b>Detallado:</b> <br> </p>${venta.nombreProductos}</p> 
					<p>Subtotal: $${venta.subtotal}</p> 
					<p>IVA: $${venta.iva}</p> 
					<h3>Total: $${venta.sumaTotal}</h3> 
					<p>Estado: <b>Entregado</b></p>
				</div> 
				<br><br>`
			} else {
				compras += `<div class="card"> 
					<h2>Número de compra: Compra #${venta.id} </h2> 
					<p>Fecha: ${venta.fecha}</p> 
					<p>Cantidad de productos: ${venta.cantidadProductos}</p> 
					<b>Detallado:</b> <br> <p>${venta.nombreProductos}</p> 
					<p>Subtotal: $${venta.subtotal}</p> 
					<p>IVA: $${venta.iva}</p> 
					<h3>Total: $${venta.sumaTotal}</h3> 
					<p>Estado: <b>Pendiente de entrega</b></p>
				</div> 
				<br><br>`
			}
			
		}
	}
	document.getElementById("comprasRealizadas").innerHTML = compras
}

misCompras()