const path = require('path');
const { body } = require('express-validator');

const validacionesLogin = [
	body('email')
		.notEmpty().withMessage('Debes completar un correo electrónico').bail() // Campo Obligatorio
		.isEmail().withMessage('Debes completar un formato de correo válido'), // Es email válido
	body('password')
		.notEmpty().withMessage('Debes completar la contraseña')// Campo Obligatorio
]

module.exports = validacionesLogin;