const express = require('express'); // Importamos modulo express
const app = express(); // Instanciamos Express y lo asignamos a la constante app

const path = require('path'); // Importamos modulo nativo path y lo guardamos en la constante path

app.use(express.static(path.join(__dirname, '../public'))); // Habilitamos la carpeta public para ser accedida via http

/*---------------------------- Rutas ----------------------------*/

// Importamos los distintos enrutadores
const mainRouter = require("./routes/mainRouter.js")
const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/productos", productsRouter);  
app.use("/usuarios", usersRouter);


// Levantamos el servidor en el puerto 3000

const port =  process.env.PORT || 3000;

app.listen (port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});