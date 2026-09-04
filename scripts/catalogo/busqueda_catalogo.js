usuarioActual = validarSesion();
let productos = leerDeStorage("productosRegistrados",[]);
let parametros = new URLSearchParams(window.location.search);
let productoNombre = parametros.get("nombre");

document.addEventListener("DOMContentLoaded",function(){
	let busqueda = "<center><h2>Esto hemos encontrado</h2></center> <br>";
	let busquedaInexistente = "<center><h2>No hemos encontrado ningún producto...</h2></center>";
	let productosBuscados = 0;
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		let nombre = producto.nombreProducto.toLowerCase().replaceAll(" ", "");
		let busquedaUser = productoNombre.toLowerCase().replaceAll(" ", "")
		if(nombre.includes(busquedaUser)) {
			busqueda += `<div class="mp-card"> ${producto.nombreProducto} <br> <img width="150px" src="${producto.imagenProducto}"><br> <button type="button" class="mp-btn mp-btn-primary" data-accion="productoClick" data-id="${producto.id}"> Ver detalles </button> <br><br><br> </div> `;
			productosBuscados++;
		};
	};
	if(productosBuscados === 0) {
		document.getElementById("catalogoProductos").innerHTML = busquedaInexistente;
		return;
	}
	document.getElementById("catalogoProductos").innerHTML = busqueda;
});


document.addEventListener("DOMContentLoaded", function() {
    let catalogoDiv = document.getElementById("catalogoProductos");
    if(catalogoDiv) {
        catalogoDiv.addEventListener("click",function(e) {
            let boton = e.target;
            if(boton.dataset.accion === "productoClick") {
                window.location.href = `producto.html?id=${boton.dataset.id}`
            }
        });
    }
});