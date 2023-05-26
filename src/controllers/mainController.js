const { log } = require('console');
const fs = require('fs'); // Requerimos el modulo nativo de Node File System
const path = require("path"); // Requerimos el modulo nativo de Node Path

const rutaProductosJson = path.join(__dirname, '../data/products.json'); // Guardamos la ruta del archivo JSON donde esta la lista de productos en una variable

// Creamos el controlador con sus metodos
const mainController = {

    // Creamos el metodo index que devuelve la ruta del home
    index: (req, res) => {

        const productos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8")); // Guardamos el array de productos (cada uno un objeto literal) en la variable productos
        
        function ordenarProductosPor (arrayProductos, criterio){

            let productosAgrupados = []; // Crea una nueva lista donde se irán agrupando los productos en grupos (listas) según el criterio seleccionado
            let estaEnGrupo = false; // Creamos una variable para indicar si el producto ya se encuentra en algún grupo.

            arrayProductos.forEach(producto => { // Recorremos el listado de todos los productos.

                estaEnGrupo = false; // En cada iteración, reseteamos el indicador a false.

                productosAgrupados.forEach(grupo =>{ // Recorremos el array de grupos de productos ordenados según criterio indicado.
                    if (producto[criterio] == grupo[0][criterio]){ // Si el producto tiene el mismo valor en la propiedad que indica el criterio, que el primer producto del grupo, entonces
                        grupo.push(producto); // Agrega el producto al grupo y
                        estaEnGrupo = true; // Marca el producto como ya agregado a un grupo
                    }; 
                });

                if (!estaEnGrupo){  // Si el producto no se encuentra en ningun grupo
                    productosAgrupados.push([producto]); // Agrega el producto a un nuevo grupo []
                };
            });
    
            return productosAgrupados; // Devuelve el array de productos agrupados (en otros arrays) según criterio 
        };
        

        let productosPorColeccion =  ordenarProductosPor(productos, "coleccion");

        let productosDeCadaColeccion = [];
    
        productosPorColeccion.forEach(coleccion => {
            productosDeCadaColeccion.push(coleccion[Math.floor(Math.random() * coleccion.length)]) // Selecciona al azar un producto de cada colección
        });

        //console.log(productosDeCadaColeccion); ///////////////////////////

        res.render("index", {productosDeCadaColeccion: productosDeCadaColeccion});
        
    }
    
}

// Exportamos el controlador
module.exports = mainController;