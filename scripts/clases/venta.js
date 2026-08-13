class Venta {
	constructor(id,fecha,persona,correo,cantidadProductos,iva,subtotal,nombreProductos,metodoPago,metodoEntrega,direccion) {
		this.id = id;
		this.fecha = fecha;
		this.persona = persona
		this.correo = correo;
		this.cantidadProductos = cantidadProductos;
		this.iva = iva;
		this.subtotal = Number(subtotal.toFixed(2));
		this.sumaTotal = Number(subtotal.toFixed(2)) + Number(iva.toFixed(2));
		this.nombreProductos = nombreProductos;
		this.metodoPago = metodoPago;
		this.metodoEntrega = metodoEntrega;
		this.direccion = direccion;
	};
};