let parametros = new URLSearchParams(window.location.search);
let correo = parametros.get("correo");
const admin = {
    correo: "admin@admin",
    contrasenia: "admin123",
    nombre: "admin"
};

document.getElementById("correo").value = correo;

document.addEventListener("DOMContentLoaded",function() {
	let formLogin = document.getElementById("form-login");
	if(formLogin) {
		formLogin.addEventListener("submit",function(e) {
			e.preventDefault();
			
			let correoUsuario = document.getElementById("correo").value;
			let contraseniaUsuario = document.getElementById("contrasenia").value;
			
			if (correoUsuario === admin.correo && contraseniaUsuario === admin.contrasenia) {
				let sesionAdmin = {
					nombre: admin.nombre,
					correo: admin.correo,
					admin: true
				};
				guardarEnStorage("sesionActual",sesionAdmin);
				window.location.href = "menu.html";
				return;
			};
			login(correoUsuario,contraseniaUsuario,"menu.html");
		});
	};
});