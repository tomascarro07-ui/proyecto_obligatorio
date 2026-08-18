protegerPagina();
import { GestorProducto } from "../gestores/gestorProductos.js";
let gestorProductos = new GestorProducto();

let productos = leerDeStorage("productosRegistrados",[]);
let categorias = leerDeStorage("categoriasRegistradas",[]);

let lista = document.getElementById("filtroTipo");
	for(let i = 0; i < categorias.length; i++) {
		let opcion = document.createElement("option");
		opcion.textContent = categorias[i].nombreCategoria;
		lista.appendChild(opcion);
}

let parametros = new URLSearchParams(window.location.search);
let nombreOriginal = parametros.get("nombre");

for(let i = 0; i < productos.length; i++) {
	let producto = productos[i];
	if(producto.nombreProducto === nombreOriginal) {
		document.getElementById("nombreProducto").value = producto.nombreProducto;
		document.getElementById("filtroTipo").value = producto.tipoProducto;
		document.getElementById("cantidadProducto").value = producto.stockProducto;
		document.getElementById("precioProducto").value = producto.precioProducto;
		document.getElementById("imgProducto").value = producto.imagenProducto;
		document.getElementById("ivaProducto").value = producto.ivaProducto;
	}
}

document.addEventListener("DOMContentLoaded", function() {
	let formEditarProducto = document.getElementById("form-editarProducto");
	
	if(formEditarProducto) {
		formEditarProducto.addEventListener("submit",function (e) {
			e.preventDefault();
			gestorProductos.editarProductos (
				nombreOriginal,
				document.getElementById("nombreProducto").value,
				document.getElementById("filtroTipo").value,
				Number(document.getElementById("cantidadProducto").value),
				Number(document.getElementById("precioProducto").value),
				document.getElementById("imgProducto").value,
				Number(document.getElementById("ivaProducto").value),
			)
			window.location.href="admin.html";
		});
	};
});

