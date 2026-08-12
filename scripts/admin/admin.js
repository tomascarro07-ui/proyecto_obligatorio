let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let filtros = leerDeStorage("filtrosRegistrados", []);
let usuarioActual = validarSesion();
inicializarFiltro()

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
			
			
			mostrarCatalogo();
			limpiarControles();
		});
	};
});

function mostrarCatalogo() {
	productos = leerDeStorage("productosRegistrados",[]);
	let catalogo = "";
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		if(producto.stockProducto > 0) {
			catalogo += `<div class="mp-card"> <h3>${producto.nombreProducto}</h3> <br> Tipo de producto: ${producto.tipoProducto} <br> Stock del producto: ${producto.stockProducto} <br> Precio del producto: ${producto.precioProducto} <br> Iva del producto: ${producto.ivaProducto}% <br> <button type="button" class="mp-btn mp-btn-primary" onclick="window.location.href='editar_producto_admin.html?nombre=${producto.nombreProducto}&stock=${producto.stockProducto}&precio=${producto.precioProducto}&img=${producto.imagenProducto}&iva=${producto.ivaProducto}&tipo=${producto.tipoProducto}'">Editar Producto</button> <button type="button" class="mp-btn mp-btn-secondary" onclick="borrarProducto('${producto.nombreProducto}')">Borrar Producto</button></div>`;
		} else {
			catalogo += `<div class="mp-card"> <h3>${producto.nombreProducto}</h3> <br> Tipo de producto: ${producto.tipoProducto} <br> <b><p style="color:red">¡Falta de Stock. Verificar!</p></b> Precio del producto: ${producto.precioProducto} <br> Iva del producto: ${producto.ivaProducto}% <br> <button type="button" class="mp-btn mp-btn-primary" onclick="window.location.href='editar_producto_admin.html?nombre=${producto.nombreProducto}&stock=${producto.stockProducto}&precio=${producto.precioProducto}&img=${producto.imagenProducto}&iva=${producto.ivaProducto}&tipo=${producto.tipoProducto}'">Editar Producto</button> <button type="button" class="mp-btn mp-btn-secondary" onclick="borrarProducto('${producto.nombreProducto}')">Borrar Producto</button></div>`;
		}
	}
	document.getElementById("catalogoProductos").innerHTML = catalogo;
}

mostrarCatalogo();

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

