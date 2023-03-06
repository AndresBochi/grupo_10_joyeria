const path = require("path");

// Creamos el controlador con sus metodos
const usersController = {

    // Creamos el metodo register que devuelve la ruta del registro del usuario
    register: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/register.html"));
    },
    // Creamos el metodo login que devuelve la ruta del login del usuario
    login: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    },
    
}

// Exportamos el controlador
module.exports = usersController;