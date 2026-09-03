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
    
    eliminarProducto(nombre) {
		for(let i = 0; i < productosCarrito.length; i++) {
			let productoCarrito = productosCarrito[i]
			if(productoCarrito.nombre === nombre && productoCarrito.usuario == usuarioActual.correo) {
                    for(let j = 0; j < productos.length; j++) {
                        let producto = productos[j];
                        if(productoCarrito.nombre === producto.nombreProducto) {
                            producto.stockProducto += Number(productoCarrito.cantidad)
                            guardarEnStorage("productosRegistrados",productos);
                            break;
                        }	
                    }
                productosCarrito.splice(i,1)
            }
        }
        guardarEnStorage("productosMiCarrito",productosCarrito)
        location.reload();
        return;
    }

	calcularResumen(usuario) {
		let sumaTotal = 0;
		let sumaIva = 0;
		let sumaSinIva = 0; 
		for(let i = 0; i < productosCarrito.length; i++) {
			let productoCarrito = productosCarrito[i];
			if(productoCarrito.usuario == usuario) {
				let monto = Number(productoCarrito.precio) / (1 + Number(productoCarrito.iva) / 100);
				let iva = Number(productoCarrito.precio) - monto;
				sumaSinIva += monto;
				sumaIva += iva;
				sumaTotal += Number(productoCarrito.precio);
				
			}
		}
		return {sumaTotal, sumaIva, sumaSinIva};
	}
}