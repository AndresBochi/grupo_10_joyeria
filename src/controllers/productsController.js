const fs = require('fs'); // Requerimos el modulo nativo de Node File System
const path = require("path"); // Requerimos el modulo nativo de Node Path

const rutaProductosJson = path.join(__dirname, '../data/products.json'); // Guardamos la ruta del archivo JSON donde esta la lista de productos en una variable

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

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8")); // Guardamos una lista de todos los productos en la variable productos
        
        const productoAMostrar = productos.find(producto =>{
            return producto.id == productoId;
        }); // Guardamos el producto a mostrar en una variable. Para ello utilizamos el método .find para recorrer el array de productos y buscar el correspondiente según su id

        const productosRelacionados = productos.filter(producto =>{
            return producto.coleccion == productoAMostrar.coleccion && producto.id != productoAMostrar.id;
        }); // Guardamos una lista de productos relacionados por coleccion en una variable, utilizando el método .filter

        res.render("products/productDetail", {producto: productoAMostrar, productosRelacionados: productosRelacionados}); // Enviamos la vista correspondiente y el producto a mostrar al cliente
    },

    // Procesa el pedido get con ruta productos/carrito
    carrito: (req, res) => {
        res.render("products/productCart");
    },

    // (GET) Procesa el pedido get con ruta productos/crear
    crear: (req, res) => {
        res.render("products/productCreateForm");
    },

    // (POST) metodo para guardar la información el producto nuevo
    guardar: (req,res) => {

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        let productoNuevo = {
            id: productos[productos.length -1].id +1,
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : "default-image.png",
            category: req.body.category,
            material: req.body.material,
            coleccion: req.body.coleccion,
            precio: req.body.precio,
        };

        productos.push(productoNuevo);

        let productosJSON = JSON.stringify(productos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/productos");
        /* res.send(req.body); */
    },

    // Procesa el pedido get con ruta productos/editar/:numeroProducto
    editar: (req, res) => {

        let productoId = req.params.numeroProducto;

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        const productoAEditar = productos.find(producto =>{
            return producto.id == productoId;
        }); // Guardamos el producto a editar en una variable. Para ello utilizamos el método .find para recorrer el array de productos y buscar el correspondiente según su id

        res.render("products/productEditForm", {productoAEditar: productoAEditar}); // Enviamos la vista correspondiente y el producto a editar al cliente
    },

    actualizar: (req, res) => {

        let productoId = req.params.numeroProducto;

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        let productoSinEdicion = productos.find(producto => {
            return producto.id == productoId; 
        });

        let productoEditado = {
            id: productoId,
			name: req.body.name, 
            description: req.body.description,
            image: productoSinEdicion.image, // MODIFICAR - HAY QUE USAR MULTER !!!!!!!!
			category: req.body.category,
			material: req.body.material,
			coleccion: req.body.coleccion,
            precio: req.body.precio
        };

        let indiceProducto = productos.findIndex(producto =>{
            return producto.id == productoId;
        });
 
        productos[indiceProducto] = productoEditado;

        let productosJSON = JSON.stringify(productos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/productos"); 
    },

    // Procesa el pedido delete con ruta productos/eliminar/:numeroProducto
    eliminar: (req, res) => {

        let productoId = req.params.numeroProducto;

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        let nuevaListaProductos = productos.filter(producto =>{
            return producto.id != productoId
        })

        let productosJSON = JSON.stringify(nuevaListaProductos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/productos");
    },

}

// Exportamos el objeto literal con los distintos metodos, que se usará en el enrutador de productos
module.exports = productsController;