let filtros = leerDeStorage("filtrosRegistrados", []);
let productos = leerDeStorage("productosRegistrados",[]);
let usuarioActual = validarSesion();
if(!usuarioActual.admin){
    alert("Acceso denegado");
    window.location.href = "menu.html";
}

document.addEventListener("DOMContentLoaded", function() {
	
	let formCategorias = document.getElementById("form-categoria");
	
	if(formCategorias) {
		formCategorias.addEventListener("submit",function(e) {
			e.preventDefault();
			
			if((document.getElementById("nombreCategoria").value).replaceAll(" ", "") === "") {
				alert("¡El nombre del filtro no puede estar vacío!");
				return;
			}
			
			if(existeFiltroRegistrado(document.getElementById("nombreCategoria").value)) {
				alert("¡Este filtro ya esta registrado!");
				return;
			}
			
			let filtro = {
				nombreFiltro: document.getElementById("nombreCategoria").value,
			}
			filtros.push(filtro);
			guardarEnStorage("filtrosRegistrados",filtros);
			alert("¡Filtro registrado correctamente!");
			location.reload();
		})
	}
});

function existeFiltroRegistrado(filtro) {
	let filtros = leerDeStorage("filtrosRegistrados",[]);
	for(let i = 0; i < filtros.length; i++) {
		if(filtros[i].nombreFiltro.toLowerCase().replaceAll(" ", "") === filtro.toLowerCase().replaceAll(" ", "")) {
			return true;
		};
	};
	return false;
};


function mostrarFiltros() {
	filtros = leerDeStorage("filtrosRegistrados",[]);
	let filtroCategoria = "";
	for(let i = 0; i < filtros.length; i++) {
		let filtro = filtros[i];
			filtroCategoria += `<div class="card"> <p>${filtro.nombreFiltro}</p><button type="button" class="btn btn-secondary" onclick="borrarFiltro('${filtro.nombreFiltro}')">Borrar Filtro</button></div>`;
	}
	document.getElementById("mostrarFiltro").innerHTML = filtroCategoria;
}
mostrarFiltros()

function borrarFiltro(nombre) {
	productos = leerDeStorage("productosRegistrados", []);
    filtros = leerDeStorage("filtrosRegistrados", []);

	for(let i = 0; i < filtros.length; i++) {
		let filtro = filtros[i];
		if(filtro.nombreFiltro === nombre) {
			let eliminarProducto = window.confirm("¿Deseas eliminar este filtro?");
			if(eliminarProducto) {
				filtros.splice(i,1);
				guardarEnStorage("filtrosRegistrados",filtros);
				for(let j = 0; j < productos.length; j++) {
					if((productos[j].tipoProducto).toLowerCase() === filtro.nombreFiltro.toLowerCase()){
						productos[j].tipoProducto = "";
					}
				}
                guardarEnStorage("productosRegistrados",productos);
			};
			location.reload();
			break;
		};
	};
};
