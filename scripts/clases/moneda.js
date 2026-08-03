let cotizaciones = {};

async function obtenerCotizaciones() {
  try {
    const respuesta = await fetch(
		"https://tu-api.com/fetch-multi?from=UYU&to=EUR,USD,ARS"
	);
    
    if (!respuesta.ok) {
      throw new Error('Hubo un problema con la petición');
    }
    
    const datos = await respuesta.json();

	cotizaciones = datos.results;

	console.log(cotizaciones);
  } catch (error) {
    console.error('Error:', error);
  }
}

function convertirPrecio(precio, moneda){

    if(moneda === "UYU"){
        return precio;
    }

    return (precio * cotizaciones[moneda]).toFixed(2);
}