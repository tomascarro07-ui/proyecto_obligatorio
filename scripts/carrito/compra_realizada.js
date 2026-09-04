import { GestorCarrito } from "../gestores/gestorCarrito.js";

let gestorCarrito = new GestorCarrito();
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);
usuarioActual = validarSesion();
let ventasRealizadas = leerDeStorage("comprasRealizadas",[])
let datosEntrega = leerDeStorage("datosCompra",[])

function resumenCompra() {
	let carrito = "Productos: <br><br>";
	let {sumaTotal,sumaIva,sumaSinIva} = gestorCarrito.calcularResumen(usuarioActual.correo);
	let cantidadProducto = 0; 
	let nombreProducto = "";
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i];
		if(productoCarrito.usuario == usuarioActual.correo) {
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
		datosEntrega.direccion,
		"En agencia"
	);
	
	ventasRealizadas.push(ventaRealizada);
	guardarEnStorage("comprasRealizadas",ventasRealizadas);
	guardarEnStorage("productosRegistrados",productos);
	vaciarCarrito()
	let total = `TOTAL: $${sumaTotal.toFixed(2)}`;
	document.getElementById("micarrito").innerHTML = carrito;
	document.getElementById("totalCompra").innerHTML = total;
};

resumenCompra();

function vaciarCarrito() {	
	productosCarrito = productosCarrito.filter(function(productoCarrito) {
		return productoCarrito.usuario != usuarioActual.correo;
	});
	
	guardarEnStorage("productosMiCarrito",productosCarrito);
	return;
}