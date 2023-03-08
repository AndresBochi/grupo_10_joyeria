// Creamos el controlador con sus metodos
const mainController = {

    // Creamos el metodo index que devuelve la ruta del home
    index: (req, res) => {
        res.render("index");
    },
}

// Exportamos el controlador
module.exports = mainController;