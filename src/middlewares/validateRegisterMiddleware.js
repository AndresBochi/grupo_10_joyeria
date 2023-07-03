const path = require('path');
const { body } = require('express-validator');

const validaciones = [
	body('name') 
		.notEmpty().withMessage('Debes completar el nombre').bail() // Campo Obligatorio
		.isLength({min:2}).withMessage('El nombre debe tener mínimo 2 caracteres') , // Mínimo 2 caracteres
	body('lastName') 
		.notEmpty().withMessage('Debes completar el apellido').bail() // Campo Obligatorio
		.isLength({min:2}).withMessage('El apellido debe tener mínimo 2 caracteres'), // Mínimo 2 caracteres
	body('email')
		.notEmpty().withMessage('Debes completar un correo electrónico').bail() // Campo Obligatorio
		.isEmail().withMessage('Debes completar un formato de correo válido'), // Es email válido
	body('password')
		.notEmpty().withMessage('Debes completar la contraseña').bail() // Campo Obligatorio
		.isLength({min:8}).withMessage("La contraseña debe tener mínimo 8 caracteres"), 
	body('avatar').custom((value, { req }) => { // Chequeo de extensiones del archivo a subir
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Debes subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validaciones;