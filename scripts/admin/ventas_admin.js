protegerPagina();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])

function mostarVentas() {
	let ventas = "";
	let ventaTotal = 0;
	let botonEstado = "";
	for(let i = 0; i < ventasRealizadas.length; i++) {
		let venta = ventasRealizadas[i]
		if(venta.estado === "Entregado") {
			botonEstado = `Estado: <b>Entregado</b>`;
		} else {
			botonEstado = `<button class="mp-btn mp-btn-primary" data-accion="enviado" data-id="${venta.id}">Marcar como entregado</button>`;
		}

		if(venta.metodoEntrega == "Envio-Domicilio") {
			ventas += `<div class="card"> 
				<h3>Cliente: ${venta.persona}</h3> 
				<p>Fecha: ${venta.fecha}</p> 
				<p>Cantidad de productos: ${venta.cantidadProductos}</p>
				<b>Detallado:</b> <br> <p>${venta.nombreProductos}</p>
				<p>Metodo de pago: ${venta.metodoPago}</p>
				<p>Metodo de envio: ${venta.metodoEntrega}</p>
				<p>Dirección de entrega: ${venta.direccion}</p> 
				<p>Subtotal: $${venta.subtotal.toFixed(2)}</p> 
				<p>IVA: $${venta.iva.toFixed(2)}</p> 
				<h3>Total: $${venta.sumaTotal.toFixed(2)}</h3> 
				${botonEstado}
			</div>
			<br><br> `;
		} else {
			ventas += `<div class="card"> 
				<h3>Cliente: ${venta.persona}</h3> 
				<p>Fecha: ${venta.fecha}</p> 
				<p>Cantidad de productos: ${venta.cantidadProductos}</p> 
				<b>Detallado:</b> <br> </p>${venta.nombreProductos}</p> 
				<p>Metodo de pago: ${venta.metodoPago}</p> 
				</p>Metodo de envio: ${venta.metodoEntrega}</p>
				<p>Subtotal: $${venta.subtotal.toFixed(2)}</p> 
				<p>IVA: $${venta.iva.toFixed(2)}</p> 
				<h3>Total: $${venta.sumaTotal.toFixed(2)}</h3> 
				${botonEstado}
			</div>
			<br><br> `;
		}
		ventaTotal += Number(venta.sumaTotal.toFixed(2))
	}
	document.getElementById("comprasRealizadas").innerHTML = ventas
	document.getElementById("totalGanancia").innerHTML = `<h2>Ganancia total: $${ventaTotal.toFixed(2)}</h2>`
}
mostarVentas();

document.addEventListener("DOMContentLoaded", function() {

    let categoriaDiv = document.getElementById("comprasRealizadas");
    if(categoriaDiv) {
        categoriaDiv.addEventListener("click",function(e) {
            let boton = e.target;
            if (boton.dataset.accion === "enviado") {
                for(let i = 0; i < ventasRealizadas.length; i++) {
					let venta = ventasRealizadas[i];
					if(venta.id == boton.dataset.id) {
						venta.estado = "Entregado";
						guardarEnStorage("comprasRealizadas",ventasRealizadas);
						location.reload();
					}
				}
            }
        });
    }
});
