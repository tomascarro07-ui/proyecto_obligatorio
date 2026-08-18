export class Producto {
	#id
	#nombreProducto
	#stockProducto
	#precioProducto
	#ivaProducto
	#imagenProducto
	#precioFinal
	#tipoProducto
	constructor(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto) {
		this.id = id
		this.nombreProducto = nombreProducto;
		this.stockProducto = stockProducto;
		this.precioProducto = precioProducto;
		this.ivaProducto = ivaProducto;
		this.imagenProducto = imagenProducto;
		this.precioFinal = (precioProducto + (precioProducto * ivaProducto / 100)).toFixed(2);
		this.tipoProducto = tipoProducto;
	}
};
