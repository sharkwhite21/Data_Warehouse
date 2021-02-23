const {sequelize} = require("sequelize");

//ENV
const config = require("../config/index");

//CONECTION TO DATABASE
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
	host: config.dbHost,
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		raw: true,
	},
	query: {
		raw: true,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('conexion ok');
	})
	.catch((error) => {
		console.log(error);
	});

module.exports = sequelize;
