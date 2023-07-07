const fs = require('fs'); // Requerimos el modulo nativo de Node File System


/* const rutaProductosJson = path.join(__dirname, '../data/products.json'); */ // Guardamos la ruta del archivo JSON donde esta la lista de productos en una variable
let db = require("../database/models"); // Base de Datos

// Creamos el objeto literal con los métodos a exportar
const productsController = {

    // Procesa el pedido get con ruta productos/
    index: (req, res) => {

        db.Product.findAll()
            .then(productos=>{
                res.render("products/productsIndex", {productos: productos}); // Enviamos la vista correspondiente y el array de productos al cliente
            })
            .catch(error=>{
                console.log(error);
            })
        
    },

    // Procesa el pedido get con ruta productos/detalle/:numeroProducto
    detalle: (req, res) => {
        
         // En req.params tenemos el parametro que definimos en el enrutador 

        db.Product.findByPk(req.params.numeroProducto)
            .then(productoAMostrar =>{
                db.Product.findAll({
                    where: {
                        collection_id : productoAMostrar.collection_id
                    }
                }).then(productosRelacionados=>{
                    res.render("products/productDetail", {producto: productoAMostrar, productosRelacionados: productosRelacionados}); // Enviamos la vista correspondiente y el producto a mostrar al cliente
                })
                
            })   
        
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

        db.Product.create( {
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : "default-image.png",
            category_id: req.body.category,
            material_id: req.body.material,
            collection_id: req.body.coleccion,
            precio: req.body.precio,
        })
        .then(()=>{
            res.redirect("/productos");
        });

    },

    // Procesa el pedido get con ruta productos/editar/:numeroProducto
    editar: (req, res) => {

        db.Product.findByPk(req.params.numeroProducto)
            .then(productoAEditar=>{
                res.render("products/productEditForm", {productoAEditar: productoAEditar}); // Enviamos la vista correspondiente y el producto a editar al cliente
            });

    },

    actualizar: (req, res) => {

        db.Product.update ( {
			name: req.body.name, 
            description: req.body.description,
            image: req.file ? req.file.filename : req.body.image,
			category_id: req.body.category,
			material_id: req.body.material,
			collection_id: req.body.coleccion,
            precio: req.body.precio
        }, {where:{id : req.params.numeroProducto}})
        .then(()=>{
            res.redirect("/productos"); 
        });

    },

    // Procesa el pedido delete con ruta productos/eliminar/:numeroProducto
    eliminar: (req, res) => {

        db.Product.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect("/productos")
        })

    },

}

module.exports = productsController;