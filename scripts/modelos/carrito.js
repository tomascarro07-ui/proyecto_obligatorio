export class Carrito {
	#nombre
	#precio
	#precioUnitario
	#cantidad
	#iva
	#foto
	#usuario
	constructor(nombre,precio,precioUnitario,cantidad,iva,foto,usuario) {
		this.nombre = nombre
		this.precio = precio;
		this.precioUnitario = precioUnitario;
		this.cantidad = cantidad;
		this.iva = iva;
		this.foto = foto;
		this.usuario = usuario;
	}
};
