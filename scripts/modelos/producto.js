export class Producto {
	constructor(id,nombreProducto,stockProducto,precioProducto,ivaProducto,imagenProducto,tipoProducto) {
		this.id = id
		this.nombreProducto = nombreProducto;
		this.stockProducto = stockProducto;
		this.precioProducto = Number(precioProducto);
		this.ivaProducto = Number(ivaProducto);
		this.imagenProducto = imagenProducto;
		this.precioFinal = Number(precioProducto + (precioProducto * ivaProducto / 100)).toFixed(2);
		this.tipoProducto = tipoProducto;
	}
};
