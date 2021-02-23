require("dotenv").config();
const bCrypt = require("bcrypt");

const config = {
	port: process.env.API_PORT,
	dbHost: process.env.DATABASE_HOST,
	dbName: process.env.DATABASE_NAME,
	dbUser: process.env.DATABASE_USER,
	dbPass: process.env.DATABASE_PASS,
	jwtsecret: process.env.JWT_SECRET,
	rounds_bcr: process.env.SALT_ROUNDS,
	root_user: {
		name: process.env.USER_NAME,
		last_name: process.env.USER_LNAME,
		email: process.env.USER_EMAIL,
		password: process.env.USER_PASSWORD,
		isAdmin: process.env.USER_ADMIN,
	},
};
bCrypt.hash(config.root_user.password, parseInt(config.rounds_bcr), (error, encrypted) => {
	if (error) {
		console.log(error);
	} else {
		config.root_user.password = encrypted;
	}
});
module.exports = config;
