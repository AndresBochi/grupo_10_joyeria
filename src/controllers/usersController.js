const path = require("path");

//Requiero el User de la carpeta models
const User = require('../models/User');

// Creamos el controlador con sus metodos
const usersController = {

    // Creamos el metodo register que devuelve la ruta del registro del usuario
    register: (req, res) => {
        res.render("users/register");
    },
    // Creamos el metodo login que devuelve la ruta del login del usuario
    login: (req, res) => {
        res.render("users/login");
    },

    create: function(req,res){
        res.send("Se ha registrado correctamente")
    }
    
}

// Exportamos el controlador
module.exports = usersController;