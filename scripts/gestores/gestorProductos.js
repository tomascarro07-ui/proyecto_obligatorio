let productos = leerDeStorage("productosRegistrados",[]);

import { Producto } from "../clases/producto.js";
export class GestorProducto {
	constructor() {
		this.productos = [];
	}
	
	agregarProducto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto) {
		let producto = new Producto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto);
		productos.push(producto);
		guardarEnStorage("productosRegistrados",productos);
		alert("¡Producto registrado correctamente!");
	}
	
	existeProductoRegistrado(producto) {
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].nombreProducto.toLowerCase().replaceAll(" ", "") === producto.toLowerCase().replaceAll(" ", "")) {
				return true;
			};
		};
		return false;
	}
}