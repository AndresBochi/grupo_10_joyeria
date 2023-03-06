const path = require("path");

// Creamos el controlador con sus metodos
const mainController = {

    // Creamos el metodo index que devuelve la ruta del home
    index: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    },

     // Procesa el pedido get con ruta /carrito
     carrito: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/productCart.html"));
    },
    
}

// Exportamos el controlador
module.exports = mainController;