const jwt = require("jsonwebtoken");
const config = require("../config/index");

const autentication = (req, res, next) => {
	let authorization = req.headers.authorization;
	if (authorization) {
		let token = authorization.split(' ')[1];
		jwt.verify(token, config.jwtsecret, (error, decoded) => {
			if (error) {
				return res.status(401).json({ message: 'token no valido' });
			}
			req.user = decoded;
			next();
		});
	} else {
		res.status(401).json({ message: 'favor ingrese con su usuario y contraseña' });
	}
};

module.exports = autentication;