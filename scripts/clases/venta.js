class Venta {
	constructor(id,fecha,persona,correo,cantidadProductos,iva,subtotal,nombreProductos,metodoPago,metodoEntrega,direccion) {
		this.id = id;
		this.fecha = fecha;
		this.persona = persona
		this.correo = correo;
		this.cantidadProductos = cantidadProductos;
		this.iva = iva;
		this.subtotal = subtotal;
		this.sumaTotal = subtotal + iva;
		this.nombreProductos = nombreProductos;
		this.metodoPago = metodoPago;
		this.metodoEntrega = metodoEntrega;
		this.direccion = direccion;
	};
};