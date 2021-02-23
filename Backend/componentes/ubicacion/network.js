const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization")

const {
	getAllRegions,
	getCitiesByCountry,
	getCountriesByRegion,
	createRegion,
	createCountry,
	createCity,
	deleteRegion,
	deleteCountry,
	deleteCity,
	getByIdRegion,
	getByIdCountry,
	getByIdCity,
	updateRegionById,
	updateCountryById,
	updateCityById,
	getAllCities,
	getAllCountries,
} = require("./controller");

//USERS ROUTES
const router = express.Router();

//GET
router.get('/regions', autenticate, (req, res) => {
	getAllRegions()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/cities', autenticate, (req, res) => {
	getAllCities()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/countries', autenticate, (req, res) => {
	getAllCountries()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:region/countries', autenticate, (req, res) => {
	let { region } = req.params;
	getCountriesByRegion(region)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:country/cities', autenticate, (req, res) => {
	let { country } = req.params;
	getCitiesByCountry(country)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
// GET BY ID
router.get('/region/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdRegion(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/country/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdCountry(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/city/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdCity(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

//CREATE
router.post('/region/create', autenticate, (req, res) => {
	createRegion(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/country/create', autenticate, (req, res) => {
	createCountry(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/city/create', autenticate, (req, res) => {
	createCity(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

//UPDATE
router.patch('/region/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateRegionById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/country/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateCountryById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/city/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateCityById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

//DELETE
router.delete('/region/delete/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteRegion(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/country/delete/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteCountry(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/city/delete/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteCity(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
module.exports = router;