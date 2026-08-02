let usuarioActual = validarSesion();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])
if(!usuarioActual.esAdministrador){
    alert("Acceso denegado");
    window.location.href = "menu.html";
}
	
function mostarVentas() {
	let ventas = "";
	let ventaTotal = 0;
	for(let i = 0; i < ventasRealizadas.length; i++) {
		let venta = ventasRealizadas[i]
		ventas += `<div class="card"> <h3>Cliente: ${venta.persona}</h3> <p>Fecha: ${venta.fecha}</p> <p>Cantidad de productos: ${venta.cantidadProductos}</p> Detallado: <br> ${venta.nombreProductos} <p>Subtotal: $${venta.subtotal}</p> <p>IVA: $${venta.iva}</p> <h3>Total: $${venta.sumaTotal}</h3> </div> `
		ventaTotal += Number(venta.sumaTotal)
	}
	document.getElementById("comprasRealizadas").innerHTML = ventas
	document.getElementById("totalGanancia").innerHTML = `Ganancia total: $${ventaTotal}`
}
mostarVentas();
