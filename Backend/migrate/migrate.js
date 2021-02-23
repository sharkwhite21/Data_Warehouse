const config = require("../config/index");
const mysql = require("mysql2/promise");

//Models
async function syncTables() {
	try {
		const conection = await mysql.createConnection({
			host: config.dbHost,
			user: config.dbUser,
			password: config.dbPass,
		});
		await conection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\`;`);
		const userModel = require("../database/usuarios/modelos/usuarioModelo");
		const regionModel = require("../database/region/modelos/regionModelo");
		const cityModel = require("../database/ciudad/modelos/ciudadModelo");
		const companyModel = require("../database/compania/modelos/companiaModelo");
		const countryModel = require("../database/pais/modelos/paisModelo");
		const contactModel = require("../database/contactos/modelos/contactoModelo");
		await userModel.sync();
		await userModel.create(config.root_user);
		await regionModel.sync();
		await countryModel.sync();
		await cityModel.sync();
		await companyModel.sync();
		await contactModel.sync();
	} catch (error) {
		console.log(error);
		
	}
	process.exit(0);
}

syncTables();