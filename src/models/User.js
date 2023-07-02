const fs = require('fs');

const User = {

	fileName: '/data/users.json',
    
//Metodo para buscar todos los usuarios
	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

//Metodo para generar un nuevo Id para un nuevo usuario.
	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

//Metodo para buscar todos los usuarios
	findAll: function () {
		return this.getData();
	},

//Metodo para buscar un usuario por ID (primary key)
	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

//Buscar por cualquier campo, sirve para buscar por e-mail
	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

//Guardar un usuario
	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

//Eliminar usuario de la base de datos.
	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User;