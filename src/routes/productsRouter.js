// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Importamos el controlador de productos
const productsController = require("../controllers/productsController.js")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Listado de todos los productos
router.get("/", productsController.index);
// Carrito de compras
router.get("/carrito", productsController.carrito);
// Dar de alta un producto
router.get("/crear", productsController.crear);
// Detalle de un producto
router.get("/detalle/:numeroProducto", productsController.detalle);
// Editar un producto
router.get("/editar/:numeroProducto", productsController.editar);

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;

