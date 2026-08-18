import { GestorProducto } from "./gestores/gestorProductos.js";

let gestorProductos = new GestorProducto();
let formProductos = document.getElementById("form-productos")

if(formProductos) {
	formProductos.addEventListener("submit",function(e) {
		e.preventDefault();
		
		let nombreProducto = document.getElementById("nombreProducto").value;

		if((nombreProducto.trim()) === "") {
			alert("¡El nombre del producto no puede estar vacío!");
			return;
		}
		
		if(gestorProductos.existeProductoRegistrado(nombreProducto)) {
			alert("¡Este producto ya esta registrado!");
			return;
		}
		
		gestorProductos.agregarProducto (
			Number(document.getElementById("idProducto").value),
			document.getElementById("nombreProducto").value,
			Number(document.getElementById("cantidadProducto").value),
			Number(document.getElementById("precioProducto").value),
			Number(document.getElementById("ivaProducto").value),
			document.getElementById("imgProducto").value,
			document.getElementById("filtroTipo").value
		);
	});
}
