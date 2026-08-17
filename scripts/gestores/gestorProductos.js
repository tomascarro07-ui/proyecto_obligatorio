let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);

import { Producto } from "../clases/producto.js";
export class GestorProducto {
	
	agregarProducto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto) {
		let producto = new Producto(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto);
		productos.push(producto);
		guardarEnStorage("productosRegistrados",productos);
		location.reload();
	}
	
	existeProductoRegistrado(producto) {
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].nombreProducto.toLowerCase().trim() === producto.toLowerCase().trim()) {
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
				for(let i = 0; i < productosCarrito.length; i++) {
					let productoCarrito = productosCarrito[i];
					if(producto.nombreProducto === productoCarrito.nombre) {
						productosCarrito.splice(i,1);
						guardarEnStorage("productosMiCarrito",productosCarrito);
					};
				};
				location.reload();
				break;
			};
		};
	};

	editarProductos(nombreOriginal,nombreProducto,tipoProducto,stockProducto,precioProducto,imgProducto,ivaProducto) {
		for(let i = 0; i < productos.length; i++) {
			let producto = productos[i];
			if(producto.nombreProducto === nombreOriginal) {
				let precioFinal = precioProducto + (precioProducto * ivaProducto / 100);
				producto.nombreProducto = nombreProducto;
				producto.tipoProducto = tipoProducto;
				producto.stockProducto = stockProducto;
				producto.precioProducto = precioProducto;
				producto.imgProducto = imgProducto;
				producto.ivaProducto = ivaProducto;
				producto.precioFinal = precioFinal;
			}
		}
		guardarEnStorage("productosRegistrados",productos);
	}
}