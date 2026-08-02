let usuarioActual = validarSesion();
let productos = leerDeStorage("productosRegistrados",[]);
if(!usuarioActual.esAdministrador){
    alert("Acceso denegado");
    window.location.href = "menu.html";
}
let filtros = leerDeStorage("filtrosRegistrados", []);

let parametros = new URLSearchParams(window.location.search);
let lista = document.getElementById("filtroTipo");
	for(let i = 0; i < filtros.length; i++) {
		let opcion = document.createElement("option");
		opcion.textContent = filtros[i].nombreFiltro;
		lista.appendChild(opcion);
}

let nombreOriginal = parametros.get("nombre");
let nombreProducto = parametros.get("nombre");
let cantidadUsuario = parametros.get("stock");
let precioNombre = parametros.get("precio");
let fotoProducto = parametros.get("img");
let ivaProducto = parametros.get("iva");
let tipoProducto = parametros.get("tipo");

document.getElementById("nombreProducto").value = nombreProducto;
document.getElementById("filtroTipo").value = tipoProducto;
document.getElementById("cantidadProducto").value = cantidadUsuario;
document.getElementById("precioProducto").value = precioNombre;
document.getElementById("imgProducto").value = fotoProducto;
document.getElementById("ivaProducto").value = ivaProducto;

document.addEventListener("DOMContentLoaded", function() {
	let formEditarProducto = document.getElementById("form-editarProducto");
	
	if(formEditarProducto) {
		formEditarProducto.addEventListener("submit",function (e) {
			e.preventDefault();
			for(let i = 0; i < productos.length; i++) {
				let producto = productos[i];
				
				let precioCrudo = Number(document.getElementById("precioProducto").value);
				let ivaCrudo = Number(document.getElementById("ivaProducto").value);
				let precio = precioCrudo + (precioCrudo * ivaCrudo / 100);
				
				if(producto.nombreProducto === nombreOriginal) {
					producto.nombreProducto = document.getElementById("nombreProducto").value;
					producto.stockProducto = document.getElementById("cantidadProducto").value;
					producto.precioProducto = document.getElementById("precioProducto").value;
					producto.imagenProducto = document.getElementById("imgProducto").value;
					producto.ivaProducto = document.getElementById("ivaProducto").value;
					producto.precioFinal = precio.toFixed(2);
					producto.tipoProducto = document.getElementById("filtroTipo").value;
				};
			};
			guardarEnStorage("productosRegistrados",productos);
			window.location.href="admin.html";
		});
	};
});
