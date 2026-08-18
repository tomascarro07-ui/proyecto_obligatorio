document.addEventListener("DOMContentLoaded",function(){
	let categorias = leerDeStorage("categoriasRegistradas",[]);
	let filtro = document.getElementById("filtroTipo");
	
	for(let i = 0; i < categorias.length; i++) {
		let opcion = document.createElement("option");
		opcion.textContent = categorias[i].nombreCategoria;
		filtro.appendChild(opcion);
	}
	
    if (filtro) {
        filtro.addEventListener("change", function() {
            mostrarCatalogo(this.value);
        });
    };
    mostrarCatalogo("todas");
});


function mostrarCatalogo(tipo) {
	let productos = leerDeStorage("productosRegistrados",[]);
	let catalogo = "";
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		if(producto.tipoProducto === tipo || tipo === "todas" || tipo === "") {
			catalogo +=`<div class="producto-card"> <img class="producto-img" src="${producto.imagenProducto}"> <div class="producto-info"> <h3>${producto.nombreProducto}</h3> <p>$${producto.precioFinal}</p></div> <div class="producto-btn"> <button class="mp-btn mp-btn-primary" onclick="window.location.href='producto.html?nombre=${producto.nombreProducto}'">Ver detalles</button> </div> </div>`;
		};
	};
	if(tipo !== "todas") {
		document.getElementById("catalogoProductos").innerHTML = `<button class="mp-btn mp-btn-small" onclick="eliminarFiltro()">Eliminar Filtro</button><br><br>${catalogo}`;
	} else {
		document.getElementById("catalogoProductos").innerHTML = `${catalogo}`;
	};
};


function eliminarFiltro() {
	document.getElementById("filtroTipo").value = "todas";
	mostrarCatalogo("todas");
};

