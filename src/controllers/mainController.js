const db = require("../database/models/index"); // Requerimos la base de datos


// Creamos el controlador con sus metodos
const mainController = {

    // Creamos el metodo index que devuelve la ruta del home
    index: (req, res) => {

        db.Product.findAll()
        .then(productos =>{
            res.render("index", {productosDeCadaColeccion: productos});
        })
        .catch((error)=>{
            res.send(error)
        })
        
        
    }
    
}

// Exportamos el controlador
module.exports = mainController;