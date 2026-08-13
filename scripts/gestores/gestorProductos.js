let productos = leerDeStorage("productosRegistrados",[]);

import { Producto } from "../clases/producto.js";
export class GestorProducto {
	
	agregarProducto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto) {
		let producto = new Producto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto);
		productos.push(producto);
		guardarEnStorage("productosRegistrados",productos);
	}
	
	existeProductoRegistrado(producto) {
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].nombreProducto.toLowerCase().replaceAll(" ", "") === producto.toLowerCase().replaceAll(" ", "")) {
				return true;
			};
		};
		return false;
	}
	
	mostrarCatalogo() {
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
}
