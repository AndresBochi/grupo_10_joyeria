// ** Require's **
const express = require('express'); // Importamos modulo express
const path = require('path'); // Importamos modulo nativo path y lo guardamos en la constante path
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require ('express-session');

// ** express() **
const app = express(); // Instanciamos Express y lo asignamos a la constante app

// ** Template Engine  **
app.set("view engine", "ejs"); // Configuramos el motor de plantillas
app.set("views", path.resolve(__dirname, "views")); // Configuramos donde se encuentran las vistas

// ** Middlewares **
app.use(express.static(path.join(__dirname, '../public'))); // Habilitamos la carpeta public para ser accedida via http
app.use(express.urlencoded({ extended: false })); // Para poder capturar la información del body de los formularios
app.use(express.json()); // Para poder capturar la información del body de los formularios
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(session( {secret: "Anastassia Joyas"} ));

// ** Rutas **

// Importamos los distintos enrutadores
const mainRouter = require("./routes/mainRouter.js")
const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/productos", productsRouter);  
app.use("/usuarios", usersRouter);

app.use((req,res,next) => {
    res.status(404).render("error404");
})


// Levantamos el servidor en el puerto 3000

const port =  process.env.PORT || 3000;

app.listen (port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});