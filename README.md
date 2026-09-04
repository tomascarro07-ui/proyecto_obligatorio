# Mundo Periféricos - E-commerce Obligatorio

Proyecto pensado para practicar JavaScript aplicado a un caso real: una tienda de periféricos de PC, con carrito de compras, panel de administración y conversión de moneda usando una API pública.

**Sitio publicado:** https://allietti.uy/grupo1/index.html
**Repositorio:** https://github.com/tomascarro07-ui/proyecto_obligatorio/tree/master

### Administrador
Correo: admin@admin
Contraseña: admin123

## Estructura principal

- [index.html](index.html): catálogo de productos, filtro por tipo y acceso al resto de la tienda.
- [registro.html](registro.html): alta de usuario, con validación de mayoría de edad.
- [login.html](login.html): inicio de sesión (usuarios y administrador).
- [producto.html](producto.html): detalle de un producto, control de stock, conversión de moneda y alta al carrito.
- [busqueda_catalogo.html](busqueda_catalogo.html): resultados de búsqueda por nombre de producto.
- [carrito.html](carrito.html): ver, editar y eliminar productos del carrito.
- [editar_producto_user.html](editar_producto_user.html): editar la cantidad de un producto ya agregado al carrito.
- [confirmar_compra.html](confirmar_compra.html): elección de método de pago, envío/retiro y dirección, antes de confirmar la compra.
- [compra_realizada.html](compra_realizada.html): resumen final y registro de la venta.
- [compras_usuario.html](compras_usuario.html): historial de compras del usuario logueado.
- [admin.html](admin.html): alta de productos (solo administrador).
- [editar_producto_admin.html](editar_producto_admin.html): edición/borrado de productos (solo administrador).
- [editar_categorias_admin.html](editar_categorias_admin.html): alta y borrado de categorías/filtros (solo administrador).
- [ventas_admin.html](ventas_admin.html): historial de todas las ventas realizadas, con ganancia total (solo administrador).
- [cotizaciones.html](cotizaciones.html): cotización del dólar, euro y peso argentino respecto al peso uruguayo, obtenida en tiempo real desde una API pública.
- [guia_uso.html](guia_uso.html): guía de uso para el usuario final.

## JavaScript separado por responsabilidad

El proyecto combina dos formas de cargar JavaScript:
- **Scripts clásicos** (`<script src="...">`), para funciones compartidas por toda la app que necesitan estar disponibles globalmente (por ejemplo `storage.js` y `autenticacion.js`).
- **Módulos ES6** (`<script type="module">`), con `import`/`export`, para las clases del modelo, los gestores y varios de los scripts de página.

### scripts/base/ (funciones globales, compartidas por toda la app)
- [scripts/base/storage.js](scripts/base/storage.js): `guardarEnStorage` y `leerDeStorage`, para guardar y leer de localStorage.
- [scripts/base/initializer.js](scripts/base/initializer.js): carga el catálogo de productos y categorías inicial la primera vez que se abre la página (si ya hay datos guardados, no hace nada).
- [scripts/base/autenticacion.js](scripts/base/autenticacion.js): manejo de sesión (`login`, `validarSesion`, `cerrarSesion`, `sesionActiva`, `esAdmin`, `protegerPagina`). Se incluye en casi todas las páginas para saber quién está logueado y proteger el acceso según el rol.

