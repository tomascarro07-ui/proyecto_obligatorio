let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let filtros = leerDeStorage("filtrosRegistrados", []);
let usuarioActual = validarSesion();
inicializarFiltro()

if(!usuarioActual.admin){
    alert("Acceso denegado");
    window.location.href = "menu.html";
}

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
			
			if((document.getElementById("nombreProducto").value).replaceAll(" ", "") === "") {
				alert("¡El nombre del producto no puede estar vacío!");
				return;
			}
			
			if(existeProductoRegistrado(document.getElementById("nombreProducto").value)) {
				alert("¡Este producto ya esta registrado!");
				return;
			}
		
			let registroProducto = new Producto (
				Number(document.getElementById("idProducto").value),
				document.getElementById("nombreProducto").value,
				Number(document.getElementById("cantidadProducto").value),
				Number(document.getElementById("precioProducto").value),
				Number(document.getElementById("ivaProducto").value),
				document.getElementById("imgProducto").value,
				document.getElementById("filtroTipo").value
			);

			productos.push(registroProducto);
			guardarEnStorage("productosRegistrados",productos);
			alert("¡Producto registrado correctamente!");
			mostrarCatalogo();
			limpiarControles();
		});
	};
});

function existeProductoRegistrado(producto) {
	let productos = leerDeStorage("productosRegistrados",[]);
	for(let i = 0; i < productos.length; i++) {
		if(productos[i].nombreProducto.toLowerCase().replaceAll(" ", "") === producto.toLowerCase().replaceAll(" ", "")) {
			return true;
		};
	};
	return false;
};

function mostrarCatalogo() {
	productos = leerDeStorage("productosRegistrados",[]);
	let catalogo = "";
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
			catalogo += `<div class="card"> <h3>${producto.nombreProducto}</h3> <br> Tipo de producto: ${producto.tipoProducto} <br> Stock del producto: ${producto.stockProducto} <br> Precio del producto: ${producto.precioProducto} <br> Iva del producto: ${producto.ivaProducto}% <br> <button type="button" class="btn btn-primary" onclick="window.location.href='editar_producto_admin.html?nombre=${producto.nombreProducto}&stock=${producto.stockProducto}&precio=${producto.precioProducto}&img=${producto.imagenProducto}&iva=${producto.ivaProducto}&tipo=${producto.tipoProducto}'">Editar Producto</button> <button type="button" class="btn btn-secondary" onclick="borrarProducto('${producto.nombreProducto}')">Borrar Producto</button></div>`;
	}
	document.getElementById("catalogoProductos").innerHTML = catalogo;
}

mostrarCatalogo();

function borrarProducto(nombre) {
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		if(producto.nombreProducto === nombre) {
			let eliminarProducto = window.confirm("¿Deseas eliminar este producto?");
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

