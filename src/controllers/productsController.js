const path = require("path");

// Creamos el objeto literal con los métodos a exportar
const productsController = {

    index: (req, res) => {
        res.render("products/productsIndex");
    },

    detalle: (req, res) => {
        // En req.params tenemos el parametro que definimos en el enrutador 
        let productoId = req.params.numeroProducto;
        res.render("products/productDetail"+productoId);
    },

     // Procesa el pedido get con ruta /carrito
    carrito: (req, res) => {
        res.render("products/productCart");
    },

    crear: (req, res) => {
        res.render("products/productCreateForm");
    },

    editar: (req, res) => {
        let productoId = req.params.numeroProducto;
        res.render("products/productEditForm"+productoId);
    },

}

// Exportamos el objeto literal con los distintos metodos, que se usará en el enrutador de productos
module.exports = productsController;