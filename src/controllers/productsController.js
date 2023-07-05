const fs = require('fs'); // Requerimos el modulo nativo de Node File System


/* const rutaProductosJson = path.join(__dirname, '../data/products.json'); */ // Guardamos la ruta del archivo JSON donde esta la lista de productos en una variable
let db = require("../database/models"); // Base de Datos
const Op = db.Sequelize.Op;

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
                    include:[{association: "coleccion"}],
                    where: {
                        coleccion_id : coleccion.id
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
            image: productoSinEdicion.image, // MODIFICAR - HAY QUE USAR MULTER !!!!!!!!
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


//Mas arriba requiero el modelo de productos
const DB = require('../src/models');
const Op = DB.Sequelize.Op

//**APIS**



module.exports = {
    list: async (req, res) => {
        let Products = await DB.Product.findAll({include:["categoria"]});

        return res.json({
            meta: {
                status: 200,
                url: './controllers/api/products/',
                count: Products.length
            },
            data: Products.map(producto => {
                return {
                    id: Product.id,
                    nombre: Product.nombre,
                    descripcion: Product.descripcion,
                    categoria: Product.categoria,
                    url: `http://localhost:3000/api/products/${product.id}`
                }
            })
        })
    },

    // Muestra el producto por ID
    show: async (req, res) => { 
        let Product  = await DB.Product.findByPk(req.params.id,{include:["categoria"]});

        let detalleProducto = {
            id: Product.id,
            nombre: Product.nombre,
            descripcion: Product.descripcion,
            imagen: `http://localhost:3000/images/users/${Product.foto}`,
            precio: Product.precio,
            categoria: Product.categoria,
        }
        if (req.params.id >= 0) {
            return res.json({
                meta: {
                    status: 200,
                    url: '/api/products/' + req.params.id,
                    listadoProducts: '/api/products/'
                },
                data: detalleProduct
            });
        }
    }
}

// Exportamos el objeto literal con los distintos metodos, que se usará en el enrutador de productos
module.exports = productsController;