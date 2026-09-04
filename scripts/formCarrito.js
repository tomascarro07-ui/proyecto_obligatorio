import { GestorCarrito } from "./gestores/gestorCarrito.js";

let usuarioActual = validarSesion();
let gestorCarrito = new GestorCarrito();
let formProducto = document.getElementById("form-producto");

if(formProducto) {
	formProducto.addEventListener("submit",function(e){
		e.preventDefault(); 

		let cantidadAlCarrito = Number(document.getElementById("agregarCantProducto").value);
		let precioFinal = Number(precioAlCarrito * cantidadAlCarrito).toFixed(2);

		if (cantidadAlCarrito <= 0) {
			alert("¡Ingrese un número valido!");
			return;
		}
        
		if (cantidadAlCarrito > stockProducto) {
			alert("¡No tenemos esa cantidad! Intente de nuevo");
			return;
		}

		if(usuarioActual) {
			gestorCarrito.agregarProductoCarrito (
				productoNombre,   
				precioFinal,   
				precioAlCarrito, 
				cantidadAlCarrito,
				ivaProducto,
				fotoProducto,
				usuarioActual.correo
			);
			
			stockProducto -= cantidadAlCarrito;
            document.getElementById("cantidadProducto").innerHTML = `Stock: ${stockProducto}`;
			guardarEnStorage("mensajeCarrito",true);
			window.location.href="index.html";
		} else {
			window.location.href = "registro.html";
		}
    });
}