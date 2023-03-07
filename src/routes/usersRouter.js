// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
const routerUsers = express.Router();

// Importamos el controlador de usuarios
const usersController = require("../controllers/usersController.js");

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /register
routerUsers.get("/registro", usersController.register)
// Procesa el pedido get con ruta /login
routerUsers.get("/login", usersController.login)

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = routerUsers;
    