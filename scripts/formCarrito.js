import { GestorCarrito } from "./gestores/gestorCarrito.js";

let usuarioActual = validarSesion();
let gestorCarrito = new GestorCarrito();
let formProducto = document.getElementById("form-producto");

if(formProducto) {
	formProducto.addEventListener("submit",function(e){
		e.preventDefault(); 

		let cantidadAlCarrito = Number(document.getElementById("agregarCantProducto").value);
		let precioFinal = Number(precioAlCarrito.toFixed(2) * cantidadAlCarrito);

		if (cantidadAlCarrito <= 0) {
			alert("¡Ingrese un número valido!");
			return;
		}
        
		if (cantidadAlCarrito > stockProducto) {
			alert("¡No tenemos esa cantidad! Intente de nuevo");
			return;
		}

        gestorCarrito.agregarProductoCarrito (
			productoNombre,   
			precioFinal,   
			precioAlCarrito, 
			cantidadAlCarrito,
			ivaProducto,
			fotoProducto,
			usuarioActual.correo
		);
		alert("¡Producto agregado correctamente!");
		window.location.href = "index.html";
    });
}
