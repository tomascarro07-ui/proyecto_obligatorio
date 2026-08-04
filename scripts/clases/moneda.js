let cotizaciones = [];
let conversion = [];
let conversionUnoAUno = leerDeStorage("conversionesMonedas",[]);

async function obtenerCotizaciones() {
  try {
    const respuesta = await fetch(
		"https://api.frankfurter.dev/v2/rates?base=UYU&quotes=EUR,USD,ARS"
	);
    
    if (!respuesta.ok) {
      throw new Error('Hubo un problema con la petición');
    }
    
    const datos = await respuesta.json();

	for (let i = 0; i < datos.length; i++) {
		cotizaciones[datos[i].quote] = datos[i].rate;
	}
	
	let dolar = (1 / cotizaciones.USD).toFixed(2);
	let euro = (1 / cotizaciones.EUR).toFixed(2);
	let pesoArgentino = (1 / cotizaciones.ARS).toFixed(2);

	let conversionMonedas = {
		dolar: dolar,
		euro: euro,
		pesoArgentino: pesoArgentino
	};
	
	conversion.push(conversionMonedas);
	guardarEnStorage("conversionesMonedas",conversion)

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

obtenerCotizaciones()

if(document.getElementById("dolar")) {
	for(let i = 0; i < conversionUnoAUno.length; i++) {
		let conversion = conversionUnoAUno[i];
		if(conversion.dolar) {
			document.getElementById("dolar").innerHTML = `1 Dólar = $${conversion.dolar} UYU`
		}
		if (conversion.euro) {
			document.getElementById("euro").innerHTML = `1 Euro = $${conversion.euro} UYU`
		}
		if (conversion.pesoArgentino) {
			document.getElementById("arsenal").innerHTML = `1 Peso Argentino = $${conversion.pesoArgentino} UYU`
		}
	}
}
