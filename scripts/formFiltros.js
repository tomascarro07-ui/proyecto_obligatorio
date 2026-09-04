import { GestorCategorias } from "./gestores/gestorCategorias.js";

let gestorCategorias = new GestorCategorias();
let formCategorias = document.getElementById("form-categoria")

if(formCategorias) {
    formCategorias.addEventListener("submit",function(e) {
        e.preventDefault();
        
        let nombreCategoria = document.getElementById("nombreCategoria").value;

        if((nombreCategoria.trim()) === "") {
            alert("¡El nombre de la categoria no puede estar vacío!");
            return;
        }
        
        if(gestorCategorias.existeCategoriaRegistrada(nombreCategoria)) {
            alert("¡Esta categoria ya esta registrado!");
            return;
        }
        
        gestorCategorias.agregarCategoria();
        guardarEnStorage("mensajeCatalogo",true);
		window.location.href="admin.html";

    });
}
