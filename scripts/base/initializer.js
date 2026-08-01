function inicializarProductos() {
	let productos = leerDeStorage("productosRegistrados", []);

	if (productos.length > 0) {
		return;
	}

	productos = [
		new Producto(
			1,
			"Teclado mecanico Redragon Kumara K552",
			12,
			1890,
			10,
			"img/teclado-mecanico-redragon-kumara-k552.png",
			"teclados"
		),

		new Producto(
			2,
			"Mouse Logitech G203 Lightsync",
			15,
			1299,
			22,
			"img/mouse-logitech-g203-lightsync.png",
			"mouses"
		),

		new Producto(
			3,
			"Auriculares HyperX Cloud Stinger",
			8,
			2490,
			10,
			"img/hyperx-cloud-stinger.png",
			"auriculares"
		),

		new Producto(
			4,
			"Mousepad XL gamer",
			20,
			590,
			0,
			"img/mousepad-xl-gamer.png",
			"mouses"
		),

		new Producto(
			5,
			"Teclado Logitech K120",
			25,
			899,
			22,
			"img/teclado-logitech-k120.png",
			"teclados"
		),

		new Producto(
			6,
			"Mouse inalambrico Logitech M185",
			18,
			990,
			10,
			"img/mouse-inalambrico-logitech-m185.png",
			"mouses"
		),

		new Producto(
			7,
			"Auriculares Logitech H390 USB",
			10,
			1790,
			0,
			"img/auriculares-logitech-h390-usb.png",
			"auriculares"
		),

		new Producto(
			8,
			"Microfono Fifine K669",
			6,
			2990,
			10,
			"img/microfono-fifine-k669.png",
			"microfonos"
		),

		new Producto(
			9,
			"Webcam Full HD 1080p",
			9,
			2499,
			22,
			"img/webcam-full-hd-1080p.png",
			"webcams"
		),

		new Producto(
			10,
			"Joystick USB PC",
			14,
			1190,
			0,
			"img/joystick-usb-pc.png",
			"joysticks"
		)
	];

	guardarEnStorage("productosRegistrados", productos);
}


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