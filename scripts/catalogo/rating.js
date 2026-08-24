const AUTORES = ["Martín G.", "Lucía R.", "Facundo P.", "Camila S.", "Nicolás F.", "Valentina A.", "Bruno M.", "Sofía D."];
const COMENTARIOS_POSITIVOS = [
	"Excelente producto, llegó antes de lo esperado.",
	"Muy buena calidad, cumple lo que promete.",
	"Lo uso todos los días y anda perfecto.",
	"Buena relación precio-calidad."
];
const COMENTARIOS_NEUTROS = [
	"Cumple, aunque esperaba un poco más.",
	"Está bien por el precio que tiene."
];
const COMENTARIOS_NEGATIVOS = [
	"No es lo que esperaba, algo flojo de calidad.",
	"Tardó bastante en llegar y el empaque vino golpeado."
];

// semilla a partir del nombre del producto: mismo nombre = mismos datos siempre
function seedDesdeTexto(texto) {
	let hash = 0;
	for (let i = 0; i < texto.length; i++) {
		hash = (hash << 5) - hash + texto.charCodeAt(i);
	}
	return Math.abs(hash);
}

// random pseudo-aleatorio pero repetible (misma semilla = misma secuencia)
function crearRandom(semilla) {
	let a = semilla;
	return function () {
		a = (a * 9301 + 49297) % 233280;
		return a / 233280;
	};
}

function generarRating(nombreProducto) {
	const clave = `rating_${nombreProducto}`;
	const guardado = localStorage.getItem(clave);

	if (guardado) {
		const datos = JSON.parse(guardado);
		// si es un rating de una versión vieja del script, lo regeneramos
		if (datos.distribucion && datos.reviews[0] && datos.reviews[0].rating !== undefined) return datos;
		localStorage.removeItem(clave);
	}

	const random = crearRandom(seedDesdeTexto(nombreProducto));

	const cantidad = 8 + Math.floor(random() * 240);

	// distribución por estrella (mayoría de 4-5, como cualquier ecommerce real)
	const conteo = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
	const reviews = [];

	for (let i = 0; i < cantidad; i++) {
		const p = random();
		let estrellas;
		if (p < 0.65) estrellas = 5;
		else if (p < 0.85) estrellas = 4;
		else if (p < 0.95) estrellas = 3;
		else if (p < 0.98) estrellas = 2;
		else estrellas = 1;

		conteo[estrellas]++;

		if (i < 5) { // solo guardamos texto para las primeras 5 (las que se muestran)
			let bancoComentarios;
			if (estrellas >= 4) bancoComentarios = COMENTARIOS_POSITIVOS;
			else if (estrellas === 3) bancoComentarios = COMENTARIOS_NEUTROS;
			else bancoComentarios = COMENTARIOS_NEGATIVOS;

			reviews.push({
				autor: AUTORES[Math.floor(random() * AUTORES.length)],
				rating: estrellas,
				texto: bancoComentarios[Math.floor(random() * bancoComentarios.length)]
			});
		}
	}

	const suma = Object.entries(conteo).reduce((acc, [estrellas, cant]) => acc + Number(estrellas) * cant, 0);
	const promedio = Number((suma / cantidad).toFixed(1));

	const distribucion = {};
	for (let estrellas = 1; estrellas <= 5; estrellas++) {
		distribucion[estrellas] = Math.round((conteo[estrellas] / cantidad) * 100);
	}

	const datos = { promedio, cantidad, distribucion, reviews };
	localStorage.setItem(clave, JSON.stringify(datos));
	return datos;
}

function pintarEstrellas(promedio) {
	const llenas = Math.round(promedio);
	let html = "";
	for (let i = 1; i <= 5; i++) {
		html += `<i class="bi ${i <= llenas ? "bi-star-fill" : "bi-star"}" style="color:#ffa726;"></i>`;
	}
	return html;
}

function pintarBarras(distribucion) {
	return [5, 4, 3, 2, 1].map(estrellas => `
		<div class="mb-2">
			<div style="display:flex; justify-content:space-between; color:#93a0c2; font-size:14px; margin-bottom:4px;">
				<span>${estrellas} estrellas</span>
				<span style="color:#ffa726; font-weight:600;">${distribucion[estrellas]}%</span>
			</div>
			<div style="height:8px; background-color:#0c111d; border-radius:4px; overflow:hidden;">
				<div style="height:100%; width:${distribucion[estrellas]}%; background-color:#ffa726; border-radius:4px;"></div>
			</div>
		</div>
	`).join("");
}

function pintarListaReviews(reviews) {
	if (reviews.length === 0) {
		return `<p style="color:#93a0c2;">Todavía no hay opiniones para este producto.</p>`;
	}

	return reviews.map(r => `
		<div style="border-bottom:1px solid #2a3454; padding:12px 0;">
			<strong>${r.autor}</strong>
			<span style="margin-left:8px;">${pintarEstrellas(r.rating)}</span>
			<p style="color:#d8dcea; margin:6px 0 0; text-align:left;">${r.texto}</p>
		</div>
	`).join("");
}

function mostrarRatingEnPagina(nombreProducto) {
	const datos = generarRating(nombreProducto);

	document.getElementById("ratingPromedio").textContent = datos.promedio;
	document.getElementById("ratingEstrellasGrande").innerHTML = pintarEstrellas(datos.promedio);
	document.getElementById("ratingCantidad").textContent = `Basado en ${datos.cantidad} opiniones`;
	document.getElementById("ratingBarras").innerHTML = pintarBarras(datos.distribucion);
	document.getElementById("listaReviews").innerHTML = pintarListaReviews(datos.reviews);
}

document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const nombreProducto = params.get("nombre");
	if (nombreProducto) mostrarRatingEnPagina(nombreProducto);
});