const path = require("path");

// Creamos el objeto literal con los métodos a exportar
const productsController = {

    // Procesa el pedido get con ruta /
    // Ruta parametrizada!!
    detalle: (req, res) => {
        // En req.params tenemos el parametro que definimos en el enrutador (en este caso con la palabra num)
        let productoId = req.params.numeroProducto;
        res.render("products/productDetail"+productoId);
    },

     // Procesa el pedido get con ruta /carrito
     carrito: (req, res) => {
        res.render("products/productCart");
    },

}

// Exportamos el objeto literal con los distintos metodos, que se usará en el enrutador de productos
module.exports = productsController;