### scripts/modelos/ (clases del modelo de datos)
- [scripts/modelos/usuario.js](scripts/modelos/usuario.js): clase `Usuario`.
- [scripts/modelos/producto.js](scripts/modelos/producto.js): clase `Producto`, calcula el precio final a partir del precio base y el IVA.
- [scripts/modelos/carrito.js](scripts/modelos/carrito.js): clase `Carrito`, representa un producto agregado al carrito de un usuario.
- [scripts/modelos/venta.js](scripts/modelos/venta.js): clase `Venta`, representa una compra confirmada (subtotal, IVA, total, método de pago y entrega).
- [scripts/modelos/moneda.js](scripts/modelos/moneda.js): consumo de la API pública [Frankfurter](https://frankfurter.dev/) con `fetch`/`async`/`await`, para traer la cotización del dólar, euro y peso argentino y convertir precios (`convertirPrecio`).

### scripts/gestores/ (lógica de negocio, sin tocar el DOM)
- [scripts/gestores/gestorProductos.js](scripts/gestores/gestorProductos.js): clase `GestorProducto` — alta (`agregarProducto`), edición (`editarProductos`) y borrado (`eliminarProducto`) de productos, validación de nombres repetidos (`existeProductoRegistrado`), y conversión entre el tipo de IVA elegido en el formulario y su porcentaje numérico (`obtenerValorIva`, `obtenerIvaTexto`).
- [scripts/gestores/gestorCarrito.js](scripts/gestores/gestorCarrito.js): clase `GestorCarrito` — agregar (`agregarProductoCarrito`) y eliminar (`eliminarProducto`) productos del carrito ajustando el stock, y `calcularResumen`, que centraliza el cálculo de subtotal/IVA/total del carrito de un usuario (usado desde `mainCarritos.js`, `confirmar_compra.js` y `compra_realizada.js` para no repetir la cuenta en cada archivo).
- [scripts/gestores/gestorCategorias.js](scripts/gestores/gestorCategorias.js): clase `GestorCategorias` — alta (`agregarCategoria`) y borrado (`eliminarCategoria`) de categorías/filtros, validando duplicados (`existeCategoriaRegistrada`).

### scripts/acceso/
- [scripts/acceso/registro.js](scripts/acceso/registro.js): validación y alta de usuarios nuevos, con límite de fecha de nacimiento para exigir mayoría de edad.
- [scripts/acceso/login.js](scripts/acceso/login.js): validación de login, incluye el acceso especial de administrador (`admin@admin`).

### scripts/catalogo/
- [scripts/catalogo/index.js](scripts/catalogo/index.js): saludo al usuario, menú según el rol (admin/usuario), cantidad de productos en el carrito, validación del formulario de búsqueda y aviso (toast) al volver de agregar un producto al carrito.
- [scripts/catalogo/listar_productos.js](scripts/catalogo/listar_productos.js): arma el catálogo con filtro por tipo de producto y conversión de moneda según lo elegido en `index.js`.
- [scripts/catalogo/busqueda_catalogo.js](scripts/catalogo/busqueda_catalogo.js): búsqueda de productos por nombre.
- [scripts/catalogo/producto.js](scripts/catalogo/producto.js): detalle del producto, control de stock, conversión de moneda y alta al carrito.

### scripts/carrito/
- [scripts/carrito/editar_producto_user.js](scripts/carrito/editar_producto_user.js): editar la cantidad de un producto dentro del carrito, respetando el stock disponible.
- [scripts/carrito/confirmar_compra.js](scripts/carrito/confirmar_compra.js): valida método de pago, método de entrega y dirección (si corresponde) antes de pasar a la confirmación.
- [scripts/carrito/compra_realizada.js](scripts/carrito/compra_realizada.js): genera el registro de la venta (`comprasRealizadas`) y vacía el carrito.
- [scripts/carrito/venta_usuario.js](scripts/carrito/venta_usuario.js): historial de compras filtrado por el usuario logueado, usado en `compras_usuario.html`.

### scripts/admin/
- [scripts/admin/editar_producto_admin.js](scripts/admin/editar_producto_admin.js): carga los datos de un producto existente en el formulario de edición y guarda los cambios.
- [scripts/admin/ventas_admin.js](scripts/admin/ventas_admin.js): historial completo de ventas, mostrando la dirección de entrega cuando corresponde, y ganancia total.

### scripts/pages/ 
- [scripts/pages/mainProductos.js](scripts/pages/mainProductos.js): arma el catálogo de `admin.html` y calcula el próximo id disponible para un producto nuevo.
- [scripts/pages/mainCarritos.js](scripts/pages/mainCarritos.js): arma el listado del carrito y redirige a `login.html` si no hay una sesión activa.
- [scripts/pages/mainFiltros.js](scripts/pages/mainFiltros.js): listado de categorías en `editar_categorias_admin.html`.

### scripts/
- [scripts/formCarrito.js](scripts/formCarrito.js): valida y procesa el formulario para agregar un producto al carrito; si no hay sesión iniciada, redirige a `registro.html`.
- [scripts/formProductos.js](scripts/formProductos.js): valida y procesa el alta de un producto nuevo desde `admin.html`.
- [scripts/formFiltros.js](scripts/formFiltros.js): valida y procesa el alta de una categoría/filtro nuevo.

## Datos guardados en localStorage

- `usuariosRegistrados`: usuarios que se registraron desde `registro.html`.
- `sesionActual`: usuario (o admin) con sesión iniciada.
- `productosRegistrados`: catálogo de productos (stock, precio, IVA, imagen, tipo).
- `categoriasRegistradas`: categorías/tipos de producto disponibles.
- `productosMiCarrito`: productos que el usuario agregó a su carrito.
- `comprasRealizadas`: historial de todas las ventas confirmadas.
- `datosCompra`: método de pago, método de entrega y dirección elegidos en `confirmar_compra.html`, leídos después en `compra_realizada.html`.
- `conversionesMonedas`: última cotización de dólar/euro/peso argentino traída desde la API, para no depender de que la petición ya haya respondido en cada pantalla.

## Flujo recomendado para probar el proyecto

1. Entrar por [registro.html](registro.html) y crear una cuenta.
2. Iniciar sesión en [login.html](login.html).
3. Ver el catálogo en [index.html](index.html), filtrar por tipo o buscar por nombre.
4. Entrar al detalle de un producto y agregarlo al carrito (podés convertir el precio a dólar/euro/peso argentino).
5. Revisar el carrito en [carrito.html](carrito.html).
6. Confirmar la compra en [confirmar_compra.html](confirmar_compra.html), eligiendo método de pago y de entrega.
7. Ver el resultado en [compra_realizada.html](compra_realizada.html).
8. Revisar el historial personal en [compras_usuario.html](compras_usuario.html).

Para probar el lado administrador, iniciar sesión con `admin@admin` / `admin123` desde [login.html](login.html). Desde el menú van a aparecer los accesos a [admin.html](admin.html) (alta de productos), [editar_producto_admin.html](editar_producto_admin.html) (edición/borrado), [editar_categorias_admin.html](editar_categorias_admin.html) (categorías) y [ventas_admin.html](ventas_admin.html) (historial completo de ventas).

## Ideas didácticas

- Cada HTML representa una acción concreta de la tienda.
- El modelo de datos se separa en clases ES6 (`scripts/modelos/`: `Producto`, `Usuario`, `Carrito`, `Venta`) que se importan con `import`/`export` donde corresponde.
- La lógica de negocio se agrupa en gestores (`scripts/gestores/`: `GestorProducto`, `GestorCategorias`, `GestorCarrito`), separando el manejo de datos del manejo del DOM.
- El DOM y los formularios de cada página se controlan desde scripts propios de cada sección (`scripts/catalogo/`, `scripts/carrito/`, `scripts/admin/`, `scripts/pages/`) y desde los scripts sueltos `scripts/formProductos.js`, `scripts/formFiltros.js`, `scripts/formCarrito.js`.
- Se incorpora una cotización de moneda en tiempo real (`scripts/modelos/moneda.js`), que consulta una API externa (frankfurter.dev) y convierte los precios a USD, EUR y ARS.
- El rol de administrador se valida en cada página protegida (`usuarioActual.esAdministrador`), a través de `protegerPagina()` en `scripts/base/autenticacion.js`.


## Otros archivos

- [css/style.css](css/style.css): estilos de toda la tienda.
- `img/`: imágenes de los productos del catálogo, banderas para la conversión de moneda y capturas usadas en la guía de uso.
