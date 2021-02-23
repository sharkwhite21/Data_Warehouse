const companyModel = require("../../database/compania/modelos/companiaModelo");
const countryModel = require("../../database/pais/modelos/paisModelo");
const cityModel = require("../../database/ciudad/modelos/ciudadModelo");
const sequelize = require("../../database");

const getAllCompanies = () => {
	return new Promise((res, rejc) => {
		companyModel
			.findAll({
				attributes: [
                    'id',
					'name',
					'address',
					'phone',
					'email',
					'cityId',
					[sequelize.col('city.name'), 'city_name'],
					[sequelize.col('city.countryId'), 'country_id'],
					[sequelize.col('city.country.name'), 'country_name'],
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
                    }
                ],
				raw: true,
			})
			.then((companies) => {
				res(companies);
			})
			.catch((error) => {
				console.log(error);
				rejc(
                    { 
                        status: 500, message: 'intenta mas tarde' 
                    }
                );
			});
	});
};
const getCompany = (id) => {
	return new Promise((res, rejc) => {
		companyModel
			.findByPk(id)
			.then((company) => {
				if (company) {
					res(
                        { 
                            company: company 
                        }
                    );
				} else {
					rejc(
                        { 
                            status: 404, 
                            message: `El usuario  no xiste` 
                        }
                    );
				}
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

const createCompany = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.phone || !data.cityId || !data.email || !data.address) {
			rejc(
                { 
                    status: 400, 
                    message: 'Faltan campos, favor digitarlos' 
                }
            );
		} else {
			companyModel
				.create(data)
				.then((company) => {
					res(
                        { 
                            message: 'Compañia creada' 
                        }
                    );
				})
				.catch((error) => {
					rejc(
                        { 
                            status: 500, 
                            message: 'intenta de nuevo' 
                        }
                    );
                });
		}
	});
};

const updateCompanyById = (id, data) => {
	return new Promise((res, rejc) => {
		companyModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res(
                        { 
                            message: 'compañia actualizada' 
                        }
                    );
				} else {
					rejc(
                        { 
                            status: 400, message: 'No se pudo actualizar la compañia' 
                        }
                    );
				}
			})
			.catch((error) => {
				rejc(
                    { 
                        status: 500, 
                        message: 'Intente de nuevo mas tarde' 
                    }
                );
			});
	});
};
const deleteCompanyById = (id) => {
	return new Promise((res, rejc) => {
		companyModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res(
                        { 
                            message: 'Compañia eliminada' 
                        }
                    );
				} else {
					rejc(
                        { 
                            status: 400, 
                            message: 'La compañia no existe o no puede ser eliminada' 
                        }
                    );
				}
			})
			.then((error) => {
				rejc(
                    { 
                        status: 500, 
                        message: 'intenta de nuevo mas tarde' 
                    }
                );
			});
	});
};

module.exports = {
	getAllCompanies,
	getCompany,
	createCompany,
	updateCompanyById,
	deleteCompanyById,
};
