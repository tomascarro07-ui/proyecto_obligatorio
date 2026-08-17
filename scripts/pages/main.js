// Mostrar catalogo, filtros, y elegir si editar productos, o eliminarlos, eliminando todo del admin.js
import { GestorProducto } from "../gestores/gestorProductos.js";
let gestorProductos = new GestorProducto();

let productos = leerDeStorage("productosRegistrados",[]);
let categorias = leerDeStorage("categoriasRegistradas",[]);

function mostrarCatalogo() {
	let productos = leerDeStorage("productosRegistrados",[]);
	let catalogo = "";
	for(let i = 0; i < productos.length; i++) {
		let producto = productos[i];
		if(producto.stockProducto > 0) {
			catalogo += `<div class="mp-card"> <h3>${producto.nombreProducto}</h3> <br> Tipo de producto: ${producto.tipoProducto} <br> Stock del producto: ${producto.stockProducto} <br> Precio del producto: ${producto.precioProducto} <br> Iva del producto: ${producto.ivaProducto}% <br> <button type="button" class="mp-btn mp-btn-primary" data-accion="editar" data-nombre="${producto.nombreProducto}" data-stock="${producto.stockProducto}" data-precio="${producto.precioProducto}" data-img="${producto.imagenProducto}" data-iva="${producto.ivaProducto}" data-tipo="${producto.tipoProducto}">Editar Producto</button> <button type="button" class="mp-btn mp-btn-secondary" data-accion="eliminar" data-nombre="${producto.nombreProducto}">Borrar Producto</button></div>`;
		} else {
			catalogo += `<div class="mp-card"> <h3>${producto.nombreProducto}</h3> <br> Tipo de producto: ${producto.tipoProducto} <br> <b><p style="color:red">¡Falta de Stock. Verificar!</p></b> Precio del producto: ${producto.precioProducto} <br> Iva del producto: ${producto.ivaProducto}% <br> <button type="button" class="mp-btn mp-btn-primary" data-accion="editar" data-nombre="${producto.nombreProducto}" data-stock="${producto.stockProducto}" data-precio="${producto.precioProducto}" data-img="${producto.imagenProducto}" data-iva="${producto.ivaProducto}" data-tipo="${producto.tipoProducto}">Editar Producto</button> <button type="button" class="mp-btn mp-btn-secondary" data-accion="eliminar" data-nombre="${producto.nombreProducto}">Borrar Producto</button></div>`;
		}
	}
	document.getElementById("catalogoProductos").innerHTML = catalogo;
}

mostrarCatalogo()

document.addEventListener("DOMContentLoaded", function() {
		
	let lista = document.getElementById("filtroTipo");
	for(let i = 0; i < categorias.length; i++) {
		let opcion = document.createElement("option");
		opcion.textContent = categorias[i].nombreCategoria;
		lista.appendChild(opcion);
	}

    let catalogoDiv = document.getElementById("catalogoProductos");
    if(catalogoDiv) {
        catalogoDiv.addEventListener("click",function(e) {
            let boton = e.target;
            if(boton.dataset.accion === "editar") {
                window.location.href=window.location.href = `editar_producto_admin.html?nombre=${boton.dataset.nombre}`
            } else if (boton.dataset.accion === "eliminar") {
                document.getElementById("btnConfirmarEliminar").onclick = function() {
                    gestorProductos.eliminarProducto(boton.dataset.nombre);
                };

                let modal = new bootstrap.Modal(document.getElementById("modalEliminarProducto"));
                modal.show();
            }
        });
    }
});

mostrarCatalogo();