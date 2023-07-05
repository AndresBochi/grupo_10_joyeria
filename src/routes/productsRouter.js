// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Multer (para cargar archivos)
const uploadFile = require('../middlewares/multerMiddlewareProductos');

// Middleware de autenticación de usuario
const auth = require('../middlewares/authMiddleware');

// Importamos el controlador de productos
const productsController = require("../controllers/productsController.js")

// *************************** RUTAS ***************************
// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Listado de todos los productos
router.get("/", productsController.index);

// Carrito de compras
router.get("/carrito", productsController.carrito);

// Dar de alta un producto
router.get("/crear",  productsController.crear);
router.post("/", auth, uploadFile.single("imagen"), productsController.guardar);

// Detalle de un producto
router.get("/detalle/:numeroProducto", productsController.detalle);

// Editar un producto
router.get("/editar/:numeroProducto", auth, productsController.editar);
router.patch("/editar/:numeroProducto", auth, productsController.actualizar);

// Eliminar un producto
router.delete("/eliminar/:numeroProducto", auth, productsController.eliminar);



/*
app.get("/",productsController.list); // Listado de productos

app.get("/:id",productsController.show); // Vista del detalle de un producto




*/








// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;

