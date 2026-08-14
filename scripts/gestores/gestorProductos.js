let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);

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

	eliminarProducto(nombre) {
			for(let i = 0; i < productos.length; i++) {
				let producto = productos[i];
				if(producto.nombreProducto === nombre) {
					productos.splice(i,1);
					guardarEnStorage("productosRegistrados",productos);
					for(let j = 0; j < productosCarrito.length; j++) {
						let productoCarrito = productosCarrito[j];
						if(producto.nombreProducto === productoCarrito.nombre) {
							productosCarrito.splice(j,1);
							guardarEnStorage("productosMiCarrito",productosCarrito);
						};
					};
				break;
			};
		};
	};
}
