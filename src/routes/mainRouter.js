// Importamos express y guardamos la ejecucion del metodo Router en la constante router
const express = require("express");
const router = express.Router();

// Importamos el controlador de las rutas por defecto
const mainController = require("../controllers/mainController.js");

// Procesa el pedido get con ruta /
router.get("/", mainController.index)
router.get("/carrito", mainController.carrito)

// Exportamos la variable router con la/s rutas guardadas.
module.exports = router;
