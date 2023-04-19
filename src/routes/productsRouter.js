// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Multer (para cargar archivos)

const multer = require('multer'); 
const path = require('path')

const storage= multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb){
        cb(null, '${Date.now()}_img_${path.extname(file.originalname)}');
    }
});

const uploadFile = multer ({storage});

// Importamos el controlador de productos
const productsController = require("../controllers/productsController.js")

// *************************** RUTAS ***************************
// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Listado de todos los productos
router.get("/", productsController.index);

// Carrito de compras
router.get("/carrito", productsController.carrito);

// Dar de alta un producto
router.get("/crear", productsController.crear);
router.post("/", productsController.guardar);

// Detalle de un producto
router.get("/detalle/:numeroProducto", productsController.detalle);

// Editar un producto
router.get("/editar/:numeroProducto", productsController.editar);
router.patch("/editar/:numeroProducto", productsController.actualizar);

// Eliminar un producto
router.delete("/eliminar/:numeroProducto", productsController.eliminar);

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;

