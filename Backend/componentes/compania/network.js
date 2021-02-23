const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const { 
	getAllCompanies, 
	getCompany, 
	updateCompanyById, 
	deleteCompanyById, 
	createCompany 
} = require("./controller");

//USERS ROUTES
const router = express.Router();

router.get('/getall', autenticate, (req, res) => {
	getAllCompanies()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	getCompany(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, (req, res) => {
	const reqUser = req.body;
	createCompany(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/update/:id', autenticate, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateCompanyById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/delete/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteCompanyById(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;