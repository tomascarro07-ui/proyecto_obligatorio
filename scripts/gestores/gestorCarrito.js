let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);

import { Carrito } from "../modelos/carrito.js";
export class GestorCarrito {

	agregarProductoCarrito(nombre, precio, precioUnitario, cantidad, iva, foto, usuario) {
		let agregarProducto = new Carrito(nombre, precio, precioUnitario, cantidad, iva, foto, usuario);
		let repetido = false;

		for(let i = 0; i < productos.length; i++) {
			let producto = productos[i];
			if(agregarProducto.nombre === producto.nombreProducto) {
				producto.stockProducto -= agregarProducto.cantidad;
				break;
			}
		}
		guardarEnStorage("productosRegistrados", productos);

		for(let i = 0; i < productosCarrito.length; i++) {
			let productoCarrito = productosCarrito[i];
			if(productoCarrito.nombre === agregarProducto.nombre && productoCarrito.usuario == agregarProducto.usuario) {
				productoCarrito.cantidad += agregarProducto.cantidad;
				productoCarrito.precio = Number(agregarProducto.precio) + Number(productoCarrito.precio);
				repetido = true;
				break;
			}
		}

		if(!repetido) {
			productosCarrito.push(agregarProducto);
		}

		guardarEnStorage("productosMiCarrito", productosCarrito);
	}
    
    // existeProductoRegistrado(producto) {
    //     for(let i = 0; i < productos.length; i++) {
    //         if(productos[i].nombreProducto.toLowerCase().trim() === producto.toLowerCase().trim()) {
    //             return true;
    //         };
    //     };
    //     return false;
    // }
    
    // eliminarProducto(nombre) {
    //     for(let i = 0; i < productos.length; i++) {
    //         let producto = productos[i];
    //         if(producto.nombreProducto === nombre) {
    //             productos.splice(i,1);
    //             guardarEnStorage("productosRegistrados",productos);
    //             for(let i = 0; i < productosCarrito.length; i++) {
    //                 let productoCarrito = productosCarrito[i];
    //                 if(producto.nombreProducto === productoCarrito.nombre) {
    //                     productosCarrito.splice(i,1);
    //                     guardarEnStorage("productosMiCarrito",productosCarrito);
    //                 };
    //             };
    //             location.reload();
    //             break;
    //         };
    //     };
    // };

    // editarProductos(nombreOriginal,nombreProducto,tipoProducto,stockProducto,precioProducto,imgProducto,ivaProducto) {
    //     for(let i = 0; i < productos.length; i++) {
    //         let producto = productos[i];
    //         if(producto.nombreProducto === nombreOriginal) {
    //             let precioFinal = precioProducto + (precioProducto * ivaProducto / 100);
    //             producto.nombreProducto = nombreProducto;
    //             producto.tipoProducto = tipoProducto;
    //             producto.stockProducto = stockProducto;
    //             producto.precioProducto = precioProducto;
    //             producto.imgProducto = imgProducto;
    //             producto.ivaProducto = ivaProducto;
    //             producto.precioFinal = precioFinal;
    //         }
    //     }
    //     guardarEnStorage("productosRegistrados",productos);
    // }
}