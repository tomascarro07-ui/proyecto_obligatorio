# Mundo Perifericos - E-commerce Obligatorio

Proyecto pensado para practicar JavaScript aplicado a un caso real, una tienda de perifericos de PC.

Objetivo: separar responsabilidades para que sea facil entender que hace cada parte.

### Administrador
Correo: admin@admin
Contraseña: admin123

## Estructura principal

- [index.html](index.html): registro de nuevos usuarios.
- [login.html](login.html): inicio de sesion (usuarios y administrador).
- [menu.html](menu.html): catalogo de productos, filtro por tipo y acceso al resto de la tienda.
- [busqueda_catalogo.html](busqueda_catalogo.html): resultados de busqueda por nombre de producto.
- [producto.html](producto.html): detalle de un producto y alta al carrito.
- [carrito.html](carrito.html): ver, editar y eliminar productos del carrito.
- [editar_producto_user.html](editar_producto_user.html): editar la cantidad de un producto ya agregado al carrito.
- [confirmar_compra.html](confirmar_compra.html): resumen de la compra antes de confirmarla.
- [compra_realizada.html](compra_realizada.html): resumen final y registro de la venta.
- [venta_usuario.html](venta_usuario.html): historial de compras del usuario logueado.
- [admin.html](admin.html): alta de productos (solo administrador).
- [editar_producto_admin.html](editar_producto_admin.html): edicion/borrado de productos (solo administrador).
- [editar_filtros_admin.html](editar_filtros_admin.html): alta y borrado de categorias/filtros (solo administrador).
- [ventas_admin.html](ventas_admin.html): historial de todas las ventas realizadas (solo administrador).
- [guia_uso.html](guia_uso.html): guia de uso para el usuario final.

## JavaScript separado por responsabilidad

### scripts/base/
- [scripts/base/storage.js](scripts/base/storage.js): funciones simples para guardar y leer de localStorage (`guardarEnStorage`, `leerDeStorage`).
- [scripts/base/initializer.js](scripts/base/initializer.js): carga el catalogo y los filtros iniciales la primera vez que se abre la pagina (si ya hay datos guardados, no hace nada).
- [scripts/base/autenticacion.js](scripts/base/autenticacion.js): registro/verificacion de sesion (`login`, `validarSesion`, `cerrarSesion`, `sesionActiva`). Se incluye en casi todas las paginas para proteger el acceso.

### scripts/acceso/
- [scripts/acceso/index.js](scripts/acceso/index.js): registro de usuarios.
- [scripts/acceso/login.js](scripts/acceso/login.js): validacion de login, incluye el acceso especial de administrador (`admin@admin`).

### scripts/catalogo/
- [scripts/catalogo/menu.js](scripts/catalogo/menu.js): saludo al usuario y botones segun el rol (admin/usuario).
- [scripts/catalogo/listar_productos.js](scripts/catalogo/listar_productos.js): catalogo con filtro por tipo de producto.
- [scripts/catalogo/busqueda_catalogo.js](scripts/catalogo/busqueda_catalogo.js): busqueda de productos por nombre.
- [scripts/catalogo/producto.js](scripts/catalogo/producto.js): detalle del producto, control de stock y alta al carrito.

### scripts/carrito/
- [scripts/carrito/carrito.js](scripts/carrito/carrito.js): mostrar el carrito, calcular IVA/subtotal/total, eliminar productos y vaciar el carrito.
- [scripts/carrito/editar_producto_user.js](scripts/carrito/editar_producto_user.js): editar la cantidad de un producto dentro del carrito, respetando el stock disponible.
- [scripts/carrito/confirmar_compra.js](scripts/carrito/confirmar_compra.js): muestra el resumen antes de confirmar.
- [scripts/carrito/compra_realizada.js](scripts/carrito/compra_realizada.js): genera el registro de la venta (`comprasRealizadas`) y vacia el carrito.
- [scripts/carrito/venta_usuario.js](scripts/carrito/venta_usuario.js): historial de compras filtrado por el usuario logueado.

### scripts/admin/
- [scripts/admin/admin.js](scripts/admin/admin.js): alta, listado y borrado de productos.
- [scripts/admin/editar_producto_admin.js](scripts/admin/editar_producto_admin.js): edicion de un producto existente.
- [scripts/admin/editar_filtros_admin.js](scripts/admin/editar_filtros_admin.js): alta y borrado de filtros/categorias.
- [scripts/admin/ventas_admin.js](scripts/admin/ventas_admin.js): historial completo de ventas y ganancia total.

## Datos guardados en localStorage

- `usuariosRegistrados`: usuarios que se registraron desde index.html.
- `sesionActual`: usuario (o admin) con sesion iniciada.
- `productosRegistrados`: catalogo de productos (stock, precio, iva, imagen, tipo).
- `filtrosRegistrados`: categorias/tipos de producto disponibles.
- `productosMiCarrito`: productos que el usuario agrego a su carrito.
- `comprasRealizadas`: historial de todas las ventas confirmadas.

## Flujo recomendado para probar el proyecto

1. Entrar por [index.html](index.html) y registrarse.
2. Iniciar sesion en [login.html](login.html).
3. Ver el catalogo en [menu.html](menu.html) y filtrar por tipo de producto.
4. Entrar al detalle en [producto.html](producto.html) y agregarlo al carrito.
5. Revisar el carrito en [carrito.html](carrito.html).
6. Confirmar la compra en [confirmar_compra.html](confirmar_compra.html).
7. Ver el resultado en [compra_realizada.html](compra_realizada.html).
8. Revisar el historial personal en [venta_usuario.html](venta_usuario.html).

Para probar el lado administrador, iniciar sesion con `admin@admin` / `admin123` desde [login.html](login.html). Desde el menu van a aparecer los accesos a [admin.html](admin.html) (alta de productos), [editar_filtros_admin.html](editar_filtros_admin.html) (categorias) y [ventas_admin.html](ventas_admin.html) (historial completo de ventas).

## Ideas didacticas

- Cada HTML representa una accion concreta de la tienda.
- Cada script maneja solo el DOM que necesita.
- El rol de administrador se valida en cada pagina protegida (`usuarioActual.admin`).
- No se usan clases ES6, import/export ni patrones avanzados.

## Otros archivos

- [css/style.css](css/style.css): estilos de toda la tienda.
- `img/`: imagenes de los productos del catalogo y capturas usadas en la guia de uso.
