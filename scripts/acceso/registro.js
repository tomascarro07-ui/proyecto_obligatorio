let usuarios = leerDeStorage("usuariosRegistrados",[]);

document.addEventListener("DOMContentLoaded",function() {
	let formRegistro = document.getElementById("form-registro");
	
	if(formRegistro) {
		formRegistro.addEventListener("submit",function(e) {
			e.preventDefault();
			
			if(usuarioYaValidado(document.getElementById("correo").value)) {
				alert("¡Este correo ya esta registrado!");
				return;
			}
			
			let registro = new Usuario (
				usuarios.length + 1,
				document.getElementById("correo").value,
				document.getElementById("nombre").value,
				document.getElementById("apellido").value,
				document.getElementById("contrasenia").value,
				false,
				document.getElementById("nacimiento").value,
			);
			
			usuarios.push(registro);
			guardarEnStorage("usuariosRegistrados",usuarios);
			alert("¡Registro realizado correctamente!");
			window.location.href = "login.html?correo="+registro.correo;
		});
	};
});

function usuarioYaValidado(correo) {
	let usuarios = leerDeStorage("usuariosRegistrados",[]);
	for(let i = 0; i < usuarios.length; i++) {
		if(usuarios[i].correo === correo) {
			return true;
		}
	}
	return false;
}

const hoy = new Date();
hoy.setFullYear(hoy.getFullYear() - 18);
const fechaMaxima = hoy.toISOString().split('T')[0];
document.getElementById('nacimiento').max = fechaMaxima;