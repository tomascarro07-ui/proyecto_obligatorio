import { GestorCarrito } from "../gestores/gestorCarrito.js";
let gestorCarrito = new GestorCarrito();

usuarioActual = validarSesion();
if(usuarioActual === null) {
	window.location.href = "login.html";
}
let productosCarrito = leerDeStorage("productosMiCarrito",[]);
let productos = leerDeStorage("productosRegistrados",[]);

inicializar();

function inicializar() {
    mostrarCarrito()
	continuarCompra();
}

function mostrarCarrito() {
	let carrito = "Productos en mi carrito: <br><br>";
	let sumaTotal = 0;
	let sumaIva = 0;
	let sumaSinIva = 0; 
	for(let i = 0; i < productosCarrito.length; i++) {
		let productoCarrito = productosCarrito[i]
		if(productoCarrito.usuario == usuarioActual.correo) {
			let monto = Number(productoCarrito.precio) / (1 + Number(productoCarrito.iva) / 100);
			let iva = Number(productoCarrito.precio) - monto;
			sumaSinIva += monto
			sumaIva += iva
			sumaTotal += Number(productoCarrito.precio)
			carrito += `<div class="mp-card"> <h3>${productoCarrito.nombre}</h3> <br> Precio por unidad: $${productoCarrito.precioUnitario} <br> Cantidad: ${productoCarrito.cantidad} <br> Subtotal del producto: $${productoCarrito.precio} <br><img width="120px"src="${productoCarrito.foto}"> <br> <button type="button" class="mp-btn mp-btn-primary" data-accion="editar" data-nombre="${productoCarrito.nombre}" data-cantidadUser="${productoCarrito.cantidad}" data-precio="${productoCarrito.precio}" data-img="${productoCarrito.foto}">Editar Producto</button> <button type="button" class="mp-btn mp-btn-secondary" data-accion="eliminar" data-nombre="${productoCarrito.nombre}">Eliminar Producto</button><br><br><br> </div>`
		}
		let total = `<div class="mp-card"> <hr> <h3>Resumen de la compra:</h3> Monto (sin IVA): ${sumaSinIva.toFixed(2)} <br> IVA: $${sumaIva.toFixed(2)} <br><br> TOTAL: $${sumaTotal.toFixed(2)}</div>`
		document.getElementById("micarrito").innerHTML = carrito
		document.getElementById("totalCompra").innerHTML = total
	}	
}

function continuarCompra() {
	let continuar = "";
	let carritoUsuario = productosCarrito.filter(function(producto) {
		return producto.usuario == usuarioActual.correo;
	});
	
	if(carritoUsuario.length > 0) {
		continuar = `<button class="mp-btn mp-btn-primary" onclick="window.location.href='confirmar_compra.html'">Continuar</button> <br> <button class="mp-btn mp-btn-secondary" data-accion="eliminarCarrito">Eliminar mi carrito</button>`
	}
	document.getElementById("continuarCompra").innerHTML = continuar
}

document.addEventListener("DOMContentLoaded", function() {
    let catalogoDiv = document.getElementById("micarrito");
    if(catalogoDiv) {
        catalogoDiv.addEventListener("click",function(e) {
            let boton = e.target;
            if(boton.dataset.accion === "editar") {
                window.location.href = `editar_producto_user.html?nombre=${boton.dataset.nombre}`
            } else if (boton.dataset.accion === "eliminar") {
                document.getElementById("btnConfirmarEliminar").onclick = function() {
                    gestorCarrito.eliminarProducto(boton.dataset.nombre);
                };

                let modal = new bootstrap.Modal(document.getElementById("modalEliminarProducto"));
                modal.show();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let continuarCompra = document.getElementById("continuarCompra");
    if(continuarCompra) {
        continuarCompra.addEventListener("click",function(e) {
            let boton = e.target;
            if (boton.dataset.accion === "eliminarCarrito") {
                document.getElementById("btnConfirmarEliminarCarrito").onclick = function() {
                    for(let i = 0; i < productosCarrito.length; i++) {
						let productoCarrito = productosCarrito[i];
						if(productoCarrito.usuario == usuarioActual.correo) {
							for(let j = 0; j < productos.length; j++) {
								let producto = productos[j];
								if(productoCarrito.nombre === producto.nombreProducto) {
									producto.stockProducto += Number(productoCarrito.cantidad)
									guardarEnStorage("productosRegistrados",productos);
									break;
								}	
							}
						}
					}
					
					productosCarrito = productosCarrito.filter(function(productoCarrito) {
						return productoCarrito.usuario != usuarioActual.correo;
					});
					
					guardarEnStorage("productosMiCarrito",productosCarrito);
					guardarEnStorage("productosRegistrados",productos);
					window.location.href="index.html"
					return;
                };
                let modal = new bootstrap.Modal(document.getElementById("modalEliminarCarrito"));
                modal.show();
            }
        });
    }
});

