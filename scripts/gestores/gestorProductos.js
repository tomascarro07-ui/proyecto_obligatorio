let productos = leerDeStorage("productosRegistrados",[]);
let productosCarrito = leerDeStorage("productosMiCarrito",[]);

import { Producto } from "../modelos/producto.js";
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

	editarProductos(nombreOriginal,nombreProducto,tipoProducto,stockProducto,precioProducto,imagenProducto,ivaProducto) {
		for(let i = 0; i < productos.length; i++) {
			let producto = productos[i];
			if(producto.nombreProducto === nombreOriginal) {
				let precioFinal = precioProducto + (precioProducto * ivaProducto / 100).toFixed(2);
				producto.nombreProducto = nombreProducto;
				producto.tipoProducto = tipoProducto;
				producto.stockProducto = stockProducto;
				producto.precioProducto = precioProducto;
				producto.imagenProducto = imagenProducto;
				producto.ivaProducto = ivaProducto;
				producto.precioFinal = precioFinal;
			}
		}
		guardarEnStorage("productosRegistrados",productos);
	}

	obtenerValorIva(tipo) {
		if(tipo == "minimo") {
			return 10;
		} else if (tipo == "basico") {
			return 22;
		} else {
			return 0;
		}
	}

	obtenerIvaTexto(valor) {
		if(valor == 10) {
			return "minimo";
		} else if(valor == 22) {
			return "basico";
		} else {
			return "exento";
		}
	}
}