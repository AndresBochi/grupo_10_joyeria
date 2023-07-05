//Para encriptar password
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// DATABASE **************************

//Requiero el User de la carpeta models
/* const User = require("../models/User");  */// ******************
const db = require("../database/models/index"); // Requerimos la base de datos

// Creamos el controlador con sus metodos
const usersController = {
  // Creamos el metodo register que devuelve la ruta del registro del usuario
  register: (req, res) => {
    res.render("users/register");
  },

  // Procesamos el pedido de creación de usuario
  processRegister: (req, res) => {

    // Validaciones del BackEnd
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      console.log("Usuario no creado");
      res.render("users/register", { 
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }


    // Chequeo de existencia de contraseña
    /* let userInDB = User.findByField("email", req.body.email); */

    db.User.findOne({where: {email: req.body.email}})
      .then(usuario =>{
        if (usuario) {
          console.log("Usuario ya existente");
          res.render("users/register", {
            errors: {
              email: {
                msg: "Este email ya se encuentra registrado", //no deja registrar a un nuevo usuario con el mismo mail
              },
            },
            oldData: req.body,
          });
        }
        
      })
      .catch((error) =>{
        console.log(error);
    })

    // Creación de Usuario Nuevo
    let usuarioACrear = {
      name: req.body.name,
      lastname: req.body.lastName,
      documento: req.body.documento,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10), //encriptando password
      avatar: req.file ? req.file.filename : "default-image.png",
    };

    db.User.create(usuarioACrear)
      .then(usuarioCreado=>{
        return res.redirect("login")
      })
      .catch((error)=>{
        console.log(error);
      })

  },

  // Creamos el metodo login que devuelve la ruta del login del usuario
  login: (req, res) => {
    res.render("users/login");
  },
  

  loginProcess: (req, res) => {

    let errors = validationResult(req);

    
    
    if(errors.isEmpty()){ //Logica del express-validator


      /* let userToLogin = User.findByField("email", req.body.email); */
      db.User.findOne({where: {email: req.body.email}})
        .then((userToLogin)=>{
          if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(
              req.body.password,
              userToLogin.password
            );
            if (isOkThePassword) {
              delete userToLogin.password;
              req.session.userLogged = userToLogin;
    
              if (req.body.recordar != undefined) {
                res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
              }
    
              return res.redirect("/usuarios/profile");
            }
            return res.render("users/login", {
              errors: {
                email: {
                  msg: "La contraseña es incorrecta",
                },
              },
            });
      }}).catch((error)=>{console.log(error)})

      
    }else{
      console.log(errors);
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "No es un usuario registrado en nuestra base de datos",
        },
      },
    });
  },

  profile: (req, res) => {
    let usuarioLogueado = req.session.userLogged;

    return res.render("users/profile", {
      usuarioLogueado: usuarioLogueado,
    });
  },

//logout y redirijo al home
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();  
    return res.redirect("/");
  },
};

// Exportamos el controlador
module.exports = usersController;
