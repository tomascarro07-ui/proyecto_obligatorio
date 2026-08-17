let categorias = leerDeStorage("categoriasRegistradas",[]);
let productos = leerDeStorage("productosRegistrados",[]);

export class GestorCategorias {
    
    agregarCategoria() {
        let categoria = { 
            nombreCategoria: document.getElementById("nombreCategoria").value
        }
        categorias.push(categoria);
        guardarEnStorage("categoriasRegistradas",categorias);
        location.reload();
    }
    
    existeCategoriaRegistrada(categoria) {
        for(let i = 0; i < categorias.length; i++) {
            if(categorias[i].nombreCategoria.toLowerCase().trim() === categoria.toLowerCase().trim()) {
                return true;
            };
        };
        return false;
    }
    
    eliminarCategoria(nombre) {
        for(let i = 0; i < categorias.length; i++) {
            let categoria = categorias[i];
            if(categoria.nombreCategoria === nombre) {
                    categorias.splice(i,1);
                    guardarEnStorage("categoriasRegistradas",categorias);
                    for(let j = 0; j < productos.length; j++) {
                        if((productos[j].tipoProducto).toLowerCase() === categoria.nombreCategoria.toLowerCase()){
                            productos[j].tipoProducto = "";
                        }
                    }
                guardarEnStorage("productosRegistrados",productos);
                location.reload();
                break;
            };
        };
    };
}