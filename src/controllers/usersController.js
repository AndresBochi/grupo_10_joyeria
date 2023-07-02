//Para encriptar password
const bcryptjs = require("bcryptjs");
const path = require("path");
const { validationResult } = require("express-validator");

//Requiero el User de la carpeta models
const User = require("../models/User");

// Creamos el controlador con sus metodos
const usersController = {
  // Creamos el metodo register que devuelve la ruta del registro del usuario
  register: (req, res) => {
    res.render("users/register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = User.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email ya está registrado", //no deja registrar a otro usuario con un mail que ya se encuentra registrado anteriormente
          },
        },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10), //encriptando password
      avatar: req.file.filename,
    };

    let userCreated = User.create(userToCreate);

    return res.redirect("/user/login");
  },

  // Creamos el metodo login que devuelve la ruta del login del usuario
  login: (req, res) => {
    res.render("users/login");
  },
  
  loginProcess: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
        }

        return res.redirect("/user/profile");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "No se encuentra este email en nuestra base de datos",
        },
      },
    });
  },
  profile: (req, res) => {
    return res.render("profile", {
      user: req.session.userLogged,
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
