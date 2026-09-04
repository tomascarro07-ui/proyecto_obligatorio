protegerPagina();
import { GestorCategorias } from "../gestores/gestorCategorias.js";
let gestorCategorias = new GestorCategorias();

function mostrarCategorias() {
	let categorias = leerDeStorage("categoriasRegistradas",[]);
	let filtroCategoria = "";
	for(let i = 0; i < categorias.length; i++) {
		let categoria = categorias[i];
			filtroCategoria += `<div class="mp-card"> <p>${categoria.nombreCategoria}</p> <button type="button" class="mp-btn mp-btn-secondary" data-accion="eliminar" data-nombre="${categoria.nombreCategoria}">Borrar Categoria</button></div>`;
	}
	document.getElementById("mostrarFiltro").innerHTML = filtroCategoria;
}

mostrarCategorias();

document.addEventListener("DOMContentLoaded", function() {

    let categoriaDiv = document.getElementById("mostrarFiltro");
    if(categoriaDiv) {
        categoriaDiv.addEventListener("click",function(e) {
            let boton = e.target;
            if (boton.dataset.accion === "eliminar") {
                document.getElementById("btnConfirmarEliminar").onclick = function() {
                    gestorCategorias.eliminarCategoria(boton.dataset.nombre);
                };

                let modal = new bootstrap.Modal(document.getElementById("modalEliminarProducto"));
                modal.show();
            }
        });
    }
});
