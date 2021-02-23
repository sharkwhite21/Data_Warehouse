const companyModel = require("../../database/compania/modelos/companiaModelo");
const countryModel = require("../../database/pais/modelos/paisModelo");
const cityModel = require("../../database/ciudad/modelos/ciudadModelo");
const sequelize = require("../../database");
const contactModel = require("../../database/contactos/modelos/contactoModelo");

const getAllContacts = () => {
	return new Promise((res, rejc) => {
		contactModel
			.findAll({
				attributes: [
					'id',
					'name',
					'last_name',
					'occupation',
					'phone',
					'address',
					'email',
					'cityId',
					'companyId',
					[sequelize.col('city.name'), 'city_name'],
					[sequelize.col('city.countryId'), 'country_id'],
					[sequelize.col('city.country.name'), 'country_name'],
					[sequelize.col('city.country.regionId'), 'country_regionId'],
					[sequelize.col('company.name'), 'company_name'],
				],
				include: [
					{ 
                        model: cityModel, 
                        attributes: [], 
                        include: 
                        [
                            { 
                                model: countryModel, 
                                attributes: [] 
                            }
                        ] 
                    },
					{ 
                        model: companyModel, 
                        attributes: [] 
                    },
				],
				raw: true,
			})
			.then((contacts) => {
				res(contacts);
			})
			.catch((error) => {
				console.log(error);
				rejc(
                    { 
                        status: 500, 
                        message: 'intenta de nuevo' 
                    }
                );
			});
	});
};
const getContact = (id) => {
	return new Promise((res, rejc) => {
		contactModel
			.findByPk(id, {
				attributes: [
					'id',
					'name',
					'last_name',
					'occupation',
					'phone',
					'address',
					'email',
					'cityId',
					'companyId',
					[sequelize.col('city.name'), 'city_name'],
					[sequelize.col('city.countryId'), 'country_id'],
					[sequelize.col('city.country.regionId'), 'country_regionId'],
				],
				include: [
					{ 
                        model: cityModel, 
                        attributes: [], 
                        include: [
                            { 
                                model: countryModel, 
                                attributes: [] 
                            }
                        ]
                    },
					{
                        model: 
                        companyModel, 
                        attributes: [] 
                    },
				],
				raw: true,
			})
			.then((contact) => {
				if (contact) {
					res(
                        { 
                            contact: contact 
                        }
                    );
				} else {
					rejc(
                        { 
                            status: 404, 
                            message: `El contacto no existe` 
                        }
                    );
				}
			})
			.catch((error) => {
				console.log(error);
				rejc(
                    { 
                        status: 500, 
                        message: 'intenta de nuevo mas tarde' 
                    }
                );
			});
	});
};

const createContact = (data) => {
	return new Promise((res, rejc) => {
		if (
			!data.name ||
			!data.last_name ||
			!data.occupation ||
			!data.phone ||
			!data.cityId ||
			!data.email ||
			!data.address ||
			!data.companyId
		) {
			rejc(
                { 
                    status: 400, 
                    message: 'Faltan campos, favor digitalos' 
                }
            );
		} else {
			contactModel
				.create(data)
				.then((contact) => {
					res(
                        { 
                            message: 'Contacto creado' });
				})
				.catch((error) => {
					rejc(
                        { 
                            status: 500, 
                            message: 'intenta de nuevo' });
				});
		}
	});
};

const updateContactById = (id, data) => {
	return new Promise((res, rejc) => {
		contactModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'contacto actualizada' });
				} else {
					rejc(
                        { 
                            status: 400, 
                            message: 'No se puede actualizar el contacto.' 
                        }
                    );
				}
			})
			.catch((error) => {
				rejc(
                    { 
                        status: 500, 
                        message: 'Intente de nuevo' 
                    }
                );
			});
	});
};
const deleteContactById = (data) => {
	return new Promise((res, rejc) => {
		contactModel
			.destroy({ where: { id: data } })
			.then((response) => {
				if (response === 0) {
					rejc(
                        { 
                            status: 400, 
                            message: 'compañia no existe o no puede ser eliminada' });
				} else {
					res(
                        { 
                            message: 'Compañia eliminada' 
                        }
                    );
				}
			})
			.then((error) => {
				rejc(
                    { 
                        status: 500, 
                        message: 'intenta de nuevo' 
                    }
                );
			});
	});
};

module.exports = {
	getAllContacts,
	getContact,
	createContact,
	updateContactById,
	deleteContactById,
};