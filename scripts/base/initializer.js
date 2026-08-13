import { GestorProducto } from "../gestores/gestorProductos.js";

let gestorProductos = new GestorProducto();

function inicializarProductos() {
	let productos = leerDeStorage("productosRegistrados", []);

	if (productos.length > 0) {
		return;
	}
		
	const ivaExtento = 0;
	const ivaMinimo = 10;
	const ivaBasico = 22;

	gestorProductos.agregarProducto (
			1,
			"Teclado mecanico Redragon Kumara K552",
			12,
			1890,
			ivaMinimo,
			"img/teclado-mecanico-redragon-kumara-k552.png",
			"teclados"
	)

	gestorProductos.agregarProducto (
			2,
			"Mouse Logitech G203 Lightsync",
			15,
			1299,
			ivaBasico,
			"img/mouse-logitech-g203-lightsync.png",
			"mouses"
	)

	gestorProductos.agregarProducto (
			3,
			"Auriculares HyperX Cloud Stinger",
			8,
			2490,
			ivaMinimo,
			"img/hyperx-cloud-stinger.png",
			"auriculares"
	)

	gestorProductos.agregarProducto (
			4,
			"Mousepad XL gamer",
			20,
			590,
			ivaExtento,
			"img/mousepad-xl-gamer.png",
			"mouses"
	)

	gestorProductos.agregarProducto (
			5,
			"Teclado Logitech K120",
			25,
			899,
			ivaBasico,
			"img/teclado-logitech-k120.png",
			"teclados"
	)

	gestorProductos.agregarProducto (
			6,
			"Mouse inalambrico Logitech M185",
			18,
			990,
			ivaMinimo,
			"img/mouse-inalambrico-logitech-m185.png",
			"mouses"
	)

	gestorProductos.agregarProducto (
			7,
			"Auriculares Logitech H390 USB",
			10,
			1790,
			ivaExtento,
			"img/auriculares-logitech-h390-usb.png",
			"auriculares"
	)

	gestorProductos.agregarProducto (
			8,
			"Microfono Fifine K669",
			6,
			2990,
			ivaMinimo,
			"img/microfono-fifine-k669.png",
			"microfonos"
	)

	gestorProductos.agregarProducto (
			9,
			"Logitech C920",
			9,
			2499,
			ivaBasico,
			"img/logitech-c920.png",
			"webcams"
	)

	gestorProductos.agregarProducto (
			10,
			"Joystick USB  PC",
			14,
			1190,
			ivaExtento,
			"img/joystick-usb-pc.png",
			"joysticks"
	)
	/* Borre guardar en storage ya que el gestor tiene un almacenador de los productos, por lo tanto cada vez que se
	guardaban los productos en este local storage que teniamos aca, no se guardaban nunca en el del gestor */
}

inicializarProductos();


function inicializarFiltro() {
	let filtros = leerDeStorage("filtrosRegistrados", []);

	if (filtros.length > 0) {
		return;
	}

	filtros = [
    { 
		nombreFiltro: "teclados" 
	},
    { 
		nombreFiltro: "mouses" 
	},
    {
		nombreFiltro: "auriculares" 
	},
    {
		nombreFiltro: "microfonos" 
	},
    {
		nombreFiltro: "webcams" 
	},
    {
		nombreFiltro: "joysticks" 
	}
]
	guardarEnStorage("filtrosRegistrados",filtros);
}

inicializarFiltro()