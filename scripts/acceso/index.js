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
			
			let registro = {
				nombre: document.getElementById("nombre").value,
				correo: document.getElementById("correo").value,
				contrasenia: document.getElementById("contrasenia").value,
				admin: false
			}
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