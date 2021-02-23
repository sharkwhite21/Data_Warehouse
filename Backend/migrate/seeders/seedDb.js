const userModel = require("../../database/usuarios/modelos/usuarioModelo");
const companyModel = require("../../database/compania/modelos/companiaModelo");
const regionModel = require("../../database/region/modelos/regionModelo");
const countryModel = require("../../database/pais/modelos/paisModelo");
const cityModel = require("../../database/ciudad/modelos/ciudadModelo");
const contactModel = require("../../database/contactos/modelos/contactoModelo");
const bCrypt = require("bcrypt");
const config = require("../../config/index");

let users = [
	{ 
		isAdmin: true, 
		name: 'anyeliz', 
		last_name: 'garcia', 
		email: 'anyeliz@gmail.com', 
		password: '12345qwer' 
	},
	{ 
		isAdmin: false, 
		name: 'maximo', 
		last_name: 'echeverri', 
		email: 'max@hotmail.com', 
		password: 'qwert1234' 
	},
    { 
		isAdmin: false, 
		name: 'maria', 
		last_name: 'lorens', 
		email: 'maria@amazon.com', 
		password: '09876POIU' 
	},
	{ 
		isAdmin: true, 
		name: 'ethan', 
		last_name: 'zapata', 
		email: 'ethan@outlook.com', 
		password: 'POIUY0987' 
	},
	{ 
		isAdmin: true, 
		name: 'victoria', 
		last_name: 'marquez', 
		email: 'marquez099@aaa.com', 
		password: '123456789' },
];

let regions = [
    { name: 'Norteamérica' }, 
    { name: 'Sudamérica' }, 
    { name: 'Caribe' }
];
let countries = [
	{ regionId: 3, name: 'aruba' },
	{ regionId: 2, name: 'argentina' },
	{ regionId: 2, name: 'colombia' },
	{ regionId: 3, name: 'cuba' },
	{ regionId: 1, name: 'usa' },
	{ regionId: 1, name: 'canada' },
];
let cities = [
	{ countryId: 5, name: 'nueva york' },
	{ countryId: 4, name: 'la habana' },
	{ countryId: 6, name: 'canada' },
	{ countryId: 3, name: 'medellin' },
	{ countryId: 2, name: 'buenos aires' },
	{ countryId: 4, name: 'cienfuegos' },
	{ countryId: 1, name: 'savaneta' },
    { countryId: 5, name: 'chicago' },
    { countryId: 1, name: 'san nicola' },
];
let companies = [
	{ 
        name: 'aaa', 
        address: 'av 123 cl 55', 
        phone: '035-3637890', 
        email: 'info@aaa.com', 
        cityId: 4 
    },
    { 
        name: 'nirvana', 
        address: 'av circunvalar', 
        phone: '035-3567890', 
        email: 'tmcelvine1@fda.gov', 
        cityId: 1 
    },
	{
		name: 'expreso brasilia',
		address: 'murillo # 43 54',
		phone: '035-3345674',
		email: 'contactame@brasilia.com',
		cityId: 9,
	},
	{
		name: 'aires',
		address: 'cl 54 #72 155',
		phone: '035-3423689',
		email: 'contacta@aires.com',
		cityId: 2,
	},
];
let contacts = [
	{
		name: 'Helena',
		last_name: 'garcia',
		phone: '3135567890',
		email: 'helena@gmail.com',
		occupation: 'asistente administrativo',
		companyId: 1,
		cityId: 1,
		address: 'av siempre viva 123',
	},
	{
		name: 'jose',
		last_name: 'zapata',
		phone: '3198909765',
		email: 'jose12@amazon.com',
		occupation: 'quimico',
		companyId: 2,
		cityId: 1,
		address: '890 av circunvalar',
	},
	{
		name: 'patricia',
		last_name: 'rodriguez',
		phone: '3209807654',
		email: 'patorodri12@hotmail.com',
		occupation: 'quimico',
		companyId: 4,
		cityId: 2,
		address: 'cl falsa 123',
	},
];
users.forEach(async (user) => {
	await bCrypt.hash(user.password, parseInt(config.rounds_bcr), function (error, encrypted) {
		if (error) {
			console.log(error);
		} else {
			user.password = encrypted;
			userModel
				.create(user)
				.then((user) => {
					console.log('usuarios creados');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
});
regions.forEach(async (region) => {
	try {
		await regionModel.create(region);
	} catch (error) {
		console.log(error);
	}
});
countries.forEach(async (country) => {
	try {
		countryModel.create(country);
	} catch (error) {
		console.log(error);
	}
});
cities.forEach(async (city) => {
	try {
		cityModel.create(city);
	} catch (error) {
		console.log(error);
	}
});
companies.forEach(async (company) => {
	try {
		companyModel.create(company);
	} catch (error) {
		console.log(error);
	}
});
contacts.forEach(async (contact) => {
	try {
		contactModel.create(contact);
	} catch (error) {
		console.log(error);
	}
});
