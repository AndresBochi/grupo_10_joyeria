const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	if(emailInCookie){
		db.User.findOne({where:{email: emailInCookie}})
		.then(usuarioALoguear =>{
			if (usuarioALoguear) {
				req.session.userLogged = usuarioALoguear;
			}
		
			if (req.session.userLogged) {
				res.locals.isLogged = true;
				res.locals.userLogged = req.session.userLogged;
			}
		})
	}else{
		next();
	}
	
}
	

	


module.exports = userLoggedMiddleware;