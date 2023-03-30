const fs = require('fs'); // Requerimos el modulo nativo de Node File System
const path = require("path"); // Requerimos el modulo nativo de Node Path

const rutaProductosJson = path.join(__dirname, '../data/productsDataBase.json'); // Guardamos la ruta del archivo JSON donde esta la lista de productos en una variable

// Creamos el objeto literal con los métodos a exportar
const productsController = {

    // Procesa el pedido get con ruta productos/
    index: (req, res) => {

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8")); // Guardamos el array de productos (cada uno un objeto literal) en la variable productos

        res.render("products/productsIndex", {productos: productos}); // Enviamos la vista correspondiente y el array de productos al cliente
    },

    // Procesa el pedido get con ruta productos/detalle/:numeroProducto
    detalle: (req, res) => {
        
        let productoId = req.params.numeroProducto; // En req.params tenemos el parametro que definimos en el enrutador 

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        
        const productoAMostrar = productos.find(producto =>{
            return producto.id == productoId;
        }) // Guardamos el producto a mostrar en una variable. Para ello utilizamos el método .find para recorrer el array de productos y buscar el correspondiente según su id

        res.render("products/productDetail", {producto: productoAMostrar}); // Enviamos la vista correspondiente y el producto a mostrar al cliente
    },

    // Procesa el pedido get con ruta productos/carrito
    carrito: (req, res) => {
        res.render("products/productCart");
    },

    // Procesa el pedido get con ruta productos/crear
    crear: (req, res) => {
        res.render("products/productCreateForm");
    },

    // Procesa el pedido get con ruta productos/editar/:numeroProducto
    editar: (req, res) => {

        let productoId = req.params.numeroProducto;

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        const productoAEditar = productos.find(producto =>{
            return producto.id == productoId;
        }) // Guardamos el producto a editar en una variable. Para ello utilizamos el método .find para recorrer el array de productos y buscar el correspondiente según su id

        res.render("products/productEditForm", {productoAEditar: productoAEditar}); // Enviamos la vista correspondiente y el producto a editar al cliente
    },

}

// Exportamos el objeto literal con los distintos metodos, que se usará en el enrutador de productos
module.exports = productsController;