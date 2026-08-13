let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let filtros = leerDeStorage("filtrosRegistrados", []);
let usuarioActual = validarSesion();

import { GestorProducto } from "../gestores/gestorProductos.js";
let gestorProductos = new GestorProducto();
gestorProductos.mostrarCatalogo();

if(!usuarioActual.esAdministrador){
    alert("Acceso denegado");
    window.location.href = "index.html";
}

document.getElementById("idProducto").value = Number(productos.length + 1);

document.addEventListener("DOMContentLoaded", function() {
		
	let lista = document.getElementById("filtroTipo");
	for(let i = 0; i < filtros.length; i++) {
		let opcion = document.createElement("option");
		opcion.textContent = filtros[i].nombreFiltro;
		lista.appendChild(opcion);
	}
	
	let formProductos = document.getElementById("form-productos");
	
	if(formProductos) {
		formProductos.addEventListener("submit",function(e) {
			e.preventDefault();
			
			
			
			limpiarControles();
		});
	};
});

function borrarProducto(nombre) {
	document.getElementById("btnConfirmarEliminar").onclick = function() {
		eliminarProducto(nombre);
	};

	let modal = new bootstrap.Modal(document.getElementById("modalEliminarProducto"));
	modal.show();
}

function eliminarProducto(nombre) {
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		if(producto.nombreProducto === nombre) {
			if(eliminarProducto) {
				productos.splice(i,1);
				guardarEnStorage("productosRegistrados",productos);
				for(let i = 0; i < productosCarrito.length; i++) {
					let productoCarrito = productosCarrito[i];
					if(producto.nombreProducto === productoCarrito.nombre) {
						productosCarrito.splice(i,1);
						guardarEnStorage("productosMiCarrito",productosCarrito);
					};
				};
			};
			location.reload();
			break;
		};
	};
};

function limpiarControles() {
	document.getElementById("nombreProducto").value = "";
	document.getElementById("cantidadProducto").value = "";
	document.getElementById("precioProducto").value = "";
	document.getElementById("ivaProducto").value = "";
	document.getElementById("imgProducto").value = "";
}

