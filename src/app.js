// ** Require's **
const express = require('express'); // Importamos modulo express
const path = require('path'); // Importamos modulo nativo path y lo guardamos en la constante path
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
<<<<<<< HEAD
const session = require('express-session'); //Requiero el paquete session
=======
const session = require ('express-session');
>>>>>>> 5d87cf3d72eabde44d4e43318d214ac32cc83019

// ** express() **
const app = express(); // Instanciamos Express y lo asignamos a la constante app

// ** Template Engine  **
app.set("view engine", "ejs"); // Configuramos el motor de plantillas
app.set("views", path.resolve(__dirname, "views")); // Configuramos donde se encuentran las vistas

// ** Middlewares **
app.use(express.static(path.join(__dirname, '../public'))); // Habilitamos la carpeta public para ser accedida via http
app.use(express.urlencoded({ extended: false })); // Para poder leer el body de los formularios
app.use(express.json());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
<<<<<<< HEAD
app.use(session({secret: "Nuestro mensaje secreto"})); //El texto secreto puede ser cualquier texto aleatorio.
=======
app.use(session( {secret: "Anastassia Joyas"} ));
>>>>>>> 5d87cf3d72eabde44d4e43318d214ac32cc83019

// ** Rutas **

// Importamos los distintos enrutadores
const mainRouter = require("./routes/mainRouter.js")
const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const session = require('express-session')

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/productos", productsRouter);  
app.use("/usuarios", usersRouter);


// Levantamos el servidor en el puerto 3000

const port =  process.env.PORT || 3000;

app.listen (port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});