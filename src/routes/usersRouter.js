// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
const routerUsers = express.Router();

// Importamos el controlador de usuarios
const usersController = require("../controllers/usersController.js");

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

//Middlewares Session
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Procesa el pedido get con ruta /register
routerUsers.get('/registro', guestMiddleware, usersController.register);
// Procesa el pedido post con ruta /register
routerUsers.post('/registro', uploadFile.single('users'), validations, usersController.processRegister);



// Procesa el pedido get con ruta /login
routerUsers.get("/login", usersController.login)

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Proceso de Logout
router.get('/logout/', usersController.logout);

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = routerUsers;
    